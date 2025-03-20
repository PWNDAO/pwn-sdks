import type { AddressString, UserWithNonceManager } from "@pwndao/sdk-core";
import type { Hex, Token } from "@pwndao/sdk-core";
import { getLoanContractAddress } from "@pwndao/sdk-core";
import { ElasticProposal } from "../models/proposals/elastic-proposal.js";
import type { IElasticProposalBase } from "../models/proposals/proposal-base.js";
import type {
	IProposalStrategy,
	ProposalWithHash,
	ProposalWithSignature,
	StrategyTerm,
} from "../models/strategies/types.js";
import { calculateCreditPerCollateralUnit } from "../utils/calculations.js";
import {
	type IProposalContract,
	getLendingCommonProposalFields,
} from "./helpers.js";
import type { BaseTerm, IServerAPI } from "./types.js";
import { LTV_DENOMINATOR, MIN_CREDIT_CALCULATION_DENOMINATOR } from "./constants.js";
import type { Loan } from '../models/loan/index.js';

export type CreateElasticProposalParams = BaseTerm & {
	minCreditAmountPercentage: number;
	relatedStrategyId?: string;
	isOffer: boolean;
};

export interface IProposalElasticAPIDeps {
	persistProposal: IServerAPI["post"]["persistProposal"];
	getAssetUsdUnitPrice: IServerAPI["get"]["getAssetUsdUnitPrice"];
	persistProposals: IServerAPI["post"]["persistProposals"];
	updateNonces: IServerAPI["post"]["updateNonce"];
}

export interface IProposalElasticContract extends IProposalContract {
	getCollateralAmount(proposal: ElasticProposal): Promise<bigint>;
	getProposalHash(proposal: ElasticProposal): Promise<Hex>;
	createProposal(proposal: ElasticProposal): Promise<ProposalWithSignature>;
	createMultiProposal(
		proposals: ProposalWithHash[],
	): Promise<ProposalWithSignature[]>;
	acceptProposal(
		proposal: ProposalWithSignature,
		acceptor: AddressString,
		creditAmount: bigint,
	): Promise<Loan>
}

export class ElasticProposalStrategy
	implements IProposalStrategy<IElasticProposalBase>
{
	constructor(
		public term: StrategyTerm,
		public api: IProposalElasticAPIDeps,
		public contract: IProposalElasticContract,
	) {}

	async implementElasticProposal(
		params: CreateElasticProposalParams,
		api: IProposalElasticAPIDeps,
		contract: IProposalElasticContract,
	): Promise<ElasticProposal> {
		// Calculate expiration timestamp
		const expiration =
			Math.floor(Date.now() / 1000) + params.expirationDays * 24 * 60 * 60;

		// Get duration in seconds or timestamp
		let durationOrDate: number;
		if (params.duration.days !== undefined) {
			durationOrDate = params.duration.days * 24 * 60 * 60;
		} else {
			durationOrDate = Math.floor(params.duration.date.getTime() / 1000);
		}

		// Get collateral amount based on credit amount, LTV, and prices
		const creditUsdPrice = await api.getAssetUsdUnitPrice(params.credit);
		const collateralUsdPrice = await api.getAssetUsdUnitPrice(
			params.collateral,
		);

		const creditAmountUsd =
			(params.creditAmount * creditUsdPrice) /
			BigInt(10 ** params.credit.decimals);
		const minCreditAmountUsd =
			(BigInt(params.minCreditAmountPercentage) * params.creditAmount) / BigInt(MIN_CREDIT_CALCULATION_DENOMINATOR);

		const ltv =
			typeof params.ltv === 'object' 
				? params.ltv[
					`${params.collateral.address}/${params.collateral.chainId}-${params.credit.address}/${params.credit.chainId}`
				] ?? 0
				: params.ltv;

		// Apply LTV ratio
		const collateralAmountUsd = (creditAmountUsd * BigInt(LTV_DENOMINATOR)) / BigInt(ltv);

		// Convert back to collateral tokens
		const collateralAmount =
			(collateralAmountUsd * BigInt(10 ** params.collateral.decimals)) /
			collateralUsdPrice;

		// Get common proposal fields
		const commonFields = await getLendingCommonProposalFields(
			{
				user: params.user,
				collateral: params.collateral,
				credit: params.credit,
				creditAmount: params.creditAmount,
				utilizedCreditId: params.utilizedCreditId,
				durationOrDate,
				apr: params.apr,
				expiration,
				loanContract: getLoanContractAddress(params.collateral.chainId),
				relatedStrategyId: this.term.relatedStrategyId,
			},
			{
				contract: contract,
			},
		);

		const creditPerCollateralUnit = calculateCreditPerCollateralUnit(
			params.creditAmount,
			collateralAmount,
		);

		// Create and return the Elastic proposal
		return new ElasticProposal(
			{
				...commonFields,
				creditPerCollateralUnit,
				minCreditAmount: minCreditAmountUsd,
				availableCreditLimit: params.creditAmount,
				chainId: params.collateral.chainId,
				isOffer: params.isOffer
			},
			params.collateral.chainId,
		);
	}

	/**
	 * Get the proposals parameters to be later be consumed by the createElasticProposal
	 *
	 * @param user - The user creating the proposal
	 * @param creditAmount - The credit amount for the proposal
	 * @param utilizedCreditId - if provided, all credits with share the same utilized credit ID
	 * @returns The proposals parameters
	 */
	getProposalsParams(
		user: UserWithNonceManager,
		creditAmount: bigint,
		utilizedCreditId: Hex,
	): CreateElasticProposalParams[] {
		const result: CreateElasticProposalParams[] = [];
		for (const credit of this.term.creditAssets) {
			for (const collateral of this.term.collateralAssets) {
				result.push({
					collateral,
					credit,
					user,
					creditAmount,
					utilizedCreditId,

					apr: this.term.apr,
					duration: {
						days: this.term.durationDays,
						date: undefined,
					},
					ltv: this.term.ltv,
					expirationDays: this.term.expirationDays,
					minCreditAmountPercentage: this.term.minCreditAmountPercentage,
					relatedStrategyId: this.term.relatedStrategyId,
					isOffer: this.term.isOffer
				});
			}
		}

		return result;
	}

	/**
	 * Get the lending proposals
	 *
	 * @param user - The user creating the proposal
	 * @param creditAmount - The credit amount for the proposal
	 * @param utilizedCreditId - if provided, all credits with share the same utilized credit ID
	 * @returns The lending proposals
	 */
	async createLendingProposals(
		user: UserWithNonceManager,
		creditAmount: bigint,
		utilizedCreditId: Hex,
	): Promise<ElasticProposal[]> {
		const paramsArray = this.getProposalsParams(
			user,
			creditAmount,
			utilizedCreditId,
		);
		const result: ElasticProposal[] = [];

		const proposals = await Promise.allSettled(
			paramsArray.map(async (params) => {
				try {
					// Use the shared implementation directly
					return await this.implementElasticProposal(
						params,
						this.api,
						this.contract,
					);
				} catch (error) {
					console.error("Error creating Elastic proposal:", error);
					throw error;
				}
			}),
		);

		for (const proposal of proposals) {
			if (proposal.status === "fulfilled") {
				result.push(proposal.value);
			} else {
				throw new Error("Error creating Elastic proposal:", proposal.reason);
			}
		}

		return result;
	}
}

