import type { AddressString } from "@pwndao/sdk-core";
import type { ProposalWithSignature } from "src/models/strategies/types.js";
import type { IProposalElasticContract } from "src/factories/create-elastic-proposal.js";
import invariant from "ts-invariant";

type AcceptProposalRequest = {
    proposalToAccept: ProposalWithSignature,
    acceptor: AddressString,
    creditAmount: bigint
}

interface AcceptProposalDeps {
    proposalContract: {
        acceptProposal: IProposalElasticContract['acceptProposal']
    }
}

export const acceptProposal = async (
    {
        proposalToAccept,
        acceptor,
        creditAmount,
    }: AcceptProposalRequest,
    deps: AcceptProposalDeps
) => {
    invariant(creditAmount > 0, "Credit amount must be greater than zero.")
    
    await deps.proposalContract.acceptProposal(
        proposalToAccept,
        acceptor,
        creditAmount
    )
}