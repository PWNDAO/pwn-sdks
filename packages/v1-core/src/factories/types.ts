import type {
	FreeUserNonceSchemaWorkaround,
	ProposalDetailSchema,
} from "@pwndao/api-sdk";
import type {
	AddressString,
	BaseAsset,
	ERC20TokenLike,
	Hex,
	SupportedChain,
	Token,
} from "@pwndao/sdk-core";
import type {
	ProposalWithSignature,
	Strategy,
} from "../models/strategies/types.js";

export type BaseTerm = {
	// TODO if we wanna enable using pool hooks for collateral, we should also allow
	//  PoolToken here, alongside the ERC20 and NFTs
	collateral: Token;
	credit: ERC20TokenLike;
	creditAmount: bigint;
	ltv: Record<string, number>;
	apr: Record<string, number>;
	duration:
		| {
				days: number;
				date?: undefined;
		  }
		| {
				days?: undefined;
				date: Date;
		  };
	expirationDays: number;
	utilizedCreditId: Hex;
	relatedStrategyId?: string;
	isOffer: boolean;
	sourceOfFunds: AddressString | null;
};

export interface IServerAPI {
	get: {
		getStrategyDetail(strategyId: string): Promise<Strategy>;
		getStrategies(
			chainId: SupportedChain,
			userAddress?: AddressString,
		): Promise<Strategy[]>;
		proposalsByStrategy(strategyId: string): Promise<ProposalWithSignature[]>;
		/**
		 * Returns the recent nonce for the user and the nonce space
		 * @param userAddress
		 * @param chainId
		 * @returns [recentNonce, nonceSpace]
		 */
		recentNonce: (
			userAddress: AddressString,
			chainId: SupportedChain,
		) => Promise<[bigint, bigint]>;
		getAssetUsdUnitPrice: (asset: BaseAsset) => Promise<bigint>;
	};
	post: {
		persistProposal: (
			params: ProposalWithSignature,
		) => Promise<ProposalDetailSchema>;
		persistProposals: (
			params: ProposalWithSignature[],
		) => Promise<ProposalDetailSchema[]>;
		/**
		 * Updates the nonce for the user and the chain
		 * @param userAddress
		 * @param chainId
		 * @param nonce
		 */
		updateNonce: (
			userAddress: AddressString,
			chainId: SupportedChain,
			nonce: bigint,
		) => Promise<FreeUserNonceSchemaWorkaround>;
	};
}
