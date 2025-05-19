import type {
	CollateralAssetInThesisSchemaWorkaround,
	ThesisSchemaWorkaround,
} from "@pwndao/api-sdk";
import {
	type AddressString,
	ERC20Token,
	PoolToken,
} from "@pwndao/sdk-core";
import invariant from "ts-invariant";
import { MIN_CREDIT_CALCULATION_DENOMINATOR } from "../../factories/constants.js";
import { ProposalType } from "../../models/proposals/proposal-base.js";
import type { Strategy, StrategyTerm } from "../../models/strategies/types.js";

type AssetModel = CollateralAssetInThesisSchemaWorkaround;
type CreditAssetModel = Omit<
	AssetModel,
	"ltv" | "apr" | "allocationPercentage"
>;

const parseStrategyToken = (
	token: AssetModel | CreditAssetModel,
	isPoolHook = false,
) => {
	invariant(token.decimals !== null, "token.decimals is required");

	if (isPoolHook && token?.underlyingTokenAddress) {
		return new PoolToken(
			token.chainId,
			token.address as AddressString,
			token.underlyingTokenAddress as AddressString,
			token.decimals,
			undefined, // TODO: add protocol
			token.name ?? undefined,
			token.symbol ?? undefined,
			token.thumbnailUrl ?? undefined,
		);
	}
	return new ERC20Token(
		token.chainId,
		token.address as AddressString,
		token.decimals,
		token.name ?? undefined,
		token.symbol ?? undefined,
		token.thumbnailUrl ?? undefined,
	);
};

const generateLtvMapping = (
	collateralAssets: AssetModel[],
	creditAssets: CreditAssetModel[],
	ltv: ThesisSchemaWorkaround["ltv"],
) => {
	invariant(
		collateralAssets && creditAssets,
		"collateralAssets and creditAssets are required",
	);

	const ltvMapping: Record<string, number> = {};

	for (const creditAsset of creditAssets) {
		for (const collateralAsset of collateralAssets) {
			const key = `${collateralAsset.address}/${collateralAsset.chainId}-${creditAsset.address}/${creditAsset.chainId}`;
			ltvMapping[key] = collateralAsset?.ltv ?? ltv;
		}
	}

	return ltvMapping;
};

export const parseBackendStrategiesResponse = (
	backendData: ThesisSchemaWorkaround,
): Strategy => {
	const creditAssets = backendData.creditsStats?.map(
		(v) => v.creditAssetMetadata,
	);

	const terms: StrategyTerm = {
		apr: backendData.aprMappings as Record<string, number>,
		ltv: generateLtvMapping(
			backendData.collateralAssets || [],
			creditAssets || [],
			backendData.ltv,
		),
		creditAssets: backendData.creditsStats?.map((v) =>
			parseStrategyToken(v.creditAssetMetadata, !!v.amountsStats.isPoolHook),
		),
		collateralAssets:
			backendData.collateralAssets?.map((v) => parseStrategyToken(v)) || [],
		durationDays: backendData.loanDurationDays,
		expirationDays: backendData.proposalExpirationDays,
		minCreditAmountPercentage:
			backendData.minAllowedBorrowPercentage *
			MIN_CREDIT_CALCULATION_DENOMINATOR,
		id: backendData.id,
		relatedStrategyId: backendData.id,
	};

	return {
		id: backendData.id,
		name: backendData.title,
		description: backendData.description,
		terms: terms as StrategyTerm,
		curator: backendData.curator && {
			id: backendData.curator.id,
			name: backendData.curator.name,
			avatar: backendData.curator.avatar,
			description: backendData.curator.description,
		},
		type:
			backendData.thesisType === 1
				? ProposalType.Elastic
				: ProposalType.ChainLink,
		lendingStats: {
			totalCommittedAmount: backendData.creditsStats.reduce(
				(acc, v) => acc + BigInt(v.amountsStats.totalCommittedAmount || 0),
				BigInt(0),
			),
			totalUtilizedAmount: backendData.creditsStats.reduce(
				(acc, v) => acc + BigInt(v.amountsStats.totalUtilizedAmount || 0),
				BigInt(0),
			),
			totalAvailableAmount: backendData.creditsStats.reduce(
				(acc, v) => acc + BigInt(v.amountsStats.totalAvailableAmount || 0),
				BigInt(0),
			),
		},
		borrowingStats: {
			totalBorrowedAmount: backendData.creditsStats.reduce(
				(acc, v) => acc + BigInt(v.amountsStats.totalBorrowedAmount || 0),
				BigInt(0),
			),
			totalRepaidAmount: backendData.creditsStats.reduce(
				(acc, v) => acc + BigInt(v.amountsStats.totalRepaidAmount || 0),
				BigInt(0),
			),
			totalDefaultedAmount: backendData.creditsStats.reduce(
				(acc, v) => acc + BigInt(v.amountsStats.totalDefaultedAmount || 0),
				BigInt(0),
			),
			activeBorrowedAmount: backendData.creditsStats.reduce(
				(acc, v) => acc + BigInt(v.amountsStats.activeBorrowedAmount || 0),
				BigInt(0),
			),
		},
	};
};
