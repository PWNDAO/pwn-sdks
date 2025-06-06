import type { AprMappingsSchema } from "./apr-mappings-schema";
import type { ChainIdEnum } from "./chain-id-enum";
import type { CollateralAssetInThesisSchemaWorkaround } from "./collateral-asset-in-thesis-schema-workaround";
import type { ThesisCreditStatsListSchemaWorkaround } from "./thesis-credit-stats-list-schema-workaround";
import type { ThesisSchemaWorkaroundCurator } from "./thesis-schema-workaround-curator";
/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { ThesisSchemaWorkaroundDescription } from "./thesis-schema-workaround-description";
import type { ThesisSchemaWorkaroundIsActive } from "./thesis-schema-workaround-is-active";
import type { ThesisSchemaWorkaroundIsHidden } from "./thesis-schema-workaround-is-hidden";
import type { ThesisSchemaWorkaroundIsUtilizedCredit } from "./thesis-schema-workaround-is-utilized-credit";
import type { ThesisType } from "./thesis-type";

export interface ThesisSchemaWorkaround {
	id: string;
	title: string;
	slug: string;
	createdAt: number;
	modifiedAt: number;
	ltv: number;
	aprMin: number;
	aprMax: number;
	minAllowedBorrowPercentage: number;
	loanDurationDays: number;
	proposalExpirationDays: number;
	description: ThesisSchemaWorkaroundDescription;
	curator?: ThesisSchemaWorkaroundCurator;
	isUtilizedCredit?: ThesisSchemaWorkaroundIsUtilizedCredit;
	isActive?: ThesisSchemaWorkaroundIsActive;
	isHidden?: ThesisSchemaWorkaroundIsHidden;
	thesisType: ThesisType;
	chainId: ChainIdEnum;
	creditsStats: ThesisCreditStatsListSchemaWorkaround;
	aprMappings?: AprMappingsSchema;
	collateralAssets?: CollateralAssetInThesisSchemaWorkaround[];
}
