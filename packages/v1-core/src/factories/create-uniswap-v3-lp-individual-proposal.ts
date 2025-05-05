import { type AddressString, getLoanContractAddress, getUniqueCreditCollateralKey, type Hex, type UserWithNonceManager, ZERO_ADDRESS } from "@pwndao/sdk-core";
import { type BaseTerm, type StrategyTerm, type IProposalStrategy, type IUniswapV3IndividualProposalBase, type ILoanContract, type IProposalUniswapV3LpIndividualContract, type ChainsWithChainLinkFeedSupport, getFeedData, getLendingCommonProposalFields, type IServerAPI } from '../index.js'
import { UniswapV3IndividualProposal } from "../models/proposals/uniswap-v3-lp-individual-proposal.js";
import { calculateDurationInSeconds, calculateMinCreditAmount } from "../utils/proposal-calculations.js";
import { calculateExpirationTimestamp } from "../utils/proposal-calculations.js";
import { UniswapV3Position } from "../../../core/src/models/liquidity-position.js";
import { invariant } from 'ts-invariant'
export type CreateUniswapV3IndividualProposalParams = BaseTerm & {
    token0Denominator: boolean;
    feedIntermediaryDenominations: AddressString[];
    feedInvertFlags: boolean[];
    loanToValue: bigint;
    acceptorController: AddressString;
    acceptorControllerData: Hex;
    collateralId: string;
    minCreditAmount: bigint;
    minCreditAmountPercentage: number;
}

