import { parseAbi } from "viem";

/**
 * Minimal ERC-20 ABI with only the methods needed for wallet asset fetching
 */
export const erc20Abi = parseAbi([
	// Read functions
	"function balanceOf(address owner) view returns (uint256)",
	"function name() view returns (string)",
	"function symbol() view returns (string)",
	"function decimals() view returns (uint8)",
	// Events
	"event Transfer(address indexed from, address indexed to, uint256 value)",
]);

/**
 * Minimal ERC-721 ABI with only the methods needed for wallet asset fetching
 */
export const erc721Abi = parseAbi([
	// Read functions
	"function balanceOf(address owner) view returns (uint256)",
	"function name() view returns (string)",
	"function symbol() view returns (string)",
	"function tokenURI(uint256 tokenId) view returns (string)",
	"function ownerOf(uint256 tokenId) view returns (address)",
	// Events
	"event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
]);
