import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";
import { allProposalHashesForRoot } from "@pwndao/api-sdk";
import { type Hex, ZERO_FINGERPRINT } from "@pwndao/sdk-core";
import { type Config, getCapabilities } from "@wagmi/core";
import type { ProposalWithSignature } from "../models/strategies/types.js";

export const getInclusionProof = async (
	proposalWithHash: ProposalWithSignature,
): Promise<Hex[]> => {
	if (
		!proposalWithHash.multiproposalMerkleRoot ||
		proposalWithHash.multiproposalMerkleRoot === ZERO_FINGERPRINT
	) {
		return [];
	}

	const leafs = await allProposalHashesForRoot(
		proposalWithHash.multiproposalMerkleRoot,
	);
	if (!leafs.proposal_hashes.includes(proposalWithHash.hash)) {
		throw new Error("Proposal is not in the merkle tree");
	}
	const tree = SimpleMerkleTree.of(leafs.proposal_hashes);

	for (const leaf of leafs.proposal_hashes) {
		if (leaf === proposalWithHash.hash) {
			return tree.getProof(leaf) as Hex[];
		}
	}
	return [];
};

export const mayUserSendCalls = async (config: Config, chainId: number) => {
	try {
		const capabilities = await getCapabilities(config);

		const okStatus = ["ready", "supported"];

		// :)
		const value =
			okStatus.includes(capabilities[chainId]?.atomic?.status ?? "") ||
			capabilities[chainId]?.atomicBatch?.supported ||
			// @ts-expect-error capabilities is not typed
			capabilities?.atomicBatch?.supported ||
			// @ts-expect-error capabilities is not typed
			okStatus.includes(capabilities.atomicBatch?.status ?? "");

		return value;
	} catch (error) {
		console.error(error);
		return false;
	}
};
