import type {
	CollateralAssetInThesisSchemaWorkaround,
	ThesisSchemaWorkaround,
} from "@pwndao/api-sdk";
import { ERC20Token } from "@pwndao/sdk-core";
import invariant from "ts-invariant";
import { MIN_CREDIT_CALCULATION_DENOMINATOR } from "../../factories/constants.js";
import type { Strategy, StrategyTerm } from "../../models/strategies/types.js";

type AssetModel = CollateralAssetInThesisSchemaWorkaround;
type CreditAssetModel = Omit<
	AssetModel,
	"ltv" | "apr" | "allocationPercentage"
>;

const parseStrategyToken = (token: AssetModel | CreditAssetModel) => {
	invariant(token.decimals !== null, "token.decimals is required");
	return new ERC20Token(
		token.chainId,
		token.address,
		token.decimals,
		token.name ?? undefined,
		token.symbol ?? undefined,
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
	console.log("backendData", backendData);
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
		creditAssets: creditAssets.map((v) => parseStrategyToken(v)),
		collateralAssets:
			backendData.collateralAssets?.map(parseStrategyToken) || [],
		durationDays: backendData.loanDurationDays,
		expirationDays: backendData.proposalExpirationDays,
		minCreditAmountPercentage:
			backendData.minAllowedBorrowPercentage *
			MIN_CREDIT_CALCULATION_DENOMINATOR,
		id: backendData.id,
		relatedStrategyId: backendData.id,
	};
	console.log("terms", terms);

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
