import {
	type SupportedChain,
	User,
} from "@pwndao/sdk-core";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { useUserNonces } from "./use-user-nonces";

export const useUserWithNonce = (chainIds: SupportedChain[]) => {
	const { address, isConnected } = useAccount();

	const user = useMemo(() => {
		if (!address || !isConnected) return null;
		return new User(address);
	}, [address, isConnected]);

	const {
		data: userWithNonce,
		isLoading,
		error,
	} = useUserNonces(user?.address, chainIds);

	return {
		userWithNonce,
		isLoading,
		error,
	};
};
