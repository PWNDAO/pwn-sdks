import type {
	AddressString,
	Hex,
	SupportedChain,
	Token,
	UserWithNonceManager,
} from "@pwndao/sdk-core";
import {
	ZERO_ADDRESS,
	ZERO_FINGERPRINT,
	getUniqueCreditCollateralKey,
	isPoolToken,
} from "@pwndao/sdk-core";
import type { IProposalChainLinkContract } from "../contracts/chain-link-proposal-contract.js";
import type { IProposalElasticContract } from "../contracts/elastic-proposal-contract.js";
import type { IServerAPI } from "../factories/types.js";
import type {
	ICommonProposalFields,
	IProposalMisc,
} from "../models/proposals/proposal-base.js";
import type { ProposalWithHash, ProposalWithSignature } from "../models/strategies/types.js";
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
	createProposal(
		params: TProposal,
		deps: { persistProposal: IServerAPI["post"]["persistProposal"] },
	): Promise<ProposalWithSignature>;
	createOnChainProposal(params: TProposal): Promise<ProposalWithSignature>;
	getProposalHash(proposal: TProposal): Promise<Hex>;
	createMultiProposal(proposals: ProposalWithHash[]): Promise<ProposalWithSignature[]>;
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
	} = params;

	const proposerSpecHash = await deps.loanContract.getLenderSpecHash(
		{
			sourceOfFunds: isPoolToken(credit) ? credit.address : user.address,
		},
		params.collateral.chainId,
	);

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
