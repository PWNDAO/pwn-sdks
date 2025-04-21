import { User, type AddressString, type SupportedChain } from "@pwndao/sdk-core";
import { API, getUserWithNonce } from "@pwndao/v1-core";
import { useQuery } from "@tanstack/vue-query";
import invariant from "ts-invariant";
import { type MaybeRefOrGetter, computed, toValue } from "vue";

export const useUserNonces = (
	address: MaybeRefOrGetter<AddressString | undefined>,
	chainIds: MaybeRefOrGetter<SupportedChain[]>,
) => {
	const _address = computed(() => toValue(address));
	const _chainIds = computed(() => toValue(chainIds));

	const queryIsEnabled = computed(
		() => !!_address.value && _chainIds.value.length > 0,
	);

	return useQuery({
		queryKey: ["user-nonces", _address, _chainIds],
		queryFn: async ({ queryKey }) => {
			const [, address, _chainIds] = queryKey;
			const chainIds = Array.isArray(_chainIds)
				? _chainIds
				: _chainIds?.split(",").map((c) => Number(c) as SupportedChain);
			invariant(address, "Address is required");
			invariant(chainIds?.length, "At least some chain ids must be provided");

			const user = new User(address as AddressString)

			return getUserWithNonce(user, API, chainIds)
		},
		enabled: queryIsEnabled,
	});
};
