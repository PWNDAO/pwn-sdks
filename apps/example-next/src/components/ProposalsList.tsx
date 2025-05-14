"use client";
import { useStrategyProposals } from "@pwndao/sdk-v1-react";
import type { ProposalWithSignature } from "@pwndao/v1-core";
import { useState } from "react";
import { useAccount } from "wagmi";
import { ProposalCard } from "./ProposalCard";
import { RevokeProposals } from "./RevokeProposals";
import { AcceptProposals } from "./AcceptProposals";

export default function ProposalsList({
	strategyId,
}: {
	strategyId: string;
}) {
	const { data: proposals, isLoading } = useStrategyProposals(strategyId);
	const { address } = useAccount();

	const [selectedProposals, setSelectedProposals] = useState<
		ProposalWithSignature[]
	>([]);

	const handleSelectProposal = (proposal: ProposalWithSignature) => {
		setSelectedProposals((prev) => {
			if (prev.some((p) => p.hash === proposal.hash)) {
				return prev.filter((p) => p.hash !== proposal.hash);
			}
			return [...prev, proposal];
		});
	};

	const isSelected = (proposal: ProposalWithSignature) => {
		return selectedProposals.some((p) => p.hash === proposal.hash);
	};

	console.log(selectedProposals);

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
				Proposals List
			</h1>

			<div className="flex justify-end mb-4">
				<AcceptProposals
					proposals={selectedProposals}
					proposer={address}
				/>

				<RevokeProposals proposalsWithSignatures={proposals ?? []} />
			</div>

			{isLoading ? (
				<div className="flex justify-center py-8">
					<div className="animate-pulse text-gray-500">
						Loading proposals...
					</div>
				</div>
			) : proposals?.length ? (
				<div className="space-y-4">
					{proposals.map((proposal) => (
						<ProposalCard
							key={proposal.hash}
							proposal={proposal}
							address={address}
							isSelected={isSelected(proposal)}
							onSelect={handleSelectProposal}
						/>
					))}
				</div>
			) : (
				<div className="text-center py-8 text-gray-500">
					No proposals found for this strategy.
				</div>
			)}
		</div>
	);
}
