import type {
	AddressString,
	Hex,
	SupportedChain,
	Token,
	UserWithNonceManager,
} from "@pwndao/sdk-core";
import { ZERO_ADDRESS, ZERO_FINGERPRINT } from "@pwndao/sdk-core";
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
import type { IProposalChainLinkContract } from "./create-chain-link-proposal.js";
import type { IProposalElasticContract } from "./create-elastic-proposal.js";

type CommonProposalFieldsParams = {
	user: UserWithNonceManager;
	collateral: Token;
	credit: Token;
	creditAmount: bigint;
	utilizedCreditId: Hex;
	durationOrDate: number;
	apr: number | Record<string, number>;
	expiration: number;
	loanContract: AddressString;
};

export interface IProposalContract {
	getProposerSpec(params: ILenderSpec, chainId: SupportedChain): Promise<Hex>;
	createProposal(params: Proposal): Promise<ProposalWithSignature>;
	getProposalHash(proposal: Proposal): Promise<Hex>;
	createMultiProposal(proposals: ProposalWithHash[]): Promise<ProposalWithSignature[]>;
}

export type ProposalContract =
	| IProposalChainLinkContract
	| IProposalElasticContract;

export const getLendingCommonProposalFields = async (
	params: CommonProposalFieldsParams & IProposalMisc,
	deps: {
		contract: ProposalContract;
	},
): Promise<ICommonProposalFields> => {
	const {
		user,
		collateral,
		credit,
		creditAmount,
		utilizedCreditId,
		durationOrDate,
		apr,
		expiration,
		loanContract,
		relatedStrategyId,
	} = params;

	const proposerSpecHash = await deps.contract.getProposerSpec(
		{
			sourceOfFunds: user.address,
		},
		params.collateral.chainId,
	);

	const aprValue =
		(typeof apr !== "number" &&
			apr[
				`${collateral.address}/${collateral.chainId}-${credit.address}/${credit.chainId}`
			]) ||
		(apr as number);

	const interestAmount = creditAmount * (BigInt(aprValue) / BigInt(1e2));

	return {
		nonce: user.getNextNonce(params.collateral.chainId),
		nonceSpace: user.getNonceSpace(params.collateral.chainId),

		collateralAddress: collateral.address,
		collateralCategory: collateral.category,
		collateralId: 0n, // because it's erc20 everywhere just yet

		checkCollateralStateFingerprint: false,
		collateralStateFingerprint: ZERO_FINGERPRINT,

		creditAddress: credit.address,
		availableCreditLimit: creditAmount,

		utilizedCreditId,
		durationOrDate,

		allowedAcceptor: ZERO_ADDRESS,
		proposer: user.address,
		proposerSpecHash,

		refinancingLoanId: 0n, // creating new loan

		fixedInterestAmount: interestAmount,
		accruingInterestAPR: aprValue,

		expiration,
		isOffer: true,
		loanContract,

		relatedStrategyId,
	};
};
