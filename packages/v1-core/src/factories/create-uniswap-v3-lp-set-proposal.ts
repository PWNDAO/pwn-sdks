import type { IProposalUniswapV3LpSetContract } from '../contracts/uniswap-v3-lp-set-proposal-contract.js'
import type { BaseTerm, IServerAPI } from "./types.js";
import { getLendingCommonProposalFields, type ILoanContract } from "./helpers.js";
import type { IProposalStrategy, StrategyTerm } from "../models/strategies/types.js";
import type { IUniswapV3LpSetProposalBase } from "../models/proposals/proposal-base.js";
import { type AddressString, getLoanContractAddress, getUniqueCreditCollateralKey, type Hex, type UserWithNonceManager } from "@pwndao/sdk-core";
import { UniswapV3LpSetProposal } from "../models/proposals/uniswap-v3-lp-set-proposal.js";
import { calculateExpirationTimestamp, calculateMinCreditAmount } from "../utils/proposal-calculations.js";
import { calculateDurationInSeconds } from "../utils/proposal-calculations.js";
import invariant from "ts-invariant";
import { getFeedData } from "../utils/chainlink-feeds.js";
import type { ChainsWithChainLinkFeedSupport } from "../utils/chainlink-feeds.js";
import { UniswapV3Position } from "../../../core/src/models/liquidity-position.js";

export type CreateUniswapV3LpSetProposalParams = BaseTerm & {
	tokenAAllowlist: string[];
	tokenBAllowlist: string[];
	isOffer: true;
	acceptorController: string;
	acceptorControllerData: string;
	minCreditAmountPercentage: number;
	minCreditAmount?: bigint;
}

