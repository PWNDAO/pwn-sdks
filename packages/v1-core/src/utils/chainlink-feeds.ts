import type { AddressString } from "@pwndao/sdk-core";
import { SupportedChain, typeSafeObjectKeys } from "@pwndao/sdk-core";
import invariant from "ts-invariant";
import {
	DAI,
	EURc,
	FDUSD,
	GHO,
	GHST,
	GNO,
	LBTC,
	PYUSD,
	TUSD,
	USD0,
	USDC,
	USDD,
	USDS,
	USDT,
	USDe,
	WBTC,
	WETH,
	WLD,
	cbBTC,
	cbETH,
	ezETH,
	rETH,
	rsETH,
	sUSDe,
	solvBTC,
	stETH,
	tBTC,
	weETH,
	wstETH,
} from "../addresses.js";

// TODO shall we refactor the WETH == ETH logic?

// pairs that do not contain ERC20 tokens, only native assets like BTC, ETH, USD, EUR, etc.
export const NATIVE_PAIRS = {
	[SupportedChain.Ethereum]: ["BTC/USD", "ETH/USD", "ETH/BTC", "BTC/ETH"],
	[SupportedChain.Base]: ["BTC/USD", "ETH/USD", "EUR/USD"],
	[SupportedChain.Sepolia]: ["BTC/USD", "BTC/ETH"],
	[SupportedChain.Gnosis]: ["BTC/USD", "ETH/USD"],
	[SupportedChain.Optimism]: ["BTC/USD", "ETH/USD", "ETH/BTC"],
	[SupportedChain.Arbitrum]: ["BTC/ETH", "BTC/USD", "ETH/USD"],
	[SupportedChain.Polygon]: ["BTC/ETH", "BTC/USD", "ETH/USD"],
	[SupportedChain.Bsc]: ["BTC/ETH", "BTC/USD", "ETH/USD"],
	[SupportedChain.Linea]: ["BTC/USD", "ETH/USD"],
} as const;

export const CHAINS_WITH_CHAINLINK_FEED_SUPPORT =
	typeSafeObjectKeys(NATIVE_PAIRS).map(Number);
export type ChainsWithChainLinkFeedSupport =
	(typeof CHAINS_WITH_CHAINLINK_FEED_SUPPORT)[number];

// Define a type for the quote names
export type NativeAssetName = "BTC" | "ETH" | "USD" | "EUR";

// Define a type for the allowed quotes for each chain
export type AllowedQuotes<T extends ChainsWithChainLinkFeedSupport> =
	T extends SupportedChain.Ethereum
		? "BTC" | "ETH" | "USD"
		: T extends SupportedChain.Base
			? "BTC" | "ETH" | "USD"
			: T extends SupportedChain.Sepolia
				? "ETH" | "USD"
				: T extends SupportedChain.Gnosis
					? "ETH" | "USD"
					: T extends SupportedChain.Optimism
						? "BTC" | "ETH" | "USD"
						: T extends SupportedChain.Arbitrum
							? "BTC" | "ETH" | "USD"
							: T extends SupportedChain.Polygon
								? "ETH" | "USD"
								: T extends SupportedChain.Bsc
									? "BTC" | "ETH" | "USD"
									: T extends SupportedChain.Linea
										? "BTC" | "ETH" | "USD"
										: never;

// Define a type for the native pairs
type NativePair = `${NativeAssetName}/${NativeAssetName}`;

// Define a type for the feed registry with specific token addresses
type FeedRegistryWithTokens<T extends ChainsWithChainLinkFeedSupport> = {
	[tokenAddress: AddressString]: readonly AllowedQuotes<T>[];
};

// Define a type for the complete feed registry
type CompleteFeedRegistry = {
	[T in ChainsWithChainLinkFeedSupport]: FeedRegistryWithTokens<T>;
};

// Define a type for the denominator map
type DenominatorMap = {
	[K in NativeAssetName]: AddressString;
};

