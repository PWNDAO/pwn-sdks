import type { AddressString } from "@pwndao/sdk-core";
import {
	type WalletAssetsOptions,
	getWalletAssets,
} from "@pwndao/v1-core";
import type { WalletAssets } from "@pwndao/v1-core";
import { useQuery } from "@tanstack/react-query";
import type { PublicClient } from "viem";

/**
 * React hook for fetching wallet assets using the Transfer event scanning technique
 * Powered by TanStack Query for efficient caching and state management
 */
export function useWalletAssets(
	options: WalletAssetsOptions,
	client: PublicClient | undefined,
	userAddress: AddressString | undefined,
) {

	console.log("options", options);
	console.log("client", client);
	console.log("userAddress", userAddress);

	return useQuery<WalletAssets | null, Error>({
		queryKey: ["wallet-assets", userAddress, options],
		queryFn: async () => {
			if (!userAddress || !client) return null;
			const result = await getWalletAssets(userAddress, options, client);
			return result.assets;
		},
		enabled: Boolean(userAddress) && options.enabled !== false,
		staleTime: options.refreshInterval ? options.refreshInterval : undefined,
		refetchInterval: options.refreshInterval,
	});
}
