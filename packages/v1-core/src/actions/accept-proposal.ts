import type { AddressString } from "@pwndao/sdk-core";
import invariant from "ts-invariant";
import type { IProposalElasticContract } from "../contracts/elastic-proposal-contract.js";
import type { IProposalChainLinkContract } from "../contracts/index.js";
import type { ProposalWithSignature } from "../models/strategies/types.js";

export type AcceptProposalRequest = {
	proposalToAccept: ProposalWithSignature;
	acceptor: AddressString;
	creditAmount: bigint;
};

export interface AcceptProposalDeps {
	proposalContract: {
		acceptProposals:
			| IProposalElasticContract["acceptProposals"]
			| IProposalChainLinkContract["acceptProposals"];
	};
}

export const acceptProposal = async (
	proposals: AcceptProposalRequest[],
	deps: AcceptProposalDeps,
) => {
	invariant(proposals.length > 0, "Proposals must be provided");

	for (const proposal of proposals) {
		invariant(proposal.creditAmount > 0n, "Credit amount must be greater than zero");
	}

	const chainIds = Array.from(
		new Set(proposals.map(({ proposalToAccept }) => proposalToAccept.chainId)),
	);

	invariant(chainIds.length === 1, "All proposals must be on the same chain");

	await deps.proposalContract.acceptProposals(
		proposals.map(({ proposalToAccept, acceptor, creditAmount }) => ({
			proposal: proposalToAccept,
			acceptor,
			creditAmount,
			proposalContract: deps.proposalContract,
		})),
	);
};
