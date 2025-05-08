"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMakeProposals, useUserWithNonce } from "@pwndao/sdk-v1-react";
import type { Strategy } from "@pwndao/v1-core";
import { createElasticProposals } from "@pwndao/v1-core";
import { serialize } from "@wagmi/core";
import { useState } from "react";
import { useAccount, useConfig, useConnect, useDisconnect } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

interface StrategyCommitmentCreatorProps {
	strategy: Strategy;
}

export default function StrategyCommitmentCreator({
	strategy,
}: StrategyCommitmentCreatorProps) {
	const { address, isConnected } = useAccount();
	const { connect } = useConnect();
	const { disconnect } = useDisconnect();

	const [creditAmount, setCreditAmount] = useState("100");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const config = useConfig();

	const { userWithNonce: user } = useUserWithNonce([sepolia.id]);
	const {
		mutateAsync: makeProposal,
		isPending: isLoading,
		isSuccess,
		error,
		data: txHash,
	} = useMakeProposals(user);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage(null);

		if (!isConnected || !address || !user) {
			connect({ connector: injected() });
			return;
		}

		try {
			const proposalsToCreate = createElasticProposals(
				strategy,
				address,
				creditAmount,
				config,
			);

			const res = await makeProposal(proposalsToCreate);
			console.log("Proposals created successfully:", res);
		} catch (err) {
			console.error("Error creating commitment:", err);
			setErrorMessage(
				err instanceof Error ? err.message : "An unknown error occurred",
			);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Commit Funds to Strategy</CardTitle>
				<CardDescription>
					Commit funds to {strategy.name} strategy
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="p-4 bg-muted rounded-md">
						{isConnected ? (
							<div className="space-y-2">
								<p className="text-green-600 font-medium">
									Connected: {address}
								</p>
								<Button
									onClick={() => disconnect()}
									variant="destructive"
									size="sm"
								>
									Disconnect
								</Button>
							</div>
						) : (
							<div className="space-y-2">
								<p className="text-yellow-600">Wallet not connected</p>
								<Button
									onClick={() => connect({ connector: injected() })}
									variant="default"
								>
									Connect Wallet
								</Button>
							</div>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="creditAmount">Credit Amount</Label>
						<Input
							id="creditAmount"
							type="text"
							value={creditAmount}
							onChange={(e) => setCreditAmount(e.target.value)}
							placeholder="Enter amount to commit"
							required
						/>
						<p className="text-sm text-muted-foreground">
							Enter the amount you want to commit to this strategy
						</p>
					</div>

					<div className="space-y-2">
						<h3 className="font-medium">Strategy Terms</h3>
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div>
								<span className="text-muted-foreground">APR:</span>
								<span className="ml-2">
									{strategy.terms.apr[Object.keys(strategy.terms.apr)[0]]}%
								</span>
							</div>
							<div>
								<span className="text-muted-foreground">LTV:</span>
								<span className="ml-2">
									{strategy.terms.ltv[Object.keys(strategy.terms.ltv)[0]]}%
								</span>
							</div>
							<div>
								<span className="text-muted-foreground">Duration:</span>
								<span className="ml-2">{strategy.terms.durationDays} days</span>
							</div>
							<div>
								<span className="text-muted-foreground">Expiration:</span>
								<span className="ml-2">
									{strategy.terms.expirationDays} days
								</span>
							</div>
						</div>
					</div>

					<Button
						type="submit"
						disabled={isLoading || (!isConnected && !address)}
						className="w-full"
					>
						{isLoading
							? "Creating Commitment..."
							: !isConnected
								? "Connect Wallet to Continue"
								: "Commit Funds"}
					</Button>
				</form>

				{isLoading && (
					<div className="mt-6 p-4 bg-blue-50 text-blue-700 rounded-md">
						<p className="font-medium">Transaction in progress...</p>
					</div>
				)}

				{isSuccess && (
					<div className="mt-6 p-4 bg-green-50 text-green-700 rounded-md">
						<p className="font-medium">Commitment created successfully!</p>
						{txHash && (
							<p className="mt-2">
								Transaction Hash:
								<a
									href={`https://sepolia.etherscan.io/tx/${txHash}`}
									target="_blank"
									rel="noopener noreferrer"
									className="ml-2 text-blue-500 hover:underline"
								>
									{JSON.stringify(serialize(txHash))}
								</a>
							</p>
						)}
					</div>
				)}

				{(error || errorMessage) && (
					<div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md">
						<p className="font-medium">Error creating commitment:</p>
						<p className="mt-1">
							{errorMessage || error?.message || String(error)}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
