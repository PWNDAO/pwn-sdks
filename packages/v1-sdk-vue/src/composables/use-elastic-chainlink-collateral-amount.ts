import {
	type IProposalSpecificParams,
	getCollateralAmount,
} from "@pwndao/v1-core";
import { ChainLinkProposalContract } from "@pwndao/v1-core";
import { ElasticProposalContract } from "@pwndao/v1-core";
import { ProposalType } from "@pwndao/v1-core";
import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";
import { useConfig } from "@wagmi/vue";
import type { MaybeRefOrGetter } from "vue";
import { computed, toValue } from "vue";

export const useGetCollateralAmount = (
	params: MaybeRefOrGetter<IProposalSpecificParams>,
	options?: Omit<UseQueryOptions<bigint, Error, bigint, string[]>, "queryKey" | "queryFn">,
) => {
	const proposalType = computed(() => toValue(params).type);
	const config = useConfig();
	const contract = computed(() => {
		if (proposalType.value === ProposalType.Elastic) {
			return new ElasticProposalContract(config);
		}
		return new ChainLinkProposalContract(config);
	});

	return useQuery({
		queryKey: ["get-proposal-collateral-amount", params],
		queryFn: ({ queryKey }) => {
			const { availableCreditLimit } = queryKey[1] as IProposalSpecificParams;
			return getCollateralAmount(
				contract.value,
				availableCreditLimit,
				queryKey[1] as IProposalSpecificParams,
			);
		},
		...options,
	});
};
