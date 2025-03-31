import type { Address } from "viem";

export type AssetType = "native" | "erc20" | "erc721";
export type AssetKey = `${string}:${AssetType}:${string}`;

interface AssetState {
	lastProcessedBlock: bigint;
	balances: Record<string, bigint>; // For ERC-20
	tokenIds: bigint[]; // For ERC-721
}

/**
 * Storage class for managing wallet asset state
 * Persists data in localStorage for browser environments
 *
 * Note: This is a simplified implementation for prototype purposes.
 * In production, consider using a more robust storage solution.
 */
export class AssetStorage {
	private cache: Map<string, AssetState>;
	private storageKey: string;

	constructor(storageKey = "pwn-wallet-assets") {
		this.storageKey = storageKey;
		this.cache = new Map<string, AssetState>();

		// Initialize from localStorage if available
		this.loadFromStorage();
	}

	/**
	 * Generate a unique key for a wallet and asset
	 */
	private getKey(
		wallet: Address,
		assetType: AssetType,
		contract?: Address,
	): string {
		if (assetType === "native") {
			return `${wallet}:native:balance`;
		}
		return `${wallet}:${assetType}:${contract}`;
	}

	/**
	 * Get asset state from the cache
	 */
	public getAssetState(
		wallet: Address,
		assetType: AssetType,
		contract?: Address,
	): AssetState | null {
		const key = this.getKey(wallet, assetType, contract);
		return this.cache.get(key) || null;
	}

	/**
	 * Update asset state in the cache
	 */
	public updateAssetState(
		wallet: Address,
		assetType: AssetType,
		lastProcessedBlock: bigint,
		contract?: Address,
		balance?: bigint,
		tokenIds?: bigint[],
	): void {
		const key = this.getKey(wallet, assetType, contract);

		const existingState = this.getAssetState(wallet, assetType, contract) || {
			lastProcessedBlock: 0n,
			balances: {},
			tokenIds: [],
		};

		// Update state based on asset type
		const newState: AssetState = {
			lastProcessedBlock,
			balances: { ...existingState.balances },
			tokenIds: [...existingState.tokenIds],
		};

		if (assetType === "native" || assetType === "erc20") {
			if (balance !== undefined) {
				if (assetType === "native") {
					newState.balances.balance = balance;
				} else if (contract) {
					newState.balances[contract] = balance;
				}
			}
		} else if (assetType === "erc721" && tokenIds && tokenIds.length > 0) {
			// Merge new token IDs with existing ones, removing duplicates
			const allTokenIds = [...existingState.tokenIds, ...tokenIds];
			newState.tokenIds = [...new Set(allTokenIds)];
		}

		this.cache.set(key, newState);

		// Save to localStorage
		this.saveToStorage();
	}

	/**
	 * Get the last processed block for a wallet address
	 */
	public getLastProcessedBlock(wallet: Address, chain: number): bigint {
		const key = `${wallet}:${chain}:lastBlock`;
		const state = this.cache.get(key);
		return state ? state.lastProcessedBlock : 0n;
	}

	/**
	 * Set the last processed block for a wallet address
	 */
	public setLastProcessedBlock(
		wallet: Address,
		chain: number,
		blockNumber: bigint,
	): void {
		const key = `${wallet}:${chain}:lastBlock`;
		const existingState = this.cache.get(key) || {
			lastProcessedBlock: 0n,
			balances: {},
			tokenIds: [],
		};

		existingState.lastProcessedBlock = blockNumber;
		this.cache.set(key, existingState);

		// Save to localStorage
		this.saveToStorage();
	}

	/**
	 * Save cache to localStorage
	 */
	private saveToStorage(): void {
		if (typeof localStorage !== "undefined") {
			try {
				const serialized = JSON.stringify(Array.from(this.cache.entries()));
				localStorage.setItem(this.storageKey, serialized);
			} catch (e) {
				console.error("Failed to save state to localStorage:", e);
			}
		}
	}

	/**
	 * Load cache from localStorage
	 */
	private loadFromStorage(): void {
		if (typeof localStorage !== "undefined") {
			try {
				const serialized = localStorage.getItem(this.storageKey);
				if (serialized) {
					const entries = JSON.parse(serialized);
					this.cache = new Map(entries);

					// Convert string numbers back to bigints
					for (const [key, state] of this.cache.entries()) {
						state.lastProcessedBlock = BigInt(
							state.lastProcessedBlock.toString(),
						);

						for (const balanceKey in state.balances) {
							state.balances[balanceKey] = BigInt(
								state.balances[balanceKey].toString(),
							);
						}

						if (state.tokenIds) {
							state.tokenIds = state.tokenIds.map((id) =>
								BigInt(id.toString()),
							);
						}

						this.cache.set(key, state);
					}
				}
			} catch (e) {
				console.error("Failed to load state from localStorage:", e);
				this.cache = new Map();
			}
		}
	}
}
