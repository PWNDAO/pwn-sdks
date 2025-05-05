import { CHAIN_TO_ADDRESSES_MAP } from "./addresses.js";
import { SupportedChain } from "./chains.js";
import type { PoolToken } from "./models/pool-token.js";
import { isPoolToken } from "./models/types.js";
import type { Token } from "./models/types.js";

export const getLoanContractAddress = (chainId: SupportedChain) => {
	return CHAIN_TO_ADDRESSES_MAP[chainId].pwnSimpleLoan;
};

export const getPwnSimpleLoanAddress = (
	chainId: SupportedChain,
) => {
	return CHAIN_TO_ADDRESSES_MAP[chainId].pwnSimpleLoan;
};

export const getElasticProposalContractAddress = (chainId: SupportedChain) => {
	if (
		chainId === SupportedChain.StarknetSepolia ||
		chainId === SupportedChain.StarknetMainnet
	) {
		throw new Error("Elastic proposal contract not deployed on Starknet");
	}

	return CHAIN_TO_ADDRESSES_MAP[chainId].pwnSimpleLoanElasticProposal;
};

export const getRevokedNonceContractAddress = (chainId: SupportedChain) => {
	return CHAIN_TO_ADDRESSES_MAP[chainId].pwnRevokedNonce;
};

export const getChainLinkProposalContractAddress = (
	chainId: SupportedChain,
) => {
	if (
		chainId === SupportedChain.StarknetSepolia ||
		chainId === SupportedChain.StarknetMainnet
	) {
		throw new Error("Chainlink proposal contract not deployed on Starknet");
	}

	return CHAIN_TO_ADDRESSES_MAP[chainId].pwnSimpleLoanElasticChainlinkProposal;
};

export const getUniswapV3LpSetProposalContractAddress = (
	chainId: SupportedChain,
) => {
	if (chainId === SupportedChain.Sepolia) {
		return CHAIN_TO_ADDRESSES_MAP[chainId].pwnSimpleLoanUniswapV3LpSetProposal;
	}

	throw new Error(`UniswapV3LpSetProposalContractAddress not deployed on chain ${chainId}`);
};

export const getUniswapV3IndividualProposalContractAddress = (
	chainId: SupportedChain,
) => {
	if (chainId === SupportedChain.Sepolia) {
		return CHAIN_TO_ADDRESSES_MAP[chainId].pwnSimpleLoanUniswapV3IndividualProposal;
	}

	throw new Error(`UniswapV3IndividualProposalContractAddress not deployed on chain ${chainId}`);
};

export const typeSafeObjectKeys = <const T extends object>(obj: T) => {
	return Object.keys(obj) as Array<keyof T>
}


export const getUniqueCreditCollateralKey = (
	credit: Pick<Token, 'address' | 'chainId'> | Pick<PoolToken, 'address' | 'chainId'>, 
	collateral: Pick<Token, 'address' | 'chainId'>
) => {
	const creditAddress = isPoolToken(credit) ? credit.underlyingAddress : credit.address;
	return `${collateral.address}/${collateral.chainId}-${creditAddress}/${credit.chainId}`
}
