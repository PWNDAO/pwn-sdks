import { AddressString, SupportedChain } from "@pwndao/sdk-core"
import { getAddress } from "viem"

const defineAddresses = <T extends { [K in keyof T]: string }>(
    addresses: T & Partial<Record<SupportedChain, string>>
): { [K in keyof T]: AddressString } => {
    // converts all addresses to checksum addresses
    return Object.fromEntries(
      Object.entries(addresses).map(
        ([chain, address]) => [chain, getAddress(address) as AddressString]
      )
    ) as { [K in keyof T]: AddressString };
};

export const LBTC = defineAddresses({
    [SupportedChain.Ethereum]: "0x8236a87084f8b84306f72007f36f2618a5634494",
    [SupportedChain.Base]: "0xecac9c5f704e954931349da37f60e39f515c11c1",
    [SupportedChain.Bsc]: "0xecac9c5f704e954931349da37f60e39f515c11c1"
})

export const WBTC = defineAddresses({
    [SupportedChain.Ethereum]: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    [SupportedChain.Base]: "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c",
    [SupportedChain.Gnosis]: "0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252",
    [SupportedChain.Optimism]: "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
    [SupportedChain.Arbitrum]: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
    [SupportedChain.Polygon]: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6"
})

export const solvBTC = defineAddresses({
    [SupportedChain.Ethereum]: "0x7a56e1c57c7475ccf742a1832b028f0456652f97",
    [SupportedChain.Base]: "0x3b86ad95859b6ab773f55f8d94b4b9d443ee931f",
    [SupportedChain.Arbitrum]: "0x3647c54c4c2c65bc7a2d63c0da2809b399dbbdc0",
    [SupportedChain.Bsc]: "0x4aae823a6a0b376de6a78e74ecc5b079d38cbcf7"
})

export const cbETH = defineAddresses({
    [SupportedChain.Ethereum]: "0xBe9895146f7AF43049ca1c1AE358B0541Ea49704",
    [SupportedChain.Base]: "0x2ae3f1ec7f1f5012cfeab0185bfc7aa3cf0dec22",
    [SupportedChain.Optimism]: "0xadDb6A0412DE1BA0F936DCaeb8Aaa24578dcF3B2",
    [SupportedChain.Arbitrum]: "0x1debd73e752beaf79865fd6446b0c970eae7732f",
    [SupportedChain.Polygon]: "0x4b4327dB1600B8B1440163F667e199CEf35385f5"
})

export const rETH = defineAddresses({
    [SupportedChain.Ethereum]: "0xae78736cd615f374d3085123a210448e74fc6393",
    [SupportedChain.Base]: "0xb6fe221fe9eef5aba221c348ba20a1bf5e73624c",
    [SupportedChain.Optimism]: "0x9Bcef72be871e61ED4fBbc7630889beE758eb81D",
    [SupportedChain.Arbitrum]: "0xEC70Dcb4A1EFa46b8F2D97C310C9c4790ba5ffA8"
})

export const stETH = defineAddresses({
    [SupportedChain.Ethereum]: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
    [SupportedChain.Optimism]: "0x76A50b8c7349cCDDb7578c6627e79b5d99D24138"
})

export const ezETH = defineAddresses({
    [SupportedChain.Ethereum]: "0xbf5495efe5db9ce00f80364c8b423567e58d2110",
    [SupportedChain.Base]: "0x2416092f143378750bb29b79ed961ab195cceea5",
    [SupportedChain.Arbitrum]: "0x2416092f143378750bb29b79eD961ab195CcEea5",
    [SupportedChain.Bsc]: "0x2416092f143378750bb29b79ed961ab195cceea5"
})

export const rsETH = defineAddresses({
    [SupportedChain.Ethereum]: "0xa1290d69c65a6fe4df752f95823fae25cb99e5a7",
    [SupportedChain.Optimism]: "0x4186BFC76E2E237523CBC30FD220FE055156b41F",
    [SupportedChain.Arbitrum]: "0x4186BFC76E2E237523CBC30FD220FE055156b41F"
})

export const weETH = defineAddresses({
    [SupportedChain.Ethereum]: "0xcd5fe23c85820f7b72d0926fc9b05b43e359b7ee",
    [SupportedChain.Base]: "0x04c0599ae5a44757c0af6f9ec3b93da8976c150a",
    [SupportedChain.Optimism]: "0x5A7fACB970D094B6C7FF1df0eA68D99E6e73CBFF",
    [SupportedChain.Arbitrum]: "0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe"
})

export const DAI = defineAddresses({
    [SupportedChain.Ethereum]: "0x6b175474e89094c44da98b954eedeac495271d0f",
    [SupportedChain.Base]: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    [SupportedChain.Sepolia]: "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",
    [SupportedChain.Gnosis]: "0x44fA8E6f47987339850636F88629646662444217",
    [SupportedChain.Optimism]: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    [SupportedChain.Arbitrum]: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    [SupportedChain.Polygon]: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    [SupportedChain.Bsc]: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3"
})

export const TUSD = defineAddresses({
    [SupportedChain.Ethereum]: "0x0000000000085d4780b73119b644ae5ecd22b376",
    [SupportedChain.Arbitrum]: "0x4D15a3A2286D883AF0AA1B3f21367843FAc63E07",
    [SupportedChain.Polygon]: "0x2e1ad108ff1d8c782fcbbb89aad783ac49586756",
    [SupportedChain.Bsc]: "0x40af3827f39d0eacbf4a168f8d4ee67c121d11c9"
})

