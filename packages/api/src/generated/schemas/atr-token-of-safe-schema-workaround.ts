/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { ChainIdEnum } from './chain-id-enum';
import type { TokenizedAssetSchemaWorkaround } from './tokenized-asset-schema-workaround';

export interface AtrTokenOfSafeSchemaWorkaround {
  chainId: ChainIdEnum;
  tokenId: string;
  atrTokenCreatedBy: string;
  tokenizedAssetOwner: string;
  tokenizedAmount: string;
  tokenizedAsset: TokenizedAssetSchemaWorkaround;
  isTokenizedAssetInUserSafe: boolean;
}
