import type { AddressString } from "@pwndao/sdk-core";
import { ElasticProposalContract, acceptProposal } from "@pwndao/v1-core";
import type { ProposalWithSignature } from "@pwndao/v1-core";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { useConfig } from "wagmi";

export const useAcceptProposal = (acceptor: AddressString) => {
	const config = useConfig();
	const proposalContract = useMemo(() => {
		return new ElasticProposalContract(config);
	}, [config]);

	return useMutation({
		mutationFn: async ({
			proposal,
			creditAmount,
		}: {
			proposal: ProposalWithSignature;
			creditAmount: bigint;
		}) => {
			return await acceptProposal(
				{
					proposalToAccept: proposal,
					acceptor,
					creditAmount,
				},
				{
					proposalContract,
				},
			);
		},
	});
};
