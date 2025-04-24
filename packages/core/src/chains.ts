export enum SupportedChain {
	Ethereum = 1,
	Optimism = 10,
	Polygon = 137,
	Cronos = 25,
	Base = 8453,
	Arbitrum = 42161,
	Bsc = 56,
	Sepolia = 11155111,
	// Holesky = 17000,
	Unichain = 130,
	UnichainSepolia = 1301,
	Gnosis = 100,
	StarknetSepolia = 11155112,
	StarknetMainnet = 112211,
	World = 480,
	Linea = 59144,
	Celo = 42220,
	Ink = 57073,
}

export const ALL_SUPPORTED_CHAINS = Object.values(SupportedChain).filter(
	(v) => typeof v === "number",
) as SupportedChain[];

export const isChainSupported = (chain: SupportedChain): boolean => {
	return ALL_SUPPORTED_CHAINS.includes(Number(chain));
};

export const TESTNET_CHAINS = [
	SupportedChain.Sepolia,
	SupportedChain.UnichainSepolia,
	SupportedChain.StarknetSepolia,
];
export type V1_2_SUPPORTED_CHAINS =
	| SupportedChain.StarknetMainnet
	| SupportedChain.StarknetSepolia;
export type V1_3_SUPPORTED_CHAINS = Exclude<
	SupportedChain,
	V1_2_SUPPORTED_CHAINS
>;
