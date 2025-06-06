import type { AssetCategory } from "./asset-category";
import type { ChainIdEnum } from "./chain-id-enum";
/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestAvailableCreditLimit } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-available-credit-limit";
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestCollateralAmount } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-collateral-amount";
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestCollateralId } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-collateral-id";
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestFixedInterestAmount } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-fixed-interest-amount";
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestHash } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-hash";
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestMaxCreditAmount } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-max-credit-amount";
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestMinCreditAmount } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-min-credit-amount";
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestMultiproposalMerkleRoot } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-multiproposal-merkle-root";
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestNonce } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-nonce";
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestNonceSpace } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-nonce-space";
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestReferrer } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-referrer";
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestRefinancingLoanId } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-refinancing-loan-id";
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestRelatedThesisId } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-related-thesis-id";
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestSourceOfFunds } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-source-of-funds";
import type { CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestType } from "./create-simple-loan-dutch-auction-proposal-request-schema-request-type";

export interface CreateSimpleLoanDutchAuctionProposalRequestSchemaRequest {
	check_collateral_state_fingerprint: boolean;
	collateral_state_fingerprint: string;
	credit_address: string;
	available_credit_limit: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestAvailableCreditLimit;
	allowed_acceptor: string;
	proposer: string;
	is_offer: boolean;
	refinancing_loan_id: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestRefinancingLoanId;
	nonce_space: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestNonceSpace;
	nonce: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestNonce;
	loan_contract: string;
	proposer_spec_hash: string;
	collateral_category: AssetCategory;
	collateral_address: string;
	collateral_id: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestCollateralId;
	collateral_amount: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestCollateralAmount;
	min_credit_amount: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestMinCreditAmount;
	max_credit_amount: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestMaxCreditAmount;
	fixed_interest_amount: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestFixedInterestAmount;
	accruing_interest_apr: number;
	duration: number;
	auction_start: number;
	auction_duration: number;
	chain_id: ChainIdEnum;
	proposal_contract_address: string;
	multiproposal_merkle_root: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestMultiproposalMerkleRoot;
	hash: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestHash;
	signature: string;
	type: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestType;
	is_on_chain: boolean;
	source_of_funds?: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestSourceOfFunds;
	related_thesis_id?: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestRelatedThesisId;
	referrer?: CreateSimpleLoanDutchAuctionProposalRequestSchemaRequestReferrer;
}
