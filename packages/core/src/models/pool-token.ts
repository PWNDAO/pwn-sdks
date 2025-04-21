import type { SupportedChain } from "../chains.js";
import type { AddressString } from "../types.js";
import { ERC20Token } from "./token.js";

export enum SupportedProtocol {
	AAVE = "aave",
	MORPHO = "morpho",
	Compound = "compound",
	Euler = "euler",
}

export class PoolToken extends ERC20Token {
	_underlyingToken: ERC20Token;

	constructor(
		chainId: SupportedChain,
		p_address: AddressString,
		public underlyingAddress: AddressString,
		decimals: number,
		public protocol: SupportedProtocol,
		name?: string,
		symbol?: string,
	) {
		super(chainId, p_address, decimals, name, symbol);

		this._underlyingToken = new ERC20Token(chainId, underlyingAddress, decimals, name, symbol);
	}

	
}
