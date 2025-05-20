import {
	getElasticProposalContractAddress,
} from "@pwndao/sdk-core";
import { getAccount, readContract } from "@wagmi/core";
import type { Hex } from "viem";
import type { Address } from "viem";
import {
	type IProposalContract,
	type IServerAPI,
	type ProposalWithSignature,
	pwnSimpleLoanElasticProposalAbi,
	readPwnSimpleLoanElasticProposalEncodeProposalData,
	readPwnSimpleLoanElasticProposalGetProposalHash,
	writePwnSimpleLoanElasticProposalMakeProposal,
} from "../index.js";
import { ElasticProposal } from "../models/proposals/elastic-proposal.js";
import type { V1_3SimpleLoanElasticProposalStruct } from "../structs.js";
import { getProposalAddressByType } from "../utils/contract-addresses.js";
import { BaseProposalContract } from "./base-proposal-contract.js";

export interface IProposalElasticContract
	extends IProposalContract<ElasticProposal> {
	getCollateralAmount(proposal: ElasticProposal): Promise<bigint>;
}

export class ElasticProposalContract
	extends BaseProposalContract<ElasticProposal>
	implements IProposalElasticContract
{
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

	getReadCollateralAmount(proposal: ElasticProposal) {
		return {
			abi: pwnSimpleLoanElasticProposalAbi,
			functionName: 'getCollateralAmount',
			address: getElasticProposalContractAddress(proposal.chainId),
			chainId: proposal.chainId,
			args: [proposal.availableCreditLimit, proposal.creditPerCollateralUnit],
		} as const;
	}

	async getCollateralAmount(proposal: ElasticProposal): Promise<bigint> {
		const data = this.getReadCollateralAmount(proposal);
		return readContract(this.config, data);
	}

}
