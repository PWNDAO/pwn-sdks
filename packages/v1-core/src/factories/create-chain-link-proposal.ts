import type {
	AddressString,
	Hex,
	UserWithNonceManager,
} from "@pwndao/sdk-core";
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
import {
	ChainLinkProposalContract,
	type IProposalChainLinkContract,
} from "../contracts/chain-link-proposal-contract.js";
import { SimpleLoanContract } from "../contracts/simple-loan-contract.js";
import { ChainLinkProposal } from "../models/proposals/chainlink-proposal.js";
import {
	type IOracleProposalBase,
	ProposalType,
} from "../models/proposals/proposal-base.js";
import type {
	IProposalStrategy,
	Strategy,
	StrategyTerm,
} from "../models/strategies/types.js";
import {
	type ChainsWithChainLinkFeedSupport,
	getFeedData,
} from "../utils/chainlink-feeds.js";
import {
	calculateDurationInSeconds,
	calculateExpirationTimestamp,
	calculateMinCreditAmount,
	formatLtvForContract,
	getLtvValue,
} from "../utils/proposal-calculations.js";
import { createUtilizedCreditId } from "../utils/shared-credit.js";
import {
	type ILoanContract,
	getLendingCommonProposalFields,
} from "./helpers.js";
import type { BaseTerm, IServerAPI } from "./types.js";

export type CreateChainLinkElasticProposalParams = BaseTerm & {
	minCreditAmountPercentage: number;
	minCreditAmount?: bigint;
};

export class ChainLinkProposalStrategy
	implements IProposalStrategy<IOracleProposalBase>
{
	constructor(
		public term: StrategyTerm,
		public contract: IProposalChainLinkContract,
		public loanContract: ILoanContract,
	) {}

	async implementChainLinkProposal(
		params: CreateChainLinkElasticProposalParams,
		contract: IProposalChainLinkContract,
		user: UserWithNonceManager,
	): Promise<ChainLinkProposal | undefined> {
		// Calculate expiration timestamp
		const expiration = calculateExpirationTimestamp(params.expirationDays);

		// Get duration in seconds or timestamp
		const durationOrDate = calculateDurationInSeconds(params.duration);

		// Get LTV value for the credit-collateral pair
		const ltv = getLtvValue(
			params.ltv,
			params.credit,
			params.collateral,
			getUniqueCreditCollateralKey,
		);

		invariant(ltv, "LTV is undefined");

		// Get feed data for ChainLink proposal
		const feedData = getFeedData(
			params.collateral.chainId as ChainsWithChainLinkFeedSupport,
			params.collateral.address,
			"underlyingAddress" in params.credit && params.credit.underlyingAddress
				? params.credit.underlyingAddress
				: params.credit.address,
		);
		invariant(
			feedData,
			"We did not find a suitable price feed. Create classic elastic proposal instead.",
		);

		const minCreditAmount =
			params.minCreditAmount && !params.minCreditAmountPercentage
				? params.minCreditAmount
				: params.minCreditAmountPercentage
					? calculateMinCreditAmount(
							params.creditAmount,
							params.minCreditAmountPercentage,
						)
					: undefined;
		invariant(minCreditAmount, "Min credit amount is undefined");

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

		// Create and return the ChainLink proposal with formatted LTV for contract
		return new ChainLinkProposal(
			{
				...commonFields,
				feedIntermediaryDenominations: feedData.feedIntermediaryDenominations,
				feedInvertFlags: feedData.feedInvertFlags,
				loanToValue: formatLtvForContract(ltv),
				minCreditAmount,
				chainId: params.collateral.chainId,
				isOffer: params.isOffer,
			},
			params.collateral.chainId,
		);
	}

	getProposalsParams(
		creditAmount: bigint,
		utilizedCreditId: Hex,
		isOffer: boolean,
		sourceOfFunds: AddressString | null,
		minCreditAmount?: bigint,
	): CreateChainLinkElasticProposalParams[] {
		const result: CreateChainLinkElasticProposalParams[] = [];

		for (const credit of this.term.creditAssets) {
			if (
				(!minCreditAmount && !this.term.minCreditAmountPercentage) ||
				(minCreditAmount && this.term.minCreditAmountPercentage)
			) {
				throw new Error(
					"Either minCreditAmountPercentage or minCreditAmount must be provided for this proposal type",
				);
			}

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
					minCreditAmountPercentage: this.term.minCreditAmountPercentage || 0,
					minCreditAmount,
					relatedStrategyId: this.term.id,
					isOffer,
					sourceOfFunds,
				});
			}
		}

		return result;
	}

	async createLendingProposals(
		user: UserWithNonceManager,
		creditAmount: bigint,
		utilizedCreditId: Hex,
		isOffer: boolean,
		sourceOfFunds: AddressString | null,
		minCreditAmount?: bigint,
	): Promise<ChainLinkProposal[]> {
		const paramsArray = this.getProposalsParams(
			creditAmount,
			utilizedCreditId,
			isOffer,
			sourceOfFunds,
			minCreditAmount
		);
		const result: ChainLinkProposal[] = [];

		const proposals = await Promise.allSettled(
			paramsArray.map(async (params) => {
				try {
					// Use the shared implementation directly
					return await this.implementChainLinkProposal(
						params,
						this.contract,
						user,
					);
				} catch (error) {
					console.error("Error creating ChainLink proposal:", error);
					throw error;
				}
			}),
		);

		for (const proposal of proposals) {
			if (proposal.status === "fulfilled" && proposal.value) {
				result.push(proposal.value);
			}
		}

		return result;
	}
}

