import type { AddressString } from "@pwndao/sdk-core";
import {
	type ReadContractsParameters,
	readContracts,
} from "@wagmi/core";
import { type Hex, encodeFunctionData, erc20Abi } from "viem";
import type { ProposalsToAccept } from "../actions/types.js";

export const getAmountsOfCreditAssets = async (
	proposals: ProposalsToAccept[],
) => {
	const amountGroupedByCreditAsset: Record<
		`${string}-${string}`,
		{
			amount: bigint;
			proposals: ProposalsToAccept[];
			acceptor: AddressString;
		}
	> = {};

	for (const proposalToAccept of proposals) {
		const { proposal, creditAmount } = proposalToAccept;
		const uniqueKey = `${proposal.creditAddress}-${proposal.chainId}` as const;
		if (!amountGroupedByCreditAsset[uniqueKey]) {
			amountGroupedByCreditAsset[uniqueKey] = {
				amount: BigInt(0),
				proposals: [],
				acceptor: proposal.proposer,
			};
		}
		amountGroupedByCreditAsset[uniqueKey].amount += creditAmount;
		amountGroupedByCreditAsset[uniqueKey].proposals.push(proposalToAccept);
	}

	return amountGroupedByCreditAsset;
};

export const getAmountsOfCollateralAssets = async (
	proposals: ProposalsToAccept[],
) => {
	const groupedByCollateral: Record<
		`${string}-${string}`,
		{
			amount: bigint;
			proposals: ProposalsToAccept[];
			acceptor: AddressString;
		}
	> = {};

	if (proposals.length === 0) {
		return groupedByCollateral;
	}

	const config = proposals[0].proposalContract.config;

	const amounts = await readContracts(config, {
		contracts: proposals.map((proposal) => {
			return proposal.proposalContract.getReadCollateralAmount(
				proposal.proposal,
			);
		}),
	});

	for (const [index, result] of amounts.entries()) {
		const relatedProposal = proposals[index];
		const key =
			`${relatedProposal.proposal.collateralAddress}-${relatedProposal.proposal.chainId}` as const;

		if (!groupedByCollateral[key]) {
			groupedByCollateral[key] = {
				amount: BigInt(0),
				proposals: [],
				acceptor: relatedProposal.acceptor,
			};
		}
		groupedByCollateral[key].amount += result.result as bigint;
		groupedByCollateral[key].proposals.push(relatedProposal);
	}

	return groupedByCollateral;
};

export const getApprovals = async (proposalsToAccept: ProposalsToAccept[]) => {
	const borrowingProposals: ProposalsToAccept[] = [];
	const lendingProposals: ProposalsToAccept[] = [];

	for (const proposalToAccept of proposalsToAccept) {
		if (proposalToAccept.proposal.isOffer) {
			lendingProposals.push(proposalToAccept);
		} else {
			borrowingProposals.push(proposalToAccept);
		}
	}

	const borrowingAmounts = await getAmountsOfCreditAssets(borrowingProposals);
	const lendingAmounts = await getAmountsOfCollateralAssets(lendingProposals);

	const items = [
		...Object.entries(borrowingAmounts),
		...Object.entries(lendingAmounts),
	];

	const results: {
		to: AddressString;
		data: Hex;
	}[] = [];

	const existingApprovalsAndBalancesCall: ReadContractsParameters["contracts"][number][] =
		[];

	// first we are getting the allowance and balance of the acceptor assets
	for (const [key, { proposals, acceptor }] of items) {
		const [assetAddress] = key.split("-");

		existingApprovalsAndBalancesCall.push({
			abi: erc20Abi,
			address: assetAddress as AddressString,
			functionName: "allowance",
			args: [acceptor, proposals[0].proposal.loanContract],
		} as const);

		existingApprovalsAndBalancesCall.push({
			abi: erc20Abi,
			address: assetAddress as AddressString,
			functionName: "balanceOf",
			args: [acceptor],
		} as const);
	}

	const config = proposalsToAccept[0].proposalContract.config;

	const existingApprovalsAndBalances = await readContracts(config, {
		contracts: existingApprovalsAndBalancesCall,
	});

	let index = 0;
	// Check if the allowance and balance are enough to cover the proposals
	for (const [key, { proposals, amount }] of items) {
		const allowance = existingApprovalsAndBalances[index].result as bigint;
		const balance = existingApprovalsAndBalances[index + 1].result as bigint;

		const [assetAddress] = key.split("-");

		// for each proposal that has not enough allowance, we are adding the approval call to the results
		if (allowance < amount && balance >= amount) {
			results.push({
				to: assetAddress as AddressString,
				data: encodeFunctionData({
					abi: erc20Abi,
					functionName: "approve",
					args: [proposals[0].proposal.loanContract, amount],
				}),
			});
		}

		if (allowance >= amount && amount > balance) {
			throw new Error(
				`Not enough balance for ${key}. Total required: ${amount}, allowance: ${allowance}, balance: ${balance}`,
			);
		}

		index += 2;
	}

	return results;
};
