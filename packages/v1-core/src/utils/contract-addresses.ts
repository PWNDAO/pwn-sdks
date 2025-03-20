import { CHAIN_TO_ADDRESSES_MAP, SupportedChain, V1_2_StarknetContracts, V1_3_Contracts } from "@pwndao/sdk-core";
import { ProposalType } from "../models/proposals/proposal-base.js";

export const getProposalAddressByType = (
	proposalType: ProposalType,
	chainId: SupportedChain,
) => {

    if (chainId === SupportedChain.StarknetMainnet || chainId === SupportedChain.StarknetSepolia) {
        switch (proposalType) {
            case ProposalType.Elastic:
                return (CHAIN_TO_ADDRESSES_MAP[chainId] as V1_2_StarknetContracts).pwnSimpleLoanFungibleProposal;
            case ProposalType.ChainLink:
				throw new Error("Chainlink proposal contract not deployed on Starknet");
			default:
				throw new Error("Invalid proposal type");
		}
	}

	switch (proposalType) {
		case ProposalType.Elastic:
			return (CHAIN_TO_ADDRESSES_MAP[chainId] as V1_3_Contracts).pwnSimpleLoanElasticProposal;
		case ProposalType.ChainLink:
			return (CHAIN_TO_ADDRESSES_MAP[chainId] as V1_3_Contracts).pwnSimpleLoanElasticChainlinkProposal;
		default:
			throw new Error("Invalid proposal type");
	}

};
