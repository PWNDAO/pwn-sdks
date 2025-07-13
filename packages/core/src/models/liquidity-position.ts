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
        tokenA: AddressString,
        tokenB: AddressString,
        tokenId: string,
        icon?: string,
    ) {
        super(chainId, address, 0, false, UniswapV3Position.category, "Uniswap V3 Positions NFT-V1", "UNI-V3-POS", icon);
        this.tokenA = tokenA;
        this.tokenB = tokenB;
        this.tokenId = tokenId;
    }
}