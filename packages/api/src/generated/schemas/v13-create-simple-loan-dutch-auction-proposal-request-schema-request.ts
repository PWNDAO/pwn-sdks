import type { AssetCategory } from "./asset-category";
import type { ChainIdEnum } from "./chain-id-enum";
/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestAvailableCreditLimit } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-available-credit-limit";
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestCollateralAmount } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-collateral-amount";
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestCollateralId } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-collateral-id";
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestFixedInterestAmount } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-fixed-interest-amount";
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestHash } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-hash";
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestMaxCreditAmount } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-max-credit-amount";
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestMinCreditAmount } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-min-credit-amount";
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestMultiproposalMerkleRoot } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-multiproposal-merkle-root";
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestNonce } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-nonce";
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestNonceSpace } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-nonce-space";
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestReferrer } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-referrer";
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestRefinancingLoanId } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-refinancing-loan-id";
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestRelatedThesisId } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-related-thesis-id";
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestSourceOfFunds } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-source-of-funds";
import type { V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestType } from "./v13-create-simple-loan-dutch-auction-proposal-request-schema-request-type";

export interface V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequest {
	check_collateral_state_fingerprint: boolean;
	collateral_state_fingerprint: string;
	credit_address: string;
	available_credit_limit: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestAvailableCreditLimit;
	allowed_acceptor: string;
	proposer: string;
	is_offer: boolean;
	refinancing_loan_id: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestRefinancingLoanId;
	nonce_space: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestNonceSpace;
	nonce: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestNonce;
	loan_contract: string;
	proposer_spec_hash: string;
	collateral_category: AssetCategory;
	collateral_address: string;
	collateral_id: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestCollateralId;
	collateral_amount: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestCollateralAmount;
	min_credit_amount: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestMinCreditAmount;
	max_credit_amount: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestMaxCreditAmount;
	fixed_interest_amount: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestFixedInterestAmount;
	accruing_interest_apr: number;
	duration: number;
	auction_start: number;
	auction_duration: number;
	chain_id: ChainIdEnum;
	proposal_contract_address: string;
	multiproposal_merkle_root: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestMultiproposalMerkleRoot;
	hash: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestHash;
	signature: string;
	type: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestType;
	is_on_chain: boolean;
	source_of_funds?: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestSourceOfFunds;
	related_thesis_id?: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestRelatedThesisId;
	referrer?: V13CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestReferrer;
}
