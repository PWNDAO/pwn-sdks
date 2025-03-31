import {
	type WalletAssetsOptions,
	type WalletAssetsResult,
	getWalletAssets,
} from "@pwndao/v1-core";
import { onMounted, onUnmounted, ref } from "vue";
import { useAccount } from "wagmi";

/**
 * Vue composable for fetching wallet assets using the Transfer event scanning technique
 */
export function useWalletAssets(options: WalletAssetsOptions) {
	const { address } = useAccount();
	const assets = ref<WalletAssetsResult["assets"]>(null);
	const isLoading = ref(false);
	const error = ref<Error | null>(null);
	let cleanup: (() => void) | undefined;

	const refetch = async () => {
		if (!address) return;

		isLoading.value = true;
		error.value = null;

		try {
			const result = await getWalletAssets(address, options);
			assets.value = result.assets;
			error.value = result.error;
		} catch (err) {
			error.value = err instanceof Error ? err : new Error(String(err));
		} finally {
			isLoading.value = false;
		}
	};

	onMounted(async () => {
		if (!address) return;

		const result = await getWalletAssets(address, options);
		assets.value = result.assets;
		error.value = result.error;
		isLoading.value = result.isLoading;
		cleanup = result.cleanup;
	});

	onUnmounted(() => {
		if (cleanup) {
			cleanup();
		}
	});

	return {
		assets,
		isLoading,
		error,
		refetch,
	};
}
