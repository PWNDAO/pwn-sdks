import type { AddressString } from "src/types.js";
import { BaseAsset, MultiTokenCategory } from "./asset.js";
import type { SupportedChain } from "../chains.js";

export class UniswapV3Position extends BaseAsset {
	static category = MultiTokenCategory.UNISWAP_V3_LP;

    tokenA: AddressString;
    tokenB: AddressString;
    tokenId: string;
    
    constructor(
        chainId: SupportedChain,
        address: AddressString,
        decimals: number,
        tokenA: AddressString,
        tokenB: AddressString,
        tokenId: string,
        name?: string,
        symbol?: string,
        icon?: string,
    ) {
        super(chainId, address, decimals, false, UniswapV3Position.category, name, symbol, icon);
        this.tokenA = tokenA;
        this.tokenB = tokenB;
        this.tokenId = tokenId;
    }
}