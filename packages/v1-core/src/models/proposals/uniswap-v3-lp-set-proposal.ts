import { AddressString, Hex, MultiTokenCategory, SupportedChain } from "@pwndao/sdk-core";
import { ProposalType, type IUniswapV3LpSetProposalBase } from "./proposal-base.js";

export class UniswapV3LpSetProposal implements IUniswapV3LpSetProposalBase {
    type = ProposalType.UniswapV3LpSet as const;

    static ERC712_TYPES = {
        Proposal: [
            { name: "tokenAAllowlist", type: "address[]" },
            { name: "tokenBAllowlist", type: "address[]" },
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
            { name: "loanContract", type: "address" },
        ],
    };

    constructor(
        proposal: Omit<IUniswapV3LpSetProposalBase, "type">,
        chainId: SupportedChain,
    ) {
        this.chainId = chainId;
        this.collateralId = proposal.collateralId;
        this.collateralAddress = proposal.collateralAddress;
        this.checkCollateralStateFingerprint = proposal.checkCollateralStateFingerprint;
        this.collateralStateFingerprint = proposal.collateralStateFingerprint;
        this.collateralCategory = proposal.collateralCategory;
        this.sourceOfFunds = proposal.sourceOfFunds;
        this.allowedAcceptor = proposal.allowedAcceptor;
        this.tokenAAllowlist = proposal.tokenAAllowlist;
        this.tokenBAllowlist = proposal.tokenBAllowlist;
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
    }

    createProposalStruct(): any {
        return {
            collateralCategory: this.collateralCategory,
            collateralAddress: this.collateralAddress,
            collateralId: this.collateralId,
            checkCollateralStateFingerprint: this.checkCollateralStateFingerprint,
            collateralStateFingerprint: this.collateralStateFingerprint,

            tokenAAllowlist: this.tokenAAllowlist,
            tokenBAllowlist: this.tokenBAllowlist,
            creditAddress: this.creditAddress,
            feedIntermediaryDenominations: this.feedIntermediaryDenominations,
            feedInvertFlags: this.feedInvertFlags,
            loanToValue: this.loanToValue,
            minCreditAmount: this.minCreditAmount,
            availableCreditLimit: this.availableCreditLimit,
            utilizedCreditId: this.utilizedCreditId,
            fixedInterestAmount: this.fixedInterestAmount,
            accruingInterestAPR: Number(this.accruingInterestAPR),
            durationOrDate: Number(this.durationOrDate),
            expiration: this.expiration,
            acceptorController: this.acceptorController,
            acceptorControllerData: this.acceptorControllerData,
            proposer: this.proposer,
            proposerSpecHash: this.proposerSpecHash,
            isOffer: true,
            refinancingLoanId: 0n,
            nonceSpace: this.nonceSpace,
            nonce: this.nonce,
            loanContract: this.loanContract            
        }
    }

    collateralId: bigint;
    collateralAddress: AddressString;
    checkCollateralStateFingerprint: boolean;
    collateralStateFingerprint: Hex;
    collateralCategory: MultiTokenCategory;
    sourceOfFunds: AddressString | null;
    allowedAcceptor: AddressString;
    chainId: SupportedChain;

    tokenAAllowlist: AddressString[];
    tokenBAllowlist: AddressString[];
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
    acceptorController: AddressString | null;
    acceptorControllerData: Hex | null;
    proposer: AddressString;
    proposerSpecHash: Hex;
    isOffer: true;
    refinancingLoanId: bigint;
    nonceSpace: bigint;
    nonce: bigint;
    loanContract: AddressString;
}