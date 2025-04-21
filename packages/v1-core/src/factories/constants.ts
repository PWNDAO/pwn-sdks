export const MIN_CREDIT_CALCULATION_DENOMINATOR = 1000
export const LTV_DENOMINATOR = 10_000
/**
 * We have in the database 10000 as denominator for LTV.
 * In contracts we use 1e6 as denominator.
 * This multiplier is used to convert the LTV from the database to the LTV in the contracts.
 */
export const LTV_DENOMINATOR_MULTIPLIER = 100