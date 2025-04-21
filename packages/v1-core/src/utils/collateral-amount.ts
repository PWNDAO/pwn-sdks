import type { ChainLinkProposalContract, ElasticProposalContract } from "../contracts/index.js";
import { ProposalType } from "../models/proposals/proposal-base.js"
import type { Proposal } from "../models/strategies/types.js"
import invariant from "ts-invariant";

type CommonProposalParams = Pick<Proposal, 'chainId' | 'type' | 'availableCreditLimit'>

type ElasticProposalSpecificParams = CommonProposalParams & Pick<Extract<Proposal, { type: ProposalType.Elastic }>, 
    'creditPerCollateralUnit'
>

type ChainLinkProposalSpecificParams = CommonProposalParams & Pick<Extract<Proposal, { type: ProposalType.ChainLink }>, 
    'creditAddress' | 'collateralAddress' | 'feedIntermediaryDenominations' | 'feedInvertFlags' | 'loanToValue'
>

export type IProposalSpecificParams = ElasticProposalSpecificParams | ChainLinkProposalSpecificParams

export const getCollateralAmount = async (contract: ElasticProposalContract | ChainLinkProposalContract, amount: bigint, proposalSpecificParams: IProposalSpecificParams) => {
    const proposal = {
        ...proposalSpecificParams,
        availableCreditLimit: amount,
    } as never;
    
    invariant([ProposalType.Elastic, ProposalType.ChainLink].includes(proposalSpecificParams.type), `Incompatible proposal type and contract combination: ${proposalSpecificParams.type}`)

    return await contract.getCollateralAmount(proposal)
}