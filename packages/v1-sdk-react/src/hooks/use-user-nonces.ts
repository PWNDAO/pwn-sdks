import {
	type AddressString,
	type SupportedChain,
	User,
} from "@pwndao/sdk-core";
import { API, getUserWithNonce } from "@pwndao/v1-core";
import { useQuery } from "@tanstack/react-query";
import invariant from "ts-invariant";

export const useUserNonces = (
	address: AddressString | undefined,
	chainIds: SupportedChain[],
) => {
	return useQuery({
		queryKey: ["user-nonces", address, chainIds],
		queryFn: async ({ queryKey }) => {
			const [, address, _chainIds] = queryKey;
			const chainIds = Array.isArray(_chainIds)
				? _chainIds
				: _chainIds?.split(",").map((c) => Number(c) as SupportedChain);
			invariant(address, "Address is required");
			invariant(chainIds?.length, "At least some chain ids must be provided");

			const user = new User(address as AddressString);

			return getUserWithNonce(user, API, chainIds);
		},
		enabled: !!address && chainIds.length > 0,
	});
};
