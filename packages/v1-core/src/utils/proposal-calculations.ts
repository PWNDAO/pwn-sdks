import type { Token } from "@pwndao/sdk-core";
import { Decimal } from "decimal.js";
import invariant from "ts-invariant";

/**
 * Calculates the minimum credit amount based on a percentage of the total credit amount
 *
 * @param creditAmount - The total credit amount
 * @param minCreditAmountPercentage - The minimum percentage (1-100)
 * @returns The minimum credit amount
 */
export const calculateMinCreditAmount = (
	creditAmount: bigint,
	minCreditAmountPercentage: number,
): bigint => {
	const credit = new Decimal(creditAmount.toString());
	const percentage = new Decimal(minCreditAmountPercentage).dividedBy(100);

	return BigInt(credit.mul(percentage).toFixed(0));
};

/**
 * Calculates the duration in seconds based on days or a date
 *
 * @param duration - Object containing either days or date
 * @returns Duration in seconds
 */
export const calculateDurationInSeconds = (duration: {
	days?: number;
	date?: Date;
}): number => {
	if (duration.days !== undefined) {
		return duration.days * 24 * 60 * 60;
	}

	if (duration.date) {
		return Math.floor(duration.date.getTime() / 1000);
	}

	throw new Error("Invalid duration: must provide either days or date");
};

/**
 * Calculates expiration timestamp in seconds based on days from now
 *
 * @param expirationDays - Number of days until expiration
 * @returns Expiration timestamp in seconds
 */
export const calculateExpirationTimestamp = (
	expirationDays: number,
): number => {
	return Math.floor(Date.now() / 1000) + expirationDays * 24 * 60 * 60;
};

/**
 * Calculates the collateral amount based on credit amount, LTV, and prices
 *
 * @param params - Parameters for calculation
 * @returns The collateral amount as a bigint
 */
export const calculateCollateralAmount = (params: {
	creditAmount: bigint;
	ltv: number;
	creditDecimals: number;
	collateralDecimals: number;
	creditUsdPrice: bigint;
	collateralUsdPrice: bigint;
}): bigint => {
	const {
		creditAmount,
		ltv,
		creditDecimals,
		collateralDecimals,
		creditUsdPrice,
		collateralUsdPrice,
	} = params;

	invariant(ltv > 0, "LTV cannot be zero");

	const credit = new Decimal(creditAmount.toString());
	const creditUsd = new Decimal(creditUsdPrice.toString());
	const collateralUsd = new Decimal(collateralUsdPrice.toString());
	const ltvValue = new Decimal(ltv).div(1e4);

	const numerator = credit
		.mul(creditUsd)
		.mul(new Decimal(10).pow(collateralDecimals));

	const denominator = ltvValue
		.mul(collateralUsd)
		.mul(new Decimal(10).pow(creditDecimals * 2));

	const collateralAmount = numerator.div(denominator);
	const result = collateralAmount.mul(new Decimal(10).pow(collateralDecimals));
	return BigInt(result.toFixed(0, Decimal.ROUND_DOWN));
};

/**
 * Gets the LTV value for a credit-collateral pair
 *
 * @param ltv - Either a direct LTV value or a mapping of credit-collateral pairs to LTV values
 * @param credit - The credit token
 * @param collateral - The collateral token
 * @param getUniqueCreditCollateralKey - Function to get a unique key for a credit-collateral pair
 * @returns The LTV value
 */
export const getLtvValue = (
	ltv: number | Record<string, number>,
	credit: Token,
	collateral: Token,
	getUniqueCreditCollateralKey: (credit: Token, collateral: Token) => string,
): number => {
	if (typeof ltv === "object") {
		const key = getUniqueCreditCollateralKey(credit, collateral);
		const value = ltv[key];
		if (!value) {
			throw new Error(`LTV value not found for pair: ${key}`);
		}
		return value;
	}
	return ltv;
};
