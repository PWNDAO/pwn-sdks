import { AddressString, Hex, MultiTokenCategory, V1_4_CHAIN_TO_ADDRESSES_MAP } from "@pwndao/sdk-core";
import { SupportedChain } from "@pwndao/sdk-core";
import { IUniswapV3IndividualProposalBase, ProposalType } from "./proposal-base.js";
import { V1_4SimpleLoanUniswapV3IndividualProposalStruct } from "../../structs.js";

export class UniswapV3IndividualProposal implements IUniswapV3IndividualProposalBase {
    type = ProposalType.UniswapV3Individual as const;
    proposalContract = V1_4_CHAIN_TO_ADDRESSES_MAP[SupportedChain.Sepolia].pwnSimpleLoanUniswapV3IndividualProposal; // TODO: later change to CHAIN_TO_ADDRESSES_MAP and dynamic chain id
    collateralCategory = MultiTokenCategory.UNISWAP_V3_LP;

    static ERC712_TYPES = {
        Proposal: [
            { name: "collateralId", type: "uint256" },
            { name: "token0Denominator", type: "bool" },
            { name: "creditAddress", type: "address" },
            { name: "feedIntermediaryDenominations", type: "address[]" },
            { name: "feedInvertFlags", type: "bool[]" },
            { name: "loanToValue", type: "uint256" },
            { name: "minCreditAmount", type: "uint256" },
            { name: "availableCreditLimit", type: "uint256" },
            { name: "utilizedCreditId", type: "bytes32" },
            { name: "fixedInterestAmount", type: "uint256" },
            { name: "accruingInterestAPR", type: "uint24" },
            { name: "durationOrDate", type: "uint32" },
            { name: "expiration", type: "uint40" },
            { name: "acceptorController", type: "address" },
            { name: "acceptorControllerData", type: "bytes" },
            { name: "proposer", type: "address" },
            { name: "proposerSpecHash", type: "bytes32" },
            { name: "isOffer", type: "bool" },
            { name: "refinancingLoanId", type: "uint256" },
            { name: "nonceSpace", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "loanContract", type: "address" }
        ]
    }

    constructor(
        proposal: Omit<IUniswapV3IndividualProposalBase, "type">,
        chainId: SupportedChain,
    ) {
        this.chainId = chainId;
        this.collateralId = proposal.collateralId;
        this.token0Denominator = proposal.token0Denominator;
        this.creditAddress = proposal.creditAddress;
        this.feedIntermediaryDenominations = proposal.feedIntermediaryDenominations;
        this.feedInvertFlags = proposal.feedInvertFlags;
        this.loanToValue = proposal.loanToValue;
        this.minCreditAmount = proposal.minCreditAmount;
        this.availableCreditLimit = proposal.availableCreditLimit;
        this.utilizedCreditId = proposal.utilizedCreditId;
        this.fixedInterestAmount = proposal.fixedInterestAmount;
        this.accruingInterestAPR = proposal.accruingInterestAPR;
        this.durationOrDate = proposal.durationOrDate;
        this.expiration = proposal.expiration;
        this.acceptorController = proposal.acceptorController;
        this.acceptorControllerData = proposal.acceptorControllerData;
        this.proposer = proposal.proposer;
        this.proposerSpecHash = proposal.proposerSpecHash;
        this.isOffer = proposal.isOffer;
        this.refinancingLoanId = proposal.refinancingLoanId;
        this.nonceSpace = proposal.nonceSpace;
        this.nonce = proposal.nonce;
        this.loanContract = proposal.loanContract;

        this.collateralAddress = proposal.collateralAddress;
        this.checkCollateralStateFingerprint = proposal.checkCollateralStateFingerprint;
        this.collateralStateFingerprint = proposal.collateralStateFingerprint;
        this.allowedAcceptor = proposal.allowedAcceptor;
        this.sourceOfFunds = proposal.sourceOfFunds;
        this.minCreditAmount = proposal.minCreditAmount;
        this.relatedStrategyId = proposal.relatedStrategyId;
    }

    createProposalStruct(): V1_4SimpleLoanUniswapV3IndividualProposalStruct {
        return {
            collateralId: this.collateralId,
            token0Denominator: this.token0Denominator,
            creditAddress: this.creditAddress,
            feedIntermediaryDenominations: this.feedIntermediaryDenominations,
            feedInvertFlags: this.feedInvertFlags,
            loanToValue: this.loanToValue,
            minCreditAmount: this.minCreditAmount,
            availableCreditLimit: this.availableCreditLimit,
            utilizedCreditId: this.utilizedCreditId,
            fixedInterestAmount: this.fixedInterestAmount,
            accruingInterestAPR: this.accruingInterestAPR,
            durationOrDate: this.durationOrDate,
            expiration: this.expiration,
            acceptorController: this.acceptorController,
            acceptorControllerData: this.acceptorControllerData,
            proposer: this.proposer,
            proposerSpecHash: this.proposerSpecHash,
            isOffer: false,
            refinancingLoanId: this.refinancingLoanId,
            nonceSpace: this.nonceSpace,
            nonce: this.nonce,
            loanContract: this.loanContract,
        }
    }

    chainId: SupportedChain;
    collateralId: bigint;
    token0Denominator: boolean;
    creditAddress: AddressString;
    feedIntermediaryDenominations: AddressString[];
    feedInvertFlags: boolean[];
    loanToValue: bigint;
    minCreditAmount: bigint;
    availableCreditLimit: bigint;
    utilizedCreditId: Hex;
    fixedInterestAmount: bigint;
    accruingInterestAPR: number;
    durationOrDate: number;
    expiration: number;
    acceptorController: AddressString;
    acceptorControllerData: Hex;
    proposer: AddressString;
    proposerSpecHash: Hex;
    isOffer: boolean;
    refinancingLoanId: bigint;
    nonceSpace: bigint;
    nonce: bigint;
    loanContract: AddressString;

    collateralAddress: AddressString;
    checkCollateralStateFingerprint: boolean;
    collateralStateFingerprint: Hex;
    allowedAcceptor: AddressString;
    sourceOfFunds: AddressString | null;
    relatedStrategyId?: string | undefined;
}
