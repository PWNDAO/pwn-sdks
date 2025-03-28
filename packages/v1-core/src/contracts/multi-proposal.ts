import { type Config, signTypedData } from "@wagmi/core"

import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";
import type { ProposalWithHash, ProposalWithSignature } from "src/models/strategies/types.js";

export const createMultiProposal = async (
    config: Config,
    proposals: ProposalWithHash[],
): Promise<ProposalWithSignature[]> => {
    // todo: take this from func args
    const merkleTree = SimpleMerkleTree.of(
        proposals.map((proposal) => proposal.hash),
    );
    const multiproposalMerkleRoot = merkleTree.root;

    const multiproposalDomain = {
        name: "PWNMultiproposal",
    };

    const types = {
        Multiproposal: [{ name: "multiproposalMerkleRoot", type: "bytes32" }],
    };

    const signature = await signTypedData(config, {
        domain: multiproposalDomain,
        types,
        primaryType: "Multiproposal",
        message: {
            multiproposalMerkleRoot,
        },
    });

    return proposals.map(
        (proposal) =>
            ({
                ...proposal,
                hash: proposal.hash,
                multiproposalMerkleRoot,
                signature,
            }) as ProposalWithSignature,
    );
}
