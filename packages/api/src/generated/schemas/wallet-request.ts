/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { WalletRequestEnsName } from "./wallet-request-ens-name";

export interface WalletRequest {
	/** @minLength 1 */
	wallet_address: string;
	ens_name?: WalletRequestEnsName;
}
