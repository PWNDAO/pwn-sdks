/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { OfferFilterSettingsMinApy } from './offer-filter-settings-min-apy';
import type { OfferFilterSettingsMaxApy } from './offer-filter-settings-max-apy';
import type { OfferFilterSettingsMinLtv } from './offer-filter-settings-min-ltv';
import type { OfferFilterSettingsMaxLtv } from './offer-filter-settings-max-ltv';

export interface OfferFilterSettings {
  readonly id: number;
  only_verified_tokens?: boolean;
  only_relevant_offers?: boolean;
  filter_apy?: boolean;
  min_apy?: OfferFilterSettingsMinApy;
  max_apy?: OfferFilterSettingsMaxApy;
  filter_ltv?: boolean;
  min_ltv?: OfferFilterSettingsMinLtv;
  max_ltv?: OfferFilterSettingsMaxLtv;
}
