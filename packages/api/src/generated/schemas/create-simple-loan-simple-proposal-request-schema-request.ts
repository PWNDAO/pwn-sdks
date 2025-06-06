import type { AssetCategory } from "./asset-category";
import type { ChainIdEnum } from "./chain-id-enum";
/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { CreateSimpleLoanSimpleProposalRequestSchemaRequestAvailableCreditLimit } from "./create-simple-loan-simple-proposal-request-schema-request-available-credit-limit";
import type { CreateSimpleLoanSimpleProposalRequestSchemaRequestCollateralAmount } from "./create-simple-loan-simple-proposal-request-schema-request-collateral-amount";
import type { CreateSimpleLoanSimpleProposalRequestSchemaRequestCollateralId } from "./create-simple-loan-simple-proposal-request-schema-request-collateral-id";
import type { CreateSimpleLoanSimpleProposalRequestSchemaRequestCreditAmount } from "./create-simple-loan-simple-proposal-request-schema-request-credit-amount";
import type { CreateSimpleLoanSimpleProposalRequestSchemaRequestFixedInterestAmount } from "./create-simple-loan-simple-proposal-request-schema-request-fixed-interest-amount";
import type { CreateSimpleLoanSimpleProposalRequestSchemaRequestHash } from "./create-simple-loan-simple-proposal-request-schema-request-hash";
import type { CreateSimpleLoanSimpleProposalRequestSchemaRequestMultiproposalMerkleRoot } from "./create-simple-loan-simple-proposal-request-schema-request-multiproposal-merkle-root";
import type { CreateSimpleLoanSimpleProposalRequestSchemaRequestNonce } from "./create-simple-loan-simple-proposal-request-schema-request-nonce";
import type { CreateSimpleLoanSimpleProposalRequestSchemaRequestNonceSpace } from "./create-simple-loan-simple-proposal-request-schema-request-nonce-space";
import type { CreateSimpleLoanSimpleProposalRequestSchemaRequestReferrer } from "./create-simple-loan-simple-proposal-request-schema-request-referrer";
import type { CreateSimpleLoanSimpleProposalRequestSchemaRequestRefinancingLoanId } from "./create-simple-loan-simple-proposal-request-schema-request-refinancing-loan-id";
import type { CreateSimpleLoanSimpleProposalRequestSchemaRequestRelatedThesisId } from "./create-simple-loan-simple-proposal-request-schema-request-related-thesis-id";
import type { CreateSimpleLoanSimpleProposalRequestSchemaRequestSourceOfFunds } from "./create-simple-loan-simple-proposal-request-schema-request-source-of-funds";
import type { CreateSimpleLoanSimpleProposalRequestSchemaRequestType } from "./create-simple-loan-simple-proposal-request-schema-request-type";

export interface CreateSimpleLoanSimpleProposalRequestSchemaRequest {
	check_collateral_state_fingerprint: boolean;
	collateral_state_fingerprint: string;
	credit_address: string;
	available_credit_limit: CreateSimpleLoanSimpleProposalRequestSchemaRequestAvailableCreditLimit;
	allowed_acceptor: string;
	proposer: string;
	is_offer: boolean;
	refinancing_loan_id: CreateSimpleLoanSimpleProposalRequestSchemaRequestRefinancingLoanId;
	nonce_space: CreateSimpleLoanSimpleProposalRequestSchemaRequestNonceSpace;
	nonce: CreateSimpleLoanSimpleProposalRequestSchemaRequestNonce;
	loan_contract: string;
	proposer_spec_hash: string;
	collateral_category: AssetCategory;
	collateral_address: string;
	collateral_id: CreateSimpleLoanSimpleProposalRequestSchemaRequestCollateralId;
	collateral_amount: CreateSimpleLoanSimpleProposalRequestSchemaRequestCollateralAmount;
	credit_amount: CreateSimpleLoanSimpleProposalRequestSchemaRequestCreditAmount;
	fixed_interest_amount: CreateSimpleLoanSimpleProposalRequestSchemaRequestFixedInterestAmount;
	accruing_interest_apr: number;
	duration: number;
	expiration: number;
	chain_id: ChainIdEnum;
	proposal_contract_address: string;
	multiproposal_merkle_root: CreateSimpleLoanSimpleProposalRequestSchemaRequestMultiproposalMerkleRoot;
	hash: CreateSimpleLoanSimpleProposalRequestSchemaRequestHash;
	signature: string;
	type: CreateSimpleLoanSimpleProposalRequestSchemaRequestType;
	is_on_chain: boolean;
	source_of_funds?: CreateSimpleLoanSimpleProposalRequestSchemaRequestSourceOfFunds;
	related_thesis_id?: CreateSimpleLoanSimpleProposalRequestSchemaRequestRelatedThesisId;
	referrer?: CreateSimpleLoanSimpleProposalRequestSchemaRequestReferrer;
}
