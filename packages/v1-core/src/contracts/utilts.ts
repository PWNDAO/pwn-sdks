import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";
import type { Hex } from "@pwndao/sdk-core";
import type { ProposalWithSignature } from "../models/strategies/types.js";
import { allProposalHashesForRoot } from "@pwndao/api-sdk";

export const getInclusionProof = async (
	proposalWithHash: ProposalWithSignature,
): Promise<Hex[]> => {
	if (!proposalWithHash.multiproposalMerkleRoot) {
		return [];
	}

	const leafs = await allProposalHashesForRoot(
		proposalWithHash.multiproposalMerkleRoot,
	);
	if (!leafs.data.proposal_hashes.includes(proposalWithHash.hash)) {
		throw new Error("Proposal is not in the merkle tree");
	}
	const tree = SimpleMerkleTree.of(leafs.data.proposal_hashes);

	for (const leaf of leafs.data.proposal_hashes) {
		if (leaf === proposalWithHash.hash) {
			return tree.getProof(leaf) as Hex[];
		}
	}
	return [];
};
