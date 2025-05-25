import {
	type AddressString,
	ERC20Token,
	type ERC20TokenLike,
	type SupportedChain,
	type UniqueKey,
	getPwnSimpleLoanAddress,
	getUniqueKey,
	isPoolToken,
} from "@pwndao/sdk-core";
import { ReadContractsParameters, readContracts } from "@wagmi/core";
import {
	type ContractFunctionParameters,
	type Hex,
	encodeFunctionData,
	erc20Abi,
	isAddressEqual,
} from "viem";
import type { ProposalsToAccept } from "../actions/types.js";
import type { BaseProposalContract } from "../contracts/base-proposal-contract.js";
import type { Proposal } from "../models/strategies/types.js";

type TotalToApproveMap = {
	[key in UniqueKey]?: {
		amount: bigint;
		asset: ERC20TokenLike;
		spender?: AddressString;
	};
};

type ApprovalItem = [
	string,
	{ proposals: ProposalsToAccept[]; amount: bigint },
];

type ApprovalToVerify = {
	address: AddressString;
	chainId: number;
	amount: bigint;
	userAddress: AddressString;
	spender: AddressString;
	isPoolToken: boolean;
};

export type GroupedAssets = Record<
	UniqueKey,
	{
		amount: bigint;
		proposals: ProposalsToAccept[];
		acceptor: AddressString;
		asset: ERC20TokenLike;
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
				asset: proposalToAccept.creditAsset,
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

		const collateralAsset = new ERC20Token(
			relatedProposal.proposalToAccept.chainId,
			relatedProposal.proposalToAccept.collateralAddress,
			0, // not used anywhere
		);
		const key = getUniqueKey(collateralAsset);

		if (!groupedByCollateral[key]) {
			groupedByCollateral[key] = {
				amount: BigInt(0),
				proposals: [],
				acceptor: relatedProposal.acceptor,
				asset: collateralAsset,
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

export const getApprovalsToVerify = (
	items: GroupedAssets,
	userAddress: AddressString,
	totalToApprove: TotalToApproveMap,
): Record<UniqueKey, ApprovalToVerify> => {
	const approvalToVerify: Record<UniqueKey, ApprovalToVerify> = {};

	const addOrUpdateApproval = (
		key: UniqueKey,
		address: AddressString,
		chainId: number,
		amount: bigint,
		spender: AddressString,
		isPoolToken: boolean,
		shouldAdd = true,
	) => {
		if (approvalToVerify[key]) {
			if (shouldAdd) {
				approvalToVerify[key].amount += amount;
			} else if (approvalToVerify[key].amount < amount) {
				approvalToVerify[key].amount = amount;
			}
		} else {
			approvalToVerify[key] = {
				address,
				chainId,
				amount,
				userAddress,
				spender,
				isPoolToken,
			};
		}
	};

	// Process items
	for (const [key, { acceptor, amount, asset }] of Object.entries(items)) {
		const [assetAddress, chainId] = key.split("/");
		const _isPoolToken = isPoolToken(asset);
		const baseAssetAddress = _isPoolToken
			? asset.underlyingAddress
			: assetAddress;

		if (_isPoolToken) {
			const poolTokenKey = getUniqueKey(asset);
			addOrUpdateApproval(
				poolTokenKey as UniqueKey,
				assetAddress as AddressString,
				Number(chainId),
				amount,
				acceptor,
				true,
			);
		}

		const baseAssetUniqueKey = getUniqueKey({
			address: baseAssetAddress as AddressString,
			chainId: Number(chainId),
		});

		const _spender = _isPoolToken
			? acceptor
			: getPwnSimpleLoanAddress(Number(asset.chainId) as SupportedChain);

		addOrUpdateApproval(
			baseAssetUniqueKey as UniqueKey,
			baseAssetAddress as AddressString,
			Number(chainId),
			amount,
			_spender,
			false,
		);
	}

	// Process totalToApprove entries
	const poolTokenEntries = Object.entries(totalToApprove).filter(
		([_, { asset } = {}]) => asset && isPoolToken(asset),
	);
	const baseTokenEntries = Object.entries(totalToApprove).filter(
		([_, { asset } = {}]) => asset && !isPoolToken(asset),
	);

	// Process base tokens first, then pool tokens
	for (const [, { amount, asset, spender } = {}] of [
		...baseTokenEntries,
		...poolTokenEntries,
	]) {
		if (!amount || !asset || !spender) {
			continue;
		}

		const _isPoolToken = isPoolToken(asset);
		const baseAssetAddress = _isPoolToken
			? asset.underlyingAddress
			: asset.address;

		if (_isPoolToken) {
			const poolTokenKey = getUniqueKey(asset);
			addOrUpdateApproval(
				poolTokenKey as UniqueKey,
				asset.address as AddressString,
				asset.chainId,
				amount,
				spender,
				true,
				false,
			);
		}

		const baseAssetUniqueKey = getUniqueKey({
			address: baseAssetAddress as AddressString,
			chainId: asset.chainId,
		});

		const baseAmount = _isPoolToken
			? amount + (totalToApprove[baseAssetUniqueKey as UniqueKey]?.amount ?? 0n)
			: amount;
		const _spender = _isPoolToken
			? spender
			: getPwnSimpleLoanAddress(Number(asset.chainId) as SupportedChain);

		addOrUpdateApproval(
			baseAssetUniqueKey as UniqueKey,
			baseAssetAddress as AddressString,
			asset.chainId,
			baseAmount,
			_spender,
			false,
			false,
		);
	}

	return approvalToVerify;
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

function createPoolTokenApprovalTransactions(
	asset: ERC20TokenLike,
	spender: AddressString,
	amount: bigint,
	totalToApprove: TotalToApproveMap,
): ApprovalTransaction[] {
	const results: ApprovalTransaction[] = [];
	results.push(createApprovalTransaction(asset.address, spender, amount));

	if (!isPoolToken(asset)) {
		throw new Error("Asset must be a PoolToken to access underlyingAddress");
	}

	const underlyingAssetKey = getUniqueKey({
		address: asset.underlyingAddress,
		chainId: asset.chainId,
	});

	const underlyingAssetNeedsToBeApproved =
		totalToApprove[underlyingAssetKey as UniqueKey];

	results.push(
		createApprovalTransaction(
			asset.underlyingAddress,
			getPwnSimpleLoanAddress(Number(asset.chainId) as SupportedChain),
			amount + (underlyingAssetNeedsToBeApproved?.amount ?? 0n),
		),
	);

	delete totalToApprove[underlyingAssetKey as UniqueKey];
	return results;
}

function createStandardTokenApprovalTransaction(
	assetAddress: string,
	loanContract: AddressString,
	amount: bigint,
): ApprovalTransaction {
	return createApprovalTransaction(assetAddress, loanContract, amount);
}

function handleApprovalForKey(
	key: string,
	proposals: ProposalsToAccept[],
	amount: bigint,
	allowance: bigint,
	balance: bigint,
	totalToApprove: TotalToApproveMap,
	results: ApprovalTransaction[],
) {
	const approval = totalToApprove?.[key as UniqueKey];
	const { amount: amountToApprove = amount, asset, spender } = approval || {};
	const [assetAddress] = key.split("/");

	if (asset && isPoolToken(asset) && spender) {
		const tokenMatches = isAddressEqual(
			asset?.address as `0x${string}`,
			assetAddress as `0x${string}`,
		);
		if (tokenMatches) {
			results.push(
				...createPoolTokenApprovalTransactions(
					asset,
					spender,
					amountToApprove,
					totalToApprove,
				),
			);
		} else {
			results.push(
				createStandardTokenApprovalTransaction(
					assetAddress,
					proposals[0].proposalToAccept.loanContract,
					amountToApprove,
				),
			);
		}
	} else {
		results.push(
			createStandardTokenApprovalTransaction(
				assetAddress,
				proposals[0].proposalToAccept.loanContract,
				amountToApprove,
			),
		);
	}
	delete totalToApprove[key as UniqueKey];
}

export const processCheckResults = (
	items: ApprovalItem[],
	existingApprovalsAndBalances: ContractCallResult[],
	totalToApprove: TotalToApproveMap,
): ApprovalTransaction[] => {
	const results: ApprovalTransaction[] = [];
	let index = 0;

	for (const [key, { proposals, amount }] of items) {
		const allowance = existingApprovalsAndBalances[index].result as bigint;
		const balance = existingApprovalsAndBalances[index + 1].result as bigint;
		if (allowance < amount && balance >= amount) {
			handleApprovalForKey(
				key,
				proposals,
				amount,
				allowance,
				balance,
				totalToApprove,
				results,
			);
		}
		if (allowance >= amount && amount > balance) {
			throw new Error(
				`Not enough balance for ${key}. Total required: ${amount}, allowance: ${allowance}, balance: ${balance}`,
			);
		}
		index += 2;
	}

	// First process pool tokens as pool tokens will also include underlying token approvals
	const poolTokenKeys = Object.keys(totalToApprove).filter((key) =>
		isPoolToken(totalToApprove[key as UniqueKey]?.asset as ERC20TokenLike),
	);

	for (const key of poolTokenKeys) {
		const { amount, asset, spender } = totalToApprove[key as UniqueKey] || {};
		if (!amount || !asset) {
			delete totalToApprove[key as UniqueKey];
			continue;
		}
		if (!spender) {
			throw new Error("Spender is required for pool token");
		}
		results.push(
			...createPoolTokenApprovalTransactions(
				asset,
				spender,
				amount,
				totalToApprove,
			),
		);
		delete totalToApprove[key as UniqueKey];
	}

	// Then process remaining non-pool tokens
	while (Object.keys(totalToApprove).length > 0) {
		const [uniqueToApproveKey, approvalValues] =
			Object.entries(totalToApprove)[0];
		const { amount, asset } = approvalValues || {};
		if (!amount || !asset) {
			delete totalToApprove[uniqueToApproveKey as UniqueKey];
			continue;
		}
		results.push(
			createApprovalTransaction(
				asset.address,
				getPwnSimpleLoanAddress(Number(asset.chainId) as SupportedChain),
				amount,
			),
		);
		delete totalToApprove[getUniqueKey(asset) as UniqueKey];
	}

	return results;
};

export const getApprovalReadCalls = (
	groupedApprovals: Record<UniqueKey, ApprovalToVerify>,
) => {
	const calls: ContractFunctionParameters[] = [];

	for (const [, approval] of Object.entries(groupedApprovals)) {
		calls.push({
			abi: erc20Abi,
			functionName: "allowance",
			args: [approval.userAddress, approval.spender],
			address: approval.address,
		});
	}

	return calls;
};

export const getApprovals = async (
	proposalsToAccept: ProposalsToAccept[],
	contract: BaseProposalContract<Proposal>,
	userAddress: AddressString,
	totalToApprove: TotalToApproveMap = {},
): Promise<ApprovalTransaction[]> => {
	const { borrowingProposals, lendingProposals } =
		categorizeProposals(proposalsToAccept);

	const borrowingAmounts = await getAmountsOfCreditAssets(borrowingProposals);
	const lendingAmounts = await getAmountsOfCollateralAssets(
		lendingProposals,
		contract,
	);

	const approvalsToVerify = getApprovalsToVerify(
		{
			...borrowingAmounts,
			...lendingAmounts,
		},
		userAddress,
		totalToApprove,
	);

	const contractCalls = getApprovalReadCalls(approvalsToVerify);

	const existingApprovalsAndBalances = await readContracts(contract.config, {
		contracts: contractCalls,
	});

	const results: ApprovalTransaction[] = [];

	let index = 0;

	for (const [, approval] of Object.entries(approvalsToVerify)) {
		const allowance = existingApprovalsAndBalances[index].result as bigint;

		if (allowance < approval.amount) {
			results.push(
				createApprovalTransaction(
					approval.address,
					approval.spender,
					approval.amount,
				),
			);
		}

		index += 1;
	}

	return results;
};
