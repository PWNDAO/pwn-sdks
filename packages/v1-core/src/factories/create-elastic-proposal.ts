import type { AddressString, UserWithNonceManager } from "@pwndao/sdk-core";
import type { Hex } from "@pwndao/sdk-core";
import {
	getLoanContractAddress,
	getUniqueCreditCollateralKey,
	isPoolToken,
} from "@pwndao/sdk-core";
import type { Config } from "@wagmi/core";
import invariant from "ts-invariant";
import type {
	ImplementedProposalTypes,
	ProposalParamWithDeps,
} from "../actions/types.js";
import { API } from "../api.js";
import { ElasticProposalContract } from "../contracts/elastic-proposal-contract.js";
import { SimpleLoanContract } from "../contracts/simple-loan-contract.js";
import type { Loan } from "../models/loan/index.js";
import { ElasticProposal } from "../models/proposals/elastic-proposal.js";
import type { IElasticProposalBase } from "../models/proposals/proposal-base.js";
import { ProposalType } from "../models/proposals/proposal-base.js";
import type {
	IProposalStrategy,
	ProposalWithSignature,
	Strategy,
	StrategyTerm,
} from "../models/strategies/types.js";
import { calculateCreditPerCollateralUnit } from "../utils/calculations.js";
import {
	calculateCollateralAmount,
	calculateDurationInSeconds,
	calculateExpirationTimestamp,
	calculateMinCreditAmount,
	getLtvValue,
} from "../utils/proposal-calculations.js";
import { createUtilizedCreditId } from "../utils/shared-credit.js";
import type { ILoanContract, IProposalContract } from "./helpers.js";
import { getLendingCommonProposalFields } from "./helpers.js";
import type { BaseTerm, IServerAPI } from "./types.js";

export type CreateElasticProposalParams = BaseTerm & {
	minCreditAmountPercentage: number;
};

export interface IProposalElasticAPIDeps {
	persistProposal: IServerAPI["post"]["persistProposal"];
	getAssetUsdUnitPrice: IServerAPI["get"]["getAssetUsdUnitPrice"];
	persistProposals: IServerAPI["post"]["persistProposals"];
	updateNonces: IServerAPI["post"]["updateNonce"];
}

