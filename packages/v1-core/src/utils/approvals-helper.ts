import {
	type AddressString,
	type ERC20TokenLike,
	type SupportedChain,
	type UniqueKey,
	getPwnSimpleLoanAddress,
	getUniqueKey,
	isPoolToken,
} from "@pwndao/sdk-core";
import { type ReadContractsParameters, readContracts } from "@wagmi/core";
import { type Hex, encodeFunctionData, erc20Abi, isAddressEqual } from "viem";
import type { ProposalsToAccept } from "../actions/types.js";
import type { BaseProposalContract } from "../contracts/base-proposal-contract.js";
import type { Proposal } from "../models/strategies/types.js";

export type GroupedAssets = Record<
	UniqueKey,
	{
		amount: bigint;
		proposals: ProposalsToAccept[];
		acceptor: AddressString;
	}
>;
export type ApprovalTransaction = {
	to: AddressString;
	data: Hex;
};
export type ContractCallResult = {
	result?: unknown;
	status: "success" | "failure";
	error?: Error;
};

export const getAmountsOfCreditAssets = async (
	proposals: ProposalsToAccept[],
): Promise<GroupedAssets> => {
	const amountGroupedByCreditAsset: GroupedAssets = {};

	for (const proposalToAccept of proposals) {
		const {
			proposalToAccept: proposal,
			creditAmount,
			acceptor,
		} = proposalToAccept;
		const uniqueKey = getUniqueKey({
			address: proposal.creditAddress,
			chainId: proposal.chainId,
		});

		if (!amountGroupedByCreditAsset[uniqueKey]) {
			amountGroupedByCreditAsset[uniqueKey] = {
				amount: BigInt(0),
				proposals: [],
				acceptor: acceptor,
			};
		}
		amountGroupedByCreditAsset[uniqueKey].amount += creditAmount;
		amountGroupedByCreditAsset[uniqueKey].proposals.push(proposalToAccept);
	}

	return amountGroupedByCreditAsset;
};

