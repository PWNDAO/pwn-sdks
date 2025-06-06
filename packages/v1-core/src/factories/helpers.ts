import type {
	AddressString,
	ERC20TokenLike,
	Hex,
	Token,
	UniqueKey,
	UserWithNonceManager,
} from "@pwndao/sdk-core";

import type { SupportedChain } from "@pwndao/sdk-core";

import {
	ZERO_ADDRESS,
	ZERO_FINGERPRINT,
	getUniqueCreditCollateralKey,
	isPoolToken,
} from "@pwndao/sdk-core";
import type { Config, ReadContractsParameters } from "@wagmi/core";
import type { IProposalChainLinkContract } from "../contracts/chain-link-proposal-contract.js";
import type { IProposalElasticContract } from "../contracts/elastic-proposal-contract.js";
import type { IServerAPI } from "../factories/types.js";
import type {
	ICommonProposalFields,
	IProposalMisc,
} from "../models/proposals/proposal-base.js";
import type {
	ProposalWithHash,
	ProposalWithSignature,
} from "../models/strategies/types.js";
import type { Proposal } from "../models/strategies/types.js";
import type { ILenderSpec } from "../models/terms.js";

type CommonProposalFieldsParams = {
	user: UserWithNonceManager;
	nonce: bigint;
	nonceSpace: bigint;
	collateral: Token;
	credit: Token;
	creditAmount: bigint;
	utilizedCreditId: Hex;
	durationOrDate: number;
	apr: number | Record<string, number>;
	expiration: number;
	loanContract: AddressString;
	sourceOfFunds: AddressString | null;
};

export interface ILoanContract {
	getLenderSpecHash(params: ILenderSpec, chainId: SupportedChain): Promise<Hex>;
}

export interface IProposalContract<TProposal extends Proposal> {
	config: Config;

	createProposal(
		params: TProposal,
		deps: { persistProposal: IServerAPI["post"]["persistProposal"] },
	): Promise<ProposalWithSignature>;

	createOnChainProposal(params: TProposal): Promise<ProposalWithSignature>;

	getProposalHash(proposal: TProposal): Promise<Hex>;

	createMultiProposal(
		proposals: ProposalWithHash[],
	): Promise<ProposalWithSignature[]>;

	acceptProposals(
		proposals: {
			proposalToAccept: ProposalWithSignature;
			acceptor: AddressString;
			creditAmount: bigint;
			creditAsset: ERC20TokenLike;
		}[],
		userAddress: AddressString,
		totalToApprove: {
			[key in UniqueKey]: {
				amount: bigint;
				asset: ERC20TokenLike;
				spender?: AddressString;
			};
		},
	): Promise<
	{
		to: AddressString,
		data: Hex,
	}[]
	>;

	getReadCollateralAmount(
		proposal: TProposal,
	): ReadContractsParameters["contracts"][number];

	encodeProposalData(
		proposal: ProposalWithSignature,
		creditAmount: bigint,
	): Promise<Hex>;
}

export type ProposalContract =
	| IProposalChainLinkContract
	| IProposalElasticContract;

export const getLendingCommonProposalFields = async (
	params: CommonProposalFieldsParams & IProposalMisc,
	deps: {
		contract: ProposalContract;
		loanContract: ILoanContract;
	},
): Promise<ICommonProposalFields> => {
	const {
		user,
		nonce,
		nonceSpace,
		collateral,
		credit,
		creditAmount,
		utilizedCreditId,
		durationOrDate,
		apr,
		expiration,
		loanContract,
		relatedStrategyId,
		sourceOfFunds,
		isOffer,
	} = params;

	const proposerSpecHash = isOffer
		? await deps.loanContract.getLenderSpecHash(
				{
					sourceOfFunds: sourceOfFunds ?? user.address,
				},
				params.collateral.chainId,
			)
		: ZERO_FINGERPRINT;

	const creditAddress = isPoolToken(credit)
		? credit.underlyingAddress
		: credit.address;

	const aprValue =
		(typeof apr !== "number" &&
			apr[getUniqueCreditCollateralKey(credit, collateral)]) ||
		(apr as number);

	return {
		nonce,
		nonceSpace,

		collateralAddress: collateral.address,
		collateralCategory: collateral.category,
		collateralId: 0n, // because it's erc20 everywhere just yet

		checkCollateralStateFingerprint: false,
		collateralStateFingerprint: ZERO_FINGERPRINT,

		creditAddress,
		availableCreditLimit: creditAmount,

		utilizedCreditId,
		durationOrDate,

		allowedAcceptor: ZERO_ADDRESS,
		proposer: user.address,
		proposerSpecHash,

		refinancingLoanId: 0n, // creating new loan

		fixedInterestAmount: 0n,
		accruingInterestAPR: aprValue,

		expiration,
		isOffer: true,
		loanContract,

		relatedStrategyId,
		sourceOfFunds,
	};
};
