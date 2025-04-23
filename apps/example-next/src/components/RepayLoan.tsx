import { SimpleLoanContract, repayLoan } from "@pwndao/v1-core";
import React, { useState } from "react";
import { useAccount, useConfig } from "wagmi";

const SUPPORTED_CHAINS = [
	{ id: 1, name: "Ethereum" },
	{ id: 137, name: "Polygon" },
	{ id: 10, name: "Optimism" },
	{ id: 42161, name: "Arbitrum" },
];

const BLOCK_EXPLORERS = {
	1: "https://etherscan.io/tx/",
	137: "https://polygonscan.com/tx/",
	10: "https://optimistic.etherscan.io/tx/",
	42161: "https://arbiscan.io/tx/",
};

const RepayLoan = () => {
	const [loanId, setLoanId] = useState("");
	const [chainId, setChainId] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [transactionHash, setTransactionHash] = useState("");

	const { address } = useAccount();
	const config = useConfig();

	const handleRepayLoan = async () => {
		if (!loanId) {
			setError("Please enter a valid Loan ID");
			return;
		}

		if (!address) {
			setError("Please connect your wallet");
			return;
		}

		setError("");
		setIsLoading(true);
		setTransactionHash("");

		try {
			const loanContract = new SimpleLoanContract(config);

			await repayLoan(
				{
					loanId: BigInt(loanId),
					repayer: address,
					chainId: chainId,
				},
				{
					loanContract,
				},
			);

			// This would typically come from a transaction receipt
			setTransactionHash("transaction-hash");
		} catch (err: unknown) {
			console.error("Error repaying loan:", err);
			setError(err instanceof Error ? err.message : "Failed to repay loan");
		} finally {
			setIsLoading(false);
		}
	};

	const getBlockExplorerLink = () => {
		return (
			BLOCK_EXPLORERS[chainId as keyof typeof BLOCK_EXPLORERS] + transactionHash
		);
	};

	return (
		<div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md border border-gray-200">
			{/* Card Header */}
			<div className="p-6 pb-2">
				<h2 className="text-2xl font-semibold text-center mb-1">Repay Loan</h2>
				<p className="text-center text-gray-500 text-sm mb-4">
					Enter loan details to repay your loan
				</p>
			</div>

			{/* Card Content */}
			<div className="p-6 pt-2 space-y-4">
				<div className="space-y-2">
					<label
						htmlFor="loanId"
						className="text-sm font-medium text-gray-700 block"
					>
						Loan ID
					</label>
					<input
						id="loanId"
						type="text"
						value={loanId}
						onChange={(e) => setLoanId(e.target.value)}
						placeholder="Enter loan ID"
						className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div className="space-y-2">
					<label
						htmlFor="chainId"
						className="text-sm font-medium text-gray-700 block"
					>
						Chain
					</label>
					<select
						id="chainId"
						value={chainId}
						onChange={(e) => setChainId(Number(e.target.value))}
						className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					>
						{SUPPORTED_CHAINS.map((chain) => (
							<option key={chain.id} value={chain.id}>
								{chain.name} ({chain.id})
							</option>
						))}
					</select>
				</div>

				{error && (
					<div className="bg-red-50 text-red-700 text-sm rounded-md p-4 border border-red-200 flex items-start">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2 h-4 w-4 shrink-0 mt-0.5"
							aria-label="Warning icon"
							role="img"
						>
							<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
							<line x1="12" y1="9" x2="12" y2="13" />
							<line x1="12" y1="17" x2="12.01" y2="17" />
						</svg>
						<div>{error}</div>
					</div>
				)}

				{transactionHash && (
					<div className="bg-green-50 text-green-800 border-green-200 border rounded-md p-4 text-sm flex items-start">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2 h-4 w-4 shrink-0 mt-0.5"
							aria-label="Success icon"
							role="img"
						>
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
							<polyline points="22 4 12 14.01 9 11.01" />
						</svg>
						<div className="flex flex-col">
							<span>Transaction successful!</span>
							<a
								href={getBlockExplorerLink()}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center text-blue-600 hover:underline mt-2"
							>
								View on Block Explorer
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="ml-1 h-3 w-3"
									aria-label="External link icon"
									role="img"
								>
									<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
									<polyline points="15 3 21 3 21 9" />
									<line x1="10" y1="14" x2="21" y2="3" />
								</svg>
							</a>
						</div>
					</div>
				)}
			</div>

			{/* Card Footer */}
			<div className="p-6 pt-0">
				<button
					type="button"
					onClick={handleRepayLoan}
					disabled={isLoading}
					className="w-full h-10 bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
				>
					{isLoading ? "Processing..." : "Repay Loan"}
				</button>
			</div>
		</div>
	);
};

export default RepayLoan;
