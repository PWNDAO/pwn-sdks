import type { AddressString, BaseAsset } from "@pwndao/sdk-core";
import type { IApprovableToSpend } from "src/contracts/tokens/interface.js";
import invariant from "ts-invariant";

export const issueApproval = async (
	token: BaseAsset,
	spender: AddressString,
	owner: AddressString,
	deps: IApprovableToSpend,
	amount: bigint,
) => {
	invariant(amount > 0n, "amount must be greater than 0");
	const currentAllowance = await deps.readAllowance(token, spender, owner);

	if (amount > currentAllowance) {
		await deps.issueAllowance(token, spender, owner, amount);
	}
};
