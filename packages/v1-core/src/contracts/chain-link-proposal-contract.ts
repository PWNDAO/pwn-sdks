import { getChainLinkProposalContractAddress } from "@pwndao/sdk-core";
import { getAccount, readContract } from "@wagmi/core";
import type { Hex } from "viem";
import type { Address } from "viem";
import type { IServerAPI } from "../factories/types.js";
import {
	ChainLinkProposal,
	type IProposalContract,
	type ProposalWithSignature,
	pwnSimpleLoanElasticChainlinkProposalAbi,
	readPwnSimpleLoanElasticChainlinkProposalEncodeProposalData,
	readPwnSimpleLoanElasticChainlinkProposalGetProposalHash,
	writePwnSimpleLoanElasticChainlinkProposalMakeProposal,
} from "../index.js";
import type { V1_3SimpleLoanElasticChainlinkProposalStruct } from "../structs.js";
import { getProposalAddressByType } from "../utils/contract-addresses.js";
import { BaseProposalContract } from "./base-proposal-contract.js";

export interface IProposalChainLinkContract
	extends IProposalContract<ChainLinkProposal> {
	getCollateralAmount(proposal: ChainLinkProposal): Promise<bigint>;
}

export class ChainLinkProposalContract
	extends BaseProposalContract<ChainLinkProposal>
	implements IProposalChainLinkContract
{
	async encodeProposalData(
		proposal: ProposalWithSignature,
		creditAmount: bigint,
	) {
		const data =
			await readPwnSimpleLoanElasticChainlinkProposalEncodeProposalData(
				this.config,
				{
					address: getProposalAddressByType(proposal.type, proposal.chainId),
					chainId: proposal.chainId,
					args: [
						proposal.createProposalStruct() as V1_3SimpleLoanElasticChainlinkProposalStruct,
						{
							creditAmount,
						},
					],
				},
			);
		return data;
	}

	async getProposalHash(proposal: ChainLinkProposal): Promise<Hex> {
		// note: on-chain call is not required here. We can just use hashTypedData from wagmi
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

	async signProposal(
		proposal: ChainLinkProposal,
	): Promise<ProposalWithSignature> {
		const hash = await this.getProposalHash(proposal);

		const domain = {
			name: "PWNSimpleLoanElasticChainlinkProposal",
			version: "1.0",
			chainId: proposal.chainId,
			verifyingContract: getChainLinkProposalContractAddress(proposal.chainId),
		};

		const signature = await this.signWithSafeWalletSupport(
			domain,
			ChainLinkProposal.ERC712_TYPES,
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
		proposal: ChainLinkProposal,
		deps: { persistProposal: IServerAPI["post"]["persistProposal"] },
	): Promise<ProposalWithSignature> {
		const signedProposal = await this.signProposal(proposal);
		await deps.persistProposal(signedProposal);
		return signedProposal;
	}

	async createOnChainProposal(
		proposal: ChainLinkProposal,
	): Promise<ProposalWithSignature> {
		const account = getAccount(this.config);
		const isSafe = account?.address
			? await this.safeService.isSafeAddress(account.address as Address)
			: false;

		const proposalHash =
			await writePwnSimpleLoanElasticChainlinkProposalMakeProposal(
				this.config,
				{
					address: getChainLinkProposalContractAddress(proposal.chainId),
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

	getReadCollateralAmount(proposal: ChainLinkProposal) {
		return {
			abi: pwnSimpleLoanElasticChainlinkProposalAbi,
			functionName: "getCollateralAmount",
			address: getChainLinkProposalContractAddress(proposal.chainId),
			chainId: proposal.chainId,
			args: [
				proposal.creditAddress,
				proposal.availableCreditLimit,
				proposal.collateralAddress,
				proposal.feedIntermediaryDenominations,
				proposal.feedInvertFlags,
				proposal.loanToValue,
			],
		} as const;
	}

	async getCollateralAmount(proposal: ChainLinkProposal): Promise<bigint> {
		const data = this.getReadCollateralAmount(proposal);
		return await readContract(this.config, data);
	}
}
