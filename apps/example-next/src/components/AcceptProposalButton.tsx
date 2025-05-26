import { Button } from "@/components/ui/button";
import type {  ERC20TokenLike, AddressString } from "@pwndao/sdk-core";
import { useAcceptProposals } from "@pwndao/sdk-v1-react";
import {
	ChainLinkProposalContract,
	ElasticProposalContract,
	ProposalType,
	type ProposalWithSignature,
} from "@pwndao/v1-core";
import { useMemo } from "react";
import { useConfig, useAccount } from "wagmi";

export const fixProposalLtv = (proposal: ProposalWithSignature) => {
	if (proposal.type === ProposalType.ChainLink) {
		if (proposal.loanToValue.toString().length === 6) {
			Object.assign(proposal, {
				loanToValue: BigInt(proposal.loanToValue) / 100n,
			});
		}
	}
	return proposal;
};

export const AcceptProposalButton = ({
	proposal,
	acceptor,
	proposalType,
	creditAsset,
}: {
	proposal: ProposalWithSignature;
	acceptor: AddressString;
	proposalType: ProposalType;
	creditAsset: ERC20TokenLike
}) => {
	const config = useConfig();
	const { address } = useAccount();

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
	} = useAcceptProposals({
		proposalContract,
	});

	const handleAcceptProposal = () => {
		const creditAmount = BigInt(proposal.availableCreditLimit);

		acceptProposal(
			{
			proposalsToAccept: [
				{
					proposalToAccept: fixProposalLtv(proposal),
					creditAmount,
					acceptor,
					creditAsset,
				},
			],
			userAddress: address,
		},
		);
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
