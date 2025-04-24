import type {
	AddressString,
	Hex,
	MultiTokenCategory,
	SupportedChain,
} from "@pwndao/sdk-core";
import type { IBaseTerms } from "../terms.js";

type ProposalTerms = Pick<
	IBaseTerms,
	"fixedInterestAmount" | "accruingInterestAPR"
>;

export enum ProposalType {
	Elastic = "pwn_contracts.v1_3simpleloanelasticproposal",
	DutchAuction = "pwn_contracts.v1_3simpleloandutchauctionproposal",
	Simple = "pwn_contracts.v1_3simpleloansimpleproposal",
	ChainLink = "pwn_contracts.v1_3simpleloanelasticchainlinkproposal",
}

export interface IProposalMisc {
	relatedStrategyId?: string;
	isOffer: boolean;
}

interface IProposalBase extends IProposalMisc {
	collateralAddress: AddressString;
	collateralId: bigint;
	checkCollateralStateFingerprint: boolean;
	collateralStateFingerprint: Hex;
	availableCreditLimit: bigint;
	utilizedCreditId: Hex;
	expiration: number;
	allowedAcceptor: AddressString;
	proposer: AddressString;
	isOffer: boolean;
	refinancingLoanId: bigint;
	nonceSpace: bigint;

	// not part of the proposal struct
	chainId: SupportedChain;
	type: ProposalType;
}

export interface ICommonProposalFields extends ProposalTerms, IProposalMisc {
	/**
	 * Category of an asset used as a collateral (0 == ERC20, 1 == ERC721, 2 == ERC1155).
	 */
	collateralCategory: MultiTokenCategory;

	/**
	 * Address of an asset used as a collateral.
	 */
	collateralAddress: AddressString;

	/**
	 * Token id of an asset used as a collateral, in case of ERC20 should be 0.
	 */
	collateralId: bigint;

	/**
	 * If true, the collateral state fingerprint will be checked during proposal acceptance.
	 */
	checkCollateralStateFingerprint: boolean;

	/**
	 * Fingerprint of a collateral state. It is used to check if a collateral is in a valid state.
	 */
	collateralStateFingerprint: Hex;

	/**
	 * Address of an asset which is lended to a borrower.
	 */
	creditAddress: AddressString;

	/**
	 * Available credit limit for the proposal. It is the maximum amount of tokens which can be borrowed using the proposal. If non-zero, proposal can be accepted more than once, until the credit limit is reached.
	 */
	availableCreditLimit: bigint;

	/**
	 * Id of utilized credit. Can be shared between multiple proposals.
	 */
	utilizedCreditId: Hex;

	/**
	 * Duration of a loan in seconds. If the value is greater than 10^9, it is treated as a timestamp of a loan end.
	 */
	durationOrDate: number;

	/**
	 * Proposal expiration timestamp in seconds.
	 */
	expiration: number;

	/**
	 * Address that is allowed to accept proposal. If the address is zero address, anybody can accept the proposal.
	 */
	allowedAcceptor: AddressString;

	/**
	 * Address of a proposal signer. If `isOffer` is true, the proposer is the lender. If `isOffer` is false, the proposer is the borrower.
	 */
	proposer: AddressString;

	/**
	 * Hash of a proposer specific data, which must be provided during a loan creation.
	 */
	proposerSpecHash: Hex;

	/**
	 * If true, the proposal is an offer. If false, the proposal is a request.
	 */
	isOffer: boolean;

	/**
	 * Id of a loan which is refinanced by this proposal. If the id is 0 and `isOffer` is true, the proposal can refinance any loan.
	 */
	refinancingLoanId: bigint;

	/**
	 * Nonce space of a proposal nonce. All nonces in the same space can be revoked at once.
	 */
	nonceSpace: bigint;

	/**
	 * Additional value to enable identical proposals in time. Without it, it would be impossible to make again proposal, which was once revoked. Can be used to create a group of proposals, where accepting one will make others in the group invalid.
	 */
	nonce: bigint;

	/**
	 * Address of a loan contract that will create a loan from the proposal.
	 */
	loanContract: AddressString;
	
	/**
	 * Address of a source of funds. This can be the lenders address, if the loan is funded directly,
	 * or a pool address from with the funds are withdrawn on the lenders behalf.
	 */
	sourceOfFunds: AddressString | null;
}

export interface IElasticProposalBase
	extends IProposalBase,
		ICommonProposalFields {
	/**
	 * Amount of tokens which are offered per collateral unit with 38 decimals.
	 */
	creditPerCollateralUnit: bigint;

	/**
	 * Minimum amount of tokens which can be borrowed using the proposal.
	 */
	minCreditAmount: bigint;

	type: ProposalType.Elastic;
}

export interface IOracleProposalBase
	extends IProposalBase,
		ICommonProposalFields {
	/**
	 * List of intermediary price feeds that will be fetched to get to the collateral asset denominator.
	 */
	feedIntermediaryDenominations: AddressString[];

	/**
	 * List of flags indicating if price feeds exist only for inverted base and quote assets.
	 */
	feedInvertFlags: boolean[];

	/**
	 * Loan to value ratio with 1e4 decimals. E.g., 6231 == 0.6231 == 62.31%.
	 */
	loanToValue: bigint;

	/**
	 * Minimum amount of tokens which can be borrowed using the proposal.
	 */
	minCreditAmount: bigint;

	type: ProposalType.ChainLink;
}

interface IBaseFixedProposal {
	/**
	 * Amount of tokens used as a collateral, in case of ERC721 should be 0.
	 */
	collateralAmount: bigint;

	/**
	 * Amount of tokens which is proposed as a loan to a borrower.
	 */
	creditAmount: bigint;
}

export interface IListProposalBase
	extends IProposalBase,
		IBaseFixedProposal,
		ICommonProposalFields {
	/**
	 * Merkle tree root of a set of whitelisted collateral ids.
	 */
	collateralIdsWhitelistMerkleRoot: Hex[];
}

export interface ISimpleProposalBase
	extends IProposalBase,
		ICommonProposalFields {}
