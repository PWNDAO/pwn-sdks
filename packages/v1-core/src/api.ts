import {
	fetchAssetPrice,
	freeUserNonceRetrieve,
	proposalCreate,
	proposalCreateBatch,
	proposalList,
	thesisDetail,
	thesisList,
} from "@pwndao/api-sdk";
import {
	type AddressString,
	type BaseAsset,
	type SupportedChain,
	getRevokedNonceContractAddress,
} from "@pwndao/sdk-core";
import { Decimal } from "decimal.js";
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
			invariant(data !== undefined, "Error parsing response");
			return parseBackendStrategiesResponse(data);
		},
		getStrategies: async (
			chainId: SupportedChain,
			userAddress?: AddressString,
		): Promise<Strategy[]> => {
			const data = await thesisList({
				chain_id: chainId,
				user_address: userAddress,
			});
			invariant(data.results !== undefined, "Error parsing response");
			return data.results.map(parseBackendStrategiesResponse) ?? [];
		},
		proposalsByStrategy: async (
			strategyId: string,
		): Promise<ProposalWithSignature[]> => {
			const data = await proposalList({
				relatedThesisId: strategyId,
				limit: 100,
				offset: 0,
				statuses: [1],
			});
			invariant(data.results !== undefined, "Error parsing response");
			return (
				data.results.map((v) => {
					try {
						return parseBackendProposalResponse(v);
					} catch (e) {
						console.error(e);
						return null;
					}
				})
					.filter((v) => v !== null) ?? []
			);
		},
		getAssetUsdUnitPrice: async (asset: BaseAsset) => {
			const MAX_RETRIES = 3;
			const RETRY_DELAY = 600;

			const fetchPrice = async (retryCount = 0): Promise<bigint> => {
				const assetPrice = await fetchAssetPrice(
					asset.chainId.toString(),
					asset.address,
					"null",
				);

				// If price is being fetched, wait and retry
				if (
					assetPrice.is_task_scheduled === true &&
					assetPrice?.task_info?.skipped?.length === 0
				) {
					if (retryCount < MAX_RETRIES) {
						await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
						return await fetchPrice(retryCount + 1);
					}
					throw new Error("Max retries reached while fetching asset price");
				}

				if (
					!assetPrice.best_price ||
					!assetPrice.best_price?.price.usd_amount
				) {
					throw new Error("No price found for asset");
				}

				const priceString = assetPrice.best_price.price.usd_amount;
				const decimalPrice = new Decimal(priceString);

				const scaledPrice = decimalPrice
					.times(Decimal.pow(10, asset.decimals))
					.floor();

				return BigInt(scaledPrice.toFixed(0));
			};

			return fetchPrice();
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
			return [BigInt(data.freeUserNonces[0]), BigInt(data.freeUserNonceSpace)];
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
			return data;
		},
	},
};
