import { UniswapV3LpSetProposal } from 'src/models/proposals/uniswap-v3-lp-set-proposal.js'
import {
    BaseProposalContract,
    IServerAPI,
    ProposalWithHash,
    ProposalWithSignature,
    type IProposalContract
} from '../index.js'
import { Hex } from '@pwndao/sdk-core';

export interface IProposalUniswapV3LpSetContract
    extends IProposalContract<UniswapV3LpSetProposal> {
    // TODO: something? maybe getLPPoolValue ?
}

export class UniswapV3LpSetProposalContract
    extends BaseProposalContract<UniswapV3LpSetProposal>
    implements IProposalUniswapV3LpSetContract {
    // TODO: something? maybe getLPPoolValue ?


	async getProposalHash(proposal: UniswapV3LpSetProposal): Promise<Hex> {
		console.warn(
			"UniswapV3LpSetProposalContract.getProposalHash is not implemented",
			proposal,
		);
		// TODO: Implement actual hash calculation using EIP-712 logic
		// This will likely involve calling a read method on the corresponding proposal contract
		// or using viem's hashTypedData locally. See ChainLinkProposalContract.getProposalHash.
		throw new Error(
			"Method UniswapV3LpSetProposalContract.getProposalHash not implemented.",
		);
	}

	async createProposal(
		proposal: UniswapV3LpSetProposal,
		deps: { persistProposal: IServerAPI["post"]["persistProposal"] },
	): Promise<ProposalWithSignature> {
		console.warn(
			"UniswapV3LpSetProposalContract.createProposal is not implemented",
			proposal,
			deps,
		);
		// TODO: Implement actual proposal creation logic.
		// This involves signing the proposal (using getProposalHash and signProposal)
		// and potentially persisting it via the provided deps.persistProposal.
		// See ChainLinkProposalContract for an example implementation.
		throw new Error(
			"Method UniswapV3LpSetProposalContract.createProposal not implemented.",
		);
	}

	async createOnChainProposal(
		proposal: UniswapV3LpSetProposal,
	): Promise<ProposalWithSignature> {
		console.warn(
			"UniswapV3LpSetProposalContract.createOnChainProposal is not implemented",
			proposal,
		);
		// TODO: Implement actual on-chain proposal creation.
		// This involves sending a transaction to the proposal contract's `makeProposal` function.
		// See ChainLinkProposalContract for an example implementation.
		throw new Error(
			"Method UniswapV3LpSetProposalContract.createOnChainProposal not implemented.",
		);
	}

	async createMultiProposal(
		proposals: ProposalWithHash[],
	): Promise<ProposalWithSignature[]> {
		console.warn(
			"UniswapV3LpSetProposalContract.createMultiProposal is not implemented",
			proposals,
		);
		// TODO: Implement actual multi-proposal creation using Merkle tree logic
		// See ChainLinkProposalContract for an example implementation.
		throw new Error(
			"Method UniswapV3LpSetProposalContract.createMultiProposal not implemented.",
		);
	}
}