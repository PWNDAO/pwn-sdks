import type { AssetCategory } from "./asset-category";
import type { ChainIdEnum } from "./chain-id-enum";
/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestAvailableCreditLimit } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-available-credit-limit";
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestCollateralId } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-collateral-id";
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestFeedIntermediaryDenominations } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-feed-intermediary-denominations";
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestFeedInvertFlags } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-feed-invert-flags";
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestFixedInterestAmount } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-fixed-interest-amount";
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestHash } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-hash";
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestMinCreditAmount } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-min-credit-amount";
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestMultiproposalMerkleRoot } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-multiproposal-merkle-root";
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestNonce } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-nonce";
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestNonceSpace } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-nonce-space";
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestReferrer } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-referrer";
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestRefinancingLoanId } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-refinancing-loan-id";
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestRelatedThesisId } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-related-thesis-id";
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestSourceOfFunds } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-source-of-funds";
import type { V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestType } from "./v13-create-simple-loan-chainlink-proposal-request-schema-request-type";

export interface V13CreateSimpleLoanChainlinkProposalRequestSchemaRequest {
	check_collateral_state_fingerprint: boolean;
	collateral_state_fingerprint: string;
	credit_address: string;
	available_credit_limit: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestAvailableCreditLimit;
	allowed_acceptor: string;
	proposer: string;
	is_offer: boolean;
	refinancing_loan_id: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestRefinancingLoanId;
	nonce_space: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestNonceSpace;
	nonce: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestNonce;
	loan_contract: string;
	proposer_spec_hash: string;
	collateral_category: AssetCategory;
	collateral_address: string;
	collateral_id: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestCollateralId;
	min_credit_amount: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestMinCreditAmount;
	fixed_interest_amount: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestFixedInterestAmount;
	accruing_interest_apr: number;
	duration_or_date: number;
	feed_intermediary_denominations: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestFeedIntermediaryDenominations;
	feed_invert_flags: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestFeedInvertFlags;
	loan_to_value: number;
	expiration: number;
	utilized_credit_id: string;
	chain_id: ChainIdEnum;
	proposal_contract_address: string;
	multiproposal_merkle_root: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestMultiproposalMerkleRoot;
	hash: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestHash;
	signature: string;
	type: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestType;
	is_on_chain: boolean;
	source_of_funds?: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestSourceOfFunds;
	related_thesis_id?: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestRelatedThesisId;
	referrer?: V13CreateSimpleLoanChainlinkProposalRequestSchemaRequestReferrer;
}
