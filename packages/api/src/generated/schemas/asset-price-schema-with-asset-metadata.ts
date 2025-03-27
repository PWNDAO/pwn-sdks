/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { AmountInEthAndUsd } from './amount-in-eth-and-usd';
import type { AssetPriceSchemaWithAssetMetadataUnitPrice } from './asset-price-schema-with-asset-metadata-unit-price';
import type { AssetPriceSchemaWithAssetMetadataPricePercentageDeviation } from './asset-price-schema-with-asset-metadata-price-percentage-deviation';
import type { AssetPriceSchemaWithAssetMetadataPriceSource } from './asset-price-schema-with-asset-metadata-price-source';
import type { AssetPriceSchemaWithAssetMetadataDate } from './asset-price-schema-with-asset-metadata-date';
import type { AssetPriceSchemaWithAssetMetadataPriceRangeLow } from './asset-price-schema-with-asset-metadata-price-range-low';
import type { AssetPriceSchemaWithAssetMetadataPriceRangeHigh } from './asset-price-schema-with-asset-metadata-price-range-high';
import type { AssetMetadata } from './asset-metadata';

export interface AssetPriceSchemaWithAssetMetadata {
  price: AmountInEthAndUsd;
  unit_price?: AssetPriceSchemaWithAssetMetadataUnitPrice;
  price_percentage_deviation?: AssetPriceSchemaWithAssetMetadataPricePercentageDeviation;
  price_source?: AssetPriceSchemaWithAssetMetadataPriceSource;
  created_at: string;
  date: AssetPriceSchemaWithAssetMetadataDate;
  price_range_low?: AssetPriceSchemaWithAssetMetadataPriceRangeLow;
  price_range_high?: AssetPriceSchemaWithAssetMetadataPriceRangeHigh;
  asset_metadata: AssetMetadata;
}