export type ElasticProposalDeps = {
	api: IProposalElasticAPIDeps;
	contract: IProposalElasticContract;
};

/**
 * Creates an elastic proposal
 *
 * @param params - The parameters for the proposal
 * @param deps - RPC interface and contract
 * @returns The created proposal
 */
export const createElasticProposal = async (
	params: CreateElasticProposalParams,
	deps: ElasticProposalDeps,
): Promise<ElasticProposal> => {
	const dummyTerm: StrategyTerm = {
		creditAssets: [params.credit],
		collateralAssets: [params.collateral],
		apr: params.apr,
		durationDays: params.duration.days || 0,
		ltv: params.ltv,
		expirationDays: params.expirationDays,
		minCreditAmountPercentage: params.minCreditAmountPercentage,
		relatedStrategyId: params.relatedStrategyId,
		isOffer: params.isOffer
	};

	const strategy = new ElasticProposalStrategy(
		dummyTerm,
		deps.api,
		deps.contract,
	);
	const proposals = await strategy.createLendingProposals(
		params.user,
		params.creditAmount,
		params.utilizedCreditId,
	);
	return proposals[0];
};

/**
 * Parameters for creating a batch of elastic proposals
 */
export type CreateElasticProposalBatchParams = {
	terms: Omit<BaseTerm, "collateral" | "credit"> & {
		minCreditAmountPercentage: number;
		relatedThesisId?: string;
		isOffer: boolean;
	};
	collateralAssets: Token[];
	creditAssets: Token[];
};

/**
 * Creates multiple elastic proposals in a batch
 *
 * @param params - The parameters for the batch of proposals
 * @param deps - RPC interface and contract
 * @returns Array of created elastic proposals
 */
export const createElasticProposalBatch = async (
	params: CreateElasticProposalBatchParams,
	deps: ElasticProposalDeps,
): Promise<ElasticProposal[]> => {
	// Create a strategy term with the batch parameters
	const dummyTerm: StrategyTerm = {
		creditAssets: params.creditAssets,
		collateralAssets: params.collateralAssets,
		apr: params.terms.apr,
		durationDays: params.terms.duration.days || 0,
		ltv: params.terms.ltv,
		expirationDays: params.terms.expirationDays,
		minCreditAmountPercentage: params.terms.minCreditAmountPercentage,
		id: "1",
		relatedStrategyId: params.terms.relatedStrategyId,
		isOffer: params.terms.isOffer
	};

	// Create a strategy and generate all proposals
	const strategy = new ElasticProposalStrategy(
		dummyTerm,
		deps.api,
		deps.contract,
	);
	const proposals = await strategy.createLendingProposals(
		params.terms.user,
		params.terms.creditAmount,
		params.terms.utilizedCreditId,
	);

	return proposals;
};
