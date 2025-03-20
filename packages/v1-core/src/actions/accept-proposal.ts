import { AddressString, ERC20Token } from "@pwndao/sdk-core";
import { ProposalWithSignature } from "src/models/strategies/types.js";
import { IProposalElasticContract } from "src/factories/create-elastic-proposal.js";

type AcceptProposalRequest = {
    proposalToAccept: ProposalWithSignature,
    acceptor: AddressString,
    creditAsset: ERC20Token,
    creditAmount: bigint
}

interface AcceptProposalDeps {
    proposalContract: IProposalElasticContract
}

export const acceptProposal = async (
    {
        proposalToAccept,
        acceptor,
        creditAmount,
    }: AcceptProposalRequest,
    deps: AcceptProposalDeps
) => {
    await deps.proposalContract.acceptProposal(
        proposalToAccept,
        acceptor,
        creditAmount
    )
}