// TODO create some base interface that contains all the necessary
//  API deps for e.g. makeProposal / makeProposals functions (and some other shared functions?)?
export interface IProposalChainLinkAPIDeps {
	persistProposal: IServerAPI["post"]["persistProposal"];
	persistProposals: IServerAPI["post"]["persistProposals"];
	updateNonces: IServerAPI["post"]["updateNonce"];
}

export type ChainLinkElasticProposalDeps = {
	api: IProposalChainLinkAPIDeps;
	contract: IProposalChainLinkContract;
	loanContract: ILoanContract;
};

export const createChainLinkElasticProposal = async (
	params: CreateChainLinkElasticProposalParams,
	deps: ChainLinkElasticProposalDeps,
	user: UserWithNonceManager,
): Promise<ChainLinkProposal> => {
	// Create a dummy StrategyTerm with just enough data for the strategy to work
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

	const strategy = new ChainLinkProposalStrategy(
		dummyTerm,
		deps.contract as IProposalChainLinkContract,
		deps.loanContract,
	);
	const proposals = await strategy.createLendingProposals(
		user,
		params.creditAmount,
		params.utilizedCreditId,
		params.isOffer,
		params.sourceOfFunds,
		params.minCreditAmount,
	);
	return proposals[0];
};

/**
 * Parameters for creating a batch of elastic proposals
 */
export type CreateChainLinkElasticProposalBatchParams =
	CreateChainLinkElasticProposalParams[];

export const createChainLinkProposals = (
	strategy: Strategy,
	address: AddressString,
	creditAmount: string,
	minCreditAmount: string,
	config: Config,
	isOffer = true,
) => {
	const proposals: ProposalParamWithDeps<ImplementedProposalTypes>[] = [];

	const apiDeps = {
		persistProposal: API.post.persistProposal,
		persistProposals: API.post.persistProposals,
		updateNonces: API.post.updateNonce,
	} as IProposalChainLinkAPIDeps;

	for (const creditAsset of strategy.terms.creditAssets) {
		const utilizedCreditId = createUtilizedCreditId({
			proposer: address,
			availableCreditLimit: BigInt(creditAmount),
		});

		for (const collateralAsset of strategy.terms.collateralAssets) {
			proposals.push({
				type: ProposalType.ChainLink,
				deps: {
					api: apiDeps,
					contract: new ChainLinkProposalContract(config),
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
					minCreditAmountPercentage:
						strategy.terms.minCreditAmountPercentage || 0,
					minCreditAmount: BigInt(minCreditAmount),
					relatedStrategyId: strategy.id,
					collateral: collateralAsset,
					credit: creditAsset,
					isOffer,
					sourceOfFunds: isPoolToken(creditAsset)
						? creditAsset.underlyingAddress
						: null,
				},
			});
		}
	}
};
