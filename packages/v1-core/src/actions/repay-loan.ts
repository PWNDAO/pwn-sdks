import type { AddressString } from "@pwndao/sdk-core";
import type { SupportedChain } from "@pwndao/sdk-core";
import invariant from "ts-invariant";

type RepayLoanRequest = {
	loanId: bigint;
	repayer: AddressString;
	chainId: SupportedChain;
};

interface RepayLoanDeps {
	loanContract: {
		repayLoan: (loanId: bigint, chainId: SupportedChain) => Promise<void>;
	};
}

export const repayLoan = async (
	{ loanId, repayer, chainId }: RepayLoanRequest,
	deps: RepayLoanDeps,
) => {
	invariant(loanId > 0n, "Loan ID must be greater than zero.");
	invariant(repayer.startsWith("0x"), "Repayer must be a valid address.");

	await deps.loanContract.repayLoan(loanId, chainId);
};
