/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { AssetMetadataAssetDbId } from './asset-metadata-asset-db-id';
import type { ChainIdEnum } from './chain-id-enum';
import type { AssetMetadataTokenId } from './asset-metadata-token-id';
import type { AssetMetadataDecimals } from './asset-metadata-decimals';
import type { AssetMetadataName } from './asset-metadata-name';
import type { AssetMetadataSymbol } from './asset-metadata-symbol';
import type { AssetMetadataThumbnailUrl } from './asset-metadata-thumbnail-url';
import type { AssetMetadataIsVerified } from './asset-metadata-is-verified';

export interface AssetMetadata {
  asset_db_id?: AssetMetadataAssetDbId;
  chain_id: ChainIdEnum;
  contract_address: string;
  token_id?: AssetMetadataTokenId;
  decimals?: AssetMetadataDecimals;
  name?: AssetMetadataName;
  symbol?: AssetMetadataSymbol;
  thumbnail_url?: AssetMetadataThumbnailUrl;
  is_verified?: AssetMetadataIsVerified;
}
