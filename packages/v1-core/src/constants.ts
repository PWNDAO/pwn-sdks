import { AddressString, SupportedChain, typeSafeObjectKeys } from "@pwndao/sdk-core";

export const CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR = 1e38;

export const ENABLED_QUOTES = {
    [SupportedChain.Ethereum]: ['BTC', 'ETH', 'USD'] as const,
    [SupportedChain.Base]: ['BTC', 'ETH', 'USD', 'EUR'] as const
} as const

const LBTC = {
    [SupportedChain.Ethereum]: "0x8236a87084f8b84306f72007f36f2618a5634494",
    [SupportedChain.Base]: "0xecac9c5f704e954931349da37f60e39f515c11c1"
}

const WBTC = {
    [SupportedChain.Ethereum]: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    [SupportedChain.Base]: "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c"
}

const solvBTC = {
    [SupportedChain.Ethereum]: "0x7a56e1c57c7475ccf742a1832b028f0456652f97",
    [SupportedChain.Base]: "0x3b86ad95859b6ab773f55f8d94b4b9d443ee931f"
}

const cbETH = {
    [SupportedChain.Ethereum]: "0xBe9895146f7AF43049ca1c1AE358B0541Ea49704",
    [SupportedChain.Base]: "0x2ae3f1ec7f1f5012cfeab0185bfc7aa3cf0dec22"
}

const rETH = {
    [SupportedChain.Ethereum]: "0xae78736cd615f374d3085123a210448e74fc6393",
    [SupportedChain.Base]: "0xb6fe221fe9eef5aba221c348ba20a1bf5e73624c"
}

const stETH = {
    [SupportedChain.Ethereum]: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84"
}

const ezETH = {
    [SupportedChain.Ethereum]: "0xbf5495efe5db9ce00f80364c8b423567e58d2110",
    [SupportedChain.Base]: "0x2416092f143378750bb29b79ed961ab195cceea5"
}

const rsETH = {
    [SupportedChain.Ethereum]: "0xa1290d69c65a6fe4df752f95823fae25cb99e5a7"
}

const weETH = {
    [SupportedChain.Ethereum]: "0xcd5fe23c85820f7b72d0926fc9b05b43e359b7ee",
    [SupportedChain.Base]: "0x04c0599ae5a44757c0af6f9ec3b93da8976c150a"
}

const DAI = {
    [SupportedChain.Ethereum]: "0x6b175474e89094c44da98b954eedeac495271d0f",
    [SupportedChain.Base]: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb"
}

const TUSD = {
    [SupportedChain.Ethereum]: "0x0000000000085d4780b73119b644ae5ecd22b376"
}

const USDC = {
    [SupportedChain.Ethereum]: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    [SupportedChain.Base]: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
}

const USDT = {
    [SupportedChain.Ethereum]: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    [SupportedChain.Base]: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2"
}

const tBTC = {
    [SupportedChain.Ethereum]: "0x18084fba666a33d37592fa2633fd49a74dd93a88",
    [SupportedChain.Base]: "0x236aa50979d5f3de3bd1eeb40e81137f22ab794b"
}

const wstETH = {
    [SupportedChain.Ethereum]: "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0",
    [SupportedChain.Base]: "0xc1cba3fcea344f92d9239c08c0568f6f2f0ee452"
}

const USD0 = {
    [SupportedChain.Ethereum]: "0x73a15fed60bf67631dc6cd7bc5b6e8da8190acf5"
}

const USDe = {
    [SupportedChain.Ethereum]: "0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
    [SupportedChain.Base]: "0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34"
}

const sUSDe = {
    [SupportedChain.Ethereum]: "0x9d39a5de30e57443bff2a8307a4256c8797a3497",
    [SupportedChain.Base]: "0x211cc4dd073734da055fbf44a2b4667d5e5fe5d2"
}

const PYUSD = {
    [SupportedChain.Ethereum]: "0x6c3ea9036406852006290770bedfcaba0e23a0e8"
}

const EURc = {
    [SupportedChain.Base]: "0x60a3e35cc302bfa44cb288bc5a4f316fdb1adb42"
}

