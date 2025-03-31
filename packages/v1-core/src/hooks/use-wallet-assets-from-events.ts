import type { Address, Chain, PublicClient } from "viem";
import { getWalletAssetsFromEvents } from "../utils/get-wallet-assets-from-events.js";
import type { WalletAssets } from "../utils/get-wallet-assets-from-events.js";

export interface WalletAssetsOptions {
	enabled?: boolean;
	fromBlock?: bigint;
	toBlock?: bigint;
	chunkSize?: number;
	concurrentChunks?: number;
	refreshInterval?: number;
}

export interface WalletAssetsResult {
	assets: WalletAssets | null;
	isLoading: boolean;
	error: Error | null;
	refetch: () => Promise<void>;
	cleanup: () => void;
}

/**
 * Core implementation for fetching wallet assets using the Transfer event scanning technique
 * This is framework-agnostic and accepts an initialized client instance
 */
export async function getWalletAssets(
	address: Address | undefined,
	options: WalletAssetsOptions,
	client: PublicClient,
): Promise<WalletAssetsResult> {
	const {
		enabled = true,
		fromBlock,
		toBlock,
		chunkSize,
		concurrentChunks,
	} = options;

	let assets: WalletAssets | null = null;
	let error: Error | null = null;
	let isLoading = false;

	const fetchAssets = async () => {
		if (!address || !enabled) return;

		try {
			isLoading = true;
			error = null;

			console.log("fetchAssets", address, client.chain, client, {
				fromBlock,
				toBlock,
				chunkSize,
				concurrentChunks,
			});

			const walletAssets = await getWalletAssetsFromEvents(
				address,
				client.chain,
				client,
				{
					fromBlock,
					toBlock,
					chunkSize,
					concurrentChunks,
				},
			);

			console.log("walletAssets", walletAssets);

			assets = walletAssets;
			isLoading = false;
		} catch (err) {
			console.error("Error fetching wallet assets:", err);
			error = err instanceof Error ? err : new Error(String(err));
			isLoading = false;
		}
	};

	// Initial fetch
	await fetchAssets();

	// Set up interval for periodic refreshing if needed
	let intervalId: NodeJS.Timeout | undefined;
	if (options.refreshInterval && options.refreshInterval > 0) {
		intervalId = setInterval(fetchAssets, options.refreshInterval);
	}

	// Return cleanup function
	const cleanup = () => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	};

	return {
		assets,
		isLoading,
		error,
		refetch: fetchAssets,
		cleanup,
	};
}
