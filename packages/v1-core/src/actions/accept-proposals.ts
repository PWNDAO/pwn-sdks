import type {
	AddressString,
	ERC20TokenLike,
	UniqueKey,
} from "@pwndao/sdk-core";
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
 * @param userAddress - Address of the user accepting the proposals.
 * @param totalToApprove - Object containing the total amount of tokens to approve for the loan contract.
 *   - [assetAddress/chainId]: {
 *     amount: bigint;
 *     asset: ERC20TokenLike;
 *     spender?: AddressString;
 *   }
 *
 * @param deps - Dependencies containing the proposal contract with acceptProposals method
 *
 * @throws {Error} If:
 *   - Any proposal has credit amount <= 0
 *   - Proposals are from different chains
 *   - Proposals are not provided and totalToApprove is empty
 *
 * @returns If atomic batching is enabled, the function will return a list of calls with approvals.
 * Otherwise, it will return a promise with all calls to execute.
 */
export const acceptProposals = async (
	proposals: AcceptProposalRequest[],
	userAddress: AddressString,
	deps: AcceptProposalDeps,
	totalToApprove: Partial<{
		[key in UniqueKey]: {
			amount: bigint;
			asset: ERC20TokenLike;
			/**
			 * In case of pool token, the spender is the pool hook address and must be provided
			 */
			spender?: AddressString;
		};
	}> = {},
) => {
	invariant(
		proposals.length > 0 || Object.keys(totalToApprove).length > 0,
		"Proposals must be provided",
	);

	const chainIds = new Set();
	for (const proposal of proposals) {
		invariant(
			proposal.creditAmount > 0n,
			"Credit amount must be greater than zero",
		);
		chainIds.add(proposal.proposalToAccept.chainId);
	}

	// chainId size 0 if no proposals are provided and only total to approve
	invariant(
		chainIds.size === 0 || chainIds.size === 1,
		"All proposals must be on the same chain",
	);

	return await deps.proposalContract.acceptProposals(
		proposals,
		totalToApprove as {
			[key in UniqueKey]: {
				amount: bigint;
				asset: ERC20TokenLike;
				spender?: AddressString;
			};
		},
	);
};
