import type { AssetDetailSchemaWorkaround } from "./asset-detail-schema-workaround";
import type { ChainIdEnum } from "./chain-id-enum";
import type { CreditDataSchemaWorkaround } from "./credit-data-schema-workaround";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundAllowedAcceptor } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-allowed-acceptor";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundCollateralStateFingerprint } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-collateral-state-fingerprint";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundCreatedFromProposalId } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-created-from-proposal-id";
/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundDuration } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-duration";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundExpiration } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-expiration";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundHash } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-hash";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundLoanDefaultDate } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-loan-default-date";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundMinCollateralAmount } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-min-collateral-amount";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundMinCreditAmount } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-min-credit-amount";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundMultiproposalMerkleRoot } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-multiproposal-merkle-root";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundNonce } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-nonce";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundNonceSpace } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-nonce-space";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundProposalContractAddress } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-proposal-contract-address";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundProposalId } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-proposal-id";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundProposerSpecHash } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-proposer-spec-hash";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundRefinancingLoanId } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-refinancing-loan-id";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundRelatedThesisId } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-related-thesis-id";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundRevokedAt } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-revoked-at";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundSignature } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-signature";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundSourceOfFunds } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-source-of-funds";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundStatus } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-status";
import type { V11SimpleLoanSimpleProposalDetailSchemaWorkaroundType } from "./v11-simple-loan-simple-proposal-detail-schema-workaround-type";

export interface V11SimpleLoanSimpleProposalDetailSchemaWorkaround {
	id: string;
	duration: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundDuration;
	loanDefaultDate?: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundLoanDefaultDate;
	expiration?: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundExpiration;
	status: (typeof V11SimpleLoanSimpleProposalDetailSchemaWorkaroundStatus)[keyof typeof V11SimpleLoanSimpleProposalDetailSchemaWorkaroundStatus];
	collateral: AssetDetailSchemaWorkaround;
	collateralAmount: string;
	minCollateralAmount?: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundMinCollateralAmount;
	minCreditAmount?: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundMinCreditAmount;
	creditData: CreditDataSchemaWorkaround;
	creditAsset: AssetDetailSchemaWorkaround;
	chainId: ChainIdEnum;
	proposalContractAddress?: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundProposalContractAddress;
	proposalId?: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundProposalId;
	loanContract: string;
	proposer: string;
	isOffer: boolean;
	type: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundType;
	sourceOfFunds?: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundSourceOfFunds;
	relatedThesisId?: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundRelatedThesisId;
	createdFromProposalId?: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundCreatedFromProposalId;
	checkCollateralStateFingerprint: boolean;
	collateralStateFingerprint: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundCollateralStateFingerprint;
	availableCreditLimit: string;
	allowedAcceptor: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundAllowedAcceptor;
	refinancingLoanId: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundRefinancingLoanId;
	nonceSpace: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundNonceSpace;
	nonce: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundNonce;
	proposerSpecHash: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundProposerSpecHash;
	signature: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundSignature;
	multiproposalMerkleRoot: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundMultiproposalMerkleRoot;
	isOnChain: boolean;
	hash: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundHash;
	createdAt: number;
	revokedAt: V11SimpleLoanSimpleProposalDetailSchemaWorkaroundRevokedAt;
}
