import { acceptProposals } from "@pwndao/v1-core";
import type {
	AcceptProposalDeps,
	AcceptProposalRequest,
} from "@pwndao/v1-core";
import { useMutation } from "@tanstack/react-query";
import invariant from "ts-invariant";
import { useAccount } from "wagmi";

export function useAcceptProposals(contract: AcceptProposalDeps) {
	const { address } = useAccount();

	const acceptProposalsMutation = useMutation({
		mutationFn: async ({
			proposalsToAccept,
		}: {
			proposalsToAccept: AcceptProposalRequest[];
		}) => {
			invariant(proposalsToAccept.length > 0, "Proposals must be provided");
			invariant(address, "No wallet connected");

			return acceptProposals(proposalsToAccept, contract);
		},
	});

	return acceptProposalsMutation;
}
