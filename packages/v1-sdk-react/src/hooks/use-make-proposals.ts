"use client";

import type { UserWithNonceManager } from "@pwndao/sdk-core";
import type {
	ImplementedProposalTypes,
	ProposalParamWithDeps,
	ProposalWithSignature,
} from "@pwndao/v1-core";
import { makeProposals } from "@pwndao/v1-core";
import { useMutation } from "@tanstack/react-query";
import invariant from "ts-invariant";
import { useConfig } from "wagmi";

export const useMakeProposals = (
	user: UserWithNonceManager | undefined,
) => {
	const config = useConfig();

	return useMutation<
		ProposalWithSignature[],
		Error,
		ProposalParamWithDeps<ImplementedProposalTypes>[]
	>({
		mutationFn: async (
			params: ProposalParamWithDeps<ImplementedProposalTypes>[],
		) => {
			invariant(user, "User is required");
			return await makeProposals(config, params, user);
		},
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.error(error);
		},
	});
};
