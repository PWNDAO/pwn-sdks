/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { SafeOffchainDataName } from "./safe-offchain-data-name";
import type { SafeOffchainDataTransactionHash } from "./safe-offchain-data-transaction-hash";

export interface SafeOffchainData {
	name?: SafeOffchainDataName;
	/**
	 * @minimum -2147483648
	 * @maximum 2147483647
	 */
	chain_id: number;
	transaction_hash?: SafeOffchainDataTransactionHash;
	/** @maxLength 66 */
	wallet_address: string;
}
