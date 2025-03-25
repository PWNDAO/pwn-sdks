import {
	fetchAssetPrice,
	freeUserNonceRetrieve,
	listProposals,
	type listProposalsResponse,
	proposalCreate,
	proposalCreateBatch,
	thesisDetail,
	thesisList,
} from "@pwndao/api-sdk";
import {
	type AddressString,
	type BaseAsset,
	type SupportedChain,
	getRevokedNonceContractAddress,
} from "@pwndao/sdk-core";
import invariant from "ts-invariant";
import type { IServerAPI } from "./factories/types.js";
import type {
	ProposalWithSignature,
	Strategy,
} from "./models/strategies/types.js";
import { encodeProposalForBackend } from "./utils/utils.js";
import { parseBackendProposalResponse } from "./views/utils/parse-backend-proposal.js";
import { parseBackendStrategiesResponse } from "./views/utils/parse-backend-strategies.js";

export const API: IServerAPI = {
	get: {
		getStrategyDetail: async (strategyId: string): Promise<Strategy> => {
			const data = await thesisDetail(strategyId);
			invariant(data.data !== undefined, "Error parsing response");
			return parseBackendStrategiesResponse(data.data);
		},
		getStrategies: async (chainId: SupportedChain): Promise<Strategy[]> => {
			const data = await thesisList({ chain_id: chainId });
			invariant(data.data.results !== undefined, "Error parsing response");
			return data.data.results.map(parseBackendStrategiesResponse) ?? [];
		},
		proposalsByStrategy: async (
			strategyId: string,
		): Promise<ProposalWithSignature[]> => {
			const data: listProposalsResponse = await listProposals({
				relatedThesisId: strategyId,
				limit: 100,
				offset: 0,
			});
			invariant(data.data.results !== undefined, "Error parsing response");
			return data.data.results.map(parseBackendProposalResponse) ?? [];
		},
		getAssetUsdUnitPrice: async (asset: BaseAsset) => {
			const assetPrice = await fetchAssetPrice(
				asset.chainId.toString(),
				asset.address,
				"null",
			);
			if (!assetPrice.data.best_price?.price.usd_amount) {
				throw new Error("No price found for asset");
			}
			const amount =
				+assetPrice.data.best_price.price.usd_amount * 10 ** asset.decimals;
			return BigInt(amount);
		},
		recentNonce: async (
			userAddress: AddressString,
			chainId: SupportedChain,
		) => {
			const data = await freeUserNonceRetrieve(
				chainId.toString(),
				getRevokedNonceContractAddress(chainId),
				userAddress,
			);
			return [
				BigInt(data.data.freeUserNonces[0]),
				BigInt(data.data.freeUserNonceSpace),
			];
		},
	},
	post: {
		persistProposal: async (params: ProposalWithSignature) => {
			const data = await proposalCreate(encodeProposalForBackend(params));
			return data;
		},
		persistProposals: async (params: ProposalWithSignature[]) => {
			const data = await proposalCreateBatch(
				params.map(encodeProposalForBackend),
			);
			return data;
		},
		updateNonce: async (
			userAddress: AddressString,
			chainId: SupportedChain,
			nonce: bigint,
		) => {
			const data = await freeUserNonceRetrieve(
				chainId.toString(),
				getRevokedNonceContractAddress(chainId),
				userAddress,
				{
					nonce_count_to_reserve: Number(nonce),
				},
			);
			return data.data;
		},
	},
};
