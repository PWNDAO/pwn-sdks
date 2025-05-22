import type { AddressString } from "src/types.js";
import type { SupportedChain } from "../chains.js";

export enum MultiTokenCategory {
	ERC20 = 0,
	ERC721 = 1,
	ERC1155 = 2,
	NATIVE = 3,
	ERC721_COLLECTION = 420,
	ERC1155_COLLECTION = 421,
	UNISWAP_V3_LP = 666,
}

interface IBaseAsset {
	decimals: number;
	chainId: number;
	address: AddressString;
	isNative: boolean;
	category: MultiTokenCategory;
	symbol?: string;
	name?: string;
}

export abstract class BaseAsset implements IBaseAsset {
	constructor(
		public chainId: SupportedChain,
		public address: AddressString,
		public decimals: number,
		public isNative: boolean,
		public category: MultiTokenCategory,
		public name?: string,
		public symbol?: string,
		public icon?: string,
	) {}
}
