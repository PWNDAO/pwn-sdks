"use client";
import { useStrategyProposals } from "@pwndao/sdk-v1-react";
import { useAccount } from "wagmi";
import { AcceptProposalButton } from "./AcceptProposalButton";
import { RevokeProposals } from "./RevokeProposals";
import { ProposalCard } from "./ProposalCard";

export default function ProposalsList({
	strategyId,
}: {
	strategyId: string;
}) {
	const { data: proposals, isLoading } = useStrategyProposals(strategyId);
	const { address } = useAccount();

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
				Proposals List
			</h1>

			<RevokeProposals proposalsWithSignatures={proposals ?? []} />

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
