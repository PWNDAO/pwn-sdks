/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { FetchNFTEventsResponseNext } from './fetch-nft-events-response-next';
import type { NFTEvent } from './nftevent';

export interface FetchNFTEventsResponse {
  next?: FetchNFTEventsResponseNext;
  nft_events: NFTEvent[];
}
