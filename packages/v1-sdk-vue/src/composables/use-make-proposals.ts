import type { UserWithNonceManager } from "@pwndao/sdk-core";
import type {
	ImplementedProposalTypes,
	ProposalParamWithDeps,
	ProposalWithSignature,
} from "@pwndao/v1-core";
import { makeProposals } from "@pwndao/v1-core";
import { useMutation } from "@tanstack/vue-query";
import { useConfig } from "@wagmi/vue";
import invariant from "ts-invariant";
import { type MaybeRefOrGetter, toValue } from "vue";

export const useMakeProposals = (
	user: MaybeRefOrGetter<UserWithNonceManager | undefined>,
) => {

	const config = useConfig();

	return useMutation<ProposalWithSignature[], Error, ProposalParamWithDeps<ImplementedProposalTypes>[]>({
		mutationFn: async (
			params: ProposalParamWithDeps<ImplementedProposalTypes>[],
		) => {
			const _user = toValue(user);
			invariant(_user, "User is required");
			return await makeProposals(
				config,
				params,
				_user,
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
