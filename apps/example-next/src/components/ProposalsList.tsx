"use client";
import { useStrategyProposals } from "@pwndao/sdk-v1-react";
import { useAccount } from "wagmi";
import { AcceptProposalButton } from "./AcceptProposalButton";

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

			{isLoading ? (
				<div className="flex justify-center py-8">
					<div className="animate-pulse text-gray-500">
						Loading proposals...
					</div>
				</div>
			) : proposals?.length ? (
				<div className="space-y-4">
					{proposals.map((proposal) => (
						<div
							key={proposal.hash}
							className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 bg-gray-50"
						>
							<div className="flex items-center justify-between">
								<h2 className="text-lg font-semibold text-gray-700 truncate">
									Proposal: 
									{proposal.loanContract}
								</h2>
								<p className="mt-2 text-sm text-gray-600 bg-gray-100 inline-block px-2 py-1 rounded">
									{proposal.type}
								</p>

								{address && (
									<AcceptProposalButton
										proposal={proposal}
										acceptor={address}
									/>
								)}
								<p className="mt-2 text-sm text-gray-600 bg-gray-100 inline-block px-2 py-1 rounded">
									{proposal.sourceOfFunds}
								</p>
							</div>
						</div>
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
