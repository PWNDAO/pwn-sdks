import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";
import {
	ZERO_ADDRESS,
	getElasticProposalContractAddress,
	getPwnSimpleLoanSimpleProposalAddress,
	AddressString
} from "@pwndao/sdk-core";
import type { SupportedChain } from "@pwndao/sdk-core";
import { type Config, signTypedData } from "@wagmi/core";
import type { Hex } from "viem";
import type { IProposalElasticContract } from "../factories/create-elastic-proposal.js";
import {
	type ProposalWithHash,
	type ProposalWithSignature,
	readPwnSimpleLoanElasticProposalGetProposalHash,
	readPwnSimpleLoanGetLenderSpecHash,
	readPwnSimpleLoanElasticProposalEncodeProposalData,
	writePwnSimpleLoanElasticProposalMakeProposal,
	writePwnSimpleLoanElasticProposalAcceptProposal, 
} from "../index.js";
import type { V1_3SimpleLoanElasticProposalStruct } from "../structs.js";
import { readPwnSimpleLoanElasticProposalGetCollateralAmount } from "../index.js";
import type { ElasticProposal } from "../models/proposals/elastic-proposal.js";
import type { ILenderSpec } from "../models/terms.js";
import { Loan } from '../models/loan/index.js'

export class ElasticProposalContract implements IProposalElasticContract {
	constructor(private readonly config: Config) {}

	async getProposerSpec(
		params: ILenderSpec,
		chainId: SupportedChain,
	): Promise<Hex> {
		const data = await readPwnSimpleLoanGetLenderSpecHash(this.config, {
			address: getPwnSimpleLoanSimpleProposalAddress(chainId),
			chainId: chainId,
			args: [
				{
					sourceOfFunds: params.sourceOfFunds,
				},
			],
		});
		return data as Hex;
	}

	async getProposalHash(proposal: ElasticProposal): Promise<Hex> {
		// on-chain call is not required here. We can just use hashTypedData from wagmi
		const data = await readPwnSimpleLoanElasticProposalGetProposalHash(
			this.config,
			{
				address: getElasticProposalContractAddress(proposal.chainId),
				chainId: proposal.chainId,
				args: [proposal.createProposalStruct()],
			},
		);
		return data as Hex;
	}

	async createProposal(
		proposal: ElasticProposal,
	): Promise<ProposalWithSignature> {
		const data = await writePwnSimpleLoanElasticProposalMakeProposal(
			this.config,
			{
				address: getElasticProposalContractAddress(proposal.chainId),
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

	async getCollateralAmount(proposal: ElasticProposal): Promise<bigint> {
		const data = await readPwnSimpleLoanElasticProposalGetCollateralAmount(
			this.config,
			{
				address: getPwnSimpleLoanSimpleProposalAddress(proposal.chainId),
				chainId: proposal.chainId,
				args: [proposal.availableCreditLimit, proposal.creditPerCollateralUnit],
			},
		);
		return data;
	}

	async encodeProposalData(
		proposal: ProposalWithSignature,
		creditAmount: bigint
	) {
		const data = await readPwnSimpleLoanElasticProposalEncodeProposalData(
			this.config,
			{
				address: getPwnSimpleLoanSimpleProposalAddress(proposal.chainId),
				chainId: proposal.chainId,
				args: [
					proposal.createProposalStruct() as V1_3SimpleLoanElasticProposalStruct, 
					{
						creditAmount,
					}
				]
			}
		)
		return data
	}

	async acceptProposal(
		proposal: ProposalWithSignature,
		acceptor: AddressString,
		creditAmount: bigint,
	): Promise<Loan> {
		const encodedProposalData = await this.encodeProposalData(
			proposal,
			creditAmount, 
		)
		const accepted = await writePwnSimpleLoanElasticProposalAcceptProposal(
			this.config,
			{
				address: getPwnSimpleLoanSimpleProposalAddress(proposal.chainId),
				chainId: proposal.chainId,
				args: [
					acceptor,
					0n,
					encodedProposalData,
					[],
					proposal.signature
				]
			}
		)
		
		return new Loan(
			0n,
			proposal.chainId,
		)
	}
}
