import type { FungibleNFT, NFT } from "./nft.js";
import type { ERC20Token } from "./token.js";
import { PoolToken } from "./pool-token.js";
import type { SupportedChain } from "../chains.js";

export type Token = ERC20Token | NFT | FungibleNFT;
export type ERC20TokenLike = ERC20Token | PoolToken;

export type UniqueKey = `${ERC20TokenLike['address']}/${SupportedChain}`;

export const isPoolToken = (token: Partial<Token>): token is PoolToken => {
	return token instanceof PoolToken || "underlyingAddress" in token;
};
