import type { LoanStatsSchemaOutstandingDebt } from "./loan-stats-schema-outstanding-debt";
/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { LoanStatsSchemaTotalLoansAmount } from "./loan-stats-schema-total-loans-amount";
import type { LoanStatsSchemaTotalLoansVolumeUsd } from "./loan-stats-schema-total-loans-volume-usd";

export interface LoanStatsSchema {
	totalLoansAmount: LoanStatsSchemaTotalLoansAmount;
	totalLoansVolumeUsd: LoanStatsSchemaTotalLoansVolumeUsd;
	outstandingDebt: LoanStatsSchemaOutstandingDebt;
}
