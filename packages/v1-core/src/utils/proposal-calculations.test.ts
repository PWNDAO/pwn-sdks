import {
	calculateCollateralAmount,
	calculateMinCreditAmount,
} from "./proposal-calculations.js";

describe("Proposal Calculations", () => {
	it("should calculate collateral amount correctly", () => {
		const collateralAmount = calculateCollateralAmount({
			creditAmount: BigInt(1e18),
			ltv: 5000,
			creditDecimals: 18,
			collateralDecimals: 18,
			creditUsdPrice: BigInt(1e18),
			collateralUsdPrice: BigInt(1e18),
		});

		expect(collateralAmount).toBe(2000000000000000000n);
	});

	describe("Edge cases and overflow checks", () => {
		it("should handle maximum BigInt values without overflow", () => {
			const maxBigInt = BigInt(
				"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
			); // 2^256-1
			const collateralAmount = calculateCollateralAmount({
				creditAmount: maxBigInt,
				ltv: 5000, // 50%
				creditDecimals: 18,
				collateralDecimals: 18,
				creditUsdPrice: BigInt(1e18),
				collateralUsdPrice: BigInt(1e18),
			});
			expect(collateralAmount > 0n).toBe(true); // Should not throw or return zero
		});

		it("should handle very small credit amounts without underflowing to zero", () => {
			const collateralAmount = calculateCollateralAmount({
				creditAmount: 1n, // 1 wei
				ltv: 5000, // 50%
				creditDecimals: 18,
				collateralDecimals: 18,
				creditUsdPrice: 1n,
				collateralUsdPrice: 1n,
			});
			expect(collateralAmount).toBeGreaterThanOrEqual(1n); // Should not underflow to zero
		});

		it("should throw or handle gracefully when LTV is zero", () => {
			expect(() =>
				calculateCollateralAmount({
					creditAmount: 1n,
					ltv: 0, // Invalid
					creditDecimals: 18,
					collateralDecimals: 18,
					creditUsdPrice: 1n,
					collateralUsdPrice: 1n,
				}),
			).toThrow();
		});

		it("should handle very high LTV values (close to 100%)", () => {
			const collateralAmount = calculateCollateralAmount({
				creditAmount: 1_000_000n,
				ltv: 9999, // 99.99%
				creditDecimals: 18,
				collateralDecimals: 18,
				creditUsdPrice: 1n,
				collateralUsdPrice: 1n,
			});
			expect(collateralAmount).toBeGreaterThan(0n);
		});

		it("should handle very low LTV values (close to 0%)", () => {
			const collateralAmount = calculateCollateralAmount({
				creditAmount: 1_000_000n,
				ltv: 1, // 0.01%
				creditDecimals: 18,
				collateralDecimals: 18,
				creditUsdPrice: 1n,
				collateralUsdPrice: 1n,
			});
			expect(collateralAmount).toBeGreaterThan(0n);
		});

		it("should handle extreme price ratios without overflow or underflow", () => {
			// Very expensive collateral, cheap credit
			const result1 = calculateCollateralAmount({
				creditAmount: 1_000_000n,
				ltv: 5000,
				creditDecimals: 18,
				collateralDecimals: 18,
				creditUsdPrice: 1n,
				collateralUsdPrice: BigInt(1e30),
			});

			// Should not throw, and should be >= 0n (may be 0n if below 1 wei)
			expect(result1).toBeGreaterThanOrEqual(0n);

			// Very cheap collateral, expensive credit
			const result2 = calculateCollateralAmount({
				creditAmount: 1_000_000n,
				ltv: 5000,
				creditDecimals: 18,
				collateralDecimals: 18,
				creditUsdPrice: BigInt(1e30),
				collateralUsdPrice: 1n,
			});
			expect(result2).toBeGreaterThan(0n);
		});

		it("should calculate ETH collateral for 1,000 USDC credit at 70% LTV, ETH=$2,000, USDC=$1.01", () => {
			const collateralAmount = calculateCollateralAmount({
				creditAmount: BigInt(1_000_000_000), // 1,000 USDC (6 decimals)
				ltv: 7000, // 70%
				creditDecimals: 6,
				collateralDecimals: 18,
				creditUsdPrice: BigInt(1_010_000), // $1.01 (6 decimals)
				collateralUsdPrice: BigInt("2000000000000000000000"), // $2,000 (18 decimals)
			});

			expect(collateralAmount).toBe(BigInt("721428571428571428"));
		});
	});

	describe("calculateMinCreditAmount", () => {
		it("should calculate minimum credit amount correctly for 50%", () => {
			const result = calculateMinCreditAmount(BigInt(1000), 50);
			expect(result).toBe(BigInt(500));
		});

		it("should calculate minimum credit amount correctly for 25%", () => {
			const result = calculateMinCreditAmount(BigInt(1000), 25);
			expect(result).toBe(BigInt(250));
		});

		it("should handle large numbers correctly", () => {
			const result = calculateMinCreditAmount(
				BigInt("1000000000000000000"),
				75,
			);
			expect(result).toBe(BigInt("750000000000000000"));
		});

		it("should handle small percentages correctly", () => {
			const result = calculateMinCreditAmount(BigInt(1000), 1);
			expect(result).toBe(BigInt(10));
		});

		it("should handle 100% correctly", () => {
			const result = calculateMinCreditAmount(BigInt(1000), 100);
			expect(result).toBe(BigInt(1000));
		});

		it("should handle zero credit amount", () => {
			const result = calculateMinCreditAmount(BigInt(0), 50);
			expect(result).toBe(BigInt(0));
		});

		it("should handle very small credit amounts", () => {
			const result = calculateMinCreditAmount(BigInt(1), 50);
			expect(result).toBe(BigInt(1));
		});

		it("should handle very large percentages", () => {
			const result = calculateMinCreditAmount(BigInt(1000), 99);
			expect(result).toBe(BigInt(990));
		});

		it("should handle decimal percentages correctly", () => {
			const result = calculateMinCreditAmount(BigInt(1000), 33.33);
			expect(result).toBe(BigInt(333));
		});

		it("should handle maximum BigInt values", () => {
			const maxBigInt = BigInt(
				"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
			);
			const result = calculateMinCreditAmount(maxBigInt, 50);
			expect(result).toBeGreaterThan(BigInt(0));
		});
	});
});
