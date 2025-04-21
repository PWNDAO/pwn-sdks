import { getStrategy } from "@pwndao/v1-core";
import type { Strategy } from "@pwndao/v1-core";
import { useQuery } from "@tanstack/vue-query";
import { computed, toValue } from "vue";
import type { MaybeRefOrGetter } from "vue";

export const useStrategy = (strategyId: MaybeRefOrGetter<string>) => {
	const _strategyId = computed(() => toValue(strategyId));
	const queryIsEnabled = computed(() => !!_strategyId.value);
	return useQuery<Strategy, Error>({
		queryKey: ["strategy", _strategyId],
		queryFn: ({ queryKey }) => getStrategy(queryKey[1] as string),
		enabled: queryIsEnabled.value,
	});
};
