import type { AddressString, ERC20TokenLike, UniqueKey } from "@pwndao/sdk-core";
import { acceptProposals } from "@pwndao/v1-core";
import type {
	AcceptProposalDeps,
	AcceptProposalRequest,
} from "@pwndao/v1-core";
import { useMutation } from "@tanstack/vue-query";
import { invariant } from "ts-invariant";

export function useAcceptProposals(
	contract: AcceptProposalDeps,
) {
	const acceptProposalsMutation = useMutation({
		mutationFn: async ({
			proposalsToAccept,
			userAddress,
			totalToApprove = {},
		}: {
			proposalsToAccept: AcceptProposalRequest[];
			userAddress?: AddressString;
			totalToApprove?: Partial<{
				[key in UniqueKey]: {
					amount: bigint;
					asset: ERC20TokenLike;
					spender?: AddressString;
				};
			}>;
		}) => {
			invariant(userAddress, "No wallet connected");

			return acceptProposals(proposalsToAccept, contract, totalToApprove);
		},
	});

	return acceptProposalsMutation;
}
