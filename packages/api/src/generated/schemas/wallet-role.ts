import type { CuratorGroup } from "./curator-group";
import type { RoleEnum } from "./role-enum";
/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { WalletRoleEnsName } from "./wallet-role-ens-name";

export interface WalletRole {
	/** @maxLength 66 */
	wallet_address: string;
	ens_name?: WalletRoleEnsName;
	/**
	 * @minimum -32768
	 * @maximum 32767
	 */
	role?: RoleEnum;
	readonly role_display: string;
	readonly curator_groups: readonly CuratorGroup[];
}
