import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";
import {
	ZERO_ADDRESS,
	getChainLinkProposalContractAddress,
} from "@pwndao/sdk-core";
import { type Config, signTypedData } from "@wagmi/core";
import type { Hex } from "viem";
import {
	ChainLinkProposal,
	IProposalContract,
	type ProposalWithHash,
	type ProposalWithSignature,
	readPwnSimpleLoanElasticChainlinkProposalGetCollateralAmount,
	readPwnSimpleLoanElasticChainlinkProposalGetProposalHash,
	writePwnSimpleLoanElasticChainlinkProposalMakeProposal,
} from "../index.js";

export interface IProposalChainLinkContract extends IProposalContract {
	getProposalHash(proposal: ChainLinkProposal): Promise<Hex>;
	getCollateralAmount(proposal: ChainLinkProposal): Promise<bigint>;
	createProposal(proposal: ChainLinkProposal): Promise<ProposalWithSignature>;
	createMultiProposal(proposals: ProposalWithHash[]): Promise<ProposalWithSignature[]>;
  }

export class ChainLinkProposalContract implements IProposalChainLinkContract {
	constructor(private readonly config: Config) {}

	async getProposalHash(proposal: ChainLinkProposal): Promise<Hex> {
		// on-chain call is not required here. We can just use hashTypedData from wagmi
		const data = await readPwnSimpleLoanElasticChainlinkProposalGetProposalHash(
			this.config,
			{
				address: getChainLinkProposalContractAddress(proposal.chainId),
				chainId: proposal.chainId,
				args: [proposal.createProposalStruct()],
			},
		);
		return data as Hex;
	}

	async createProposal(
		proposal: ChainLinkProposal,
	): Promise<ProposalWithSignature> {
		const data = await writePwnSimpleLoanElasticChainlinkProposalMakeProposal(
			this.config,
			{
				address: getChainLinkProposalContractAddress(proposal.chainId),
				chainId: proposal.chainId,
				args: [proposal.createProposalStruct()],
			},
		);

		return Object.assign(proposal, {
			signature: data,
			hash: ZERO_ADDRESS, // todo: compute hash here
			isOnChain: true,
		}) as ProposalWithSignature;
	}

	// TODO: this is exactly same function as in elastic-proposal-contract
	//  should we move the code to some common base?
	async createMultiProposal(
		proposals: ProposalWithHash[],
	): Promise<ProposalWithSignature[]> {
		// todo: take this from func args
		const merkleTree = SimpleMerkleTree.of(
			proposals.map((proposal) => proposal.hash),
		);
		const multiproposalMerkleRoot = merkleTree.root;

		const multiproposalDomain = {
			name: "PWNMultiproposal",
		};

		const types = {
			Multiproposal: [{ name: "multiproposalMerkleRoot", type: "bytes32" }],
		};

		const signature = await signTypedData(this.config, {
			domain: multiproposalDomain,
			types,
			primaryType: "Multiproposal",
			message: {
				multiproposalMerkleRoot,
			},
		});

		return proposals.map(
			(proposal) =>
				({
					...proposal,
					hash: proposal.hash,
					multiproposalMerkleRoot,
					signature,
				}) as ProposalWithSignature,
		);
	}

	async getCollateralAmount(proposal: ChainLinkProposal): Promise<bigint> {
		const data = await readPwnSimpleLoanElasticChainlinkProposalGetCollateralAmount(
			this.config,
			{
				address: getChainLinkProposalContractAddress(proposal.chainId),
				chainId: proposal.chainId,
				args: [
					proposal.creditAddress,
					proposal.availableCreditLimit,
					proposal.collateralAddress,
					proposal.feedIntermediaryDenominations,
					proposal.feedInvertFlags,
					// TODO is this fine or we need to multiply this value by 100 ?
					proposal.loanToValue
				],
			},
		);
		return data;
	}
}
