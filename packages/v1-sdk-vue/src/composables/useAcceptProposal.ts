import type { AddressString } from "@pwndao/sdk-core";
import { ElasticProposalContract } from "@pwndao/v1-core";
import type { ProposalWithSignature } from "@pwndao/v1-core";
import { useMutation } from "@tanstack/vue-query";
import { useAccount, useConfig } from "wagmi";

interface UseAcceptProposalReturn {
	acceptProposal: (params: {
		proposal: ProposalWithSignature;
		creditAmount: bigint;
	}) => Promise<unknown>;
	acceptProposalsBatch: (params: {
		proposals: Array<{
			proposal: ProposalWithSignature;
			creditAmount: bigint;
		}>;
	}) => Promise<unknown[]>;
	isLoading: boolean;
	error: Error | null;
	reset: () => void;
}

export function useAcceptProposal(): UseAcceptProposalReturn {
	const { address } = useAccount();
	const config = useConfig();

	const acceptProposalMutation = useMutation({
		mutationFn: async ({
			proposal,
			creditAmount,
		}: {
			proposal: ProposalWithSignature;
			creditAmount: bigint;
		}) => {
			if (!address.value) {
				throw new Error("No wallet connected");
			}

			const contract = new ElasticProposalContract(config.value);
			return contract.acceptProposal(proposal, address.value, creditAmount);
		},
	});

	const acceptProposalsBatchMutation = useMutation({
		mutationFn: async ({
			proposals,
		}: {
			proposals: Array<{
				proposal: ProposalWithSignature;
				creditAmount: bigint;
			}>;
		}) => {
			if (!address.value) {
				throw new Error("No wallet connected");
			}

			const contract = new ElasticProposalContract(config.value);
			return contract.acceptProposalsBatch(proposals, address.value);
		},
	});

	return {
		acceptProposal: acceptProposalMutation.mutateAsync,
		acceptProposalsBatch: acceptProposalsBatchMutation.mutateAsync,
		isLoading:
			acceptProposalMutation.isPending ||
			acceptProposalsBatchMutation.isPending,
		error: acceptProposalMutation.error || acceptProposalsBatchMutation.error,
		reset: () => {
			acceptProposalMutation.reset();
			acceptProposalsBatchMutation.reset();
		},
	};
}
