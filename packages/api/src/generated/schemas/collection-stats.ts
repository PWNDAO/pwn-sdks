import type { CollectionStatsAverageAppraisal } from "./collection-stats-average-appraisal";
/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { CollectionStatsFloorPrice } from "./collection-stats-floor-price";
import type { CollectionStatsMarketCap } from "./collection-stats-market-cap";
import type { CollectionStatsPastDayAverage } from "./collection-stats-past-day-average";
import type { CollectionStatsPastDayVolume } from "./collection-stats-past-day-volume";
import type { CollectionStatsPastMonthAverage } from "./collection-stats-past-month-average";
import type { CollectionStatsPastMonthSales } from "./collection-stats-past-month-sales";
import type { CollectionStatsPastMonthVolume } from "./collection-stats-past-month-volume";
import type { CollectionStatsPastWeekAverage } from "./collection-stats-past-week-average";
import type { CollectionStatsPastWeekVolume } from "./collection-stats-past-week-volume";
import type { CollectionStatsTotalSales } from "./collection-stats-total-sales";
import type { CollectionStatsTotalVolume } from "./collection-stats-total-volume";
import type { CollectionStatsWeekFloorPriceChangePercentage } from "./collection-stats-week-floor-price-change-percentage";
import type { CollectionStatsWeekMarketCapChangePercentage } from "./collection-stats-week-market-cap-change-percentage";
import type { MetadataSource } from "./metadata-source";

export interface CollectionStats {
	floor_price?: CollectionStatsFloorPrice;
	week_floor_price_change_percentage?: CollectionStatsWeekFloorPriceChangePercentage;
	average_appraisal?: CollectionStatsAverageAppraisal;
	market_cap?: CollectionStatsMarketCap;
	week_market_cap_change_percentage?: CollectionStatsWeekMarketCapChangePercentage;
	total_volume?: CollectionStatsTotalVolume;
	past_day_volume?: CollectionStatsPastDayVolume;
	past_day_average?: CollectionStatsPastDayAverage;
	past_week_volume?: CollectionStatsPastWeekVolume;
	past_week_average?: CollectionStatsPastWeekAverage;
	past_month_volume?: CollectionStatsPastMonthVolume;
	past_month_average?: CollectionStatsPastMonthAverage;
	past_month_sales?: CollectionStatsPastMonthSales;
	total_sales?: CollectionStatsTotalSales;
	last_updated: string;
	data_sources: MetadataSource[];
}
