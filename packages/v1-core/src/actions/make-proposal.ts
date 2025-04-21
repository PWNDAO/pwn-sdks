import type { UserWithNonceManager } from "@pwndao/sdk-core";
import type { ProposalWithSignature } from "src/models/strategies/types.js";
import invariant from "ts-invariant";
import { createChainLinkElasticProposal } from "../factories/create-chain-link-proposal.js";
import { createElasticProposal } from "../factories/create-elastic-proposal.js";
import { ProposalType } from "../models/proposals/proposal-base.js";

const proposalTypes = {
	[ProposalType.Elastic]: createElasticProposal,
	[ProposalType.ChainLink]: createChainLinkElasticProposal,
	[ProposalType.DutchAuction]: () => {
		throw new Error("Not implemented");
	},
	[ProposalType.Simple]: () => {
		throw new Error("Not implemented");
	},
};

export const makeProposal = async <T extends ProposalType>(
	user: UserWithNonceManager | undefined,
	proposalType: T,
	proposalParams: Parameters<(typeof proposalTypes)[T]>[0],
	deps: Parameters<(typeof proposalTypes)[T]>[1],
) => {
	invariant(
		proposalTypes[proposalType],
		`Proposal type ${proposalType} not found`,
	);
	invariant(proposalParams, "Proposal params are required");
	invariant(deps, "Deps are required");
	invariant(user, "User is required");

	const userNoncesForProposals = user.nonces[proposalParams.credit.chainId];
	invariant(
		userNoncesForProposals,
		`User nonces for proposals are required for chain ${proposalParams.credit.chainId}`,
	);

	let proposalWithSignature: ProposalWithSignature | null = null;

	switch (proposalType) {
		case ProposalType.Elastic: {
			const elasticParams = proposalParams as Parameters<
				typeof createElasticProposal
			>[0];
			const elasticDeps = deps as Parameters<typeof createElasticProposal>[1];
			const proposal = await createElasticProposal(
				elasticParams,
				elasticDeps,
				user,
			);
			proposalWithSignature = await elasticDeps.contract.createProposal(
				proposal,
			);
			break;
		}
		case ProposalType.ChainLink: {
			const chainLinkParams = proposalParams as Parameters<
				typeof createChainLinkElasticProposal
			>[0];
			const chainLinkDeps = deps as Parameters<
				typeof createChainLinkElasticProposal
			>[1];
			const proposal = await createChainLinkElasticProposal(
				chainLinkParams,
				chainLinkDeps,
				user,
			);
			proposalWithSignature = await chainLinkDeps.contract.createProposal(
				proposal,
				{
					persistProposal: chainLinkDeps.api.persistProposal,
				},
			);
			break;
		}
		case ProposalType.DutchAuction:
		case ProposalType.Simple:
			throw new Error(`Proposal type ${proposalType} not yet implemented`);
		default:
			throw new Error(`Unknown proposal type: ${proposalType}`);
	}

	return proposalWithSignature;
};
