import { describe, expect, it, vi } from "vitest";
import { repayLoan } from "./repay-loan.js";

describe("repayLoan", () => {
	const mockLoanContract = {
		repayLoan: vi.fn().mockResolvedValue(undefined),
	};

	beforeEach(() => {
		mockLoanContract.repayLoan.mockClear();
	});

	it("should call loanContract.repayLoan with correct parameters", async () => {
		const loanId = 1n;
		const repayer = "0x1234567890123456789012345678901234567890";
		const chainId = 1;

		await repayLoan(
			{
				loanId,
				repayer,
				chainId,
			},
			{
				loanContract: mockLoanContract,
			},
		);

		expect(mockLoanContract.repayLoan).toHaveBeenCalledWith(loanId, chainId);
		expect(mockLoanContract.repayLoan).toHaveBeenCalledTimes(1);
	});

	it("should throw error when loan ID is not greater than zero", async () => {
		const loanId = 0n;
		const repayer = "0x1234567890123456789012345678901234567890";
		const chainId = 1;

		await expect(
			repayLoan(
				{
					loanId,
					repayer,
					chainId,
				},
				{
					loanContract: mockLoanContract,
				},
			),
		).rejects.toThrow("Loan ID must be greater than zero.");

		expect(mockLoanContract.repayLoan).not.toHaveBeenCalled();
	});

	it("should throw error when repayer is not a valid address", async () => {
		const loanId = 1n;
		const repayer = "invalid-address";
		const chainId = 1;

		await expect(
			repayLoan(
				{
					loanId,
					repayer,
					chainId,
				},
				{
					loanContract: mockLoanContract,
				},
			),
		).rejects.toThrow("Repayer must be a valid address.");

		expect(mockLoanContract.repayLoan).not.toHaveBeenCalled();
	});
});