export const getAmountsOfCollateralAssets = async (
	proposals: ProposalsToAccept[],
	contract: BaseProposalContract<Proposal>,
): Promise<GroupedAssets> => {
	const groupedByCollateral: GroupedAssets = {};

	if (proposals.length === 0) {
		return groupedByCollateral;
	}

	const toCall = proposals.map((proposal) =>
		contract.getReadCollateralAmount(proposal.proposalToAccept),
	);

	const amounts = await readContracts(contract.config, {
		contracts: toCall,
	});

	for (const [index, result] of amounts.entries()) {
		const relatedProposal = proposals[index];
		const key = getUniqueKey({
			address: relatedProposal.proposalToAccept.collateralAddress,
			chainId: relatedProposal.proposalToAccept.chainId,
		});

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

export const categorizeProposals = (
	proposalsToAccept: ProposalsToAccept[],
): {
	borrowingProposals: ProposalsToAccept[];
	lendingProposals: ProposalsToAccept[];
} => {
	const borrowingProposals: ProposalsToAccept[] = [];
	const lendingProposals: ProposalsToAccept[] = [];

	for (const proposalToAccept of proposalsToAccept) {
		if (proposalToAccept.proposalToAccept.isOffer) {
			lendingProposals.push(proposalToAccept);
		} else {
			borrowingProposals.push(proposalToAccept);
		}
	}

	return { borrowingProposals, lendingProposals };
};

export const createAllowanceAndBalanceCalls = (
	items: [
		string,
		{ proposals: ProposalsToAccept[]; acceptor: AddressString },
	][],
): ReadContractsParameters["contracts"][number][] => {
	const calls: ReadContractsParameters["contracts"][number][] = [];

	for (const [key, { proposals, acceptor }] of items) {
		const [assetAddress] = key.split("/");

		calls.push({
			abi: erc20Abi,
			address: assetAddress as AddressString,
			functionName: "allowance",
			args: [acceptor, proposals[0].proposalToAccept.loanContract],
		} as const);

		calls.push({
			abi: erc20Abi,
			address: assetAddress as AddressString,
			functionName: "balanceOf",
			args: [acceptor],
		} as const);
	}

	return calls;
};

export const createApprovalTransaction = (
	assetAddress: string,
	loanContract: AddressString,
	amountToApprove: bigint,
): ApprovalTransaction => ({
	to: assetAddress as AddressString,
	data: encodeFunctionData({
		abi: erc20Abi,
		functionName: "approve",
		args: [loanContract, amountToApprove],
	}),
});

export const processCheckResults = (
	items: [string, { proposals: ProposalsToAccept[]; amount: bigint }][],
	existingApprovalsAndBalances: ContractCallResult[],
	totalToApprove: {
		[key in UniqueKey]?: {
			amount: bigint;
			asset: ERC20TokenLike;
			spender?: AddressString;
		};
	},
): ApprovalTransaction[] => {
	const results: ApprovalTransaction[] = [];
	let index = 0;

	for (const [key, { proposals, amount }] of items) {
		const allowance = existingApprovalsAndBalances[index].result as bigint;
		const balance = existingApprovalsAndBalances[index + 1].result as bigint;

		const [assetAddress] = key.split("/");

		// Check if we need to add an approval transaction
		if (allowance < amount && balance >= amount) {
			const {
				amount: amountToApprove,
				asset,
				spender,
			} = totalToApprove?.[key as UniqueKey] ?? { amount: amount };

			if (asset && isPoolToken(asset) && spender) {
				const tokenMatches = isAddressEqual(
					asset?.address as `0x${string}`,
					assetAddress as `0x${string}`,
				);
				if (tokenMatches) {
					results.push(
						createApprovalTransaction(asset.address, spender, amountToApprove),
					);

					const underlyingAssetKey = getUniqueKey({
						address: asset.underlyingAddress,
						chainId: asset.chainId,
					});

					const underlyingAssetNeedsToBeApproved = totalToApprove[underlyingAssetKey]


					if (underlyingAssetNeedsToBeApproved) {
						results.push(
							createApprovalTransaction(
								asset.underlyingAddress,
								getPwnSimpleLoanAddress(Number(asset.chainId) as SupportedChain),
								amountToApprove + underlyingAssetNeedsToBeApproved.amount,
							),
						);

						// remove underlying asset from totalToApprove because it's already processed
						delete totalToApprove[underlyingAssetKey];
					} else {
						results.push(
							createApprovalTransaction(
								asset.underlyingAddress,
								getPwnSimpleLoanAddress(Number(asset.chainId) as SupportedChain),
								amountToApprove,
							),
						);
					}

				}
			} else {
				results.push(
					createApprovalTransaction(
						assetAddress,
						proposals[0].proposalToAccept.loanContract,
						amountToApprove,
					),
				);
			}

			// if we don't remove key here then on the next iteration we will use the same amount
			delete totalToApprove[key as UniqueKey];
		}

		// Check for insufficient balance
		if (allowance >= amount && amount > balance) {
			throw new Error(
				`Not enough balance for ${key}. Total required: ${amount}, allowance: ${allowance}, balance: ${balance}`,
			);
		}

		index += 2;
	}

	// if no keys left we already covered it above. If some left — it's extra approvals to issue
	if (Object.keys(totalToApprove).length > 0) {
		for (const [, approvalValues] of Object.entries(totalToApprove)) {
			const { amount, asset, spender } = approvalValues || {};

			if (!amount || !asset) {
				continue;
			}

			// for pool token we need to approve token to spender (pool hook) and underlying token to loan contract
			if (isPoolToken(asset)) {
				if (!spender) {
					throw new Error("Spender is required for pool token");
				}

				results.push(createApprovalTransaction(asset.address, spender, amount));

				const underlyingAssetKey = getUniqueKey({
					address: asset.underlyingAddress,
					chainId: asset.chainId,
				});

				const underlyingAssetNeedsToBeApproved = totalToApprove[underlyingAssetKey]
				
				if (underlyingAssetNeedsToBeApproved) {
					results.push(
						createApprovalTransaction(
							asset.underlyingAddress,
							getPwnSimpleLoanAddress(Number(asset.chainId) as SupportedChain),
							amount + underlyingAssetNeedsToBeApproved.amount,
						),
					);

					// remove underlying asset from totalToApprove because it's already processed
					delete totalToApprove[underlyingAssetKey];
				} else {
					results.push(
						createApprovalTransaction(
							asset.underlyingAddress,
							getPwnSimpleLoanAddress(Number(asset.chainId) as SupportedChain),
							amount,
						),
					);
				}

			} else {
				results.push(
					createApprovalTransaction(
						asset.address,
						getPwnSimpleLoanAddress(Number(asset.chainId) as SupportedChain),
						amount,
					),
				);
			}
		}
	}

	return results;
};

export const getApprovals = async (
	proposalsToAccept: ProposalsToAccept[],
	contract: BaseProposalContract<Proposal>,
	totalToApprove: {
		[key in UniqueKey]?: {
			amount: bigint;
			asset: ERC20TokenLike;
			spender?: AddressString;
		};
	} = {},
): Promise<ApprovalTransaction[]> => {
	const { borrowingProposals, lendingProposals } =
		categorizeProposals(proposalsToAccept);

	// Get grouped amounts for both types
	const borrowingAmounts = await getAmountsOfCreditAssets(borrowingProposals);
	const lendingAmounts = await getAmountsOfCollateralAssets(
		lendingProposals,
		contract,
	);

	const items = [
		...Object.entries(borrowingAmounts),
		...Object.entries(lendingAmounts),
	];

	const existingApprovalsAndBalancesCall =
		createAllowanceAndBalanceCalls(items);

	const existingApprovalsAndBalances = await readContracts(contract.config, {
		contracts: existingApprovalsAndBalancesCall,
	});

	return processCheckResults(
		items,
		existingApprovalsAndBalances,
		totalToApprove,
	);
};
