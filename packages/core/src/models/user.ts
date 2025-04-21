import invariant from "ts-invariant";
import type { SupportedChain } from "../chains.js";

export class User {
	constructor(public address: `0x${string}`) {}
}

export class UserWithNonceManager {
	user: User;
	/**
	 * [recentNonce, nonceSpace]
	 */
	nonces: Partial<Record<SupportedChain, [bigint, bigint]>>;
	/**
	 * Nonces at the time of fetch. Later used to calculate used nonces for BE call.
	 */
	_nonce: Partial<Record<SupportedChain, [bigint, bigint]>>;

	constructor(
		user: User,
		nonces: Partial<Record<SupportedChain, [bigint, bigint]>>,
	) {
		this.user = user;
		this.nonces = nonces;
		this._nonce = structuredClone(nonces);
	}

	getNextNonce(chain: SupportedChain) {
		invariant(this.nonces[chain], `Nonce for chain ${chain} not found`);

		const [nonce, nonceSpace] = this.nonces?.[chain] ?? [];
		invariant(
			nonce !== undefined && nonce >= 0,
			`Nonce for chain ${chain} not found`,
		);
		invariant(
			nonceSpace !== undefined && nonceSpace >= 0,
			`Nonce space for chain ${chain} not found`,
		);
		this.nonces[chain] = [nonce + 1n, nonceSpace];
		return nonce;
	}

	get address() {
		return this.user.address;
	}

	getNonceSpace(chain: SupportedChain) {
		const [, nonceSpace] = this.nonces?.[chain] ?? [];
		invariant(
			nonceSpace !== undefined && nonceSpace >= 0,
			`Nonce space for chain ${chain} not found`,
		);
		return nonceSpace;
	}

	/**
	 * Returns number of nonces that have been used by the user.
	 * @returns {Partial<Record<SupportedChain, bigint>>}
	 */
	getUsedNonces(): Partial<Record<SupportedChain, bigint>> {
		const usedNoncesResult: Partial<Record<SupportedChain, bigint>> = {};

		for (const chain in this.nonces) {
			const _chain = Number(chain) as SupportedChain;
			const [currentNonce] = this.nonces?.[_chain] ?? [];
			const [nonce] = this._nonce?.[_chain] ?? [];

			if (!currentNonce || !nonce) {
				continue;
			}

			if (currentNonce > nonce) {
				const usedNonces = currentNonce - nonce;
				if (usedNonces > 0) {
					usedNoncesResult[_chain] = usedNonces;
				}
			}
		}

		return usedNoncesResult;
	}
}
