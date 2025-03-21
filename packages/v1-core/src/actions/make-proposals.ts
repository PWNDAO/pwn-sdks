import type { Hex, SupportedChain } from "@pwndao/sdk-core";
import type { ProposalWithHash, ProposalWithSignature } from "src/models/strategies/types.js";
import invariant from "ts-invariant";
import {
	type ElasticProposalDeps,
	createElasticProposalBatch,
} from "../factories/create-elastic-proposal.js";
import { ProposalType } from "../models/proposals/proposal-base.js";
import { createChainLinkElasticProposalBatch } from "../factories/create-chain-link-proposal.js";
import type { ChainLinkElasticProposalDeps } from "../factories/create-chain-link-proposal.js";
import type { ElasticProposal } from "src/models/proposals/elastic-proposal.js";
import type { ChainLinkProposal } from "src/models/proposals/chainlink-proposal.js";

const proposalTypes = {
	[ProposalType.Elastic]: createElasticProposalBatch,
	[ProposalType.ChainLink]: createChainLinkElasticProposalBatch,
	[ProposalType.DutchAuction]: () => {
		throw new Error("Not implemented");
	},
	[ProposalType.Simple]: () => {
		throw new Error("Not implemented");
	},
};

type ImplementedProposalTypes = {
	[K in ProposalType]: typeof proposalTypes[K] extends () => never ? never : K
  }[ProposalType];

export const makeProposals = async <T extends ImplementedProposalTypes>(
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

	let proposalsWithSignature: ProposalWithSignature[] = [];

	let proposals: ElasticProposal[] | ChainLinkProposal[] = [];
	let proposalHashes: Hex[] = [];

	switch (proposalType) {
		case ProposalType.Elastic: {
			const elasticDeps = deps as ElasticProposalDeps;
			proposals = await createElasticProposalBatch(
				proposalParams,
				elasticDeps,
			);
	
			proposalHashes = await Promise.all(
				proposals.map((proposal) => elasticDeps.contract.getProposalHash(proposal)),
			);
			break;
		}
		case ProposalType.ChainLink: {
			const chainLinkDeps = deps as ChainLinkElasticProposalDeps;
			proposals = await createChainLinkElasticProposalBatch(
				proposalParams,
				chainLinkDeps,
			);
			
			proposalHashes = await Promise.all(
				proposals.map((proposal) => chainLinkDeps.contract.getProposalHash(proposal)),
			);
			break;
		}
		default: {
			throw new Error(`Not implemented for proposal type ${proposalType}`);
		}
	}

	const proposalWithHash = proposals.map((proposal, index) => ({
		...proposal,
		hash: proposalHashes[index],
	})) as ProposalWithHash[];

	proposalsWithSignature = await deps.contract.createMultiProposal(proposalWithHash);

	const usedNonces = proposalParams.terms.user.getUsedNonces();

	for (const chain in usedNonces) {
		const _chain = Number(chain) as SupportedChain;
		if (!usedNonces[_chain]) continue;

		await deps.api.updateNonces(
			proposalParams.terms.user.address,
			_chain,
			usedNonces[_chain],
		);
	}

	await deps.api.persistProposals(proposalsWithSignature);

	return proposalsWithSignature;
};
