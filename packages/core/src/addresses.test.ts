import { describe, expect, it, test } from "vitest";
import { CHAIN_TO_ADDRESSES_MAP } from "./addresses.js";
import { SupportedChain } from "./chains.js";
import type { V1_3_SUPPORTED_CHAINS } from "./chains.js";

describe("Addresses", () => {
	it("should be defined", () => {
		expect(CHAIN_TO_ADDRESSES_MAP).toBeDefined();
	});

	it("should correctly resolve v1.3 contracts", () => {
		expect(
			CHAIN_TO_ADDRESSES_MAP[SupportedChain.Ethereum].utilizedCredit,
		).toBeDefined();
	});

	it("should correctly resolve v1.2 contracts", () => {
		// specific for v1.2
		expect(
			CHAIN_TO_ADDRESSES_MAP[SupportedChain.StarknetSepolia]
				.pwnSimpleLoanFungibleProposal,
		).toBeDefined();
	});

	test.each([
		[SupportedChain.Ethereum, "0x19e3293196aee99BB3080f28B9D3b4ea7F232b8d"],
		[SupportedChain.Arbitrum, "0x448E3D0a4BAa00FE511a03E7B27177AeDE6d9636"],
		[SupportedChain.Optimism, "0x43Ffd9dF079451Fe7D16Ac2c51E13DF2a173B71E"],
		[SupportedChain.Base, "0x6fD3f5439aB1C103599385929d5f4c19acdBd264"],
		[SupportedChain.Polygon, "0xe52405604bf644349f57b36ca6e85cf095fab8da"],
		[SupportedChain.Gnosis, "0x431131622e088Fb0F9828Ca05b62210fc9eDcC04"],
		[SupportedChain.World, "0xc0aCA216Aa936511b24Ff238F610B02bE54e10AD"],
		[SupportedChain.Bsc, "0x4A75a527E97d853109aA6998a2B9E45a87A31e9f"],
		[SupportedChain.Cronos, "0x973E09e96E64E4bf17e383a8A497Fb566284c707"],
		[SupportedChain.Ink, "0x490040E1A2df842Cab527146a20534e23DcC46FF"],
		[SupportedChain.Linea, "0xbe13866797bbdE2646FFBb58F102FcA91EFC88F1"],
		[SupportedChain.Celo, "0xf2e389cEbA01db96e9bd63B5a9Fa47422dAeEb40"],
		[SupportedChain.Sepolia, "0x448E3D0a4BAa00FE511a03E7B27177AeDE6d9636"],
		[SupportedChain.Unichain, "0x354869495Fd916ADAFc0626C3d60115240dc06f1"],
		[SupportedChain.UnichainSepolia, "0x1381F509f56f2aaA0faBD3012455901eA53F0BbD"],
		// note: no starknet version of tokenBundlerContract
	])("should resolve correct bundler address for %s", (chain, expected) => {
		expect(
			CHAIN_TO_ADDRESSES_MAP[chain as V1_3_SUPPORTED_CHAINS]
				?.tokenBundlerContract,
		).toEqual(expected);
	});
});
