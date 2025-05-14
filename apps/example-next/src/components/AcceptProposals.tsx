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
import { fixProposalLtv } from "./AcceptProposalButton";

type AcceptProposalsProps = {
	proposals: ProposalWithSignature[];
	proposer?: AddressString;
};

export const AcceptProposals = ({
	proposals,
	proposer,
}: AcceptProposalsProps) => {
	const config = useConfig();

	const proposalContract = useMemo(() => {
		if (proposals.length === 0) {
			return new ElasticProposalContract(config);
		}

		if (proposals[0].type === ProposalType.Elastic) {
			return new ElasticProposalContract(config);
		}
		if (proposals[0].type === ProposalType.ChainLink) {
			return new ChainLinkProposalContract(config);
		}
		throw new Error("Invalid proposal type");
	}, [config, proposals[0]?.type]);

	const {
		mutate: acceptProposal,
		isPending,
		error,
	} = useAcceptProposal({
		proposalContract,
	});

	if (!proposer) {
		return null;
	}

	const handleAcceptProposals = () => {
		acceptProposal({
			proposalsToAccept: proposals.map((proposal) => ({
				proposalToAccept: fixProposalLtv(proposal),
				acceptor: proposer,
				creditAmount: BigInt(proposal.availableCreditLimit),
			})),
		});
	};

	return (
		<div className="flex flex-col gap-4">
			<span>Accepting {proposals.length} proposals</span>
			<button onClick={handleAcceptProposals} type="button">
				{isPending ? "Accepting..." : "Accept Proposals"}
			</button>

			{error && <span>Error: {error.message}</span>}
		</div>
	);
};
