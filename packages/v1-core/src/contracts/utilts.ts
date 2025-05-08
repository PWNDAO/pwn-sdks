import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";
import { allProposalHashesForRoot } from "@pwndao/api-sdk";
import { ZERO_FINGERPRINT, type Hex } from "@pwndao/sdk-core";
import type { ProposalWithSignature } from "../models/strategies/types.js";

export const getInclusionProof = async (
	proposalWithHash: ProposalWithSignature,
): Promise<Hex[]> => {
	if (!proposalWithHash.multiproposalMerkleRoot || proposalWithHash.multiproposalMerkleRoot === ZERO_FINGERPRINT) {
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
