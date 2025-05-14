import {
	acceptProposal,
} from "@pwndao/v1-core";
import type {
	AcceptProposalDeps,
	AcceptProposalRequest,
} from "@pwndao/v1-core";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export function useAcceptProposal(contract: AcceptProposalDeps) {
	const { address } = useAccount();

	const acceptProposalsMutation = useMutation({
		mutationFn: async ({
			proposalsToAccept,
		}: {
			proposalsToAccept: AcceptProposalRequest[];
		}) => {
			if (!address) {
				throw new Error("No wallet connected");
			}

			return acceptProposal(proposalsToAccept, contract);
		},
	});

	return acceptProposalsMutation;
}
