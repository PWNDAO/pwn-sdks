import {
	type Address,
	type Chain,
	type PublicClient,
	parseAbiItem,
} from "viem";
import { erc20Abi, erc721Abi } from "./abis.js";
import { AssetStorage } from "./pmt-storage.js";

// Transfer event signature (same for ERC20 and ERC721)
const TRANSFER_EVENT = parseAbiItem(
	"event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
);
const TRANSFER_TOPIC =
	"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

export interface WalletAssets {
	nativeBalance: bigint;
	erc20Assets: {
		contractAddress: Address;
		balance: bigint;
		name?: string;
		symbol?: string;
		decimals?: number;
	}[];
	erc721Assets: {
		contractAddress: Address;
		tokenIds: bigint[];
		name?: string;
		symbol?: string;
	}[];
}

interface AssetDiscoveryOptions {
	fromBlock?: bigint;
	toBlock?: bigint;
	chunkSize?: number;
	concurrentChunks?: number;
}

/**
 * Get wallet assets by scanning Transfer events
 * Uses parallelized fetching to improve performance
 */
export async function getWalletAssetsFromEvents(
	walletAddress: Address,
	chain: Chain,
	client: PublicClient,
	options: AssetDiscoveryOptions = {},
): Promise<WalletAssets> {
	console.log("getWalletAssetsFromEvents", walletAddress, chain, client, options);
	// Initialize defaults
	const storage = new AssetStorage();
	const assets: WalletAssets = {
		nativeBalance: 0n,
		erc20Assets: [],
		erc721Assets: [],
	};

	// Get configuration options with defaults
	const {
		chunkSize = 10000n,
		concurrentChunks = 5,
		toBlock: userToBlock,
	} = options;

	// Get last processed block from storage or default to 0
	const fromBlock =
		options.fromBlock || storage.getLastProcessedBlock(walletAddress, chain.id);

	console.log("fromBlock", fromBlock);

	// Get current block number
	const latestBlock = await client.getBlockNumber();
	const toBlock = userToBlock || latestBlock;

	console.log("toBlock", toBlock);

	if (fromBlock >= toBlock) {
		// No new blocks to process, get native balance and return
		assets.nativeBalance = await client.getBalance({
			address: walletAddress,
		});
		return assets;
	}

	console.log("toBlock", toBlock);

	// Discover assets by querying Transfer events
	await discoverAssets(
		client,
		walletAddress,
		fromBlock,
		toBlock,
		BigInt(chunkSize),
		concurrentChunks,
		assets,
		storage,
	);

	// Update last processed block
	storage.setLastProcessedBlock(walletAddress, chain.id, toBlock);

	// Get native balance
	assets.nativeBalance = await client.getBalance({
		address: walletAddress,
	});

	// Load additional metadata like token names, symbols and decimals
	await enrichTokenMetadata(client, assets);

	return assets;
}

/**
 * Discover assets by scanning events in parallel chunks
 */
async function discoverAssets(
	client: PublicClient,
	walletAddress: Address,
	fromBlock: bigint,
	toBlock: bigint,
	chunkSize: bigint,
	concurrentChunks: number,
	assets: WalletAssets,
	storage: AssetStorage,
): Promise<void> {
	// Set of discovered contract addresses to avoid duplicates
	const erc20Contracts = new Set<Address>();
	const erc721Contracts = new Map<Address, Set<bigint>>();

	// Calculate chunks for parallel processing
	const chunks: { start: bigint; end: bigint }[] = [];
	let currentBlock = fromBlock;

	while (currentBlock < toBlock) {
		const endBlock =
			currentBlock + chunkSize > toBlock ? toBlock : currentBlock + chunkSize;

		chunks.push({ start: currentBlock, end: endBlock });
		currentBlock = endBlock + 1n;
	}

	console.log("chunks", chunks);

	// Process chunks in parallel batches
	for (let i = 0; i < chunks.length; i += concurrentChunks) {
		const batch = chunks.slice(i, i + concurrentChunks);

		await Promise.all(
			batch.map(({ start, end }) =>
				processBlockRange(
					client,
					walletAddress,
					start,
					end,
					erc20Contracts,
					erc721Contracts,
				),
			),
		);
	}

	// After all events are processed, get balances using multicall
	if (erc20Contracts.size > 0) {
		await getErc20Balances(
			client,
			walletAddress,
			Array.from(erc20Contracts),
			assets,
		);
	}

	// Process ERC-721 tokens
	for (const [contractAddress, tokenIds] of erc721Contracts.entries()) {
		const assetInfo = {
			contractAddress,
			tokenIds: Array.from(tokenIds),
		};

		// Verify token ownership using multicall
		const validTokens = await verifyErc721Ownership(
			client,
			walletAddress,
			contractAddress,
			Array.from(tokenIds),
		);

		if (validTokens.length > 0) {
			assetInfo.tokenIds = validTokens;
			assets.erc721Assets.push(assetInfo);

			// Update storage
			storage.updateAssetState(
				walletAddress,
				"erc721",
				toBlock,
				contractAddress,
				undefined,
				validTokens,
			);
		}
	}
}

/**
 * Process a range of blocks to find Transfer events
 */
