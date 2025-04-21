import { Button } from "@/components/ui/button";
import type { SupportedChain } from "@pwndao/sdk-core";
import { useRevokeNonces } from "@pwndao/sdk-v1-react";
import type { ProposalWithSignature } from "@pwndao/v1-core";
import { useMemo } from "react";
import invariant from "ts-invariant";
import { useAccount } from "wagmi";

export const RevokeProposals = ({
	proposalsWithSignatures,
}: {
	proposalsWithSignatures: ProposalWithSignature[];
}) => {
	const { address } = useAccount();

	const proposalNonces = useMemo(() => {
		if (proposalsWithSignatures.length === 0) {
			return [];
		}
		const proposalChainIds = new Set<SupportedChain>(
			proposalsWithSignatures.map((proposal) => proposal.chainId),
		);
		invariant(
			proposalChainIds.size === 1,
			"All proposals must be on the same chain",
		);
		return proposalsWithSignatures
			.filter((proposal) => proposal.proposer === address)
			.map((proposal) => proposal.nonce);
	}, [proposalsWithSignatures, address]);

	const { mutate } = useRevokeNonces();

	const handleRevokeNonces = () => {
		invariant(proposalsWithSignatures.length > 0, "No proposals to revoke");

		mutate({
			proposalNonces,
			chainId: proposalsWithSignatures[0].chainId,
			owner: proposalsWithSignatures[0].proposer,
			nonceSpace: proposalsWithSignatures[0].nonceSpace,
		});
	};

	return (
		<>
			<Button onClick={handleRevokeNonces}>Revoke Proposals</Button>
		</>
	);
};
