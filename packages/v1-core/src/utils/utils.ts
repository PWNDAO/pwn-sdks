import type {
	CreateProposalRequestSchemaRequest,
	V13CreateSimpleLoanChainlinkProposalRequestSchemaRequest,
	V13CreateSimpleLoanElasticProposalRequestSchemaRequest,
} from "@pwndao/api-sdk";
import { EMPTY_32_BYTES } from "@pwndao/sdk-core";
import type { ChainLinkProposal } from "../models/proposals/chainlink-proposal.js";
import type { ElasticProposal } from "../models/proposals/elastic-proposal.js";
import type {
	IElasticProposalBase,
	IOracleProposalBase,
} from "../models/proposals/proposal-base.js";
import type { ProposalWithSignature } from "../models/strategies/types.js";

/**
 * Converts common proposal fields to backend format
 * @param proposal Proposal object with common fields
 * @returns Backend-formatted proposal data
 */
export const getBaseBackendProposalData = (
	proposal: ProposalWithSignature,
): CreateProposalRequestSchemaRequest => {
	return {
		check_collateral_state_fingerprint:
			proposal.checkCollateralStateFingerprint,
		collateral_state_fingerprint: proposal.collateralStateFingerprint,

		credit_address: proposal.creditAddress,
		available_credit_limit: String(proposal.availableCreditLimit),

		allowed_acceptor: proposal.allowedAcceptor,
		proposer: proposal.proposer,
		is_offer: proposal.isOffer,

		refinancing_loan_id: String(proposal.refinancingLoanId),
		nonce_space: String(proposal.nonceSpace),
		nonce: String(proposal.nonce),

		loan_contract: proposal.loanContract,

		proposer_spec_hash: proposal.proposerSpecHash,

		collateral_category: proposal.collateralCategory,
		collateral_address: proposal.collateralAddress,
		collateral_id: String(proposal.collateralId),

		min_credit_amount: String(proposal.minCreditAmount),

		fixed_interest_amount: String(proposal.fixedInterestAmount),
		accruing_interest_apr: Number(proposal.accruingInterestAPR),
		duration_or_date: Number(proposal.durationOrDate),
		expiration: proposal.expiration,

		utilized_credit_id: proposal.utilizedCreditId,

		chain_id: proposal.chainId,

		proposal_contract_address: proposal.proposalContract,
		multiproposal_merkle_root:
			proposal.multiproposalMerkleRoot || EMPTY_32_BYTES,
		hash: proposal.hash,
		signature: proposal.signature,

		type: proposal.type,
		is_on_chain: proposal.isOnChain || false,
		source_of_funds: proposal.sourceOfFunds,
		related_thesis_id: Number(proposal.relatedStrategyId),
	} as CreateProposalRequestSchemaRequest;
};

/**
 * Encodes an ElasticProposal for the backend
 * @param proposal ElasticProposal instance
 * @returns Backend-formatted elastic proposal data
 */
export const encodeElasticProposalForBackend = (
	proposal: ElasticProposal,
): CreateProposalRequestSchemaRequest => {
	const baseData = getBaseBackendProposalData(
		proposal as unknown as ProposalWithSignature,
	);

	return {
		...baseData,
		credit_per_collateral_unit: String(proposal.creditPerCollateralUnit),
		related_thesis_id: proposal.relatedStrategyId,
		is_offer: proposal.isOffer
	} as V13CreateSimpleLoanElasticProposalRequestSchemaRequest;
};

/**
 * Encodes a ChainLinkProposal for the backend
 * @param proposal ChainLinkProposal instance
 * @returns Backend-formatted chainlink proposal data
 */
export const encodeChainLinkProposalForBackend = (
	proposal: ChainLinkProposal,
): CreateProposalRequestSchemaRequest => {
	const baseData = getBaseBackendProposalData(
		proposal as ProposalWithSignature,
	);

	return {
		...baseData,
		feed_intermediary_denominations: proposal.feedIntermediaryDenominations,
		feed_invert_flags: proposal.feedInvertFlags,
		loan_to_value: Number(proposal.loanToValue.toString()),
	} as V13CreateSimpleLoanChainlinkProposalRequestSchemaRequest;
};

/**
 * Detects the proposal type and encodes it accordingly for the backend
 * @param proposal Any proposal instance
 * @returns Backend-formatted proposal data
 */
export const encodeProposalForBackend = (
	proposal: IElasticProposalBase | IOracleProposalBase,
): CreateProposalRequestSchemaRequest => {
	// Detect the proposal type
	if (
		"feedIntermediaryDenominations" in proposal &&
		"feedInvertFlags" in proposal
	) {
		return encodeChainLinkProposalForBackend(proposal as ChainLinkProposal);
	}

	if ("creditPerCollateralUnit" in proposal) {
		return encodeElasticProposalForBackend(proposal as ElasticProposal);
	}

	// If no specific type is detected, use the base encoder
	return getBaseBackendProposalData(
		proposal as unknown as ProposalWithSignature,
	);
};
