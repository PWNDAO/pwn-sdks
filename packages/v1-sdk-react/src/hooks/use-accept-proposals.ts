import type { AddressString } from "@pwndao/sdk-core";
import { acceptProposals } from "@pwndao/v1-core";
import type {
	AcceptProposalDeps,
	AcceptProposalRequest,
} from "@pwndao/v1-core";
import { useMutation } from "@tanstack/react-query";
import invariant from "ts-invariant";

export function useAcceptProposals(
	contract: AcceptProposalDeps,
) {
	const acceptProposalsMutation = useMutation({
		mutationFn: async ({
			proposalsToAccept,
			userAddress,
		}: {
			proposalsToAccept: AcceptProposalRequest[];
			userAddress?: AddressString;
		}) => {
			invariant(proposalsToAccept.length > 0, "Proposals must be provided");
			invariant(userAddress, "No wallet connected");

			return acceptProposals(proposalsToAccept, contract);
		},
	});

	return acceptProposalsMutation;
}
