import { Decimal } from "decimal.js";
import { formatUnits } from "viem";
import { CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR } from "../constants.js";

// note: if you want to calculate min credit amonut, pass minCollateralAmount as collateralAmount arg
export const calculateCreditAmount = (
	collateralAmount: bigint,
	creditPerCollateralUnit: bigint,
): bigint => {
	const collateral = new Decimal(collateralAmount.toString());
	const denominator = new Decimal(CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR);
	const ratio = new Decimal(creditPerCollateralUnit.toString());
	return BigInt(collateral.mul(ratio).div(denominator).toFixed(0));
};

export const calculateCollateralAmountFungibleProposal = ({
	creditPerCollateralUnit,
	collateralDecimals,
	availableCreditLimit,
	returnBigInt,
}: {
	creditPerCollateralUnit: string;
	collateralDecimals: number;
	availableCreditLimit: string;
	returnBigInt: boolean;
}) => {
	const availableCreditLimitBigInt = new Decimal(availableCreditLimit || 0);
	const creditPerCollateralUnitBigInt = new Decimal(
		creditPerCollateralUnit || 0,
	);

	if (
		availableCreditLimitBigInt.isZero() ||
		creditPerCollateralUnitBigInt.isZero()
	) {
		return returnBigInt ? BigInt(0) : "0";
	}

	// Use ceil() to avoid rounding down which could lead to insufficient collateral
	const maxPossibleCollateralAmountBigInt = availableCreditLimitBigInt
		.times(new Decimal(CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR))
		.div(creditPerCollateralUnitBigInt)
		.toFixed(0);

	if (returnBigInt) return BigInt(maxPossibleCollateralAmountBigInt.toString());

	return formatUnits(
		BigInt(maxPossibleCollateralAmountBigInt.toString()),
		collateralDecimals,
	);
};

/**
 * Calculates the credit amount based on the ltv
 * @param collateralAmount - The amount of collateral as a decimal string (e.g. "0.5" for 0.5 ETH)
 * @param ltv - The ltv to be used with 6 decimal places (e.g. 700000 for 70% LTV)
 * @param collateralPrice - The price of the collateral in USD (e.g. 1791.43 for $1,791.43)
 * @param creditPrice - The price of the credit in USD (e.g. 1.01 for $1.01)
 * @param creditDecimals - The number of decimal places for the credit token (default: 6)
 * @returns The credit amount in smallest units (e.g. USDC units)
 * @example
 * // Calculate credit available for 0.5 ETH at 70% LTV with ETH at $1791.43
 * const result = calculateCreditBasedOnLtv(
 *   "0.5", // 0.5 ETH
 *   BigInt(700000), // 70% LTV (700000 = 70% with 6 decimal places)
 *   1791.43, // ETH price $1791.43
 *   1.01, // USDC price $1.01
 *   6 // USDC has 6 decimals
 * );
 * // result: approximately 620 USDC in smallest units
 */
export const calculateCreditBasedOnLtv = (
	collateralAmount: string,
	ltv: bigint,
	collateralPrice: number,
	creditPrice: number,
	creditDecimals = 6,
): bigint => {
	if (ltv === BigInt(0) || ltv < BigInt(0)) {
		throw new Error("LTV cannot be zero or negative");
	}

	// Convert collateral amount to Decimal for precise calculation
	const collateral = new Decimal(collateralAmount);
	const creditPriceDecimal = new Decimal(creditPrice);
	const collateralPriceDecimal = new Decimal(collateralPrice);
	const ltvDecimal = new Decimal(ltv.toString()).div(new Decimal("1000000")); // Convert 6 decimal offset LTV to ratio

	// Step 1: Calculate collateral value in USD
	const collateralUsd = collateral.mul(collateralPriceDecimal);

	// Step 2: Calculate available credit value in USD by multiplying by LTV ratio
	// For example, with $1250 collateral and 80% LTV (0.8), we can borrow $1250*0.8 = $1000
	const creditUsd = collateralUsd.mul(ltvDecimal);

	// Step 3: Convert to credit tokens and multiply by 10^creditDecimals for token units
	const creditAmount = creditUsd
		.div(creditPriceDecimal)
		.mul(new Decimal(10).pow(creditDecimals));

	return BigInt(creditAmount.toFixed(0));
};

/**
 * Calculates the collateral amount based on the ltv
 * @param creditAmount - The amount of credit to be collateralized as a decimal string (e.g. "1000.50" for 1000.50 USDC)
 * @param ltv - The ltv to be used with 6 decimal places (e.g. 700000 for 70% LTV)
 * @param collateralPrice - The price of the collateral in USD (e.g. 1791.43 for $1,791.43)
 * @param creditPrice - The price of the credit in USD (e.g. 1.01 for $1.01)
 * @param collateralDecimals - The number of decimal places for the collateral token (default: 18)
 * @returns The collateral amount in smallest units (e.g. wei)
 * @example
 * // Calculate collateral needed for 1000.50 USDC at 70% LTV with ETH at $1791.43
 * const result = calculateCollateralBasedOnLtv(
 *   "1000.50", // 1000.50 USDC
 *   BigInt(700000), // 70% LTV (700000 = 70% with 6 decimal places)
 *   1791.43, // ETH price $1791.43
 *   1.01, // USDC price $1.01
 *   18 // ETH has 18 decimals
 * );
 * // result: approximately 0.805 ETH in wei
 */
export const calculateCollateralBasedOnLtv = (
	creditAmount: string,
	ltv: bigint,
	collateralPrice: number,
	creditPrice: number,
	collateralDecimals = 18,
): bigint => {
	if (ltv === BigInt(0) || ltv < BigInt(0)) {
		throw new Error("LTV cannot be zero or negative");
	}

	// Convert credit amount to Decimal for precise calculation
	const credit = new Decimal(creditAmount);
	const creditPriceDecimal = new Decimal(creditPrice);
	const collateralPriceDecimal = new Decimal(collateralPrice);
	const ltvDecimal = new Decimal(ltv.toString()).div(new Decimal("1000000")); // Convert 6 decimal offset LTV to ratio

	// Step 1: Calculate credit value in USD
	const creditUsd = credit.mul(creditPriceDecimal);

	// Step 2: Calculate required collateral value in USD by dividing by LTV ratio
	// For example, with $1000 credit and 80% LTV (0.8), we need $1000/0.8 = $1250 collateral
	const collateralUsd = creditUsd.div(ltvDecimal);

	// Step 3: Convert to collateral tokens and multiply by 10^collateralDecimals for token units
	const collateralAmount = collateralUsd
		.div(collateralPriceDecimal)
		.mul(new Decimal(10).pow(collateralDecimals));

	return BigInt(collateralAmount.toFixed(0));
};

export const calculateCreditPerCollateralUnit = (
	creditBigInt: bigint,
	collateralBigInt: bigint,
) => {
	const credit = new Decimal(creditBigInt.toString());
	const collateral = new Decimal(collateralBigInt.toString());
	const denominator = new Decimal(CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR);

	const result = credit.times(denominator).dividedBy(collateral);
	return result.toFixed(0); // Convert back to string with no decimals
};
