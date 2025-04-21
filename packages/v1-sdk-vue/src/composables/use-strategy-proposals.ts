import { getProposalsByStrategy } from "@pwndao/v1-core";
import { useQuery } from "@tanstack/vue-query";
import { type MaybeRefOrGetter, computed, toValue } from "vue";

export const useStrategyProposals = (strategyId: MaybeRefOrGetter<string>) => {
	const _strategyId = computed(() => toValue(strategyId));
	const queryIsEnabled = computed(() => !!_strategyId.value);
	return useQuery({
		queryKey: ["strategy-proposals", _strategyId],
		queryFn: ({ queryKey: [, _strategyId] }) =>
			getProposalsByStrategy(_strategyId),
		enabled: queryIsEnabled,
	});
};
