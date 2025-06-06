import { ProposalType } from "../models/proposals/proposal-base.js";
import { createElasticProposal } from "../factories/create-elastic-proposal.js";
import { createChainLinkElasticProposal } from "../factories/create-chain-link-proposal.js";
import type { ProposalWithSignature } from "src/index.js";
import type { AddressString, ERC20TokenLike } from "@pwndao/sdk-core";

export const proposalTypes = {
	[ProposalType.Elastic]: createElasticProposal,
	[ProposalType.ChainLink]: createChainLinkElasticProposal,
	[ProposalType.DutchAuction]: () => {
		throw new Error("Not implemented");
	},
	[ProposalType.Simple]: () => {
		throw new Error("Not implemented");
	},
};

export type ImplementedProposalTypes = keyof typeof proposalTypes;

export type ProposalParamWithDeps<T extends ImplementedProposalTypes> = {
    type: T;
    params: NonNullable<Parameters<(typeof proposalTypes)[T]>[0]>;
    deps: NonNullable<Parameters<(typeof proposalTypes)[T]>[1]>;
};

export type ProposalsToAccept = {
	proposalToAccept: ProposalWithSignature;
	acceptor: AddressString;
	creditAmount: bigint;
	creditAsset: ERC20TokenLike;
}