// Define a type for the native pairs mapping
type NativePairsMap = {
	[T in ChainsWithChainLinkFeedSupport]: readonly NativePair[];
};

export const isExistBasePair = <T extends ChainsWithChainLinkFeedSupport>(
	chainId: T,
	base: AllowedQuotes<T>,
	quote: AllowedQuotes<T>,
): { found: true; isInverted: boolean } | { found: false } => {
	invariant(
		CHAINS_WITH_CHAINLINK_FEED_SUPPORT.includes(chainId),
		`Chain ${chainId} does not support ChainLink proposals.`,
	);

	// Use the native pairs with proper typing
	const nativePairs = NATIVE_PAIRS as NativePairsMap;
	const chainPairs = nativePairs[chainId];
	const pairString = `${base}/${quote}` as NativePair;

	const exactMatch = chainPairs.find((pair) => pair === pairString);
	if (exactMatch) {
		return {
			found: true,
			isInverted: false,
		};
	}

	const invertedMatch = chainPairs.find(
		(pair) => pair.includes(base as string) && pair.includes(quote as string),
	);

	if (!invertedMatch) {
		return { found: false };
	}

	return {
		found: true,
		isInverted: true,
	};
};

export const FEED_REGISTRY = {
	[SupportedChain.Ethereum]: {
		[LBTC[SupportedChain.Ethereum]]: ["BTC"],
		[WBTC[SupportedChain.Ethereum]]: ["BTC"],
		[solvBTC[SupportedChain.Ethereum]]: ["BTC"],
		[cbETH[SupportedChain.Ethereum]]: ["ETH"],
		[rETH[SupportedChain.Ethereum]]: ["ETH"],
		[stETH[SupportedChain.Ethereum]]: ["ETH", "USD"],
		[ezETH[SupportedChain.Ethereum]]: ["ETH"],
		[rsETH[SupportedChain.Ethereum]]: ["ETH"],
		[weETH[SupportedChain.Ethereum]]: ["ETH"],
		[DAI[SupportedChain.Ethereum]]: ["ETH", "USD"],
		[TUSD[SupportedChain.Ethereum]]: ["USD", "ETH"],
		[USDC[SupportedChain.Ethereum]]: ["ETH", "USD"],
		[USDT[SupportedChain.Ethereum]]: ["ETH", "USD"],
		[tBTC[SupportedChain.Ethereum]]: ["USD"],
		[cbBTC[SupportedChain.Ethereum]]: ["USD"],
		[wstETH[SupportedChain.Ethereum]]: ["USD"],
		[USD0[SupportedChain.Ethereum]]: ["USD"],
		[USDe[SupportedChain.Ethereum]]: ["USD"],
		[sUSDe[SupportedChain.Ethereum]]: ["USD"],
		[PYUSD[SupportedChain.Ethereum]]: ["USD"],
		// note: slight hack as WETH == ETH, so these are the same feeds
		//  as for ETH in NATIVE_PAIRS
		//  as for ETH in NATIVE_PAIRS
		[WETH[SupportedChain.Ethereum]]: ["ETH", "BTC", "USD"],
	},
	[SupportedChain.Base]: {
		[LBTC[SupportedChain.Base]]: ["BTC"],
		[solvBTC[SupportedChain.Base]]: ["BTC"],
		[cbETH[SupportedChain.Base]]: ["ETH", "USD"],
		[rETH[SupportedChain.Base]]: ["ETH"],
		[wstETH[SupportedChain.Base]]: ["ETH"],
		[ezETH[SupportedChain.Base]]: ["ETH"],
		[weETH[SupportedChain.Base]]: ["ETH"],
		[DAI[SupportedChain.Base]]: ["USD"],
		[EURc[SupportedChain.Base]]: ["USD"],
		[GHO[SupportedChain.Base]]: ["USD"],
		[tBTC[SupportedChain.Base]]: ["USD"],
		[USDC[SupportedChain.Base]]: ["USD"],
		[USDS[SupportedChain.Base]]: ["USD"],
		[USDT[SupportedChain.Base]]: ["USD"],
		[USDe[SupportedChain.Base]]: ["USD"],
		[WBTC[SupportedChain.Base]]: ["USD"],
		[cbBTC[SupportedChain.Base]]: ["USD"],
		[sUSDe[SupportedChain.Base]]: ["USD"],
		// note: slight hack as WETH == ETH, so these are the same feeds
		//  as for ETH in NATIVE_PAIRS
		[WETH[SupportedChain.Base]]: ["USD", "ETH"],
	},
	[SupportedChain.Gnosis]: {
		[WBTC[SupportedChain.Gnosis]]: ["USD"],
		[DAI[SupportedChain.Gnosis]]: ["USD"],
		[USDC[SupportedChain.Gnosis]]: ["USD"],
		[USDT[SupportedChain.Gnosis]]: ["USD"],
		[GNO[SupportedChain.Gnosis]]: ["USD"],
		// note: slight hack as WETH == ETH, so these are the same feeds
		//  as for ETH in NATIVE_PAIRS
		[WETH[SupportedChain.Gnosis]]: ["USD", "ETH"],
	},
	[SupportedChain.Optimism]: {
		[cbETH[SupportedChain.Optimism]]: ["ETH"],
		[rETH[SupportedChain.Optimism]]: ["ETH"],
		[rsETH[SupportedChain.Optimism]]: ["ETH"],
		[stETH[SupportedChain.Optimism]]: ["ETH", "USD"],
		[wstETH[SupportedChain.Optimism]]: ["ETH", "USD"],
		[weETH[SupportedChain.Optimism]]: ["ETH"],
		[WBTC[SupportedChain.Optimism]]: ["USD"],
		[tBTC[SupportedChain.Optimism]]: ["USD"],
		[DAI[SupportedChain.Optimism]]: ["USD"],
		[USDC[SupportedChain.Optimism]]: ["USD"],
		[USDT[SupportedChain.Optimism]]: ["USD"],
		[USDe[SupportedChain.Optimism]]: ["USD"],
		[sUSDe[SupportedChain.Optimism]]: ["USD"],
		[WLD[SupportedChain.Optimism]]: ["USD"],
		// note: slight hack as WETH == ETH, so these are the same feeds
		//  as for ETH in NATIVE_PAIRS
		// TODO shall we add BTC here?
		[WETH[SupportedChain.Optimism]]: ["USD", "ETH"],
	},
	[SupportedChain.Arbitrum]: {
		[WBTC[SupportedChain.Arbitrum]]: ["BTC", "USD"],
		[tBTC[SupportedChain.Arbitrum]]: ["BTC", "USD"],
		[solvBTC[SupportedChain.Arbitrum]]: ["BTC"],
		[cbETH[SupportedChain.Arbitrum]]: ["ETH"],
		[rETH[SupportedChain.Arbitrum]]: ["ETH"],
		[rsETH[SupportedChain.Arbitrum]]: ["ETH"],
		[wstETH[SupportedChain.Arbitrum]]: ["ETH"],
		[ezETH[SupportedChain.Arbitrum]]: ["ETH"],
		[weETH[SupportedChain.Arbitrum]]: ["ETH"],
		[DAI[SupportedChain.Arbitrum]]: ["USD"],
		[GHO[SupportedChain.Arbitrum]]: ["USD"],
		[TUSD[SupportedChain.Arbitrum]]: ["USD"],
		[USDC[SupportedChain.Arbitrum]]: ["USD"],
		[USDD[SupportedChain.Arbitrum]]: ["USD"],
		[USDT[SupportedChain.Arbitrum]]: ["USD"],
		[USDe[SupportedChain.Arbitrum]]: ["USD"],
		[sUSDe[SupportedChain.Arbitrum]]: ["USD"],
		// note: slight hack as WETH == ETH, so these are the same feeds
		//  as for ETH in NATIVE_PAIRS
		// TODO shall we add BTC here?
		[WETH[SupportedChain.Arbitrum]]: ["USD", "ETH"],
	},
	[SupportedChain.Polygon]: {
		[WBTC[SupportedChain.Polygon]]: ["ETH", "USD"],
		[cbETH[SupportedChain.Polygon]]: ["ETH"],
		[wstETH[SupportedChain.Polygon]]: ["ETH"],
		[DAI[SupportedChain.Polygon]]: ["ETH", "USD"],
		[USDC[SupportedChain.Polygon]]: ["ETH", "USD"],
		[USDT[SupportedChain.Polygon]]: ["ETH", "USD"],
		[GHST[SupportedChain.Polygon]]: ["ETH", "USD"],
		[TUSD[SupportedChain.Polygon]]: ["USD"],
		// note: slight hack as WETH == ETH, so these are the same feeds
		//  as for ETH in NATIVE_PAIRS
		// TODO shall we add BTC here?
		[WETH[SupportedChain.Polygon]]: ["USD", "ETH"],
	},
	[SupportedChain.Bsc]: {
		[LBTC[SupportedChain.Bsc]]: ["BTC"],
		[solvBTC[SupportedChain.Bsc]]: ["BTC"],
		[ezETH[SupportedChain.Bsc]]: ["ETH"],
		[wstETH[SupportedChain.Bsc]]: ["USD"],
		[DAI[SupportedChain.Bsc]]: ["USD"],
		[FDUSD[SupportedChain.Bsc]]: ["USD"],
		[TUSD[SupportedChain.Bsc]]: ["USD"],
		[USDC[SupportedChain.Bsc]]: ["USD"],
		[USDT[SupportedChain.Bsc]]: ["USD"],
		[USDe[SupportedChain.Bsc]]: ["USD"],
		// note: slight hack as WETH == ETH, so these are the same feeds
		//  as for ETH in NATIVE_PAIRS
		// TODO shall we add BTC here?
		[WETH[SupportedChain.Bsc]]: ["USD", "ETH"],
	},
	[SupportedChain.Sepolia]: {
		[DAI[SupportedChain.Sepolia]]: ["USD"],
		[USDC[SupportedChain.Sepolia]]: ["USD"],
		// note: slight hack as WETH == ETH, so these are the same feeds
		//  as for ETH in NATIVE_PAIRS
		[WETH[SupportedChain.Sepolia]]: ["ETH", "USD"],
	},
	[SupportedChain.Linea]: {
		[rsETH[SupportedChain.Linea]]: ["ETH"],
		[ezETH[SupportedChain.Linea]]: ["ETH"],
		[weETH[SupportedChain.Linea]]: ["ETH"],
		[wstETH[SupportedChain.Linea]]: ["USD"],
		[DAI[SupportedChain.Linea]]: ["USD"],
		[USDC[SupportedChain.Linea]]: ["USD"],
		[USDT[SupportedChain.Linea]]: ["USD"],
		// note: slight hack as WETH == ETH, so these are the same feeds
		//  as for ETH in NATIVE_PAIRS
		[WETH[SupportedChain.Linea]]: ["ETH", "USD"],
	},	
} as const satisfies CompleteFeedRegistry;

