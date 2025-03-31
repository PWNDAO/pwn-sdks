"use client";

import { useWalletAssets } from "@pwndao/sdk-v1-react";
import { AssetStorage, type WalletAssets } from "@pwndao/v1-core";
import React, { useState } from "react";
import type { Address } from "viem";
import { useAccount, useConnect, useDisconnect, usePublicClient } from "wagmi";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AddressString } from "@pwndao/sdk-core";
import { sepolia } from "viem/chains";

BigInt.prototype["toJSON"] = function () {
	return this.toString();
};

// Create a simplified version for the example demo
type SimpleComponentProps = {
	children: React.ReactNode;
	className?: string;
};

// Custom UI components to simplify the example
const Alert = ({
	children,
	variant,
}: { children: React.ReactNode; variant?: string }) => (
	<div
		className={`p-4 rounded-md ${variant === "destructive" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}
	>
		{children}
	</div>
);

const AlertTitle = ({ children }: SimpleComponentProps) => (
	<div className="font-bold mb-1">{children}</div>
);

const AlertDescription = ({ children }: SimpleComponentProps) => (
	<div>{children}</div>
);

const Skeleton = ({ className = "" }: { className?: string }) => (
	<div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// Basic tabs implementation
const TabsContext = React.createContext({
	activeTab: "",
	setActiveTab: (_value: string) => {
		/* noop */
	},
});

const Tabs = ({
	children,
	defaultValue,
}: { children: React.ReactNode; defaultValue: string }) => {
	const [activeTab, setActiveTab] = useState(defaultValue);

	return (
		<TabsContext.Provider value={{ activeTab, setActiveTab }}>
			<div>{children}</div>
		</TabsContext.Provider>
	);
};

const TabsList = ({ children, className = "" }: SimpleComponentProps) => (
	<div className={`flex space-x-2 ${className}`}>{children}</div>
);

const TabsTrigger = ({
	children,
	value,
}: { children: React.ReactNode; value: string }) => {
	const { activeTab, setActiveTab } = React.useContext(TabsContext);

	return (
		<button
			type="button"
			className={`px-4 py-2 rounded ${activeTab === value ? "bg-primary text-white" : "bg-gray-100"}`}
			onClick={() => setActiveTab(value)}
		>
			{children}
		</button>
	);
};

const TabsContent = ({
	children,
	value,
	className = "",
}: {
	children: React.ReactNode;
	value: string;
	className?: string;
}) => {
	const { activeTab } = React.useContext(TabsContext);

	if (activeTab !== value) return null;

	return <div className={`mt-4 ${className}`}>{children}</div>;
};

export default function WalletAssetsPage() {
	// State for custom wallet address input
	const [customAddress, setCustomAddress] = useState<
		AddressString | undefined
	>();
	const [addressToFetch, setAddressToFetch] = useState<Address | undefined>();

	// Wagmi hooks
	const { address, isConnected } = useAccount();
	const { connect, connectors } = useConnect();
	const { disconnect } = useDisconnect();
	const client = usePublicClient({
		chainId: sepolia.id,
	});

	console.log("client", client);
	const storage = new AssetStorage();

	const lastProcessedBlock = storage.getLastProcessedBlock(
		addressToFetch,
		sepolia.id,
	);

	console.log(`lastProcessedBlock: ${lastProcessedBlock}`);

	// Get wallet assets from our custom hook
	const {
		data: assets,
		isLoading,
		error,
		refetch,
	} = useWalletAssets(
		{
			enabled: Boolean(addressToFetch),
			fromBlock: lastProcessedBlock, // Start from block 0 for demo
			toBlock: lastProcessedBlock + 100000n,
			concurrentChunks: 1, // Lower for demo
			chunkSize: 10000, // Smaller chunks for demo
		},
		client,
		addressToFetch,
	);

	// Handle custom address fetch
	const handleFetchCustomAddress = () => {
		try {
			if (customAddress?.startsWith("0x") && customAddress.length === 42) {
				setAddressToFetch(customAddress as Address);
			} else {
				alert("Please enter a valid Ethereum address");
			}
		} catch (e) {
			console.error("Invalid address", e);
			alert("Please enter a valid Ethereum address");
		}
	};

	// Handle connected wallet fetch
	const handleFetchConnectedWallet = () => {
		if (address) {
			setAddressToFetch(address);
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex flex-col items-center text-center mb-12">
				<h1 className="text-4xl font-bold tracking-tight mb-4">
					Wallet Assets Fetcher
				</h1>
				<p className="text-lg text-muted-foreground max-w-2xl">
					Fetch and display assets from any wallet on the Sonic blockchain using
					Transfer event scanning
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 mb-8">
				<Card>
					<CardHeader>
						<CardTitle>Wallet Connection</CardTitle>
						<CardDescription>
							Connect your wallet or enter a wallet address
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{!isConnected ? (
							<div className="space-y-2">
								<Button
									onClick={() => connect({ connector: connectors[0] })}
									className="w-full"
								>
									Connect Wallet
								</Button>
								<p className="text-sm text-muted-foreground text-center">or</p>
							</div>
						) : (
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<p className="text-sm">
										Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
									</p>
									<Button
										variant="outline"
										size="sm"
										onClick={() => disconnect()}
									>
										Disconnect
									</Button>
								</div>
								<Button onClick={handleFetchConnectedWallet} className="w-full">
									Fetch My Assets
								</Button>
								<p className="text-sm text-muted-foreground text-center">or</p>
							</div>
						)}

						<div className="flex space-x-2">
							<div className="flex-1">
								<Input
									placeholder="Enter wallet address (0x...)"
									value={customAddress}
									onChange={(e) => setCustomAddress(e.target.value)}
								/>
							</div>
							<Button onClick={handleFetchCustomAddress}>Fetch</Button>
						</div>
					</CardContent>
				</Card>

				{error && (
					<Alert variant="destructive">
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>{error.message}</AlertDescription>
					</Alert>
				)}

				{addressToFetch && (
					<Card>
						<CardHeader>
							<CardTitle>Wallet Assets</CardTitle>
							<CardDescription>
								{isLoading
									? "Loading assets..."
									: `Assets for ${addressToFetch.slice(0, 6)}...${addressToFetch.slice(-4)}`}
							</CardDescription>
						</CardHeader>
						<CardContent>
							{isLoading ? (
								<AssetsLoadingSkeleton />
							) : assets ? (
								<AssetsDisplay assets={assets} />
							) : (
								<p>
									No assets found or not loaded yet. Click "Fetch Assets" to
									begin.
								</p>
							)}
						</CardContent>
						<CardFooter>
							<Button
								onClick={() => refetch()}
								disabled={isLoading}
								className="w-full"
							>
								{isLoading ? "Fetching..." : "Refresh Assets"}
							</Button>
						</CardFooter>
					</Card>
				)}
			</div>
		</div>
	);
}

function AssetsLoadingSkeleton() {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-8 w-[300px]" />
			</div>

			<div className="space-y-2">
				<Skeleton className="h-4 w-[200px]" />
				<div className="space-y-2">
					{[1, 2, 3].map((item) => (
						<Skeleton key={`loading-erc20-${item}`} className="h-16 w-full" />
					))}
				</div>
			</div>

			<div className="space-y-2">
				<Skeleton className="h-4 w-[180px]" />
				<div className="space-y-2">
					{[1, 2].map((item) => (
						<Skeleton key={`loading-erc721-${item}`} className="h-16 w-full" />
					))}
				</div>
			</div>
		</div>
	);
}

function AssetsDisplay({ assets }: { assets: WalletAssets }) {
	return (
		<Tabs defaultValue="summary">
			<TabsList className="mb-4">
				<TabsTrigger value="summary">Summary</TabsTrigger>
				<TabsTrigger value="erc20">ERC-20 Tokens</TabsTrigger>
				<TabsTrigger value="erc721">NFTs</TabsTrigger>
			</TabsList>

			<TabsContent value="summary" className="space-y-4">
				<div>
					<Label>Native Balance</Label>
					<p className="text-2xl font-bold">
						{formatBigInt(assets.nativeBalance)} S
					</p>
				</div>

				<div>
					<Label>ERC-20 Tokens</Label>
					<p className="text-xl">{assets.erc20Assets.length} tokens found</p>
				</div>

				<div>
					<Label>NFTs</Label>
					<p className="text-xl">
						{assets.erc721Assets.reduce(
							(acc, asset) => acc + asset.tokenIds.length,
							0,
						)}{" "}
						NFTs across {assets.erc721Assets.length} collections
					</p>
				</div>
			</TabsContent>

			<TabsContent value="erc20" className="space-y-4">
				{assets.erc20Assets.length === 0 ? (
					<p>No ERC-20 tokens found</p>
				) : (
					assets.erc20Assets.map((token) => (
						<Card key={`erc20-${token.contractAddress}`}>
							<CardContent className="pt-6">
								<div className="flex justify-between items-center">
									<div>
										<h3 className="font-bold">
											{token.symbol || "Unknown Token"}
											{token.name && (
												<span className="font-normal text-muted-foreground ml-2">
													({token.name})
												</span>
											)}
										</h3>
										<p className="text-xs text-muted-foreground">
											{token.contractAddress}
										</p>
									</div>
									<div className="text-right">
										<p className="font-bold">
											{formatBigInt(token.balance, token.decimals)}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))
				)}
			</TabsContent>

			<TabsContent value="erc721" className="space-y-4">
				{assets.erc721Assets.length === 0 ? (
					<p>No NFTs found</p>
				) : (
					assets.erc721Assets.map((collection) => (
						<Card key={`erc721-${collection.contractAddress}`}>
							<CardContent className="pt-6">
								<div>
									<h3 className="font-bold">
										{collection.symbol || "Unknown Collection"}
										{collection.name && (
											<span className="font-normal text-muted-foreground ml-2">
												({collection.name})
											</span>
										)}
									</h3>
									<p className="text-xs text-muted-foreground">
										{collection.contractAddress}
									</p>
									<div className="mt-2">
										<p>
											Token IDs:{" "}
											{collection.tokenIds
												.map((id) => id.toString())
												.join(", ")}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))
				)}
			</TabsContent>
		</Tabs>
	);
}

// Utility function to format big integers with optional decimals
function formatBigInt(value: bigint, decimals = 18): string {
	if (value === 0n) return "0";

	const stringValue = value.toString();
	const isNegative = stringValue.startsWith("-");
	const absValue = isNegative ? stringValue.slice(1) : stringValue;

	// Pad with leading zeros if needed
	const paddedValue = absValue.padStart(decimals + 1, "0");

	// Split into integer and decimal parts
	const integerPart = paddedValue.slice(0, -decimals) || "0";
	const decimalPart = paddedValue.slice(-decimals);

	// Trim trailing zeros in decimal part
	const trimmedDecimal = decimalPart.replace(/0+$/, "");

	// Format with commas for thousands
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	// Combine parts
	const result = trimmedDecimal
		? `${formattedInteger}.${trimmedDecimal}`
		: formattedInteger;

	return isNegative ? `-${result}` : result;
}
