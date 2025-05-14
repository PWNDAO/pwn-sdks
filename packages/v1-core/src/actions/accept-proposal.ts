import type { AddressString } from "@pwndao/sdk-core";
import type { IProposalElasticContract } from "../contracts/elastic-proposal-contract.js";
import type { IProposalChainLinkContract } from "../contracts/index.js";
import type { ProposalWithSignature } from "../models/strategies/types.js";

import invariant from "ts-invariant";

export type AcceptProposalRequest = {
	proposalToAccept: ProposalWithSignature;
	acceptor: AddressString;
	creditAmount: bigint;
};

export interface AcceptProposalDeps {
	proposalContract: {
		acceptProposal:
			| IProposalElasticContract["acceptProposal"]
			| IProposalChainLinkContract["acceptProposal"];
		acceptProposals:
			| IProposalElasticContract["acceptProposals"]
			| IProposalChainLinkContract["acceptProposals"];
	};
}

export const acceptProposal = async (
	proposals: AcceptProposalRequest[],
	deps: AcceptProposalDeps,
) => {
	if (proposals.length === 1) {
		const { proposalToAccept, acceptor, creditAmount } = proposals[0];
		invariant(creditAmount > 0, "Credit amount must be greater than zero");

		await deps.proposalContract.acceptProposal(
			proposalToAccept,
			acceptor,
			creditAmount,
		);
	}

	await deps.proposalContract.acceptProposals(
		proposals.map(({ proposalToAccept, acceptor, creditAmount }) => ({
			proposal: proposalToAccept,
			acceptor,
			creditAmount,
		})),
	);
};
