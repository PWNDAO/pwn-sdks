import {
	type AddressString,
	EMPTY_32_BYTES,
	type MultiTokenCategory,
	type SupportedChain,
	getElasticProposalContractAddress,
	getLoanContractAddress,
} from "@pwndao/sdk-core";
import type { V1_3SimpleLoanElasticProposalStruct } from "../../structs.js";
import { type IElasticProposalBase, ProposalType } from "./proposal-base.js";

export class ElasticProposal implements IElasticProposalBase {
	type = ProposalType.Elastic as const;

	static ERC712_TYPES = {
		Proposal: [
			{ name: "collateralCategory", type: "uint8" },
			{ name: "collateralAddress", type: "address" },
			{ name: "collateralId", type: "uint256" },
			{ name: "checkCollateralStateFingerprint", type: "bool" },
			{ name: "collateralStateFingerprint", type: "bytes32" },
			{ name: "creditAddress", type: "address" },
			{ name: "creditPerCollateralUnit", type: "uint256" },
			{ name: "minCreditAmount", type: "uint256" },
			{ name: "availableCreditLimit", type: "uint256" },
			{ name: "utilizedCreditId", type: "bytes32" },
			{ name: "fixedInterestAmount", type: "uint256" },
			{ name: "accruingInterestAPR", type: "uint24" },
			{ name: "durationOrDate", type: "uint32" },
			{ name: "expiration", type: "uint40" },
			{ name: "allowedAcceptor", type: "address" },
			{ name: "proposer", type: "address" },
			{ name: "proposerSpecHash", type: "bytes32" },
			{ name: "isOffer", type: "bool" },
			{ name: "refinancingLoanId", type: "uint256" },
			{ name: "nonceSpace", type: "uint256" },
			{ name: "nonce", type: "uint256" },
			{ name: "loanContract", type: "address" },
		],
	};

	public createProposalStruct(): V1_3SimpleLoanElasticProposalStruct {
		return {
			creditPerCollateralUnit: this.creditPerCollateralUnit,

			// rest is the same as in ChainLinkProposal
			collateralCategory: this.collateralCategory,
			collateralAddress: this.collateralAddress,
			collateralId: this.collateralId,
			checkCollateralStateFingerprint: this.checkCollateralStateFingerprint,
			collateralStateFingerprint: this.collateralStateFingerprint,
			creditAddress: this.creditAddress,
			minCreditAmount: this.minCreditAmount,
			availableCreditLimit: this.availableCreditLimit,
			utilizedCreditId: this.utilizedCreditId,
			fixedInterestAmount: this.fixedInterestAmount,
			accruingInterestAPR: Number(this.accruingInterestAPR),
			durationOrDate: Number(this.durationOrDate),
			expiration: this.expiration,
			// allowedAcceptor: this.allowedAcceptor, // TODO: some type error, check later if correct
			acceptorController: EMPTY_32_BYTES, // TODO: add this once V1.4 is implemented
			acceptorControllerData: EMPTY_32_BYTES, // TODO: add this once V1.4 is implemented
			proposer: this.proposer,
			proposerSpecHash: this.isOffer ? this.proposerSpecHash : EMPTY_32_BYTES,
			isOffer: this.isOffer ?? false,
			refinancingLoanId: 0n,
			nonceSpace: this.nonceSpace,
			nonce: this.nonce,
			loanContract: this.loanContract,
		};
	}

	constructor(
		proposal: Omit<IElasticProposalBase, "type">,
		chainId: SupportedChain,
	) {
		this.creditPerCollateralUnit = proposal.creditPerCollateralUnit;
		this.minCreditAmount = proposal.minCreditAmount;
		this.collateralAddress = proposal.collateralAddress;
		this.collateralId = proposal.collateralId;
		this.checkCollateralStateFingerprint =
			proposal.checkCollateralStateFingerprint;
		this.collateralStateFingerprint = proposal.collateralStateFingerprint;
		this.availableCreditLimit = proposal.availableCreditLimit;
		this.utilizedCreditId = proposal.utilizedCreditId;
		this.expiration = proposal.expiration;
		this.allowedAcceptor = proposal.allowedAcceptor;
		this.proposer = proposal.proposer;
		this.isOffer = proposal.isOffer;
		this.refinancingLoanId = proposal.refinancingLoanId;
		this.nonceSpace = proposal.nonceSpace;
		this.nonce = proposal.nonce;
		this.loanContract = proposal.loanContract;
		this.fixedInterestAmount = proposal.fixedInterestAmount;
		this.accruingInterestAPR = proposal.accruingInterestAPR;
		this.durationOrDate = proposal.durationOrDate;
		this.proposerSpecHash = proposal.proposerSpecHash;
		this.collateralCategory = proposal.collateralCategory;
		this.creditAddress = proposal.creditAddress;

		this.proposalContract = getElasticProposalContractAddress(chainId);
		this.loanContract = getLoanContractAddress(chainId);
		this.type = ProposalType.Elastic;
		this.chainId = chainId;

		this.relatedStrategyId = proposal.relatedStrategyId;
		this.sourceOfFunds = proposal.sourceOfFunds;
	}

	creditPerCollateralUnit: bigint;
	minCreditAmount: bigint;
	collateralAddress: `0x${string}`;
	collateralId: bigint;
	checkCollateralStateFingerprint: boolean;
	collateralStateFingerprint: `0x${string}`;
	availableCreditLimit: bigint;
	utilizedCreditId: `0x${string}`;
	expiration: number;
	allowedAcceptor: `0x${string}`;
	proposer: `0x${string}`;
	isOffer: boolean;
	refinancingLoanId: bigint;
	nonceSpace: bigint;
	collateralCategory: MultiTokenCategory;
	creditAddress: `0x${string}`;
	durationOrDate: number;
	proposerSpecHash: `0x${string}`;
	nonce: bigint;
	fixedInterestAmount: bigint;
	accruingInterestAPR: number;

	chainId: SupportedChain;

	proposalContract: AddressString;
	loanContract: AddressString;

	relatedStrategyId?: string;
	sourceOfFunds: AddressString | null;
}
