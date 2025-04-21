import { Decimal } from "decimal.js";
import { formatUnits, parseUnits } from "viem";
import { describe, it } from "vitest";
import { CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR } from "../constants.js";
import {
	calculateCollateralAmountFungibleProposal,
	calculateCollateralBasedOnLtv,
	calculateCreditAmount,
	calculateCreditBasedOnLtv,
	calculateCreditPerCollateralUnit,
} from "./calculations.js";

const ONE_TOKEN = BigInt("1000000000000000000"); // 1 token with 18 decimals
const SMALL_AMOUNT = BigInt("1000000"); // 0.001 token

/**
 * Helper function to create credit per collateral unit with proper scaling
 * Formula: ratio × CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR (10^38)
 * This maintains precision for both integer and non-integer ratios
 */
const createCreditPerCollateralUnit = (multiplier: number) => {
	return new Decimal(multiplier)
		.times(new Decimal(CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR))
		.toFixed(0);
};

describe("Calculations package", () => {
	describe("calculateCreditPerCollateralUnit", () => {
		it("should correctly calculate credit per collateral unit for basic scenarios", () => {
			// Simple 10:1 ratio: (1000/100) × 10^38 = 10 × 10^38
			const result1 = calculateCreditPerCollateralUnit(
				BigInt(1000),
				BigInt(100),
			);
			expect(+result1 / CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR).toBe(10);

			// Large numbers with same 10:1 ratio but using token amounts with 18 decimals
			const result2 = calculateCreditPerCollateralUnit(
				BigInt(parseUnits("1000", 18)), // 1000 tokens
				BigInt(parseUnits("100", 18)), // 100 tokens
			);
			expect(+result2 / CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR).toBe(10);

			// Small numbers with 2:1 ratio: (10/5) × 10^38 = 2 × 10^38
			const result3 = calculateCreditPerCollateralUnit(BigInt(10), BigInt(5));
			expect(+result3 / CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR).toBe(2);
		});

		it("should handle non-integer ratios correctly", () => {
			// 333.33... ratio: (1000/3) × 10^38 for maximum precision
			const result1 = calculateCreditPerCollateralUnit(BigInt(1000), BigInt(3));
			expect(result1).toBe("33333333333333333333000000000000000000000");

			// Very small ratio: (1/1000000) × 10^38 = 0.000001 × 10^38
			const result2 = calculateCreditPerCollateralUnit(
				BigInt(1),
				BigInt(1000000),
			);
			expect(result2).toBe("100000000000000000000000000000000");
		});
	});

	describe("calculateCreditAmount", () => {
		/**
		 * Credit amount calculation formula:
		 * creditAmount = collateralAmount × (creditPerCollateralUnit / DENOMINATOR)
		 * where DENOMINATOR = 10^38 to maintain precision
		 */
		it("should calculate credit amount correctly for basic scenarios", () => {
			// 2:1 ratio: 1 collateral token × (2 × 10^38 / 10^38) = 2 credit tokens
			const result1 = calculateCreditAmount(
				ONE_TOKEN, // 1 collateral token (10^18 wei)
				BigInt(createCreditPerCollateralUnit(2)), // 2 credit per 1 collateral
			);
			expect(result1.toString()).toBe("2000000000000000000"); // 2 credit tokens in wei

			// 1:1 ratio with small amounts: 0.001 × (1 × 10^38 / 10^38) = 0.001
			const result2 = calculateCreditAmount(
				SMALL_AMOUNT,
				BigInt(createCreditPerCollateralUnit(1)),
			);
			expect(result2.toString()).toBe(SMALL_AMOUNT.toString());
		});

		it("should handle fractional ratios correctly", () => {
			// 1.5:1 ratio: 1 token × (1.5 × 10^38 / 10^38) = 1.5 tokens
			const result = calculateCreditAmount(
				ONE_TOKEN, // 1 collateral token (10^18 wei)
				BigInt(createCreditPerCollateralUnit(1.5)), // 1.5 credit per 1 collateral
			);
			const expectedAmount = new Decimal(ONE_TOKEN.toString())
				.times(1.5)
				.toFixed(0);
			expect(result.toString()).toBe(expectedAmount); // 1.5 credit tokens in wei
		});

		it("should maintain precision with small collateral amounts", () => {
			// 2:1 ratio with very small collateral
			const result = calculateCreditAmount(
				SMALL_AMOUNT, // Very small amount
				BigInt(createCreditPerCollateralUnit(2)),
			);
			expect(result.toString()).toBe((SMALL_AMOUNT * BigInt(2)).toString());
		});

		describe("PWN Utils calculations - Round-Trip Calculations", () => {
			describe("Collateral → Credit → Collateral conversions", () => {
				it("should maintain precision when converting collateral to credit and back", () => {
					// Initial values
					const initialCollateral = BigInt("1000000000000000000"); // 1 ETH
					const creditPerCollateralUnit = new Decimal(2)
						.times(new Decimal(CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR))
						.toFixed(0);

					// Convert collateral to credit
					const creditAmount = calculateCreditAmount(
						initialCollateral,
						BigInt(creditPerCollateralUnit),
					);

					// Convert credit back to collateral
					const finalCollateral = calculateCollateralAmountFungibleProposal({
						creditPerCollateralUnit,
						collateralDecimals: 18,
						availableCreditLimit: creditAmount.toString(),
						returnBigInt: true,
					});

					// Should get back our original collateral amount
					expect(finalCollateral.toString()).toBe(initialCollateral.toString());
				});

				it("should handle fractional amounts in round-trip conversion", () => {
					// Initial values with odd ratio
					const initialCollateral = BigInt("3000000000000000000"); // 3 ETH
					const creditPerCollateralUnit = new Decimal(1.5)
						.times(new Decimal(CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR))
						.toFixed(0);

					// First conversion
					const creditAmount = calculateCreditAmount(
						initialCollateral,
						BigInt(creditPerCollateralUnit),
					);

					// Convert back
					const finalCollateral = calculateCollateralAmountFungibleProposal({
						creditPerCollateralUnit,
						collateralDecimals: 18,
						availableCreditLimit: creditAmount.toString(),
						returnBigInt: true,
					});

					expect(finalCollateral.toString()).toBe(initialCollateral.toString());
				});
			});

			describe("Credit → Collateral → Credit conversions", () => {
				it("should maintain precision when converting credit to collateral and back", () => {
					// Initial credit amount
					const initialCredit = BigInt("100000000"); // 100 USDC (assuming 6 decimals)
					const creditPerCollateralUnit = new Decimal(2)
						.times(new Decimal(CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR))
						.toFixed(0);

					// Calculate required collateral
					const collateralAmount = calculateCollateralAmountFungibleProposal({
						creditPerCollateralUnit,
						collateralDecimals: 18,
						availableCreditLimit: initialCredit.toString(),
						returnBigInt: true,
					}) as bigint;

					// Convert collateral back to credit
					const finalCredit = calculateCreditAmount(
						collateralAmount,
						BigInt(creditPerCollateralUnit),
					);

					expect(finalCredit.toString()).toBe(initialCredit.toString());
				});

				it("should handle edge cases in credit-collateral-credit conversion", () => {
					// Test with very small amounts
					const smallCredit = BigInt("1000"); // 0.001 USDC
					const creditPerCollateralUnit = new Decimal(1000)
						.times(new Decimal(CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR))
						.toFixed(0);

					// First conversion
					const collateralAmount = calculateCollateralAmountFungibleProposal({
						creditPerCollateralUnit,
						collateralDecimals: 18,
						availableCreditLimit: smallCredit.toString(),
						returnBigInt: true,
					}) as bigint;

					// Convert back to credit
					const finalCredit = calculateCreditAmount(
						collateralAmount,
						BigInt(creditPerCollateralUnit),
					);

					expect(finalCredit.toString()).toBe(smallCredit.toString());
				});
			});

			describe("Complex scenarios", () => {
				it("should handle multiple conversions maintaining precision", () => {
					// Initial setup
					const initialCollateral = BigInt("1500000000000000000"); // 1.5 ETH
					const creditPerCollateralUnit = new Decimal(2.5)
						.times(new Decimal(CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR))
						.toFixed(0);

					// Multiple conversions
					const credit1 = calculateCreditAmount(
						initialCollateral,
						BigInt(creditPerCollateralUnit),
					);

					const collateral1 = calculateCollateralAmountFungibleProposal({
						creditPerCollateralUnit,
						collateralDecimals: 18,
						availableCreditLimit: credit1.toString(),
						returnBigInt: true,
					}) as bigint;

					const credit2 = calculateCreditAmount(
						collateral1,
						BigInt(creditPerCollateralUnit),
					);

					// Final conversion back to collateral
					const finalCollateral = calculateCollateralAmountFungibleProposal({
						creditPerCollateralUnit,
						collateralDecimals: 18,
						availableCreditLimit: credit2.toString(),
						returnBigInt: true,
					});

					// After all conversions, should match initial value
					expect(finalCollateral.toString()).toBe(initialCollateral.toString());
				});

				it("should maintain precision with different decimal places", () => {
					// Let's add debug logs to trace the calculation
					const initialCredit = BigInt(1_000_000_000); // 1000 USDC

					const creditPerCollateralUnit = new Decimal(1500)
						.times(new Decimal(CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR))
						.toFixed(0);

					// First conversion: credit -> collateral
					const collateralAmount = calculateCollateralAmountFungibleProposal({
						creditPerCollateralUnit,
						collateralDecimals: 18,
						availableCreditLimit: initialCredit.toString(),
						returnBigInt: true,
					}) as bigint;

					// Second conversion: collateral -> credit
					const finalCredit = calculateCreditAmount(
						collateralAmount,
						BigInt(creditPerCollateralUnit),
					);

					// Allow for small differences (less than 0.01 USD)
					// For USDC with 6 decimals, 0.01 USD = 10000 (1 cent = 10^4)
					const tolerance = BigInt(10000);
					const difference =
						finalCredit > initialCredit
							? finalCredit - initialCredit
							: initialCredit - finalCredit;

					expect(difference).toBeLessThanOrEqual(tolerance);
				});
			});
		});
	});

	/**
	 * LTV-based collateral calculation tests
	 * Core formula: collateral = (creditAmount × creditPrice) / (collateralPrice × (ltv/1000000))
	 *
	 * Mathematical Properties:
	 * 1. Linear Scaling: collateral(2x) = 2 × collateral(x)
	 * 2. LTV Inverse Relationship: collateral(ltv/2) = 2 × collateral(ltv)
	 * 3. Price Ratio Invariance: collateral(p1×k, p2×k) = collateral(p1, p2)
	 */
	it("should calculate collateral correctly for real-world USDC-ETH scenario", () => {
		// Example: 1000 USDC to ETH at 70% LTV
		// 1. Credit USD value = 1000 × $1.01 = $1,010
		// 2. Required collateral USD = $1,010 / 0.7 = $1,442.86
		// 3. Required ETH = $1,442.86 / $1,791.43 ≈ 0.805422005 ETH
		// 4. Wei amount = 0.805422005 × 10^18 = 805422005245609852
		const creditAmount = "1000"; // 1000 USDC
		const ltv = BigInt(700000); // 70% LTV (700000 = 70% with 6 decimal places)
		const collateralPrice = 1791.43; // ETH price
		const creditPrice = 1.01; // USDC price

		const result = calculateCollateralBasedOnLtv(
			creditAmount,
			ltv,
			collateralPrice,
			creditPrice,
		);

		const expectedCollateral = "805422005245609852"; // ~0.805422005 ETH in wei (18 decimals)
		expect(result.toString()).toBe(expectedCollateral);
	});

	it("should handle extreme price ratios correctly", () => {
		// Scenario: Very expensive collateral vs cheap credit token
		// 1. Credit USD = 1000 × $1 = $1,000
		// 2. Required collateral USD = $1,000 / 0.7 = $1,428.57
		// 3. Required BTC = $1,428.57 / $100,000 ≈ 0.01428571 BTC
		const result1 = calculateCollateralBasedOnLtv(
			"1000", // 1000 USDC
			BigInt(700000), // 70% LTV
			100000, // BTC price $100,000
			1, // USDC price $1
		);
		expect(result1.toString()).toBe("14285714285714286"); // ~0.014285714285714286 BTC in wei (18 decimals)

		// Scenario: Very cheap collateral vs expensive credit token
		// 1. Credit USD = 1000 × $1 = $1,000
		// 2. Required collateral USD = $1,000 / 0.7 = $1,428.57
		// 3. Required SHIB = $1,428.57 / $0.00001 ≈ 142,857,142.857 SHIB
		const result2 = calculateCollateralBasedOnLtv(
			"1000", // 1000 USDC
			BigInt(700000), // 70% LTV
			0.00001, // SHIB price
			1, // USDC price
		);
		expect(result2.toString()).toBe("142857142857142857140000000"); // ~142,857.14 SHIB in wei (18 decimals)
	});

	it("should handle very small amounts correctly", () => {
		// Example: 0.000001 USDC to ETH at 70% LTV
		// 1. Credit USD = 0.000001 × $1.01 = $0.00000101
		// 2. Required collateral USD = $0.00000101 / 0.7 = $0.00000144
		// 3. Required ETH = $0.00000144 / $1,791.43 ≈ 0.000000000805422005 ETH
		const result = calculateCollateralBasedOnLtv(
			"0.000001", // 0.000001 USDC
			BigInt(700000), // 70% LTV
			1791.43, // ETH price
			1.01, // USDC price
		);
		expect(result.toString()).toBe("805422005"); // ~0.000000000805422005 ETH in wei (18 decimals)
		expect(result.toString()).not.toBe("0"); // Ensure precision is maintained even for tiny amounts
	});

	it("should handle extreme LTV values correctly", () => {
		// Example: 1000 USDC with minimum (1%) and maximum (99%) LTV
		const creditAmount = "1000"; // 1000 USDC
		const collateralPrice = 1791.43; // ETH price
		const creditPrice = 1.01; // USDC price

		// Test minimum LTV (1%)
		// 1. Credit USD = 1000 × $1.01 = $1,010
		// 2. Required collateral USD = $1,010 / 0.01 = $101,000
		// 3. Required ETH = $101,000 / $1,791.43 ≈ 56.379540367 ETH
		const result1 = calculateCollateralBasedOnLtv(
			creditAmount,
			BigInt(10000), // 1% LTV (10000 = 1% with 6 decimal places)
			collateralPrice,
			creditPrice,
		);
		expect(result1.toString()).toBe("56379540367192689639"); // ~56.379540367 ETH in wei (18 decimals)

		// Test maximum practical LTV (99%)
		// 1. Credit USD = 1000 × $1.01 = $1,010
		// 2. Required collateral USD = $1,010 / 0.99 = $1,020.20
		// 3. Required ETH = $1,020.20 / $1,791.43 ≈ 0.569490306 ETH
		const result2 = calculateCollateralBasedOnLtv(
			creditAmount,
			BigInt(990000), // 99% LTV
			collateralPrice,
			creditPrice,
		);
		expect(result2.toString()).toBe("569490306739320097"); // ~0.569490306 ETH in wei (18 decimals)

		// Verify that higher LTV requires less collateral
		expect(BigInt(result2.toString())).toBeLessThan(BigInt(result1.toString()));
	});

	it("should handle decimal mismatches correctly", () => {
		// Same value represented with different decimal places should yield identical results
		const result1 = calculateCollateralBasedOnLtv(
			"1000", // 1000 USDC
			BigInt(700000), // 70% LTV
			1791.43, // ETH price
			1.01, // USDC price
		);
		expect(result1.toString()).toBe("805422005245609852"); // ~0.805422005 ETH in wei (18 decimals)

		const result2 = calculateCollateralBasedOnLtv(
			"1000.000000", // Same 1000 USDC but with extra precision
			BigInt(700000), // 70% LTV
			1791.43, // ETH price
			1.01, // USDC price
		);
		expect(result2.toString()).toBe("805422005245609852"); // Should match exactly despite different decimal representation
	});

	it("should handle price precision edge cases", () => {
		// Test with high precision numbers to ensure precision is maintained
		// 1. Credit USD = 1000.123456789 × $1.010101010101 = $1,010.23456789
		// 2. Required collateral USD = $1,010.23456789 / 0.7 = $1,443.19224
		// 3. Required ETH = $1,443.19224 / $1,791.424242424242 ≈ 0.805604589 ETH
		const result = calculateCollateralBasedOnLtv(
			"1000.123456789", // 1000.123456789 USDC
			BigInt(700000), // 70% LTV
			1791.424242424242, // ETH price with many digits
			1.010101010101, // USDC price with many digits
		);
		expect(result.toString()).toBe("805604589437242076"); // ~0.805604589 ETH in wei (18 decimals)
	});

	it("should maintain consistency with price scaling", () => {
		/**
		 * Price Scaling Property:
		 * If both prices are scaled by the same factor k, the result should remain unchanged
		 * because: (creditAmount × (creditPrice × k)) / ((collateralPrice × k) × ltv)
		 * simplifies to: (creditAmount × creditPrice) / (collateralPrice × ltv)
		 */

		// Base case
		const baseResult = calculateCollateralBasedOnLtv(
			"1000", // 1000 USDC
			BigInt(700000), // 70% LTV
			1791.43, // ETH price
			1.01, // USDC price
		);

		// Same scenario but all prices multiplied by 1000
		const scaledResult = calculateCollateralBasedOnLtv(
			"1000", // 1000 USDC
			BigInt(700000), // 70% LTV
			1791430, // ETH price * 1000
			1010, // USDC price * 1000
		);

		// The collateral amount should be identical since price ratio remains constant
		expect(baseResult.toString()).toBe(scaledResult.toString());
	});

	it("should handle maximum possible values correctly", () => {
		/**
		 * Test with maximum safe amount to ensure no overflow
		 * Using max safe integer (2^128 - 1) as credit amount
		 * Expected behavior: Should handle the calculation without losing precision
		 */
		const result = calculateCollateralBasedOnLtv(
			"340282366920938463463374607431768211455", // Max safe amount (2^128 - 1)
			BigInt(700000), // 70% LTV
			1791.43, // ETH price
			1.01, // USDC price
		);

		expect(result.toString()).toBe(
			"274070906315184635500000000000000000000000000000000000",
		);
		expect(result.toString()).not.toBe("0"); // Ensure no underflow to zero
	});

	it("should handle zero and near-zero prices correctly", () => {
		/**
		 * Test extreme price scenarios
		 * 1. Near-zero collateral price: Should result in very large collateral amount
		 * 2. Near-zero credit price: Should result in very small collateral amount
		 * Both cases should complete without throwing errors
		 */

		// Test with near-zero collateral price
		expect(() =>
			calculateCollateralBasedOnLtv(
				"1000", // 1000 USDC
				BigInt(700000), // 70% LTV
				0.000000001, // Near-zero collateral price ($0.000000001)
				1.01, // USDC price
			),
		).not.toThrow();

		// Test with near-zero credit price
		expect(() =>
			calculateCollateralBasedOnLtv(
				"1000", // 1000 USDC
				BigInt(700000), // 70% LTV
				1791.43, // ETH price
				0.000000001, // Near-zero credit price ($0.000000001)
			),
		).not.toThrow();
	});

	it("should handle exact ratio scenarios correctly", () => {
		/**
		 * Test scenarios with exact ratios to verify precise calculations
		 * Case 1: 50% LTV with unit prices
		 * - Expected: 2 tokens collateral for 1 token credit (1/0.5 = 2)
		 * Case 2: 75% LTV with unit prices
		 * - Expected: 4 tokens collateral for 3 tokens credit (3/0.75 = 4)
		 */

		// Test scenario where all values are 1, should give exact result
		const result1 = calculateCollateralBasedOnLtv(
			"1", // 1 token
			BigInt(500000), // 50% LTV
			1, // Price 1
			1, // Price 1
		);
		// Should require exactly 2 tokens as collateral (1/0.5)
		expect(result1.toString()).toBe((2n * BigInt(1e18)).toString());

		// Test with 75% LTV and equal prices
		const result2 = calculateCollateralBasedOnLtv(
			"3", // 3 tokens
			BigInt(750000), // 75% LTV
			1, // Price 1
			1, // Price 1
		);
		// Should require exactly 4 tokens as collateral (3/0.75)
		expect(result2.toString()).toBe((4n * BigInt(1e18)).toString());
	});

	it("should handle invalid LTV values", () => {
		/**
		 * Test invalid and boundary LTV values
		 * 1. Zero LTV: Should throw error (invalid)
		 * 2. 100% LTV: Should calculate normally
		 * Formula with 100% LTV: collateral = creditAmount × creditPrice / collateralPrice
		 */

		// Test zero LTV
		expect(() =>
			calculateCollateralBasedOnLtv(
				"1000",
				BigInt(0),
				1791.43, // ETH price
				1.01, // USDC price
			),
		).toThrow("LTV cannot be zero or negative");

		// Test 100% LTV
		// 1. Credit USD = 1000 × $1.01 = $1,010
		// 2. Required collateral USD = $1,010 / 1.0 = $1,010
		// 3. Required ETH = $1,010 / $1,791.43 ≈ 0.563795403 ETH
		const result = calculateCollateralBasedOnLtv(
			"1000",
			BigInt(1000000), // 100% LTV
			1791.43, // ETH price
			1.01, // USDC price
		);
		expect(result.toString()).toBe("563795403671926896"); // ~0.563795403 ETH in wei (18 decimals)
	});

	it("should handle multiple extreme conditions simultaneously", () => {
		/**
		 * Test combinations of extreme conditions to ensure robust handling
		 * Test cases:
		 * 1. Max amount + Min price + Extreme LTV
		 * 2. Min amount + Max price + Min valid LTV
		 * 3. Large amount + Extreme price ratio
		 * 4. Precise numbers with extreme conditions
		 */

		// Test 1: Maximum amount + Minimum price + Extreme LTV
		const result1 = calculateCollateralBasedOnLtv(
			"340282366920938463463374607431768211455", // Max safe amount (2^128 - 1)
			BigInt(990000), // 99% LTV
			0.000000001, // Near-zero price
			9999999.99, // High price that won't lose precision
		);
		expect(result1.toString()).toBe(
			"3437195622026829258000000000000000000000000000000000000000000000000000000",
		);

		// Test 2: Minimum amount + Maximum price + Minimum valid LTV
		const result2 = calculateCollateralBasedOnLtv(
			"0.000001", // Very small amount
			BigInt(10000), // 1% LTV
			9999999.99, // High price
			0.000001, // Very low price
		);
		expect(result2.toString()).toBe("10"); // Extremely small result but still precise

		// Test 3: Large amount + Extreme price ratio
		const result3 = calculateCollateralBasedOnLtv(
			"1000000000000000000000000000000", // 1 trillion tokens
			BigInt(500000), // 50% LTV
			0.000000001, // Near-zero price
			9999999.99, // High price
		);
		expect(result3.toString()).toBe(
			"19999999980000000000000000000000000000000000000000000000000000000",
		);

		// Test 4: Precise numbers with extreme conditions
		const result4 = calculateCollateralBasedOnLtv(
			"1.123456789123456789", // ~1.12 tokens
			BigInt(990000), // 99% LTV
			0.000000000000000001, // Very low price
			9999999.99, // High price
		);
		expect(result4.toString()).toBe(
			"11348048363636363635000000000000000000000000",
		);

		// Verify all results are valid
		for (const result of [result1, result2, result3, result4]) {
			expect(result.toString()).not.toBe("0"); // No underflow to zero
			expect(Number(formatUnits(result, 18))).not.toBe(
				Number.POSITIVE_INFINITY,
			); // No overflow to infinity
		}
	});

	it("should maintain mathematical properties under extreme conditions", () => {
		/**
		 * Test fundamental mathematical properties:
		 * 1. Linear Scaling: doubling credit amount should double collateral amount
		 * 2. LTV Inverse Relationship: halving LTV should double collateral amount
		 * 3. Price Ratio Invariance: scaling both prices equally should not change result
		 *
		 * Allow for small differences due to decimal precision (less than 0.0001%)
		 */

		// Property 1: Doubling credit amount should double collateral amount
		const baseAmount = "1000000000000";
		const baseResult = calculateCollateralBasedOnLtv(
			baseAmount,
			BigInt(700000), // 70% LTV
			1791.43, // ETH price
			1.01, // USDC price
		);

		const doubleResult = calculateCollateralBasedOnLtv(
			new Decimal(baseAmount).mul(2).toString(),
			BigInt(700000), // 70% LTV
			1791.43, // ETH price
			1.01, // USDC price
		);

		// Check difference is within tolerance (0.0001%)
		const difference =
			doubleResult > BigInt(baseResult.toString()) * BigInt(2)
				? doubleResult - BigInt(baseResult.toString()) * BigInt(2)
				: BigInt(baseResult.toString()) * BigInt(2) - doubleResult;

		const maxAllowedDifference =
			(BigInt(baseResult.toString()) * BigInt(2)) / BigInt(1000000);
		expect(difference).toBeLessThanOrEqual(maxAllowedDifference);

		// Property 2: Halving LTV should double collateral amount
		const halfLtvResult = calculateCollateralBasedOnLtv(
			baseAmount,
			BigInt(350000), // 35% LTV
			1791.43, // ETH price
			1.01, // USDC price
		);

		const ltvDifference =
			halfLtvResult > BigInt(baseResult.toString()) * BigInt(2)
				? halfLtvResult - BigInt(baseResult.toString()) * BigInt(2)
				: BigInt(baseResult.toString()) * BigInt(2) - halfLtvResult;

		expect(ltvDifference).toBeLessThanOrEqual(maxAllowedDifference);

		// Property 3: Scaling both prices equally should not change the result
		const scaledResult = calculateCollateralBasedOnLtv(
			baseAmount,
			BigInt(700000), // 70% LTV
			1791430000, // ETH price * 1000000
			1010000, // USDC price * 1000000
		);

		const scalingDifference =
			scaledResult > BigInt(baseResult.toString())
				? scaledResult - BigInt(baseResult.toString())
				: BigInt(baseResult.toString()) - scaledResult;

		expect(scalingDifference).toBeLessThanOrEqual(maxAllowedDifference);
	});

	describe("calculateCreditBasedOnLtv", () => {
		it("should calculate credit amount correctly for real-world ETH-USDC scenario", () => {
			// Example: 1 ETH as collateral at 70% LTV
			// 1. Collateral USD value = 1 × $1,791.43 = $1,791.43
			// 2. Available credit USD = $1,791.43 × 0.7 = $1,254.001
			// 3. Required USDC = $1,254.001 / $1.01 ≈ 1,241.58515841584 USDC
			const collateralAmount = "1000000000000000000"; // 1 ETH
			const ltv = BigInt(700000); // 70% LTV (700000 = 70% with 6 decimal places)
			const collateralPrice = 1791.43; // ETH price
			const creditPrice = 1.01; // USDC price

			const result = calculateCreditBasedOnLtv(
				collateralAmount,
				ltv,
				collateralPrice,
				creditPrice,
			);

			const expectedCredit = "1241585148514851485100"; // ~1241,585148514851485100 USDC in wei (18 decimals)
			expect((result / BigInt(10 ** 6)).toString()).toBe(expectedCredit);
		});

		it("should handle extreme price ratios correctly", () => {
			// Scenario: Very expensive collateral (BTC) vs cheap credit token (USDC)
			// 1. Collateral USD = 1 × $100,000 = $100,000
			// 2. Available credit USD = $100,000 × 0.7 = $70,000
			// 3. Required USDC = $70,000 / $1 = 70,000 USDC
			const result1 = calculateCreditBasedOnLtv(
				"1000000000000000000", // 1 BTC
				BigInt(700000), // 70% LTV
				100000, // BTC price $100,000
				1, // USDC price $1
			);
			expect((result1 / BigInt(10 ** 6)).toString()).toBe("70000000000000000000000"); // 70,000 USDC in wei (18 decimals)

			// Scenario: Very cheap collateral (SHIB) vs expensive credit token (WBTC)
			// 1. Collateral USD = 1,000,000 × $0.00001 = $10
			// 2. Available credit USD = $10 × 0.7 = $7
			// 3. Required WBTC = $7 / $100,000 = 0.00007 WBTC
			const result2 = calculateCreditBasedOnLtv(
				"1000000000000000000000000", // 1M SHIB
				BigInt(700000), // 70% LTV
				0.00001, // SHIB price
				100000, // WBTC price
			);
			expect((result2 / BigInt(10 ** 6)).toString()).toBe("70000000000000"); // 0.00007 WBTC in wei (18 decimals)
		});

		it("should handle very small amounts correctly", () => {
			// Example: 0.000001 ETH to USDC at 70% LTV
			// 1. Collateral USD = 0.000001 × $1,791.43 = $0.00179143
			// 2. Available credit USD = $0.00179143 × 0.7 = $0.001254001
			// 3. Required USDC = $0.001254001 / $1.01 ≈ 0.001241585 USDC
			const result = calculateCreditBasedOnLtv(
				"1000000000000", // 0.000001 ETH
				BigInt(700000), // 70% LTV
				1791.43, // ETH price
				1.01, // USDC price
			);
			expect((result / BigInt(10 ** 6)).toString()).toBe("1241585148514851"); // ~0.001241585 USDC in wei (18 decimals)
			expect(result.toString()).not.toBe("0"); // Ensure precision is maintained even for tiny amounts
		});

		it("should handle extreme LTV values correctly", () => {
			const collateralAmount = "1000000000000000000"; // 1 ETH
			const collateralPrice = 1791.43; // ETH price
			const creditPrice = 1.01; // USDC price

			// Test minimum LTV (1%)
			// 1. Collateral USD = 1 × $1,791.43 = $1,791.43
			// 2. Available credit USD = $1,791.43 × 0.01 = $17.9143
			// 3. Required USDC = $17.9143 / $1.01 ≈ 17.7369 USDC
			const result1 = calculateCreditBasedOnLtv(
				collateralAmount,
				BigInt(10000), // 1% LTV
				collateralPrice,
				creditPrice,
			);
			expect((result1 / BigInt(10 ** 6)).toString()).toBe("17736930693069306931"); // ~17.7369 USDC in wei (18 decimals)

			// Test maximum practical LTV (99%)
			// 1. Collateral USD = 1 × $1,791.43 = $1,791.43
			// 2. Available credit USD = $1,791.43 × 0.99 = $1,773.5157
			// 3. Required USDC = $1,773.5157 / $1.01 ≈ 1,755.9561 USDC
			const result2 = calculateCreditBasedOnLtv(
				collateralAmount,
				BigInt(990000), // 99% LTV
				collateralPrice,
				creditPrice,
			);
			expect((result2 / BigInt(10 ** 6)).toString()).toBe("1755956138613861386100"); // ~1,755.9561 USDC in wei (18 decimals)

			// Verify that higher LTV results in more credit
			expect(BigInt(result2.toString())).toBeGreaterThan(
				BigInt(result1.toString()),
			);
		});

		it("should maintain consistency with price scaling", () => {
			/**
			 * Price Scaling Property:
			 * If both prices are scaled by the same factor k, the result should remain unchanged
			 * because: (collateralAmount × (collateralPrice × k) × ltv) / (creditPrice × k)
			 * simplifies to: (collateralAmount × collateralPrice × ltv) / creditPrice
			 */

			// Base case
			const baseResult = calculateCreditBasedOnLtv(
				"1000000000000000000", // 1 ETH
				BigInt(700000), // 70% LTV
				1791.43, // ETH price
				1.01, // USDC price
			);

			// Same scenario but all prices multiplied by 1000
			const scaledResult = calculateCreditBasedOnLtv(
				"1000000000000000000", // 1 ETH
				BigInt(700000), // 70% LTV
				1791430, // ETH price * 1000
				1010, // USDC price * 1000
			);

			// The credit amount should be identical since price ratio remains constant
			expect(baseResult.toString()).toBe(scaledResult.toString());
		});

		it("should handle invalid LTV values", () => {
			// Test zero LTV
			expect(() =>
				calculateCreditBasedOnLtv(
					"1000000000000000000", // 1 ETH
					BigInt(0), // 0% LTV
					1791.43, // ETH price
					1.01, // USDC price
				),
			).toThrow("LTV cannot be zero or negative");

			// Test 100% LTV
			// 1. Collateral USD = 1 × $1,791.43 = $1,791.43
			// 2. Available credit USD = $1,791.43 × 1.0 = $1,791.43
			// 3. Required USDC = $1,791.43 / $1.01 ≈ 1,773.6930693 USDC
			const result = calculateCreditBasedOnLtv(
				"1000000000000000000", // 1 ETH
				BigInt(1000000), // 100% LTV
				1791.43, // ETH price
				1.01, // USDC price
			);
			expect((result / BigInt(10 ** 6)).toString()).toBe("1773693069306930693100"); // ~1,773.693069 USDC in wei (18 decimals)
		});
	});
});
