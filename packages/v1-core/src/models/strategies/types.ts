import type {
	AddressString,
	ERC20TokenLike,
	Hex,
	SupportedChain,
	Token,
	UserWithNonceManager,
} from "@pwndao/sdk-core";
import type { CreateElasticProposalParams } from "../../factories/create-elastic-proposal.js";
import type { ChainLinkProposal } from "../proposals/chainlink-proposal.js";
import type { ElasticProposal } from "../proposals/elastic-proposal.js";
import type { UniswapV3LpSetProposal } from "../proposals/uniswap-v3-lp-set-proposal.js";
import type {
	IElasticProposalBase,
	IOracleProposalBase,
} from "../proposals/proposal-base.js";
import type { ProposalType } from "../proposals/proposal-base.js";

export interface StrategyTerm {
	creditAssets: ERC20TokenLike[];
	collateralAssets: Token[];
	apr: Record<string, number>;
	ltv: Record<string, number>;
	durationDays: number;
	expirationDays: number;
	/**
	 * The minimum credit amount percentage for a proposal to be created
	 * With 1e4 precision
	 */
	minCreditAmountPercentage?: number;
	id?: string; // if provided it's strategy id
	relatedStrategyId?: string;
}

export interface IProposalStrategy<
	T extends IElasticProposalBase | IOracleProposalBase,
> {
	term: StrategyTerm;
	getProposalsParams(
		creditAmount: bigint,
		utilizedCreditId: Hex,
		isOffer: boolean,
		sourceOfFunds: AddressString | null,
		minCreditAmount?: bigint,
	): CreateElasticProposalParams[];

	createLendingProposals(
		user: UserWithNonceManager,
		creditAmount: bigint,
		utilizedCreditId: Hex,
		isOffer: boolean,
		sourceOfFunds: AddressString | null,
		minCreditAmount: bigint,
	): Promise<T[]>;
}

export type Strategy = {
	id: string;
	name: string;
	description: string | null;
	terms: StrategyTerm;
	curator?: {
		id: number;
		name: string;
		avatar: string | null;
		description: string;
	} | null;
	type: ProposalType;
	lendingStats: {
		totalCommittedAmount: bigint;
		totalUtilizedAmount: bigint;
		totalAvailableAmount: bigint;
	};
	borrowingStats: {
		totalBorrowedAmount: bigint;
		totalRepaidAmount: bigint;
		totalDefaultedAmount: bigint;
		activeBorrowedAmount: bigint;
	};
};

export type Proposal = ElasticProposal | ChainLinkProposal | UniswapV3LpSetProposal;

export type ProposalWithHash = Proposal & {
	hash: Hex;
};

export type ProposalWithSignature = ProposalWithHash & {
	chainId: SupportedChain;
	// null for on-chain proposals
	signature: Hex | null;
	isOnChain: boolean;
	sourceOfFunds?: AddressString;
	multiproposalMerkleRoot?: Hex;

	type: ProposalType;
};
