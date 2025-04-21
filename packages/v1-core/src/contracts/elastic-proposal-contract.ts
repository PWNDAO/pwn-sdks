import {
	type AddressString,
	getElasticProposalContractAddress,
	getLoanContractAddress,
} from "@pwndao/sdk-core";
import { getAccount } from "@wagmi/core";
import type { Hex } from "viem";
import type { Address } from "viem";
import {
	type IProposalContract,
	type IServerAPI,
	type ProposalWithHash,
	type ProposalWithSignature,
	readPwnSimpleLoanElasticProposalEncodeProposalData,
	readPwnSimpleLoanElasticProposalGetProposalHash,
	writePwnSimpleLoanCreateLoan,
	writePwnSimpleLoanElasticProposalMakeProposal,
} from "../index.js";
import { readPwnSimpleLoanElasticProposalGetCollateralAmount } from "../index.js";
import { Loan } from "../models/loan/index.js";
import { ElasticProposal } from "../models/proposals/elastic-proposal.js";
import { BaseProposalContract } from "./base-proposal-contract.js";
import type { V1_3SimpleLoanElasticProposalStruct } from "../structs.js";
import { getProposalAddressByType } from "../utils/contract-addresses.js";
import { getInclusionProof } from "./utilts.js";

export interface IProposalElasticContract
	extends IProposalContract<ElasticProposal> {
	getCollateralAmount(proposal: ElasticProposal): Promise<bigint>;
}

export class ElasticProposalContract
	extends BaseProposalContract<ElasticProposal>
	implements IProposalElasticContract
{
	async createMultiProposal(
		proposals: ProposalWithHash[],
	): Promise<ProposalWithSignature[]> {
		const structToSign = this.getMerkleTreeForSigning(proposals);

		const signature = await this.signWithSafeWalletSupport(
			structToSign.domain,
			structToSign.types,
			structToSign.primaryType,
			structToSign.message,
		);

		const merkleRoot = structToSign.message.multiproposalMerkleRoot;

		return proposals.map(
			(proposal) =>
				({
					...proposal,
					signature,
					hash: proposal.hash,
					isOnChain: false,
					multiproposalMerkleRoot: merkleRoot,
				}) as ProposalWithSignature,
		);
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

	async signProposal(
		proposal: ElasticProposal,
	): Promise<ProposalWithSignature> {
		const hash = await this.getProposalHash(proposal);

		const domain = {
			name: "PWNSimpleLoanElasticProposal",
			version: "1.1",
			chainId: proposal.chainId,
			verifyingContract: getElasticProposalContractAddress(proposal.chainId),
		};

		const signature = await this.signWithSafeWalletSupport(
			domain,
			ElasticProposal.ERC712_TYPES,
			"Proposal",
			proposal.createProposalStruct(),
		);

		return Object.assign(proposal, {
			signature,
			hash,
			isOnChain: false,
		}) as ProposalWithSignature;
	}

	async createProposal(
		proposal: ElasticProposal,
		deps: {
			persistProposal: IServerAPI["post"]["persistProposal"];
		},
	): Promise<ProposalWithSignature> {
		const signedProposal = await this.signProposal(proposal);
		await deps.persistProposal(signedProposal);
		return signedProposal;
	}

	async createOnChainProposal(
		proposal: ElasticProposal,
	): Promise<ProposalWithSignature> {
		const account = getAccount(this.config);
		const isSafe = account?.address
			? await this.safeService.isSafeAddress(account.address as Address)
			: false;

		const proposalHash = await writePwnSimpleLoanElasticProposalMakeProposal(
			this.config,
			{
				address: getElasticProposalContractAddress(proposal.chainId),
				chainId: proposal.chainId,
				args: [proposal.createProposalStruct()],
			},
		);

		// If using a Safe wallet, wait for transaction confirmation
		if (isSafe) {
			await this.safeService.waitForTransaction(proposalHash);
		}

		return Object.assign(proposal, {
			signature: null, // on-chain proposals does not have signature
			hash: proposalHash,
			isOnChain: true,
		}) as ProposalWithSignature;
	}

	async getCollateralAmount(proposal: ElasticProposal): Promise<bigint> {
		const data = await readPwnSimpleLoanElasticProposalGetCollateralAmount(
			this.config,
			{
				address: getElasticProposalContractAddress(proposal.chainId),
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
			signature: proposal.signature as Hex,
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
			address: getLoanContractAddress(proposal.chainId),
			chainId: proposal.chainId,
			args: [proposalSpec, lenderSpec, callerSpec, extra],
		});

		console.log("accepted", accepted);

		return new Loan(0n, proposal.chainId);
	}
}
