/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { CuratorGroupDetailAvatar } from "./curator-group-detail-avatar";
import type { WalletRole } from "./wallet-role";

export interface CuratorGroupDetail {
	/** @maxLength 100 */
	name: string;
	avatar?: CuratorGroupDetailAvatar;
	description?: string;
	readonly curators: readonly WalletRole[];
	/** @maxLength 200 */
	url?: string;
}
