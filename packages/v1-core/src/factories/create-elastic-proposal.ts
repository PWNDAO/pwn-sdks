import type { UserWithNonceManager } from "@pwndao/sdk-core";
import type { Hex } from "@pwndao/sdk-core";
import { getLoanContractAddress } from "@pwndao/sdk-core";
import { ElasticProposal } from "../models/proposals/elastic-proposal.js";
import type { IElasticProposalBase } from "../models/proposals/proposal-base.js";
import type {
	IProposalStrategy,
	StrategyTerm,
} from "../models/strategies/types.js";
import { calculateCreditPerCollateralUnit } from "../utils/calculations.js";
import {
	getLendingCommonProposalFields,
	type ILoanContract,
} from "./helpers.js";
import type { BaseTerm, IServerAPI } from "./types.js";
import type { IProposalElasticContract } from "src/contracts/elastic-proposal-contract.js";
import { LTV_DENOMINATOR } from "./constants.js";

export type CreateElasticProposalParams = BaseTerm & {
	minCreditAmountPercentage: number;
};

export interface IProposalElasticAPIDeps {
	persistProposal: IServerAPI["post"]["persistProposal"];
	getAssetUsdUnitPrice: IServerAPI["get"]["getAssetUsdUnitPrice"];
	persistProposals: IServerAPI["post"]["persistProposals"];
	updateNonces: IServerAPI["post"]["updateNonce"];
}

export class ElasticProposalStrategy
	implements IProposalStrategy<IElasticProposalBase>
{
	constructor(
		public term: StrategyTerm,
		public api: IProposalElasticAPIDeps,
		public contract: IProposalElasticContract,
		public loanContract: ILoanContract,
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
			(BigInt(params.minCreditAmountPercentage) * params.creditAmount) / BigInt(100);

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
				loanContract: this.loanContract,
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
				creditPerCollateralUnit: BigInt(creditPerCollateralUnit),
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
	 * @param isOffer - if true, the proposal is an offer
	 * @returns The proposals parameters
	 */
	getProposalsParams(
		user: UserWithNonceManager,
		creditAmount: bigint,
		utilizedCreditId: Hex,
		isOffer: boolean,
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
					isOffer
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
		isOffer: boolean,
	): Promise<ElasticProposal[]> {
		const paramsArray = this.getProposalsParams(
			user,
			creditAmount,
			utilizedCreditId,
			isOffer,
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
	loanContract: ILoanContract;
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
	};

	const strategy = new ElasticProposalStrategy(
		dummyTerm,
		deps.api,
		deps.contract,
		deps.loanContract,
	);
	const proposals = await strategy.createLendingProposals(
		params.user,
		params.creditAmount,
		params.utilizedCreditId,
		params.isOffer,
	);
	return proposals[0];
};

/**
 * Parameters for creating a batch of elastic proposals
 */
export type CreateElasticProposalBatchParams = CreateElasticProposalParams[];

/**
 * Creates multiple elastic proposals in a batch
 *
 * @param params - The parameters for the batch of proposals
 * @param deps - RPC interface and contract
 * @returns Array of created elastic proposals
 */
// TODO do we even need this? or is it enough to handle batches inside of makeProposals?
// export const createElasticProposalBatch = async (
// 	params: CreateElasticProposalBatchParams,
// 	deps: ElasticProposalDeps,
// ): Promise<ElasticProposal[]> => {
// 	// Create a strategy term with the batch parameters
// 	const dummyTerm: StrategyTerm = {
// 		creditAssets: params.map(param => param.credit),
// 		collateralAssets: params.map(param => param.collateral),
// 		// TODO how does the passed apr looks here?
// 		apr: Object.fromEntries(
// 			params.flatMap((param, index) => [
// 				[getUniqueCreditCollateralKey(param.credit, param.collateral), param.apr]
// 			])
// 		),
// 		durationDays: params[0].duration.days || 0,
// 		// TODO how does the passed ltv looks here?
// 		ltv: params.ltv,
// 		// note: this is fine to do if all proposals in batch have these same values
// 		expirationDays: params[0].expirationDays,
// 		minCreditAmountPercentage: params[0].minCreditAmountPercentage,
// 		relatedStrategyId: params[0].relatedStrategyId,
// 	};

// 	// Create a strategy and generate all proposals
// 	const strategy = new ElasticProposalStrategy(
// 		dummyTerm,
// 		deps.api,
// 		deps.contract,
// 		deps.loanContract,
// 	);
// 	const proposals = await strategy.createLendingProposals(
// 		params.terms.user,
// 		params.terms.creditAmount,
// 		params.terms.utilizedCreditId,
// 		params.terms.isOffer,
// 	);

// 	return proposals;
// };
