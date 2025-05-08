import type { AddressString } from "@pwndao/sdk-core";
import type { ProposalWithSignature } from "@pwndao/v1-core";
import { useMemo } from "react";
import { erc20Abi, formatUnits } from "viem";
import { useReadContracts } from "wagmi";
import { AcceptProposalButton } from "./AcceptProposalButton";

type ProposalCardProps = {
	proposal: ProposalWithSignature;
	address?: AddressString;
};

export const ProposalCard = ({ proposal, address }: ProposalCardProps) => {
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
		],
	});

	const creditMetadata = useMemo(() => {
		return {
			name: erc20Metadata?.[0]?.result,
			symbol: erc20Metadata?.[1]?.result,
			decimals: Number(erc20Metadata?.[2]?.result),
		};
	}, [erc20Metadata]);

	const formattedCreditAmount = useMemo(() => {
		const formatted = formatUnits(
			proposal.availableCreditLimit,
			creditMetadata?.decimals ?? 18,
		);
		return `${formatted} ${creditMetadata?.symbol}`;
	}, [proposal.availableCreditLimit, creditMetadata]);

	return (
		<div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 bg-gray-50">
			<div className="flex flex-col items-center justify-between">
				<h2 className="text-lg font-semibold text-gray-700">
					Proposal:
					{proposal.loanContract}
				</h2>

				<div className="flex flex-col items-center justify-between">
					<p>ChainID: {proposal.chainId}</p>
					<p>Credit Amount: {formattedCreditAmount}</p>
					<p>Proposer: {proposal.proposer}</p>
				</div>

				<p className="mt-2 text-sm text-gray-600 bg-gray-100 inline-block px-2 py-1 rounded">
					{proposal.type}
				</p>

				{address && (
					<AcceptProposalButton proposal={proposal} acceptor={address} />
				)}
				<p className="mt-2 text-sm text-gray-600 bg-gray-100 inline-block px-2 py-1 rounded">
					{proposal.sourceOfFunds}
				</p>
			</div>
		</div>
	);
};
