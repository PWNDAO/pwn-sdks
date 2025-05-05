import { faker } from "@faker-js/faker";
import { SupportedChain } from "../chains.js";
import { ERC20Token } from "../models/token.js";
import { User, UserWithNonceManager } from "../models/user.js";
import type { AddressString } from "../types.js";
import { PoolToken } from "../models/pool-token.js";
import type { SupportedProtocol } from "../models/pool-token.js";
import { UniswapV3Position } from "../models/liquidity-position.js";

export const generateAddress = () => {
	return faker.finance.ethereumAddress() as AddressString;
};

/**
 * Creates user with nonces equal to 0 and 0.
 * @param address
 * @returns
 */
export const getMockUser = (address: AddressString) => {
	return new User(address);
};

/**
 * Creates user with nonces equal to 0 and 0 for all chains.
 * @param address
 * @param chains - null for ethereum mainnet only
 * @returns
 */
export const getMockUserWithNonceManager = (
	address: AddressString,
	chains: SupportedChain[] | null = null,
) => {
	const nonces: Partial<Record<SupportedChain, [bigint, bigint]>> = {};

	for (const chain of chains || [SupportedChain.Ethereum]) {
		nonces[chain] = [0n, 0n];
	}

	return new UserWithNonceManager(getMockUser(address), nonces);
};

/**
 * Creates a mock ERC20 token.
 * @param chain - default is ethereum mainnet
 * @param address - null for random address
 * @param decimals - default is 18
 * @param name - default is "Test Token"
 * @param symbol - default is "PWND"
 * @returns
 */
export const getMockToken = (
	chain: SupportedChain = SupportedChain.Ethereum,
	address: AddressString | null = null,
	decimals = 18,
	name = "PWND Test Token",
	symbol = "PWND",
) => {
	const defaultAddress = address ?? generateAddress();
	return new ERC20Token(chain, defaultAddress, decimals, name, symbol);
};

export const getMockPoolToken = (
	underlyingAddress: AddressString,
	protocol: SupportedProtocol,
	chain: SupportedChain = SupportedChain.Ethereum,
	address: AddressString | null = null,
	decimals = 18,
	name = "PWND Test Token",
	symbol = "PWND",
) => {
	const defaultAddress = address ?? generateAddress();
	return new PoolToken(chain, defaultAddress, underlyingAddress, decimals, protocol, name, symbol);
};

export const getMockLiquidityPoolToken = (
	chain: SupportedChain,
	tokenA: AddressString,
	tokenB: AddressString,
	tokenId: string,
) => {
	return new UniswapV3Position(chain, "0x1238536071E1c677A632429e3655c799b22cDA52", tokenA, tokenB, tokenId);
};