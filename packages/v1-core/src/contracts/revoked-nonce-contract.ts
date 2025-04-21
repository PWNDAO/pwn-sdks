import {
	type AddressString,
	type Hex,
	type SupportedChain,
	getRevokedNonceContractAddress,
} from "@pwndao/sdk-core";
import type { Config } from "@wagmi/core";
import { readContracts } from "@wagmi/core";
import invariant from "ts-invariant";
import type { Address } from "viem";
import {
	pwnRevokedNonceAbi,
	writePwnRevokedNonceRevokeNonces,
} from "../generated.js";

export interface IRevokedNonceContract {
	revokeNonces(
		nonces: bigint[],
		nonceSpace: bigint,
		chainId: SupportedChain,
		owner: AddressString,
	): Promise<Hex>;
}

export class RevokedNonceContract implements IRevokedNonceContract {
	constructor(private readonly config: Config) {}

	async getAllNonRevokedNonces(
		nonces: bigint[],
		nonceSpace: bigint,
		chainId: SupportedChain,
		owner: AddressString,
	): Promise<bigint[]> {
		const contracts = nonces.map((nonce) => ({
			abi: pwnRevokedNonceAbi,
			functionName: "isNonceUsable",
			address: getRevokedNonceContractAddress(chainId) as Address,
			args: [owner, nonceSpace, nonce],
		}));

		const results = await readContracts(this.config, {
			contracts: contracts,
		});

		// Filter out nonces that are not revoked (where result is false)
		return nonces.filter((nonce, index) => {
			const result = results[index].result as unknown as boolean;
			if (result !== false) {
				console.warn("Nonce is already revoked: ", nonce);
			}
			// If result is false, the nonce is not revoked
			return result === false;
		});
	}

	async revokeNonces(
		nonces: bigint[],
		nonceSpace: bigint,
		chainId: SupportedChain,
		owner: AddressString,
	): Promise<Hex> {
		const address = getRevokedNonceContractAddress(chainId);

		const nonRevokedNonces = await this.getAllNonRevokedNonces(
			nonces,
			nonceSpace,
			chainId,
			owner,
		);

		invariant(nonRevokedNonces.length > 0, "No nonces to revoke");

		return await writePwnRevokedNonceRevokeNonces(this.config, {
			address,
			chainId: chainId,
			args: [nonRevokedNonces],
		});
	}
}
