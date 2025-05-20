import type { AddressString, ERC20TokenLike } from "@pwndao/sdk-core";
import invariant from "ts-invariant";

import type { IProposalContract } from "../factories/helpers.js";
import type { ChainLinkProposal } from "../models/proposals/chainlink-proposal.js";
import type { ElasticProposal } from "../models/proposals/elastic-proposal.js";
import type { ProposalWithSignature } from "../models/strategies/types.js";

export type AcceptProposalRequest = {
	proposalToAccept: ProposalWithSignature;
	acceptor: AddressString;
	creditAmount: bigint;
	creditAsset: ERC20TokenLike;
};

export interface AcceptProposalDeps {
	proposalContract: Pick<
		IProposalContract<ElasticProposal | ChainLinkProposal>,
		"acceptProposals" | "encodeProposalData"
	>;
}

/**
 * Accepts multiple loan proposals in a single transaction
 *
 * @param proposals - Array of proposal requests containing:
 *   - proposalToAccept: The signed proposal to accept
 *   - acceptor: Address of the account accepting the proposal
 *   - creditAmount: Amount of credit being accepted
 *   - creditAsset: The ERC20 token being used for credit. In case of pool hook it's the pool token.
 * @param deps - Dependencies containing the proposal contract with acceptProposals method
 *
 * @throws {Error} If:
 *   - No proposals are provided
 *   - Any proposal has credit amount <= 0
 *   - Proposals are from different chains
 *
 * @returns Promise that resolves when all proposals are accepted
 */
export const acceptProposals = async (
	proposals: AcceptProposalRequest[],
	deps: AcceptProposalDeps,
) => {
	invariant(proposals.length > 0, "Proposals must be provided");

	const chainIds = new Set();
	for (const proposal of proposals) {
		invariant(
			proposal.creditAmount > 0n,
			"Credit amount must be greater than zero",
		);
		chainIds.add(proposal.proposalToAccept.chainId);
	}

	invariant(chainIds.size === 1, "All proposals must be on the same chain");

	await deps.proposalContract.acceptProposals(proposals);
};
