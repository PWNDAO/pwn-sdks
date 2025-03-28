import type { SupportedChain } from "@pwndao/sdk-core";
import type { ProposalWithHash } from "src/models/strategies/types.js";
import invariant from "ts-invariant";
import {
	type ElasticProposalDeps,
	createElasticProposal,
} from "../factories/create-elastic-proposal.js";
import { ProposalType } from "../models/proposals/proposal-base.js";
import { createChainLinkElasticProposal } from "../factories/create-chain-link-proposal.js";
import type { ChainLinkElasticProposalDeps } from "../factories/create-chain-link-proposal.js";
import { createMultiProposal } from "../contracts/multi-proposal.js";
import type { Config } from "@wagmi/core";

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

export type ImplementedProposalTypes = {
	[K in ProposalType]: typeof proposalTypes[K] extends () => never ? never : K
  }[ProposalType];

export type ProposalParamWithDeps<T extends ImplementedProposalTypes> = {
    type: T;
    params: NonNullable<Parameters<(typeof proposalTypes)[T]>[0]>;
    deps: NonNullable<Parameters<(typeof proposalTypes)[T]>[1]>;
};

export const makeProposals = async <T extends ImplementedProposalTypes>(
	config: Config,
	proposalParams: ProposalParamWithDeps<T>[]
) => {
	invariant(config, "Config is required");
	invariant(proposalParams?.length > 0, "Proposal params are required");

	const proposals: Array<ProposalWithHash> = [];

	for (const proposalParam of proposalParams) {
		switch (proposalParam.type) {
			case ProposalType.Elastic: {
				const elasticDeps = proposalParam.deps as ElasticProposalDeps;
				const filledProposal = await createElasticProposal(
					proposalParam.params,
					elasticDeps,
				);
				const proposalWithHash = {
					...filledProposal,
					hash: await elasticDeps.contract.getProposalHash(filledProposal),
				} as ProposalWithHash;
				proposals.push(proposalWithHash);
				break;
			}
			case ProposalType.ChainLink: {
				const chainLinkDeps = proposalParam.deps as ChainLinkElasticProposalDeps;
				const filledProposal = await createChainLinkElasticProposal(
					proposalParam.params,
					chainLinkDeps,
				);
				const proposalWithHash = {
					...filledProposal,
					hash: await chainLinkDeps.contract.getProposalHash(filledProposal),
				} as ProposalWithHash;
				proposals.push(proposalWithHash);
				break;
			}
			default: {
				throw new Error(`Not implemented for proposal type ${proposalParam.type}`);
			}
		}
	}

	const proposalsWithSignature = await createMultiProposal(config, proposals);

	const usedNonces = proposalParams[0].params.user.getUsedNonces();
	for (const chain in usedNonces) {
		const _chain = Number(chain) as SupportedChain;
		if (!usedNonces[_chain]) continue;

		await proposalParams[0].deps.api.updateNonces(
			proposalParams[0].params.user.address,
			_chain,
			usedNonces[_chain],
		);
	}

	await proposalParams[0].deps.api.persistProposals(proposalsWithSignature);

	return proposalsWithSignature;
};
