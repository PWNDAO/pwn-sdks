"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAcceptProposal, useStrategyProposals } from "@pwndao/sdk-v1-react";
import type { ProposalWithSignature } from "@pwndao/v1-core";
import { useState } from "react";
import { useAccount } from "wagmi";

export function BatchAcceptProposals() {
	const { address } = useAccount();
	const { data: proposals, isLoading } = useStrategyProposals("all");
	const acceptProposal = useAcceptProposal(address as `0x${string}`);
	const [selectedProposals, setSelectedProposals] = useState<
		Array<{ proposal: ProposalWithSignature; creditAmount: bigint }>
	>([]);
	const [isAccepting, setIsAccepting] = useState(false);

	const handleProposalSelect = (proposal: ProposalWithSignature) => {
		const isSelected = selectedProposals.some(
			(p) => p.proposal.hash === proposal.hash,
		);
		if (isSelected) {
			setSelectedProposals(
				selectedProposals.filter((p) => p.proposal.hash !== proposal.hash),
			);
		} else {
			setSelectedProposals([
				...selectedProposals,
				{ proposal, creditAmount: proposal.availableCreditLimit },
			]);
		}
	};

	const handleBatchAccept = async () => {
		if (!address || selectedProposals.length === 0) return;

		try {
			setIsAccepting(true);
			// Accept each proposal sequentially
			for (const { proposal, creditAmount } of selectedProposals) {
				await acceptProposal.mutateAsync({ proposal, creditAmount });
			}
			setSelectedProposals([]);
		} catch (error) {
			console.error("Error accepting proposals:", error);
		} finally {
			setIsAccepting(false);
		}
	};

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Batch Accept Proposals</h2>
				<Button
					onClick={handleBatchAccept}
					disabled={
						!address ||
						selectedProposals.length === 0 ||
						isAccepting ||
						acceptProposal.isPending
					}
					className="w-full md:w-auto"
				>
					{isAccepting || acceptProposal.isPending
						? "Accepting..."
						: `Accept ${selectedProposals.length} Proposals`}
				</Button>
			</div>

			{isLoading ? (
				<div className="flex justify-center py-8">
					<div className="animate-pulse text-gray-500">
						Loading proposals...
					</div>
				</div>
			) : proposals?.length ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{proposals.map((proposal) => (
						<Card
							key={proposal.hash}
							className={`h-full cursor-pointer transition-all ${
								selectedProposals.some((p) => p.proposal.hash === proposal.hash)
									? "border-primary"
									: ""
							}`}
							onClick={() => handleProposalSelect(proposal)}
						>
							<CardHeader>
								<CardTitle>Proposal #{proposal.hash.slice(0, 8)}</CardTitle>
								<CardDescription className="text-sm text-gray-500">
									{proposal.type}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div className="flex justify-between">
										<span className="font-medium">Contract:</span>
										<span className="text-sm text-gray-600">
											{proposal.loanContract.slice(0, 8)}...
										</span>
									</div>
									<div className="flex justify-between">
										<span className="font-medium">Source of Funds:</span>
										<span className="text-sm text-gray-600">
											{proposal.sourceOfFunds?.slice(0, 8) || "None"}...
										</span>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button
									variant={
										selectedProposals.some(
											(p) => p.proposal.hash === proposal.hash,
										)
											? "default"
											: "outline"
									}
									className="w-full"
								>
									{selectedProposals.some(
										(p) => p.proposal.hash === proposal.hash,
									)
										? "Selected"
										: "Select"}
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			) : (
				<div className="text-center py-8 text-gray-500">
					No proposals found.
				</div>
			)}
		</div>
	);
}
