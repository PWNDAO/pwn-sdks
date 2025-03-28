import type {
	ImplementedProposalTypes,
	ProposalParamWithDeps,
	ProposalWithSignature,
} from "@pwndao/v1-core";
import { makeProposals } from "@pwndao/v1-core";
import { useMutation } from "@tanstack/vue-query";
import { useConfig } from "@wagmi/vue";

export const useMakeProposals = () => {

	const config = useConfig();

	return useMutation<ProposalWithSignature[], Error, ProposalParamWithDeps<ImplementedProposalTypes>[]>({
		mutationFn: async (params: ProposalParamWithDeps<ImplementedProposalTypes>[]) => {
			return await makeProposals(
				config,
				params,
			);
		},
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.error(error);
		},
	});
};