export class UniswapV3LpSetProposalStrategy
	implements IProposalStrategy<IUniswapV3LpSetProposalBase>
{
	constructor(
		public term: StrategyTerm,
		public contract: IProposalUniswapV3LpSetContract,
		public loanContract: ILoanContract,
	) {}

	async implementUniswapV3LpSetProposal(
		params: CreateUniswapV3LpSetProposalParams,
		contract: IProposalUniswapV3LpSetContract,
		user: UserWithNonceManager,
	): Promise<UniswapV3LpSetProposal | undefined> {
		// Calculate expiration timestamp
		const expiration = calculateExpirationTimestamp(params.expirationDays);

		// Get duration in seconds or timestamp
		const durationOrDate = calculateDurationInSeconds(params.duration);
		
		// Get LTV value for the credit-collateral pair
		const ltv = this.term.ltv[getUniqueCreditCollateralKey(params.credit, params.collateral)];

		invariant(ltv, "LTV is undefined");

		const collateralCasted = (
			'tokenId' in params.collateral && 
			'tokenA' in params.collateral && 
			'tokenB' in params.collateral) ? 
				params.collateral as UniswapV3Position : null ;
		
		invariant(collateralCasted, "Collateral doesn't have required fields to be a UniswapV3Position");

		const collateralClass = new UniswapV3Position(
			collateralCasted.chainId,
			collateralCasted.address,
			collateralCasted.tokenA,
			collateralCasted.tokenB,
			collateralCasted.tokenId,
		);

		invariant(collateralClass instanceof UniswapV3Position, "Collateral must be instanceOf UniswapV3Position");

        const feedData = getFeedData(
            collateralClass.chainId as ChainsWithChainLinkFeedSupport,
            params.tokenAAllowlist[0] as AddressString, //TODO: for 1st iteration, it's always [0] from the tokenAAllowlist
            "underlyingAddress" in params.credit && params.credit.underlyingAddress
                ? params.credit.underlyingAddress
                : params.credit.address,
        );

        invariant(feedData, "We did not find a suitable price feed. Create classic elastic proposal instead.");

		invariant(params.creditAmount, "Credit amount is undefined");

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
				isOffer: true,
			},
			{
				contract: contract,
				loanContract: this.loanContract,
			},
		);

		// Create and return the UniswapV3LpSet proposal with formatted LTV for contract
		return new UniswapV3LpSetProposal(
			{
				...commonFields,
				minCreditAmount,
				isOffer: true,
				feedIntermediaryDenominations: feedData.feedIntermediaryDenominations,
				feedInvertFlags: feedData.feedInvertFlags,
				loanToValue: BigInt(ltv),
				chainId: params.collateral.chainId,
				collateralCategory: params.collateral.category,
				collateralAddress: params.collateral.address,
				collateralId: BigInt(collateralClass.tokenId),
				tokenAAllowlist: params.tokenAAllowlist.map(token => token as `0x${string}`),
				tokenBAllowlist: params.tokenBAllowlist.map(token => token as `0x${string}`),
				acceptorController: params.acceptorController as `0x${string}`,
				acceptorControllerData: params.acceptorControllerData as `0x${string}`,
			},
			collateralClass.chainId,
		);
	}

	getProposalsParams(
		creditAmount: bigint,
		utilizedCreditId: Hex,
		isOffer: boolean,
		sourceOfFunds: AddressString | null,
		minCreditAmount?: bigint,
		tokenAAllowlist?: string[],
		tokenBAllowlist?: string[],
		// todo: maybe laontovalue ?
	): CreateUniswapV3LpSetProposalParams[] {

		invariant(isOffer, "UniswapV3LpSetProposal is always an offer");
		invariant(this.term.creditAssets.length === 1, "UniswapV3LpSetProposal supports only one credit asset");
		invariant(this.term.collateralAssets.length === 1, "UniswapV3LpSetProposal supports only one collateral asset");

		const credit = this.term.creditAssets[0];
		const collateral = this.term.collateralAssets[0];

		invariant(tokenAAllowlist && tokenAAllowlist.length > 0, "Token A allowlist is required");
		invariant(tokenBAllowlist && tokenBAllowlist.length > 0, "Token B allowlist is required");

		// todo: check feed params, loantovalue
		
		return [
			{
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
				isOffer: true,
				sourceOfFunds,
				minCreditAmount,
				tokenAAllowlist,
				tokenBAllowlist,
				acceptorController: this.term.acceptorController || "",
				acceptorControllerData: this.term.acceptorControllerData || "",
				minCreditAmountPercentage: this.term.minCreditAmountPercentage || 0,
			},
		];
	}

	async createLendingProposals(
		user: UserWithNonceManager,
		creditAmount: bigint,
		utilizedCreditId: Hex,
		isOffer: boolean,
		sourceOfFunds: AddressString | null,
		minCreditAmount?: bigint,
		tokenAAllowlist?: string[],
		tokenBAllowlist?: string[],
	): Promise<UniswapV3LpSetProposal[]> {
		const paramsArray = this.getProposalsParams(
			creditAmount,
			utilizedCreditId,
			isOffer,
			sourceOfFunds,
			minCreditAmount,
			tokenAAllowlist,
			tokenBAllowlist,
		);

		const result: UniswapV3LpSetProposal[] = [];

		const proposals = await Promise.allSettled(
			paramsArray.map(async (params) => {
				try {
					return await this.implementUniswapV3LpSetProposal(params, this.contract, user);
				} catch (error) {
					console.error("Error creating UniswapV3LpSet proposal:", error);
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

export interface IProposalUniswapV3LpSetAPIDeps {
	persistProposal: IServerAPI["post"]["persistProposal"];
	persistProposals: IServerAPI["post"]["persistProposals"];
	updateNonces: IServerAPI["post"]["updateNonce"];
}

export type UniswapV3LpSetProposalDeps = {
	api: IProposalUniswapV3LpSetAPIDeps;
	contract: IProposalUniswapV3LpSetContract;
	loanContract: ILoanContract;
};

export const createUniswapV3LpSetProposal = async (
	params: CreateUniswapV3LpSetProposalParams,
	deps: UniswapV3LpSetProposalDeps,
	user: UserWithNonceManager,
): Promise<UniswapV3LpSetProposal> => {
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

	const strategy = new UniswapV3LpSetProposalStrategy(
		dummyTerm,
		deps.contract,
		deps.loanContract,
	);

	const proposals = await strategy.createLendingProposals(
		user,
		params.creditAmount,
		params.utilizedCreditId,
		params.isOffer,
		params.sourceOfFunds,
		params.minCreditAmount,
		params.tokenAAllowlist,
		params.tokenBAllowlist,
	);

	return proposals[0];
}