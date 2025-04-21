import { SupportedChain } from "./chains.js";
import type { V1_2_SUPPORTED_CHAINS, V1_3_SUPPORTED_CHAINS } from "./chains.js";
import { ZERO_ADDRESS } from "./constants.js";
import type { AddressString } from "./types.js";

type ContractAddresses = {
	pwnConfig: AddressString;
	pwnLoan: AddressString;
	pwnRevokedNonce: AddressString;
	pwnSimpleLoan: AddressString;

	pwnSimpleLoanSimpleProposal: AddressString;
	pwnSimpleLoanListProposal: AddressString;
	pwnSimpleLoanDutchAuctionProposal: AddressString;

	// utils
	tokenBundlerContract: AddressString;
};

export type V1_3_Contracts = ContractAddresses & {
	pwnSimpleLoanElasticProposal: AddressString;
	pwnSimpleLoanElasticChainlinkProposal: AddressString;
	utilizedCredit: AddressString;
};

// starknet has no tokenBundlerContract by now
export type V1_2_StarknetContracts = Omit<
	ContractAddresses,
	"tokenBundlerContract"
> & {
	pwnSimpleLoanFungibleProposal: AddressString;
};

export const PWN_V1_2_STARKNET_CONTRACTS: V1_2_StarknetContracts = {
	pwnSimpleLoan:
		"0x0679eae6cdd4c2e7266f9c20452bf02a8d26f52a6b9bd930339ccde97a8d9579",
	pwnSimpleLoanSimpleProposal:
		"0x0399f68e50fce201a11c11575ef45edc5449dcc295fd131f47f0367dc05604ae",
	pwnSimpleLoanListProposal:
		"0x06405b987104906b4adcf3188ddcb9205cae778d3600cc47766cf0451ed7c7db",
	pwnSimpleLoanDutchAuctionProposal:
		"0x0369500a7d2c0ef339e2d575290cc14308e0ce27dd1be93d2da872697127a082",
	pwnSimpleLoanFungibleProposal:
		"0x050c97a3d6ead0f7998ef29e1bbd85d3662abd152016406ee1cb2d37d156fdb5",
	pwnConfig:
		"0x03e5d8f5233e819857a1563780bcbeb4c7eee82bcb88a6c1df1ca4f5af3e8b28",
	pwnLoan: "0x06d3fe7506cd04cd8788fa99c580e02c11abe8f65a9e861512d5716bbe20c742",
	pwnRevokedNonce:
		"0x00da94e7963078f0ad46b431e6d518c0bdb7415c54732d812bcf62c3a36dacf2",
};

/**
 * ChainLink contracts are different for each chain
 * https://github.com/PWNDAO/pwn_protocol/tree/318e5f19eda4e9d1616a9c3d975a84c5dfd768cf?tab=readme-ov-file#elastic-chainlink-proposal
 */
export const PWN_V1_3_CONTRACTS: Omit<V1_3_Contracts, "tokenBundlerContract" | "pwnSimpleLoanElasticChainlinkProposal"> =
	{
		utilizedCredit: "0x8E6F44DEa3c11d69C63655BDEcbA25Fa986BCE9D",
		pwnSimpleLoan: "0x719A69d0dc67bd3Aa7648D4694081B3c87952797",
		pwnSimpleLoanSimpleProposal: "0xe624E7D33baC728bE2bdB606Da0018B6E05A84D9",
		pwnSimpleLoanListProposal: "0x7160Ec33788Df9AFb8AAEe777e7Ae21151B51eDd",
		pwnSimpleLoanElasticProposal: "0xeC6390D4B22FFfD22E5C5FDB56DaF653C3Cd0626",
		pwnSimpleLoanDutchAuctionProposal:
			"0x1b1394F436cAeaE139131E9bca6f5d5A2A7e1369",
		pwnConfig: "0xd52a2898d61636bB3eEF0d145f05352FF543bdCC",
		pwnLoan: "0x4440C069272cC34b80C7B11bEE657D0349Ba9C23",
		pwnRevokedNonce: "0x972204fF33348ee6889B2d0A3967dB67d7b08e4c",
	};

// Mainnet contracts
const MAINNET_CONTRACTS: V1_3_Contracts = {
	...PWN_V1_3_CONTRACTS,
	tokenBundlerContract: "0x19e3293196aee99BB3080f28B9D3b4ea7F232b8d",
	pwnSimpleLoanElasticChainlinkProposal:
		"0xBA58E16BE93dAdcBB74a194bDfD9E5933b24016B",
};

// Arbitrum contracts
const ARBITRUM_CONTRACTS: V1_3_Contracts = {
	...PWN_V1_3_CONTRACTS,
	tokenBundlerContract: "0x448E3D0a4BAa00FE511a03E7B27177AeDE6d9636",
	pwnSimpleLoanElasticChainlinkProposal: "0xc566994F7c9D65C58a8f0C16F91b00Da6aE32BB6"
};

// Optimism contracts
const OPTIMISM_CONTRACTS: V1_3_Contracts = {
	...PWN_V1_3_CONTRACTS,
	tokenBundlerContract: "0x43Ffd9dF079451Fe7D16Ac2c51E13DF2a173B71E",
	pwnSimpleLoanElasticChainlinkProposal: "0xC267A16836D475561b37e7166ABeB92d876C8A3c"
};