export interface IProposalElasticContract
	extends IProposalContract<ElasticProposal> {
	getCollateralAmount(proposal: ElasticProposal): Promise<bigint>;
	acceptProposal(
		proposal: ProposalWithSignature,
		acceptor: AddressString,
		creditAmount: bigint,
	): Promise<Loan>;
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
		user: UserWithNonceManager,
	): Promise<ElasticProposal> {
		// Calculate expiration timestamp
		const expiration = calculateExpirationTimestamp(params.expirationDays);

		// Get duration in seconds or timestamp
		const durationOrDate = calculateDurationInSeconds(params.duration);

		// Get collateral amount based on credit amount, LTV, and prices
		const creditUsdPrice = await api.getAssetUsdUnitPrice(params.credit);
		const collateralUsdPrice = await api.getAssetUsdUnitPrice(
			params.collateral,
		);

		// Get LTV value for the credit-collateral pair
		const ltv = getLtvValue(
			params.ltv,
			params.credit,
			params.collateral,
			getUniqueCreditCollateralKey,
		);
		invariant(ltv, "LTV is undefined");

		// Calculate the collateral amount using the shared utility
		const collateralAmount = calculateCollateralAmount({
			creditAmount: params.creditAmount,
			ltv,
			creditDecimals: params.credit.decimals,
			collateralDecimals: params.collateral.decimals,
			creditUsdPrice,
			collateralUsdPrice,
		});

		const minCreditAmount = calculateMinCreditAmount(
			params.creditAmount,
			params.minCreditAmountPercentage,
		);

		// Get common proposal fields
		const commonFields = await getLendingCommonProposalFields(
			{
				nonce: user.getNextNonce(params.collateral.chainId),
				nonceSpace: user.getNonceSpace(params.collateral.chainId),
				user,
				collateral: params.collateral,
				credit: params.credit,
				creditAmount: params.creditAmount,
				utilizedCreditId: params.utilizedCreditId,
				durationOrDate,
				apr: params.apr,
				expiration,
				loanContract: getLoanContractAddress(params.collateral.chainId),
				relatedStrategyId: this.term.relatedStrategyId,
				sourceOfFunds: params.sourceOfFunds,
				isOffer: params.isOffer,
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
				minCreditAmount: minCreditAmount,
				availableCreditLimit: params.creditAmount,
				chainId: params.collateral.chainId,
				isOffer: params.isOffer,
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
	 * @param minCreditAmount - The minimum credit amount for the proposal
	 * @returns The proposals parameters
	 */
	getProposalsParams(
		creditAmount: bigint,
		utilizedCreditId: Hex,
		isOffer: boolean,
		sourceOfFunds: AddressString | null,
	): CreateElasticProposalParams[] {
		const result: CreateElasticProposalParams[] = [];
		invariant(
			this.term.minCreditAmountPercentage,
			"Min credit amount percentage is required for this proposal type",
		);
		for (const credit of this.term.creditAssets) {
			for (const collateral of this.term.collateralAssets) {
				result.push({
					collateral,
					credit,
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
					isOffer,
					sourceOfFunds,
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
		sourceOfFunds: AddressString | null,
	): Promise<ElasticProposal[]> {
		const paramsArray = this.getProposalsParams(
			creditAmount,
			utilizedCreditId,
			isOffer,
			sourceOfFunds,
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
						user,
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
	user: UserWithNonceManager,
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
		user,
		params.creditAmount,
		params.utilizedCreditId,
		params.isOffer,
		params.sourceOfFunds,
	);
	return proposals[0];
};

/**
 * Parameters for creating a batch of elastic proposals
 */
export type CreateElasticProposalBatchParams = CreateElasticProposalParams[];

export const createElasticProposals = (
	strategy: Strategy,
	address: AddressString,
	creditAmount: string,
	config: Config,
	isOffer = true,
): ProposalParamWithDeps<ImplementedProposalTypes>[] => {
	const proposals: ProposalParamWithDeps<ImplementedProposalTypes>[] = [];

	invariant(
		strategy.terms.minCreditAmountPercentage,
		"Min credit amount is required for this proposal type",
	);

	const apiDeps = {
		persistProposal: API.post.persistProposal,
		getAssetUsdUnitPrice: API.get.getAssetUsdUnitPrice,
		persistProposals: API.post.persistProposals,
		updateNonces: API.post.updateNonce,
	} as IProposalElasticAPIDeps;

	for (const creditAsset of strategy.terms.creditAssets) {
		const utilizedCreditId = createUtilizedCreditId({
			proposer: address,
			availableCreditLimit: BigInt(creditAmount),
		});

		for (const collateralAsset of strategy.terms.collateralAssets) {
			proposals.push({
				type: ProposalType.Elastic,
				deps: {
					api: apiDeps,
					contract: new ElasticProposalContract(config),
					loanContract: new SimpleLoanContract(config),
				},
				params: {
					creditAmount: BigInt(creditAmount),
					ltv: strategy.terms.ltv,
					apr: strategy.terms.apr,
					duration: {
						days: strategy.terms.durationDays,
					},
					expirationDays: strategy.terms.expirationDays,
					utilizedCreditId: utilizedCreditId,
					minCreditAmountPercentage: strategy.terms.minCreditAmountPercentage,
					isOffer,
					relatedStrategyId: strategy.id,
					sourceOfFunds: isPoolToken(creditAsset)
						? creditAsset.underlyingAddress
						: null,
					collateral: collateralAsset,
					credit: creditAsset,
				},
			});
		}
	}

	return proposals;
};
