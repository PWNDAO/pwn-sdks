import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";
import {
	type AddressString,
	ZERO_ADDRESS,
	getElasticProposalContractAddress,
	getPwnSimpleLoanSimpleProposalAddress,
} from "@pwndao/sdk-core";
import type { SupportedChain } from "@pwndao/sdk-core";
import { type Config, signTypedData } from "@wagmi/core";
import type { Hex } from "viem";
import type { IProposalElasticContract } from "../factories/create-elastic-proposal.js";
import {
	type ProposalWithHash,
	type ProposalWithSignature,
	readPwnSimpleLoanElasticProposalEncodeProposalData,
	readPwnSimpleLoanElasticProposalGetProposalHash,
	readPwnSimpleLoanGetLenderSpecHash,
	writePwnSimpleLoanCreateLoan,
	writePwnSimpleLoanElasticProposalMakeProposal,
} from "../index.js";
import { readPwnSimpleLoanElasticProposalGetCollateralAmount } from "../index.js";
import { Loan } from "../models/loan/index.js";
import type { ElasticProposal } from "../models/proposals/elastic-proposal.js";
import type { ILenderSpec } from "../models/terms.js";
import type { V1_3SimpleLoanElasticProposalStruct } from "../structs.js";
import { getProposalAddressByType } from "../utils/contract-addresses.js";
import { getInclusionProof } from "./utilts.js";

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
		creditAmount: bigint,
	) {
		const data = await readPwnSimpleLoanElasticProposalEncodeProposalData(
			this.config,
			{
				address: getProposalAddressByType(proposal.type, proposal.chainId),
				chainId: proposal.chainId,
				args: [
					proposal.createProposalStruct() as V1_3SimpleLoanElasticProposalStruct,
					{
						creditAmount,
					},
				],
			},
		);
		return data;
	}

	/**
	 * This function accept a proposal and a credit amount.
	 * Then it resolves the sourceOfFunds from the proposal, encodes it and accepts the proposal.
	 * @param proposal - The proposal to accept
	 * @param acceptor - The address of the acceptor
	 * @param creditAmount - The amount of credit to accept
	 * @returns The loan object
	 */
	async acceptProposal(
		proposal: ProposalWithSignature,
		acceptor: AddressString,
		creditAmount: bigint,
	): Promise<Loan> {
		// if proposal is lending offer sourceOfFunds is alreday set. If not then it's lender address
		const sourceOfFunds =
			proposal.isOffer && proposal.sourceOfFunds === null
				? proposal.proposer
				: acceptor;

		Object.assign(proposal, {
			sourceOfFunds,
		});

		const encodedProposalData = await this.encodeProposalData(
			proposal,
			creditAmount,
		);

		const proposalInclusionProof = await getInclusionProof(proposal);

		const proposalSpec = {
			proposalContract: proposal.proposalContract,
			proposalData: encodedProposalData,
			proposalInclusionProof,
			signature: proposal.signature,
		};

		const lenderSpec = {
			sourceOfFunds,
		};

		console.log("lenderSpec", lenderSpec);

		const callerSpec = {
			refinancingLoanId: 0n,
			revokeNonce: false,
			nonce: 0n,
		};

		console.log("callerSpec", callerSpec);

		const extra = "0x";

		const accepted = await writePwnSimpleLoanCreateLoan(this.config, {
			address: getPwnSimpleLoanSimpleProposalAddress(proposal.chainId),
			chainId: proposal.chainId,
			args: [proposalSpec, lenderSpec, callerSpec, extra],
		});

		return new Loan(0n, proposal.chainId);
	}
}
