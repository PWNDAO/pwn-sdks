import type { CreditDataSchemaWorkaroundAccruingInterestApr } from "./credit-data-schema-workaround-accruing-interest-apr";
import type { CreditDataSchemaWorkaroundAmount } from "./credit-data-schema-workaround-amount";
/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { CreditDataSchemaWorkaroundApr } from "./credit-data-schema-workaround-apr";
import type { CreditDataSchemaWorkaroundCreditPerCollateralUnit } from "./credit-data-schema-workaround-credit-per-collateral-unit";
import type { CreditDataSchemaWorkaroundFixedInterestAmount } from "./credit-data-schema-workaround-fixed-interest-amount";
import type { CreditDataSchemaWorkaroundLtv } from "./credit-data-schema-workaround-ltv";
import type { CreditDataSchemaWorkaroundMaxAmount } from "./credit-data-schema-workaround-max-amount";
import type { CreditDataSchemaWorkaroundMinAmount } from "./credit-data-schema-workaround-min-amount";
import type { CreditDataSchemaWorkaroundTotalRepaymentAmount } from "./credit-data-schema-workaround-total-repayment-amount";

export interface CreditDataSchemaWorkaround {
	apr: CreditDataSchemaWorkaroundApr;
	ltv: CreditDataSchemaWorkaroundLtv;
	amount: CreditDataSchemaWorkaroundAmount;
	minAmount: CreditDataSchemaWorkaroundMinAmount;
	maxAmount: CreditDataSchemaWorkaroundMaxAmount;
	creditPerCollateralUnit: CreditDataSchemaWorkaroundCreditPerCollateralUnit;
	fixedInterestAmount: CreditDataSchemaWorkaroundFixedInterestAmount;
	totalRepaymentAmount: CreditDataSchemaWorkaroundTotalRepaymentAmount;
	accruingInterestApr: CreditDataSchemaWorkaroundAccruingInterestApr;
}
