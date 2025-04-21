import { type SupportedChain, User } from "@pwndao/sdk-core";
import { useAccount } from "@wagmi/vue";
import { type MaybeRefOrGetter, computed, toValue } from "vue";
import { useUserNonces } from "./use-user-nonces";

export const useUserWithNonce = (
	chainIds: MaybeRefOrGetter<SupportedChain[]>,
) => {
	const { address, isConnected } = useAccount();
	const _chainIds = computed(() => toValue(chainIds));
	const user = computed(() => {
		if (!toValue(address) || !toValue(isConnected)) return null;
		return new User(toValue(address) as `0x${string}`);
	});

	const {
		data: userWithNonce,
		isLoading,
		error,
	} = useUserNonces(
		computed(() => user.value?.address),
		_chainIds,
	);

	return {
		userWithNonce,
		isLoading,
		error,
	};
};