export class UniswapV3LpIndividualProposalStrategy
	implements IProposalStrategy<IUniswapV3IndividualProposalBase>
{
    constructor(
        public term: StrategyTerm,
        public contract: IProposalUniswapV3LpIndividualContract,
        public loanContract: ILoanContract,
    ) {}

    async implementUniswapV3LpIndividualProposal(
        params: CreateUniswapV3IndividualProposalParams,
        contract: IProposalUniswapV3LpIndividualContract,
        user: UserWithNonceManager,
    ): Promise<UniswapV3IndividualProposal | undefined> {
        // Calculate expiration timestamp
        const expiration = calculateExpirationTimestamp(params.expirationDays);

        // Get duration in seconds or timestamp
        const durationOrDate = calculateDurationInSeconds(params.duration);
        
        // Get LTV value for the credit-collateral pair
        const ltv = this.term.ltv[getUniqueCreditCollateralKey(params.credit, params.collateral)];

        invariant(ltv, "LTV is undefined");

        invariant(params.collateral instanceof UniswapV3Position, "Collateral must be a UniswapV3Position");

        const feedData = getFeedData(
            params.collateral.chainId as ChainsWithChainLinkFeedSupport,
            params.collateral.address,
            "underlyingAddress" in params.credit && params.credit.underlyingAddress
                ? params.credit.underlyingAddress
                : params.credit.address,
        );

        invariant(feedData, "We did not find a suitable price feed. Create classic elastic proposal instead.");

        const creditAmount = await contract.getCreditAmount(
            params.credit.address,
            BigInt(params.collateral.tokenId),
            params.token0Denominator,
            params.feedIntermediaryDenominations,
            params.feedInvertFlags,
            BigInt(ltv),
            params.collateral.chainId,
        )

        const minCreditAmount = 
            params.minCreditAmount && !params.minCreditAmountPercentage
                ? params.minCreditAmount
                : params.minCreditAmountPercentage
                    ? calculateMinCreditAmount(
                            creditAmount,
                            params.minCreditAmountPercentage,
                        )
                    : undefined;

        invariant(minCreditAmount, "Min credit amount is undefined");

        const commonFields = await getLendingCommonProposalFields(
            {
                nonce: user.getNextNonce(params.collateral.chainId),
                nonceSpace: user.getNonceSpace(params.collateral.chainId),
                user,
                collateral: params.collateral,
                credit: params.credit,
                creditAmount,
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

        return new UniswapV3IndividualProposal(
            {
                ...commonFields,
                isOffer: false,
                feedIntermediaryDenominations: params.feedIntermediaryDenominations,
                feedInvertFlags: params.feedInvertFlags,
                loanToValue: BigInt(ltv),
                minCreditAmount,
                chainId: params.collateral.chainId,
                collateralCategory: params.collateral.category,
                collateralAddress: params.collateral.address,
                collateralId: BigInt(params.collateral.tokenId),
                token0Denominator: params.token0Denominator,
                acceptorController: params.acceptorController,
                acceptorControllerData: params.acceptorControllerData
            },
            params.collateral.chainId,
        );
    }    

    getProposalsParams(
        creditAmount: bigint,
        utilizedCreditId: Hex,
        isOffer: boolean,
        sourceOfFunds: AddressString | null,
        minCreditAmount: bigint,
        token0Denominator?: boolean,
        feedIntermediaryDenominations?: AddressString[],
        feedInvertFlags?: boolean[],
        loanToValue?: bigint,
    ): CreateUniswapV3IndividualProposalParams[] {

        invariant(!isOffer, "UniswapV3LpIndividualProposal is always a borrow request");
        invariant(this.term.creditAssets.length === 1, "UniswapV3LpIndividualProposal supports only one credit asset");
        invariant(this.term.collateralAssets.length === 1, "UniswapV3LpIndividualProposal supports only one collateral asset");

        const credit = this.term.creditAssets[0];
        const collateral = this.term.collateralAssets[0];

        invariant(token0Denominator, "Token 0 denominator is required");
        invariant(feedIntermediaryDenominations && feedIntermediaryDenominations.length > 0, "Feed intermediary denominations are required");
        invariant(feedInvertFlags && feedInvertFlags.length > 0, "Feed invert flags are required");
        invariant(loanToValue, "Loan to value is required");
    
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
                isOffer: false,
                sourceOfFunds,
                minCreditAmount,
                token0Denominator,
                feedIntermediaryDenominations,
                feedInvertFlags,
                loanToValue,
                acceptorController: ZERO_ADDRESS,
                acceptorControllerData: ZERO_ADDRESS,
                collateralId: (collateral as UniswapV3Position).tokenId,
                minCreditAmountPercentage: this.term.minCreditAmountPercentage || 0,
            }
        ];
    }

    async createLendingProposals(
        user: UserWithNonceManager,
        creditAmount: bigint,
        utilizedCreditId: Hex,
        isOffer: boolean,
        sourceOfFunds: AddressString | null,
        minCreditAmount: bigint,
        token0Denominator?: boolean,
        feedIntermediaryDenominations?: AddressString[],
        feedInvertFlags?: boolean[],
        loanToValue?: bigint,
    ): Promise<UniswapV3IndividualProposal[]> {
        const paramsArray = this.getProposalsParams(
            creditAmount,
            utilizedCreditId,
            isOffer,
            sourceOfFunds,
            minCreditAmount,
            token0Denominator,
            feedIntermediaryDenominations,
            feedInvertFlags,
            loanToValue,
        );

        const result: UniswapV3IndividualProposal[] = [];

        const proposals = await Promise.allSettled(
            paramsArray.map(async (params) => {
                try {
                    return await this.implementUniswapV3LpIndividualProposal(params, this.contract, user);
                } catch (error) {
                    console.error("Error creating UniswapV3LpIndividual proposal:", error);
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

export interface IProposalUniswapV3LpIndividualAPIDeps {
    persistProposal: IServerAPI["post"]["persistProposal"];
    persistProposals: IServerAPI["post"]["persistProposals"];
    updateNonces: IServerAPI["post"]["updateNonce"];
}

export type UniswapV3LpIndividualProposalDeps = {
    api: IProposalUniswapV3LpIndividualAPIDeps;
    contract: IProposalUniswapV3LpIndividualContract;
    loanContract: ILoanContract;
};

export const createUniswapV3LpIndividualProposal = async (
    params: CreateUniswapV3IndividualProposalParams,
    deps: UniswapV3LpIndividualProposalDeps,
    user: UserWithNonceManager,
): Promise<UniswapV3IndividualProposal> => {
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

    const strategy = new UniswapV3LpIndividualProposalStrategy(
        dummyTerm,
        deps.contract,
        deps.loanContract,
    );

    const proposals = await strategy.createLendingProposals(user,
        params.creditAmount,
        params.utilizedCreditId,
        params.isOffer,
        params.sourceOfFunds,
        params.minCreditAmount,
        params.token0Denominator,
        params.feedIntermediaryDenominations,
        params.feedInvertFlags,
        params.loanToValue,
    );

    return proposals[0];
}