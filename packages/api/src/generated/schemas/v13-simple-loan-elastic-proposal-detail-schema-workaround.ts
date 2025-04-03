import type { AssetDetailSchemaWorkaround } from "./asset-detail-schema-workaround";
import type { ChainIdEnum } from "./chain-id-enum";
import type { CreditDataSchemaWorkaround } from "./credit-data-schema-workaround";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundAllowedAcceptor } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-allowed-acceptor";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundCollateralStateFingerprint } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-collateral-state-fingerprint";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundCreatedFromProposalId } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-created-from-proposal-id";
/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundDuration } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-duration";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundExpiration } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-expiration";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundHash } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-hash";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundLoanDefaultDate } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-loan-default-date";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundMinCollateralAmount } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-min-collateral-amount";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundMultiproposalMerkleRoot } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-multiproposal-merkle-root";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundNonce } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-nonce";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundNonceSpace } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-nonce-space";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundProposalContractAddress } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-proposal-contract-address";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundProposalId } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-proposal-id";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundProposalSpecificData } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-proposal-specific-data";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundProposerSpecHash } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-proposer-spec-hash";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundReferrer } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-referrer";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundRefinancingLoanId } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-refinancing-loan-id";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundRelatedThesisId } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-related-thesis-id";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundRevokedAt } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-revoked-at";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundSignature } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-signature";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundSourceOfFunds } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-source-of-funds";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundStatus } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-status";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundType } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-type";
import type { V13SimpleLoanElasticProposalDetailSchemaWorkaroundUtilizedCreditId } from "./v13-simple-loan-elastic-proposal-detail-schema-workaround-utilized-credit-id";

export interface V13SimpleLoanElasticProposalDetailSchemaWorkaround {
	id: string;
	duration: V13SimpleLoanElasticProposalDetailSchemaWorkaroundDuration;
	loanDefaultDate?: V13SimpleLoanElasticProposalDetailSchemaWorkaroundLoanDefaultDate;
	expiration?: V13SimpleLoanElasticProposalDetailSchemaWorkaroundExpiration;
	status: (typeof V13SimpleLoanElasticProposalDetailSchemaWorkaroundStatus)[keyof typeof V13SimpleLoanElasticProposalDetailSchemaWorkaroundStatus];
	collateral: AssetDetailSchemaWorkaround;
	collateralAmount: string;
	minCollateralAmount?: V13SimpleLoanElasticProposalDetailSchemaWorkaroundMinCollateralAmount;
	minCreditAmount: string;
	creditData: CreditDataSchemaWorkaround;
	creditAsset: AssetDetailSchemaWorkaround;
	chainId: ChainIdEnum;
	proposalContractAddress?: V13SimpleLoanElasticProposalDetailSchemaWorkaroundProposalContractAddress;
	proposalId?: V13SimpleLoanElasticProposalDetailSchemaWorkaroundProposalId;
	loanContract: string;
	proposer: string;
	isOffer: boolean;
	type: V13SimpleLoanElasticProposalDetailSchemaWorkaroundType;
	sourceOfFunds?: V13SimpleLoanElasticProposalDetailSchemaWorkaroundSourceOfFunds;
	relatedThesisId?: V13SimpleLoanElasticProposalDetailSchemaWorkaroundRelatedThesisId;
	createdFromProposalId?: V13SimpleLoanElasticProposalDetailSchemaWorkaroundCreatedFromProposalId;
	proposalSpecificData?: V13SimpleLoanElasticProposalDetailSchemaWorkaroundProposalSpecificData;
	checkCollateralStateFingerprint: boolean;
	collateralStateFingerprint: V13SimpleLoanElasticProposalDetailSchemaWorkaroundCollateralStateFingerprint;
	availableCreditLimit: string;
	allowedAcceptor: V13SimpleLoanElasticProposalDetailSchemaWorkaroundAllowedAcceptor;
	refinancingLoanId: V13SimpleLoanElasticProposalDetailSchemaWorkaroundRefinancingLoanId;
	nonceSpace: V13SimpleLoanElasticProposalDetailSchemaWorkaroundNonceSpace;
	nonce: V13SimpleLoanElasticProposalDetailSchemaWorkaroundNonce;
	proposerSpecHash: V13SimpleLoanElasticProposalDetailSchemaWorkaroundProposerSpecHash;
	signature: V13SimpleLoanElasticProposalDetailSchemaWorkaroundSignature;
	multiproposalMerkleRoot: V13SimpleLoanElasticProposalDetailSchemaWorkaroundMultiproposalMerkleRoot;
	isOnChain: boolean;
	hash: V13SimpleLoanElasticProposalDetailSchemaWorkaroundHash;
	createdAt: number;
	revokedAt: V13SimpleLoanElasticProposalDetailSchemaWorkaroundRevokedAt;
	referrer: V13SimpleLoanElasticProposalDetailSchemaWorkaroundReferrer;
	durationOrDate: number;
	maxAvailableCreditAmount: string;
	utilizedCreditId: V13SimpleLoanElasticProposalDetailSchemaWorkaroundUtilizedCreditId;
}
