import { Button } from "@/components/ui/button";
import type { AddressString } from "@pwndao/sdk-core";
import { useAcceptProposal } from "@pwndao/sdk-v1-react";
import {
	ChainLinkProposalContract,
	ElasticProposalContract,
	ProposalType,
	type ProposalWithSignature,
} from "@pwndao/v1-core";
import { useMemo } from "react";
import { useConfig } from "wagmi";

export const fixProposalLtv = (proposal: ProposalWithSignature) => {
	if (proposal.type === ProposalType.ChainLink) {
		Object.assign(proposal, {
			loanToValue: BigInt(proposal.loanToValue) / 100n,
		});
	}
	return proposal;
};

export const AcceptProposalButton = ({
	proposal,
	acceptor,
	proposalType,
}: {
	proposal: ProposalWithSignature;
	acceptor: AddressString;
	proposalType: ProposalType;
}) => {
	const config = useConfig();

	const proposalContract = useMemo(() => {
		if (proposalType === ProposalType.Elastic) {
			return new ElasticProposalContract(config);
		}
		if (proposalType === ProposalType.ChainLink) {
			return new ChainLinkProposalContract(config);
		}
		throw new Error("Invalid proposal type");
	}, [config, proposalType]);

	const {
		mutate: acceptProposal,
		isPending,
		error,
	} = useAcceptProposal({
		proposalContract,
	});

	const handleAcceptProposal = () => {
		const creditAmount = BigInt(proposal.availableCreditLimit);

		acceptProposal({
			proposalsToAccept: [
				{
					proposalToAccept: fixProposalLtv(proposal),
					creditAmount,
					acceptor,
				},
			],
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