async function processBlockRange(
	client: PublicClient,
	walletAddress: Address,
	fromBlock: bigint,
	toBlock: bigint,
	erc20Contracts: Set<Address>,
	erc721Contracts: Map<Address, Set<bigint>>,
): Promise<void> {
	try {
		// Get all Transfer events to or from the wallet
		const logs = await client.getLogs({
			address: undefined, // Query all contracts
			event: TRANSFER_EVENT,
			args: {
				from: walletAddress,
				to: walletAddress,
			},
			fromBlock,
			toBlock,
		});

		// Process logs to classify tokens
		for (const log of logs) {
			console.log("log", log);
			const contractAddress = log.address;

			if (log.topics.length === 3) {
				// ERC-20 transfer (3 topics: event, from, to)
				erc20Contracts.add(contractAddress as Address);
			} else if (log.topics.length === 4) {
				// ERC-721 transfer (4 topics: event, from, to, tokenId)
				if (!erc721Contracts.has(contractAddress as Address)) {
					erc721Contracts.set(contractAddress as Address, new Set<bigint>());
				}

				// Extract token ID from the topic (remove leading zeros)
				const tokenIdHex = log.topics[3];
				const tokenId = BigInt(tokenIdHex);

				// If this is a transfer TO the wallet, add the token ID
				if (log.args.to === walletAddress) {
					const tokenSet = erc721Contracts.get(contractAddress as Address);
					if (tokenSet) {
						tokenSet.add(tokenId);
					}
				} else if (log.args.from === walletAddress) {
					// If this is a transfer FROM the wallet, remove the token ID
					const tokenSet = erc721Contracts.get(contractAddress as Address);
					if (tokenSet) {
						tokenSet.delete(tokenId);
					}
				}
			}
		}
	} catch (error) {
		console.error(
			`Error processing block range ${fromBlock}-${toBlock}:`,
			error,
		);
	}
}

/**
 * Get ERC-20 balances using multicall for efficiency
 */
async function getErc20Balances(
	client: PublicClient,
	walletAddress: Address,
	contractAddresses: Address[],
	assets: WalletAssets,
): Promise<void> {
	try {
		const balances = await client.multicall({
			contracts: contractAddresses.map((address) => ({
				address,
				abi: erc20Abi,
				functionName: "balanceOf",
				args: [walletAddress],
			})),
		});

		// Filter out tokens with zero balance
		for (let i = 0; i < contractAddresses.length; i++) {
			if (balances[i].status === "success" && balances[i].result > 0n) {
				assets.erc20Assets.push({
					contractAddress: contractAddresses[i],
					balance: balances[i].result,
				});
			}
		}
	} catch (error) {
		console.error("Error getting ERC-20 balances:", error);
	}
}

/**
 * Verify ERC-721 token ownership using multicall
 */
async function verifyErc721Ownership(
	client: PublicClient,
	walletAddress: Address,
	contractAddress: Address,
	tokenIds: bigint[],
): Promise<bigint[]> {
	if (tokenIds.length === 0) return [];

	try {
		// Check ownership of each token
		const ownerChecks = await client.multicall({
			contracts: tokenIds.map((tokenId) => ({
				address: contractAddress,
				abi: erc721Abi,
				functionName: "ownerOf",
				args: [tokenId],
			})),
		});

		// Filter out tokens not owned by the wallet
		const validTokens: bigint[] = [];
		for (let i = 0; i < tokenIds.length; i++) {
			if (
				ownerChecks[i].status === "success" &&
				ownerChecks[i].result === walletAddress
			) {
				validTokens.push(tokenIds[i]);
			}
		}

		return validTokens;
	} catch (error) {
		console.error(
			`Error verifying ERC-721 ownership for contract ${contractAddress}:`,
			error,
		);
		return [];
	}
}

/**
 * Enrich token metadata (names, symbols, decimals)
 */
async function enrichTokenMetadata(
	client: PublicClient,
	assets: WalletAssets,
): Promise<void> {
	// Enrich ERC-20 tokens
	if (assets.erc20Assets.length > 0) {
		const erc20Contracts = assets.erc20Assets.map(
			(asset) => asset.contractAddress,
		);

		try {
			// Get token names
			const names = await client.multicall({
				contracts: erc20Contracts.map((address) => ({
					address,
					abi: erc20Abi,
					functionName: "name",
				})),
			});

			// Get token symbols
			const symbols = await client.multicall({
				contracts: erc20Contracts.map((address) => ({
					address,
					abi: erc20Abi,
					functionName: "symbol",
				})),
			});

			// Get token decimals
			const decimals = await client.multicall({
				contracts: erc20Contracts.map((address) => ({
					address,
					abi: erc20Abi,
					functionName: "decimals",
				})),
			});

			// Update assets with metadata
			for (let i = 0; i < assets.erc20Assets.length; i++) {
				if (names[i].status === "success") {
					assets.erc20Assets[i].name = names[i].result;
				}

				if (symbols[i].status === "success") {
					assets.erc20Assets[i].symbol = symbols[i].result;
				}

				if (decimals[i].status === "success") {
					assets.erc20Assets[i].decimals = decimals[i].result;
				}
			}
		} catch (error) {
			console.error("Error enriching ERC-20 metadata:", error);
		}
	}

	// Enrich ERC-721 tokens
	if (assets.erc721Assets.length > 0) {
		const erc721Contracts = assets.erc721Assets.map(
			(asset) => asset.contractAddress,
		);

		try {
			// Get collection names
			const names = await client.multicall({
				contracts: erc721Contracts.map((address) => ({
					address,
					abi: erc721Abi,
					functionName: "name",
				})),
			});

			// Get collection symbols
			const symbols = await client.multicall({
				contracts: erc721Contracts.map((address) => ({
					address,
					abi: erc721Abi,
					functionName: "symbol",
				})),
			});

			// Update assets with metadata
			for (let i = 0; i < assets.erc721Assets.length; i++) {
				if (names[i].status === "success") {
					assets.erc721Assets[i].name = names[i].result;
				}

				if (symbols[i].status === "success") {
					assets.erc721Assets[i].symbol = symbols[i].result;
				}
			}
		} catch (error) {
			console.error("Error enriching ERC-721 metadata:", error);
		}
	}
}
