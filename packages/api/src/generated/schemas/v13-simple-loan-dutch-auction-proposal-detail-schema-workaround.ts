/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundDuration } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-duration';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundLoanDefaultDate } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-loan-default-date';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundExpiration } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-expiration';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundStatus } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-status';
import type { AssetDetailSchemaWorkaround } from './asset-detail-schema-workaround';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundMinCollateralAmount } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-min-collateral-amount';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundMinCreditAmount } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-min-credit-amount';
import type { CreditDataSchemaWorkaround } from './credit-data-schema-workaround';
import type { ChainIdEnum } from './chain-id-enum';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundProposalContractAddress } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-proposal-contract-address';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundProposalId } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-proposal-id';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundType } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-type';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundSourceOfFunds } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-source-of-funds';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundRelatedThesisId } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-related-thesis-id';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundCreatedFromProposalId } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-created-from-proposal-id';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundCollateralStateFingerprint } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-collateral-state-fingerprint';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundAllowedAcceptor } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-allowed-acceptor';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundRefinancingLoanId } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-refinancing-loan-id';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundNonceSpace } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-nonce-space';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundNonce } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-nonce';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundProposerSpecHash } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-proposer-spec-hash';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundSignature } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-signature';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundMultiproposalMerkleRoot } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-multiproposal-merkle-root';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundHash } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-hash';
import type { V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundRevokedAt } from './v13-simple-loan-dutch-auction-proposal-detail-schema-workaround-revoked-at';

export interface V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaround {
  id: string;
  duration: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundDuration;
  loanDefaultDate?: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundLoanDefaultDate;
  expiration?: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundExpiration;
  status: (typeof V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundStatus)[keyof typeof V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundStatus];
  collateral: AssetDetailSchemaWorkaround;
  collateralAmount: string;
  minCollateralAmount?: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundMinCollateralAmount;
  minCreditAmount?: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundMinCreditAmount;
  creditData: CreditDataSchemaWorkaround;
  creditAsset: AssetDetailSchemaWorkaround;
  chainId: ChainIdEnum;
  proposalContractAddress?: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundProposalContractAddress;
  proposalId?: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundProposalId;
  loanContract: string;
  proposer: string;
  isOffer: boolean;
  type: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundType;
  sourceOfFunds?: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundSourceOfFunds;
  relatedThesisId?: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundRelatedThesisId;
  createdFromProposalId?: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundCreatedFromProposalId;
  checkCollateralStateFingerprint: boolean;
  collateralStateFingerprint: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundCollateralStateFingerprint;
  availableCreditLimit: string;
  allowedAcceptor: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundAllowedAcceptor;
  refinancingLoanId: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundRefinancingLoanId;
  nonceSpace: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundNonceSpace;
  nonce: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundNonce;
  proposerSpecHash: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundProposerSpecHash;
  signature: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundSignature;
  multiproposalMerkleRoot: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundMultiproposalMerkleRoot;
  isOnChain: boolean;
  hash: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundHash;
  createdAt: number;
  revokedAt: V13SimpleLoanDutchAuctionProposalDetailSchemaWorkaroundRevokedAt;
  auctionStart: number;
  durationOrDate: number;
}
