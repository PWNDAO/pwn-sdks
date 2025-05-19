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
import { SupportedChain } from "@pwndao/sdk-core";
import { useStrategies } from "@pwndao/sdk-v1-react";
import Link from "next/link";
import { formatUnits } from "viem";

export default function StrategiesPage() {
	const { data: strategies, isLoading } = useStrategies(SupportedChain.Sepolia);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Strategies</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{strategies?.map((strategy) => (
					<Card key={strategy.id} className="h-full" isLoading={isLoading}>
						<CardHeader isLoading={isLoading}>
							<CardTitle>{strategy.name}</CardTitle>
							<CardDescription className="text-sm text-gray-500">
								ID: {strategy.id}
							</CardDescription>
							<CardDescription className="text-sm text-gray-500">
								Strategy Type: {strategy.type}
							</CardDescription>
						</CardHeader>
						<CardContent isLoading={isLoading}>
							<p className="mb-4">{strategy.description}</p>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="font-medium">Total Committed:</span>
									<span>
										{formatUnits(
											strategy.lendingStats.totalCommittedAmount,
											18,
										) || "0"}{" "}
										{strategy.terms.creditAssets[0].symbol}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium">Credit Assets:</span>
									<span>
										{strategy.terms.creditAssets
											.map((asset) => asset.symbol)
											.join(", ") || "None"}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium">Collateral Assets:</span>
									<span>
										{strategy.terms.collateralAssets
											.map((asset) => asset.symbol)
											.join(", ") || "None"}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium">APR:</span>
									<span>
										{strategy.terms.apr[
											`${strategy.terms.collateralAssets[0].address}/${strategy.terms.collateralAssets[0].chainId}-${strategy.terms.creditAssets[0].address}/${strategy.terms.creditAssets[0].chainId}`
										] || "0"}{" "}
										%
									</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium">LTV:</span>
									<span>
										{strategy.terms.ltv[
											`${strategy.terms.collateralAssets[0].address}/${strategy.terms.collateralAssets[0].chainId}-${strategy.terms.creditAssets[0].address}/${strategy.terms.creditAssets[0].chainId}`
										] || "0"}{" "}
										%
									</span>
								</div>
							</div>
						</CardContent>
						<CardFooter isLoading={isLoading}>
							<Link href={`/strategy/${strategy.id}`} className="w-full">
								<Button variant="default" className="w-full">
									View Details
								</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
