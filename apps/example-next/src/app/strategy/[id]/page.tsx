"use client";

import { AssetPrice } from "@/components/Asset";
import ProposalsList from "@/components/ProposalsList";
import StrategyCommitmentCreator from "@/components/StrategyCommitmentCreator";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useStrategy } from "@pwndao/sdk-v1-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatUnits } from "viem";

export default function StrategyDetailPage() {
	const params = useParams();
	const strategyId = params.id as string;
	const { data: strategy, isLoading, error } = useStrategy(strategyId);

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
					<div className="space-y-4">
						<div className="h-4 bg-gray-200 rounded w-3/4" />
						<div className="h-4 bg-gray-200 rounded w-1/2" />
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="bg-red-50 border-l-4 border-red-500 p-4">
					<p className="text-red-700">
						Error loading strategy details: {error.message}
					</p>
				</div>
			</div>
		);
	}

	if (!strategy) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
					<p className="text-yellow-700">Strategy not found</p>
				</div>
			</div>
		);
	}

	const firstCollateralAsset = strategy.terms.collateralAssets[0];
	const firstCreditAsset = strategy.terms.creditAssets[0];
	const pairKey =
		firstCollateralAsset && firstCreditAsset
			? `${firstCollateralAsset.address}/${firstCollateralAsset.chainId}-${firstCreditAsset.address}/${firstCreditAsset.chainId}`
			: "";

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-6">
					<Link href="/strategies">
						<Button variant="outline" size="sm">
							← Back to Strategies
						</Button>
					</Link>
				</div>

				<h1 className="text-3xl font-bold mb-2">{strategy.name}</h1>
				<p className="text-gray-600 mb-8">Strategy ID: {strategyId}</p>

				<div className="grid gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Strategy Overview</CardTitle>
							<CardDescription>Details about this strategy</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{strategy.description && (
									<div>
										<h3 className="font-semibold text-lg mb-2">Description</h3>
										<p className="text-gray-700">{strategy.description}</p>
									</div>
								)}

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
									<div>
										<h3 className="font-semibold text-lg mb-2">
											Lending Stats
										</h3>
										<div className="space-y-2">
											<div className="flex justify-between">
												<span className="text-gray-600">Total Committed:</span>
												<span className="font-medium">
													{formatUnits(
														strategy.lendingStats.totalCommittedAmount,
														18,
													)}{" "}
													{firstCreditAsset?.symbol}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Total Utilized:</span>
												<span className="font-medium">
													{formatUnits(
														strategy.lendingStats.totalUtilizedAmount,
														18,
													)}{" "}
													{firstCreditAsset?.symbol}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Total Available:</span>
												<span className="font-medium">
													{formatUnits(
														strategy.lendingStats.totalAvailableAmount,
														18,
													)}{" "}
													{firstCreditAsset?.symbol}
												</span>
											</div>
										</div>
									</div>

									<div>
										<h3 className="font-semibold text-lg mb-2">
											Borrowing Stats
										</h3>
										<div className="space-y-2">
											<div className="flex justify-between">
												<span className="text-gray-600">Total Borrowed:</span>
												<span className="font-medium">
													{formatUnits(
														strategy.borrowingStats.totalBorrowedAmount,
														18,
													)}{" "}
													{firstCreditAsset?.symbol}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Total Repaid:</span>
												<span className="font-medium">
													{formatUnits(
														strategy.borrowingStats.totalRepaidAmount,
														18,
													)}{" "}
													{firstCreditAsset?.symbol}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Total Defaulted:</span>
												<span className="font-medium">
													{formatUnits(
														strategy.borrowingStats.totalDefaultedAmount,
														18,
													)}{" "}
													{firstCreditAsset?.symbol}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">Active Borrowed:</span>
												<span className="font-medium">
													{formatUnits(
														strategy.borrowingStats.activeBorrowedAmount,
														18,
													)}{" "}
													USD
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<StrategyCommitmentCreator strategy={strategy} />

					<Card>
						<CardHeader>
							<CardTitle>Terms</CardTitle>
							<CardDescription>Strategy terms and conditions</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h3 className="font-semibold text-lg mb-2">Credit Assets</h3>
									<ul className="list-disc pl-5 space-y-1">
										{strategy.terms.creditAssets.map((asset) => (
											<li key={asset.address} className="flex items-center">
												<img
													src={asset.icon}
													alt={asset.name}
													className="w-4 h-4 mr-2"
												/>
												<span className="flex-1">
													{asset.symbol} ({asset.name})
												</span>
												<AssetPrice asset={asset} />
											</li>
										))}
									</ul>
								</div>

								<div>
									<h3 className="font-semibold text-lg mb-2">
										Collateral Assets
									</h3>
									<ul className="list-disc pl-5 space-y-1">
										{strategy.terms.collateralAssets.map((asset) => (
											<li key={asset.address} className="flex items-center">
												<img
													src={asset.icon}
													alt={asset.name}
													className="w-4 h-4 mr-2"
												/>
												<span className="flex-1">
													{asset.symbol} ({asset.name})
												</span>
												<AssetPrice asset={asset} />
											</li>
										))}
									</ul>
								</div>
							</div>

							<div className="mt-6 space-y-2">
								<div className="flex justify-between">
									<span className="text-gray-600">APR:</span>
									<span className="font-medium">
										{pairKey && strategy.terms.apr[pairKey]
											? strategy.terms.apr[pairKey]
											: "N/A"}
										%
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">LTV:</span>
									<span className="font-medium">
										{pairKey && strategy.terms.ltv[pairKey]
											? strategy.terms.ltv[pairKey]
											: "N/A"}
										%
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{strategy.curator && (
						<Card>
							<CardHeader>
								<CardTitle>Curator</CardTitle>
								<CardDescription>Strategy curator information</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex items-center space-x-4">
									{strategy.curator.avatar && (
										<img
											src={strategy.curator.avatar}
											alt={strategy.curator.name}
											className="w-16 h-16 rounded-full object-cover"
										/>
									)}
									<div>
										<h3 className="font-semibold text-lg">
											{strategy.curator.name}
										</h3>
										<p className="text-gray-600">
											{strategy.curator.description}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					)}

					<Card>
						<CardHeader>
							<CardTitle>Proposals</CardTitle>
							<CardDescription>
								List of proposals for this strategy
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ProposalsList strategyId={strategyId} />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
