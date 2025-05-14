import { ProposalType } from "../models/proposals/proposal-base.js";
import { createElasticProposal } from "../factories/create-elastic-proposal.js";
import { createChainLinkElasticProposal } from "../factories/create-chain-link-proposal.js";
import { createUniswapV3LpSetProposal } from "../factories/create-uniswap-v3-lp-set-proposal.js";
import { createUniswapV3LpIndividualProposal } from "../factories/create-uniswap-v3-lp-individual-proposal.js";

export const proposalTypes = {
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

export type ImplementedProposalTypes = {
	[K in ProposalType]: typeof proposalTypes[K] extends () => never ? never : K
  }[ProposalType];

export type ProposalParamWithDeps<T extends ImplementedProposalTypes> = {
    type: T;
    params: NonNullable<Parameters<(typeof proposalTypes)[T]>[0]>;
    deps: NonNullable<Parameters<(typeof proposalTypes)[T]>[1]>;
};