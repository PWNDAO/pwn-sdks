import type { Config } from "@wagmi/core";
import type { ProposalWithSignature } from "src/models/strategies/types.js";
import type { IProposalContract, IServerAPI, Proposal } from "src/index.js";
import type { Hex } from "viem";

export abstract class BaseProposalContract<TProposal extends Proposal> implements IProposalContract<TProposal> {
	constructor(protected readonly config: Config) {}

    abstract getProposalHash(proposal: TProposal): Promise<Hex>;
    abstract createProposal(params: TProposal, deps: { persistProposal: IServerAPI["post"]["persistProposal"]; }): Promise<ProposalWithSignature>;
    abstract createOnChainProposal(params: TProposal): Promise<ProposalWithSignature>;
}