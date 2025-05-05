import type { FungibleNFT, NFT } from "./nft.js";
import type { ERC20Token } from "./token.js";
import { PoolToken } from "./pool-token.js";
import type { UniswapV3Position } from "./liquidity-position.js";

export type Token = ERC20Token | NFT | FungibleNFT | UniswapV3Position;
export type ERC20TokenLike = ERC20Token | PoolToken;

export const isPoolToken = (token: Partial<Token>): token is PoolToken => {
	return token instanceof PoolToken || "underlyingAddress" in token;
};
