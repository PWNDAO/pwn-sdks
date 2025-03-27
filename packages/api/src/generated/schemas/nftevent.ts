/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { EventTypeEnum } from './event-type-enum';
import type { MarketplaceEnum } from './marketplace-enum';
import type { NFTEventValue } from './nftevent-value';
import type { NFTEventTokenMetadata } from './nftevent-token-metadata';

export interface NFTEvent {
  event_type: EventTypeEnum;
  from_address: string;
  to_address: string;
  date: string;
  marketplace: MarketplaceEnum;
  quantity: number;
  value?: NFTEventValue;
  token_metadata?: NFTEventTokenMetadata;
}
