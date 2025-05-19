import type { AddressString } from "@pwndao/sdk-core";
import type { ProposalWithSignature } from "@pwndao/v1-core";
import { useMemo } from "react";
import { erc20Abi, formatUnits } from "viem";
import { useReadContracts } from "wagmi";
import { AcceptProposalButton } from "./AcceptProposalButton";

type ProposalCardProps = {
	proposal: ProposalWithSignature;
	address?: AddressString;
	isSelected: boolean;
	onSelect: (proposal: ProposalWithSignature) => void;
};

export const ProposalCard = ({
	proposal,
	address,
	isSelected,
	onSelect,
}: ProposalCardProps) => {
	const allowanceReadContract = useMemo(() => {
		if (proposal.isOffer) {
			return {
				address: proposal.creditAddress,
				abi: erc20Abi,
				functionName: "allowance",
				args: [address, proposal.loanContract] as [
					AddressString,
					AddressString,
				],
			} as const;
		}

		return {
			address: proposal.collateralAddress,
			abi: erc20Abi,
			functionName: "allowance",
			args: [proposal.proposer, proposal.loanContract] as [
				AddressString,
				AddressString,
			],
		} as const;
	}, [
		proposal.creditAddress,
		proposal.isOffer,
		address,
		proposal.loanContract,
		proposal.collateralAddress,
		proposal.proposer,
	]);

	const { data: erc20Metadata } = useReadContracts({
		contracts: [
			{
				address: proposal.creditAddress,
				abi: erc20Abi,
				functionName: "name",
			},
			{
				address: proposal.creditAddress,
				abi: erc20Abi,
				functionName: "symbol",
			},
			{
				address: proposal.creditAddress,
				abi: erc20Abi,
				functionName: "decimals",
			},
			allowanceReadContract,
			{
				address: proposal.collateralAddress,
				abi: erc20Abi,
				functionName: "name",
			},
			{
				address: proposal.collateralAddress,
				abi: erc20Abi,
				functionName: "symbol",
			},
			{
				address: proposal.collateralAddress,
				abi: erc20Abi,
				functionName: "decimals",
			},
		],
	});

	const creditMetadata = useMemo(() => {
		return {
			name: erc20Metadata?.[0]?.result,
			symbol: erc20Metadata?.[1]?.result,
			decimals: Number(erc20Metadata?.[2]?.result),
			allowance: erc20Metadata?.[3]?.result,
		};
	}, [erc20Metadata]);

	const collateralMetadata = useMemo(() => {
		return {
			name: erc20Metadata?.[4]?.result,
			symbol: erc20Metadata?.[5]?.result,
			decimals: Number(erc20Metadata?.[6]?.result),
			allowance: erc20Metadata?.[3]?.result,
		};
	}, [erc20Metadata]);

	const formattedCreditAmount = useMemo(() => {
		const formatted = formatUnits(
			proposal.availableCreditLimit,
			creditMetadata?.decimals ?? 18,
		);
		return `${formatted} ${creditMetadata?.symbol}`;
	}, [proposal.availableCreditLimit, creditMetadata]);

	console.log(creditMetadata);

	const formattedAllowance = useMemo(() => {
		if (proposal.isOffer) {
			const allowance = creditMetadata?.allowance ?? 0n;
			const formatted = formatUnits(allowance, creditMetadata?.decimals ?? 18);
			return `${formatted} ${creditMetadata?.symbol}`;
		}

		const allowance = collateralMetadata?.allowance ?? 0n;
		const formatted = formatUnits(
			allowance,
			collateralMetadata?.decimals ?? 18,
		);
		return `${formatted} ${collateralMetadata?.symbol}`;
	}, [creditMetadata, collateralMetadata, proposal.isOffer]);

	const allowanceText = useMemo(() => {
		if (proposal.isOffer) {
			return `Allowed to borrow up to ${formattedAllowance}`;
		}
		return `Allowed to collateralize up to ${formattedAllowance}`;
	}, [proposal.isOffer, formattedAllowance]);

	return (
		<div
			className={`p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 bg-gray-50 ${isSelected ? "border-teal-500" : ""}`}
			onClick={() => onSelect(proposal)}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					onSelect(proposal);
				}
			}}
			aria-label="Select proposal"
		>
			<div className="flex flex-col items-center justify-between">
				<h2 className="text-lg font-semibold text-gray-700">
					Proposal [{proposal.isOffer ? "Bid" : "Ask"}]:
					{proposal.loanContract}
				</h2>

				<div className="flex flex-col items-center justify-between">
					<p>ChainID: {proposal.chainId}</p>
					<p>Credit Amount: {formattedCreditAmount}</p>
					<p>Proposer: {proposal.proposer}</p>
					<p>{allowanceText}</p>
				</div>

				<p className="mt-2 text-sm text-gray-600 bg-gray-100 inline-block px-2 py-1 rounded">
					{proposal.type}
				</p>

				{address && (
					<AcceptProposalButton
						proposal={proposal}
						acceptor={address}
						proposalType={proposal.type}
					/>
				)}
				<p className="mt-2 text-sm text-gray-600 bg-gray-100 inline-block px-2 py-1 rounded">
					{proposal.sourceOfFunds}
				</p>
			</div>
		</div>
	);
};
