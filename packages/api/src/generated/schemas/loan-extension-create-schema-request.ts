/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { LoanExtensionCreateSchemaRequestCompensationAssetAddress } from './loan-extension-create-schema-request-compensation-asset-address';
import type { LoanExtensionCreateSchemaRequestCompensationAmount } from './loan-extension-create-schema-request-compensation-amount';
import type { LoanExtensionCreateSchemaRequestNonceSpace } from './loan-extension-create-schema-request-nonce-space';
import type { LoanExtensionCreateSchemaRequestNonce } from './loan-extension-create-schema-request-nonce';
import type { LoanExtensionCreateSchemaRequestMessage } from './loan-extension-create-schema-request-message';

export interface LoanExtensionCreateSchemaRequest {
  compensation_asset_address: LoanExtensionCreateSchemaRequestCompensationAssetAddress;
  compensation_amount: LoanExtensionCreateSchemaRequestCompensationAmount;
  duration: number;
  expiration: number;
  proposer: string;
  nonce_space: LoanExtensionCreateSchemaRequestNonceSpace;
  nonce: LoanExtensionCreateSchemaRequestNonce;
  message?: LoanExtensionCreateSchemaRequestMessage;
  signature: string;
}
