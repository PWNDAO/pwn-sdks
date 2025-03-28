import { CHAIN_TO_ADDRESSES_MAP } from "./addresses.js";
import { SupportedChain } from "./chains.js";
import { Token } from "./models/types.js";

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

export const typeSafeObjectKeys = <const T extends object>(obj: T) => {
	return Object.keys(obj) as Array<keyof T>
}

export const getUniqueCreditCollateralKey = (credit: Pick<Token, 'address' | 'chainId'>, collateral: Pick<Token, 'address' | 'chainId'>) => {
	return `${collateral.address}/${collateral.chainId}-${credit.address}/${credit.chainId}`
}