const GHO = {
    [SupportedChain.Base]: "0x6bb7a212910682dcfdbd5bcbb3e28fb4e8da10ee"
}

const USDS = {
    [SupportedChain.Base]: "0x820c137fa70c8691f0e44dc420a5e53c168921dc"
}

const cbBTC = {
    [SupportedChain.Ethereum]: "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf",
    [SupportedChain.Base]: "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf"
}

const EXISTING_BASE_PAIRS = {
    [SupportedChain.Ethereum]: ["BTC/USD", "ETH/USD", "ETH/BTC", "BTC/ETH"],
    [SupportedChain.Base]: ["BTC/USD", "ETH/USD", "EUR/USD"]
}

export const CHAINS_WITH_CHAINLINK_FEED_SUPPORT = typeSafeObjectKeys(EXISTING_BASE_PAIRS)
export type ChainsWithChainLinkFeedSupport = typeof CHAINS_WITH_CHAINLINK_FEED_SUPPORT[number]

const ALLOWED_DENOMINATORS = ["BTC", "USD", "ETH"] as const
export type AllowedDenominatorsEnum = typeof ALLOWED_DENOMINATORS[number]

type IsExistBasePairResult = { found: true, isInverted: boolean } | { found:false } | undefined
export const isExistBasePair = (chainId: ChainsWithChainLinkFeedSupport, base: AllowedDenominatorsEnum, quote: AllowedDenominatorsEnum): IsExistBasePairResult => {
    if (!CHAINS_WITH_CHAINLINK_FEED_SUPPORT.some(_chain => _chain === chainId)) {
        // TODO what to do here?
        // TODO should we throw 
        return undefined
    }
    
    const exactMatch = EXISTING_BASE_PAIRS[chainId].find(pair => pair === `${base}/${quote}`)
    if (exactMatch) {
        return {
            found: true,
            isInverted: false
        }
    }

    const invertedMatch = EXISTING_BASE_PAIRS[chainId as SupportedChain.Ethereum | SupportedChain.Base].find(pair => {
        return pair.includes(base) && pair.includes(quote)
    })
    if (!invertedMatch) {
        return {
            found: false
        }
    }

    return {
        found: true,
        isInverted: true
    }
}

type AllowedQuotes<T extends ChainsWithChainLinkFeedSupport> = typeof ENABLED_QUOTES[T][number]

type FeedRegistryChainEntry<T extends ChainsWithChainLinkFeedSupport> = {
    [tokenAddress: AddressString]: readonly AllowedQuotes<T>[]
}

type FeedRegistryType = {
    [T in ChainsWithChainLinkFeedSupport]: FeedRegistryChainEntry<T>
}

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
        [TUSD[SupportedChain.Ethereum]]: ["ETH"],
        [USDC[SupportedChain.Ethereum]]: ["ETH", "USD"],
        [USDT[SupportedChain.Ethereum]]: ["ETH", "USD"],
        [tBTC[SupportedChain.Ethereum]]: ["USD"],
        [cbBTC[SupportedChain.Ethereum]]: ["USD"],
        [wstETH[SupportedChain.Ethereum]]: ["USD"],
        [USD0[SupportedChain.Ethereum]]: ["USD"],
        [USDe[SupportedChain.Ethereum]]: ["USD"],
        [sUSDe[SupportedChain.Ethereum]]: ["USD"],
        [PYUSD[SupportedChain.Ethereum]]: ["USD"],
        [TUSD[SupportedChain.Ethereum]]: ["USD"],
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
        [sUSDe[SupportedChain.Base]]: ["USD"]
    }
} as const satisfies FeedRegistryType

export const convertNameIntoDenominator = (name: AllowedDenominatorsEnum): AddressString => {
    name = name.toUpperCase() as AllowedDenominatorsEnum
    return {
        BTC: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB" as AddressString,
        ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as AddressString, 
        EUR: "0x00000000000000000000000000000000000003d2" as AddressString,
        USD: "0x0000000000000000000000000000000000000348" as AddressString,
    }[name]
}
