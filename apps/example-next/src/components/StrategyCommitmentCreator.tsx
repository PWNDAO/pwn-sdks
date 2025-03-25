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
import {
	ElasticProposalContract,
	type IProposalElasticAPIDeps,
	type Strategy,
	createUtilizedCreditId,
} from "@pwndao/v1-core";
import { API } from "@pwndao/v1-core";
import { ProposalType } from "@pwndao/v1-core";
import { serialize } from "@wagmi/core";
import { useState } from "react";
import { useAccount, useConfig, useConnect, useDisconnect } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

interface StrategyCommitmentCreatorProps {
	strategy: Strategy; // Replace with proper type from your SDK
}

export default function StrategyCommitmentCreator({
	strategy,
}: StrategyCommitmentCreatorProps) {
	const { address, isConnected } = useAccount();
	const { connect } = useConnect();
	const { disconnect } = useDisconnect();

	// Form state
	const [creditAmount, setCreditAmount] = useState("100");

	const config = useConfig();

	const {
		mutateAsync: makeProposal,
		isPending: isLoading,
		isSuccess,
		error,
		data: txHash,
	} = useMakeProposals({
		proposalType: ProposalType.Elastic,
		api: {
			persistProposal: API.post.persistProposal,
			getAssetUsdUnitPrice: API.get.getAssetUsdUnitPrice,
			persistProposals: API.post.persistProposals,
			updateNonces: API.post.updateNonce,
		} as IProposalElasticAPIDeps,
		contract: new ElasticProposalContract(config),
	});

	const { userWithNonce: user } = useUserWithNonce([sepolia.id]);

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isConnected || !address || !user) {
			connect({ connector: injected() });
			return;
		}

		try {
			const res = await makeProposal({
				terms: {
					user: user,
					creditAmount: BigInt(creditAmount),
					ltv: strategy.terms.ltv,
					apr: strategy.terms.apr,
					duration: {
						days: strategy.terms.durationDays,
					},
					expirationDays: strategy.terms.expirationDays,
					utilizedCreditId: createUtilizedCreditId({
						proposer: address,
						availableCreditLimit: BigInt(creditAmount),
					}),
					minCreditAmountPercentage:
						strategy.terms.minCreditAmountPercentage,
					isOffer: true,
					relatedStrategyId: strategy.id
				},
				collateralAssets: strategy.terms.collateralAssets,
				creditAssets: strategy.terms.creditAssets,
			});
			console.log(res);
		} catch (err) {
			console.error("Error creating commitment:", err);
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
					{/* Wallet Connection */}
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

					{/* Credit Amount Input */}
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

					{/* Strategy Terms Display */}
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

					{/* Submit Button */}
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

				{/* Transaction Status */}
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

				{error && (
					<div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md">
						<p className="font-medium">Error creating commitment:</p>
						<p className="mt-1">{error.message || String(error)}</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
