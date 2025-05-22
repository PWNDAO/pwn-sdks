import type { UserWithNonceManager } from "@pwndao/sdk-core";
import type { ProposalWithSignature } from "src/models/strategies/types.js";
import invariant from "ts-invariant";
import { createChainLinkElasticProposal } from "../factories/create-chain-link-proposal.js";
import { createElasticProposal } from "../factories/create-elastic-proposal.js";
import { ProposalType } from "../models/proposals/proposal-base.js";
import { createUniswapV3LpSetProposal } from "../factories/create-uniswap-v3-lp-set-proposal.js";
import { createUniswapV3LpIndividualProposal } from "../factories/create-uniswap-v3-lp-individual-proposal.js";

type ProposalTypeMap = {
    [ProposalType.Elastic]: typeof createElasticProposal;
    [ProposalType.ChainLink]: typeof createChainLinkElasticProposal;
    [ProposalType.DutchAuction]: () => void;
    [ProposalType.Simple]: () => void;
	[ProposalType.UniswapV3LpSet]: typeof createUniswapV3LpSetProposal;
	[ProposalType.UniswapV3Individual]: typeof createUniswapV3LpIndividualProposal;
};

const proposalTypes: ProposalTypeMap = {
	[ProposalType.Elastic]: createElasticProposal,
	[ProposalType.ChainLink]: createChainLinkElasticProposal,
	[ProposalType.DutchAuction]: () => {
		throw new Error("Not implemented");
	},
	[ProposalType.Simple]: () => {
		throw new Error("Not implemented");
	},
	[ProposalType.UniswapV3LpSet]: createUniswapV3LpSetProposal,
	[ProposalType.UniswapV3Individual]: createUniswapV3LpIndividualProposal,
};

export const makeProposal = async <T extends keyof ProposalTypeMap>(
	user: UserWithNonceManager | undefined,
	proposalType: T,
	proposalParams: Parameters<ProposalTypeMap[T]>[0],
	deps: Parameters<ProposalTypeMap[T]>[1],
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
				{
					persistProposal: elasticDeps.api.persistProposal,
				},
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
		case ProposalType.UniswapV3LpSet: {
			const uniswapV3LpSetParams = proposalParams as Parameters<
				typeof createUniswapV3LpSetProposal
			>[0];
			const uniswapV3LpSetDeps = deps as Parameters<typeof createUniswapV3LpSetProposal>[1];
			const proposal = await createUniswapV3LpSetProposal(uniswapV3LpSetParams, uniswapV3LpSetDeps, user);
			proposalWithSignature = await uniswapV3LpSetDeps.contract.createOnChainProposal(
				proposal,
			);
			break;
		}
		case ProposalType.UniswapV3Individual: {
			const uniswapV3IndividualParams = proposalParams as Parameters<
				typeof createUniswapV3LpIndividualProposal
			>[0];
			const uniswapV3IndividualDeps = deps as Parameters<typeof createUniswapV3LpIndividualProposal>[1];
			const proposal = await createUniswapV3LpIndividualProposal(uniswapV3IndividualParams, uniswapV3IndividualDeps, user);
			proposalWithSignature = await uniswapV3IndividualDeps.contract.createOnChainProposal(
				proposal,
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
