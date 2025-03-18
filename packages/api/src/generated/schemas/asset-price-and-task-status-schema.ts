import type { AssetPriceAndTaskStatusSchemaBestPrice } from "./asset-price-and-task-status-schema-best-price";
/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { AssetPriceAndTaskStatusSchemaTaskInfo } from "./asset-price-and-task-status-schema-task-info";

export interface AssetPriceAndTaskStatusSchema {
	is_task_scheduled: boolean;
	task_info?: AssetPriceAndTaskStatusSchemaTaskInfo;
	best_price: AssetPriceAndTaskStatusSchemaBestPrice;
}
