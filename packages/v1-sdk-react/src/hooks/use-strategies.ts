import type { AddressString, SupportedChain } from "@pwndao/sdk-core";
import { type Strategy, getStrategies } from "@pwndao/v1-core";
import {
	type UseQueryOptions,
	type UseQueryResult,
	useQuery,
} from "@tanstack/react-query";

export const useStrategies = (
	chainId: SupportedChain,
	userAddress?: AddressString,
	queryOptions?: UseQueryOptions<Strategy[], Error>,
): UseQueryResult<Strategy[], Error> => {
	return useQuery({
		queryKey: ["strategies", chainId, userAddress],
		queryFn: ({ queryKey }) =>
			getStrategies(
				queryKey[1] as SupportedChain,
				queryKey[2] as AddressString | undefined,
			),
		...queryOptions,
	});
};