// Base contracts
const BASE_CONTRACTS: V1_3_Contracts = {
	...PWN_V1_3_CONTRACTS,
	tokenBundlerContract: "0x6fD3f5439aB1C103599385929d5f4c19acdBd264",
	pwnSimpleLoanElasticChainlinkProposal: "0xB6E4B8Ba8E26ac8d4979a8227DAda26bD3Ac9A10",
};

// Polygon contracts
const POLYGON_CONTRACTS: V1_3_Contracts = {
	...PWN_V1_3_CONTRACTS,
	tokenBundlerContract: "0xe52405604bf644349f57b36ca6e85cf095fab8da",
	pwnSimpleLoanElasticChainlinkProposal: "0x5A8164910e995781C154fb092653752cE6BCDCA7",
};

// Gnosis contracts
const GNOSIS_CONTRACTS: V1_3_Contracts = {
	...PWN_V1_3_CONTRACTS,
	tokenBundlerContract: "0x431131622e088Fb0F9828Ca05b62210fc9eDcC04",
	pwnSimpleLoanElasticChainlinkProposal: "0x1719591db6AD58643aD4804eF8C2f2E51768C30E",
};

// Worldchain contracts
const WORLDCHAIN_CONTRACTS: V1_3_Contracts = {
	...PWN_V1_3_CONTRACTS,
	tokenBundlerContract: "0xc0aCA216Aa936511b24Ff238F610B02bE54e10AD",
	pwnSimpleLoanElasticChainlinkProposal: ZERO_ADDRESS, // not deployed
};

// BSC contracts
const BSC_CONTRACTS: V1_3_Contracts = {
	...PWN_V1_3_CONTRACTS,
	tokenBundlerContract: "0x4A75a527E97d853109aA6998a2B9E45a87A31e9f",
	pwnSimpleLoanElasticChainlinkProposal: "0x79E1D066131C93610475C9AAEe3De861A8Cd2B71",
};

const CRONOS_CONTRACTS: V1_3_Contracts = {
	...PWN_V1_3_CONTRACTS,
	tokenBundlerContract: "0x973E09e96E64E4bf17e383a8A497Fb566284c707",
	pwnSimpleLoanElasticChainlinkProposal: ZERO_ADDRESS, // not deployed
};

const UNICHAIN_CONSTANTS: V1_3_Contracts = {
	...PWN_V1_3_CONTRACTS,
	tokenBundlerContract: "0x354869495Fd916ADAFc0626C3d60115240dc06f1",
	pwnSimpleLoanElasticChainlinkProposal: ZERO_ADDRESS, // not deployed
};

// Sepolia contracts
const SEPOLIA_CONTRACTS: V1_3_Contracts = {
	...PWN_V1_3_CONTRACTS,
	tokenBundlerContract: "0x448E3D0a4BAa0A0FE511a03E7B27177AeDE6d9636",
	pwnSimpleLoanElasticChainlinkProposal: "0xC46170F43b97faE1A8B507d6fdDaFfBb7527D61B",
};

// Unichain Sepolia contracts
const UNICHAIN_SEPOLIA_CONTRACTS: V1_3_Contracts = {
	...PWN_V1_3_CONTRACTS,
	tokenBundlerContract: "0x1381F509f56f2aaA0faBD3012455901eA53F0BbD",
	pwnSimpleLoanElasticChainlinkProposal: ZERO_ADDRESS, // not deployed
};

const STARKNET_CONTRACTS: V1_2_StarknetContracts = {
	...PWN_V1_2_STARKNET_CONTRACTS,
};

export const V1_2_CHAIN_TO_ADDRESSES_MAP: Record<
	V1_2_SUPPORTED_CHAINS,
	V1_2_StarknetContracts
> = {
	[SupportedChain.StarknetMainnet]: STARKNET_CONTRACTS,
	[SupportedChain.StarknetSepolia]: STARKNET_CONTRACTS,
};

export const V1_3_CHAIN_TO_ADDRESSES_MAP: Record<
	V1_3_SUPPORTED_CHAINS,
	V1_3_Contracts
> = {
	[SupportedChain.Ethereum]: MAINNET_CONTRACTS,
	[SupportedChain.Optimism]: OPTIMISM_CONTRACTS,
	[SupportedChain.Unichain]: UNICHAIN_CONSTANTS,
	[SupportedChain.Base]: BASE_CONTRACTS,
	[SupportedChain.Arbitrum]: ARBITRUM_CONTRACTS,
	[SupportedChain.Polygon]: POLYGON_CONTRACTS,
	[SupportedChain.Gnosis]: GNOSIS_CONTRACTS,
	[SupportedChain.World]: WORLDCHAIN_CONTRACTS,
	[SupportedChain.Bsc]: BSC_CONTRACTS,
	[SupportedChain.Cronos]: CRONOS_CONTRACTS,

	[SupportedChain.Sepolia]: SEPOLIA_CONTRACTS,
	[SupportedChain.UnichainSepolia]: UNICHAIN_SEPOLIA_CONTRACTS,
};

export const CHAIN_TO_ADDRESSES_MAP = {
	...V1_2_CHAIN_TO_ADDRESSES_MAP,
	...V1_3_CHAIN_TO_ADDRESSES_MAP,
};
