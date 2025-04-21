import type { AddressString, SupportedChain } from "@pwndao/sdk-core";
import { getStrategies } from "@pwndao/v1-core";
import { useQuery } from "@tanstack/vue-query";
import { type MaybeRefOrGetter, computed, toValue } from "vue";

export const useStrategies = (
	chainId: MaybeRefOrGetter<SupportedChain>,
	userAddress?: MaybeRefOrGetter<AddressString>,
) => {
	const _chainId = computed(() => toValue(chainId));
	const _userAddress = computed(() => toValue(userAddress));
	const queryIsEnabled = computed(() => !!_chainId.value);
	return useQuery({
		queryKey: ["strategies", _chainId, _userAddress],
		queryFn: ({ queryKey }) =>
			getStrategies(
				queryKey[1] as SupportedChain,
				queryKey[2] as AddressString | undefined,
			),
		enabled: queryIsEnabled,
	});
};
