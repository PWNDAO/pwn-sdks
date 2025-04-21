import type { AddressString, SupportedChain } from "@pwndao/sdk-core";
import type { IRevokedNonceContract } from "../contracts/revoked-nonce-contract.js";

export const revokeProposals = async (
	proposalNonces: bigint[],
	chainId: SupportedChain,
	owner: AddressString,
	nonceSpace: bigint,
	deps: IRevokedNonceContract,
) => {
	const revokedNonces = await deps.revokeNonces(
		proposalNonces,
		nonceSpace,
		chainId,
		owner,
	);
	return revokedNonces;
};