export const USDC = defineAddresses({
    [SupportedChain.Ethereum]: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    [SupportedChain.Base]: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    [SupportedChain.Sepolia]: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
    [SupportedChain.Gnosis]: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
    // TODO is this correct address on optimism? there are multiple USDC
    [SupportedChain.Optimism]: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
    [SupportedChain.Arbitrum]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    [SupportedChain.Polygon]: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
    [SupportedChain.Bsc]: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
})

export const USDT = defineAddresses({
    [SupportedChain.Ethereum]: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    [SupportedChain.Base]: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
    [SupportedChain.Gnosis]: "0x4ECaBa5870353805a9F068101A40E0f32ed605C6",
    [SupportedChain.Optimism]: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    [SupportedChain.Arbitrum]: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    [SupportedChain.Polygon]: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    [SupportedChain.Bsc]: "0x524bc91dc82d6b90ef29f76a3ecaabafffd490bc"
})

export const tBTC = defineAddresses({
    [SupportedChain.Ethereum]: "0x18084fba666a33d37592fa2633fd49a74dd93a88",
    [SupportedChain.Base]: "0x236aa50979d5f3de3bd1eeb40e81137f22ab794b",
    [SupportedChain.Optimism]: "0x6c84a8f1c29108F47a79964b5Fe888D4f4D0dE40",
    [SupportedChain.Arbitrum]: "0x6c84a8f1c29108f47a79964b5fe888d4f4d0de40"
})

export const wstETH = defineAddresses({
    [SupportedChain.Ethereum]: "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0",
    [SupportedChain.Base]: "0xc1cba3fcea344f92d9239c08c0568f6f2f0ee452",
    [SupportedChain.Optimism]: "0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb",
    [SupportedChain.Arbitrum]: "0x5979D7b546E38E414F7E9822514be443A4800529",
    [SupportedChain.Polygon]: "0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
    [SupportedChain.Bsc]: "0x26c5e01524d2E6280A48F2c50fF6De7e52E9611C"
})

export const USD0 = defineAddresses({
    [SupportedChain.Ethereum]: "0x73a15fed60bf67631dc6cd7bc5b6e8da8190acf5"
})

export const USDe = defineAddresses({
    [SupportedChain.Ethereum]: "0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
    [SupportedChain.Base]: "0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34",
    [SupportedChain.Optimism]: "0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34",
    [SupportedChain.Arbitrum]: "0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34",
    [SupportedChain.Bsc]: "0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34"
})

export const WETH = defineAddresses({
    [SupportedChain.Ethereum]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    [SupportedChain.Base]: "0x4200000000000000000000000000000000000006",
    [SupportedChain.Sepolia]: "0x7b79995e5f793a07bc00c21412e50ecae098e7f9",
    [SupportedChain.Gnosis]: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
    [SupportedChain.Optimism]: "0x4200000000000000000000000000000000000006",
    [SupportedChain.Arbitrum]: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    [SupportedChain.Polygon]: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    [SupportedChain.Bsc]: "0x4db5a66e937a9f4473fa95b1caf1d1e1d62e29ea"
})

export const sUSDe = defineAddresses({
    [SupportedChain.Ethereum]: "0x9d39a5de30e57443bff2a8307a4256c8797a3497",
    [SupportedChain.Base]: "0x211cc4dd073734da055fbf44a2b4667d5e5fe5d2",
    [SupportedChain.Optimism]: "0x211cc4dd073734da055fbf44a2b4667d5e5fe5d2",
    [SupportedChain.Arbitrum]: "0x211cc4dd073734da055fbf44a2b4667d5e5fe5d2"
})

export const PYUSD = defineAddresses({
    [SupportedChain.Ethereum]: "0x6c3ea9036406852006290770bedfcaba0e23a0e8"
})

export const EURc = defineAddresses({
    [SupportedChain.Base]: "0x60a3e35cc302bfa44cb288bc5a4f316fdb1adb42"
})

export const GHO = defineAddresses({
    [SupportedChain.Base]: "0x6bb7a212910682dcfdbd5bcbb3e28fb4e8da10ee",
    [SupportedChain.Arbitrum]: "0x7dfF72693f6A4149b17e7C6314655f6A9F7c8B33"
})

export const USDS = defineAddresses({
    [SupportedChain.Base]: "0x820c137fa70c8691f0e44dc420a5e53c168921dc"
})

export const cbBTC = defineAddresses({
    [SupportedChain.Ethereum]: "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf",
    [SupportedChain.Base]: "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf"
})

export const GNO = defineAddresses({
    [SupportedChain.Gnosis]: "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb"
})

export const WLD = defineAddresses({
    [SupportedChain.Optimism]: "0xdc6ff44d5d932cbd77b52e5612ba0529dc6226f1"
})

export const USDD = defineAddresses({
    [SupportedChain.Arbitrum]: "0x680447595e8b7b3Aa1B43beB9f6098C79ac2Ab3f"
})

export const GHST = defineAddresses({
    [SupportedChain.Polygon]: "0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7"
})

export const FDUSD = defineAddresses({
    [SupportedChain.Bsc]: "0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409"
})
