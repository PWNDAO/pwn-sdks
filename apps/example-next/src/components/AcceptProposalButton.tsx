import { Button } from "@/components/ui/button";
import type { AddressString } from "@pwndao/sdk-core";
import { useAcceptProposal } from "@pwndao/sdk-v1-react";
import type { ProposalWithSignature } from "@pwndao/v1-core";

export const AcceptProposalButton = ({
	proposal,
	acceptor,
}: {
	proposal: ProposalWithSignature;
	acceptor: AddressString;
}) => {
	const {
		mutate: acceptProposal,
		isPending,
		error,
	} = useAcceptProposal(acceptor);

	const handleAcceptProposal = () => {
		const creditAmount = BigInt(proposal.availableCreditLimit);
		acceptProposal({
			proposal,
			creditAmount,
		});
	};

	return (
		<>
			<Button onClick={() => handleAcceptProposal()} disabled={isPending}>
				{isPending ? "Accepting..." : "Accept Proposal"}
			</Button>
			{error && <p className="text-red-500">{error.message}</p>}
		</>
	);
};
