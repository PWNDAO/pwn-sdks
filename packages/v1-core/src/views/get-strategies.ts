import type { AddressString, SupportedChain } from "@pwndao/sdk-core";
import { API } from "../api.js";
import type { Strategy } from "../models/strategies/types.js";

export const getStrategies = (
	chainId: SupportedChain,
	userAddress?: AddressString,
): Promise<Strategy[]> =>
	API.get.getStrategies(chainId, userAddress);
