import type { WalletAssetSchemaWorkaround } from "./wallet-asset-schema-workaround";
/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { WalletAssetsResponseWorkaroundTasksInfo } from "./wallet-assets-response-workaround-tasks-info";
import type { WalletAssetsResponseWorkaroundTotalVerifiedValueUsd } from "./wallet-assets-response-workaround-total-verified-value-usd";

export interface WalletAssetsResponseWorkaround {
	isTaskScheduled: boolean;
	tasksInfo: WalletAssetsResponseWorkaroundTasksInfo;
	totalVerifiedValueUsd: WalletAssetsResponseWorkaroundTotalVerifiedValueUsd;
	walletAssets: WalletAssetSchemaWorkaround[];
}