export const convertNameIntoDenominator = <
	T extends ChainsWithChainLinkFeedSupport,
>(
	name: AllowedQuotes<T>,
): AddressString => {
	const denominatorMap: DenominatorMap = {
		BTC: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB" as AddressString,
		ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as AddressString,
		EUR: "0x00000000000000000000000000000000000003d2" as AddressString,
		USD: "0x0000000000000000000000000000000000000348" as AddressString,
	};

	return denominatorMap[name as NativeAssetName];
};

export const getFeedData = <T extends ChainsWithChainLinkFeedSupport>(
	chainId: T,
	base: AddressString,
	quote: AddressString,
): {
	feedIntermediaryDenominations: AddressString[];
	feedInvertFlags: boolean[];
} | null => {
	if (base === quote) {
		return null;
	}

	const registry = FEED_REGISTRY as CompleteFeedRegistry;
	const chainRegistry = registry[chainId];

	const getFeeds = (address: AddressString): readonly AllowedQuotes<T>[] => {
		return chainRegistry?.[address] || [];
	};

	const baseFeeds = getFeeds(base);
	const quoteFeeds = getFeeds(quote);

	// Early return if no feeds available
	if (!baseFeeds.length || !quoteFeeds.length) {
		return null;
	}

	// Check 0-hop first (direct ETH feed when one is WETH)
	if (base === WETH[chainId]) {
		const hasEthFeed = quoteFeeds.includes("ETH" as AllowedQuotes<T>);
		if (hasEthFeed) {
			return {
				feedIntermediaryDenominations: [],
				feedInvertFlags: [false],
			};
		}
	} else if (quote === WETH[chainId]) {
		const hasEthFeed = baseFeeds.includes("ETH" as AllowedQuotes<T>);
		if (hasEthFeed) {
			return {
				feedIntermediaryDenominations: [],
				feedInvertFlags: [true],
			};
		}
	}

	// Check 1-hop (common denominator)
	for (const quoteFeed of quoteFeeds) {
		for (const baseFeed of baseFeeds) {
			if (quoteFeed === baseFeed) {
				return {
					feedIntermediaryDenominations: [
						convertNameIntoDenominator<T>(quoteFeed),
					],
					feedInvertFlags: [false, true],
				};
			}
		}
	}

	// Helper to get all possible native assets that can be used in paths
	const getAllNatives = (): AllowedQuotes<T>[] => {
		const natives = new Set<AllowedQuotes<T>>();

		const pairs = (NATIVE_PAIRS[chainId] ?? []) as readonly NativePair[];

		for (const pair of pairs) {
			const [base, quote] = pair.split("/") as [
				AllowedQuotes<T>,
				AllowedQuotes<T>,
			];
			natives.add(base);
			natives.add(quote);
		}
		return Array.from(natives);
	};

	const nativeAssets = getAllNatives();

	// Helper to check if a path exists and get its configuration
	const tryPath = (
		path: AllowedQuotes<T>[],
	): {
		denominations: AddressString[];
		invertFlags: boolean[];
	} | null => {
		const invertFlags: boolean[] = [false];

		for (let i = 0; i < path.length - 1; i++) {
			const result = isExistBasePair(chainId, path[i], path[i + 1]);
			if (!result.found) return null;
			invertFlags.push(result.isInverted);
		}
		invertFlags.push(true);

		return {
			denominations: path.map((p) => convertNameIntoDenominator<T>(p)),
			invertFlags,
		};
	};

	// Check all possible 2-hop routes first
	for (const quoteFeed of quoteFeeds) {
		for (const baseFeed of baseFeeds) {
			const path2 = tryPath([quoteFeed, baseFeed]);
			if (path2) {
				return {
					feedIntermediaryDenominations: path2.denominations,
					feedInvertFlags: path2.invertFlags,
				};
			}
		}
	}

	// Check all possible 3-hop routes
	for (const quoteFeed of quoteFeeds) {
		for (const baseFeed of baseFeeds) {
			for (const mid of nativeAssets) {
				const path3 = tryPath([quoteFeed, mid, baseFeed]);
				if (path3) {
					return {
						feedIntermediaryDenominations: path3.denominations,
						feedInvertFlags: path3.invertFlags,
					};
				}
			}
		}
	}

	// Check all possible 4-hop routes as last resort
	for (const quoteFeed of quoteFeeds) {
		for (const baseFeed of baseFeeds) {
			for (const mid1 of nativeAssets) {
				for (const mid2 of nativeAssets) {
					if (mid1 === mid2) continue;

					const path4 = tryPath([quoteFeed, mid1, mid2, baseFeed]);
					if (path4) {
						return {
							feedIntermediaryDenominations: path4.denominations,
							feedInvertFlags: path4.invertFlags,
						};
					}
				}
			}
		}
	}

	return null;
};
