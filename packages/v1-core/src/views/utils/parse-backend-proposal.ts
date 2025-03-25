import type { ProposalDetailSchema } from "@pwndao/api-sdk";
import invariant from "ts-invariant";
import {
	ChainLinkProposal,
	ElasticProposal,
	type IElasticProposalBase,
	type IOracleProposalBase,
	ProposalType,
} from "../../models/proposals/index.js";
import type {
	Proposal,
	ProposalWithSignature,
} from "../../models/strategies/types.js";

/**
 * Parse a backend proposal response into the appropriate proposal type
 * @param backendData Backend proposal data
 * @param chainId The blockchain chain ID
 * @returns Typed proposal instance
 */
export const parseBackendProposalResponse = (
	backendData: ProposalDetailSchema,
): ProposalWithSignature => {
	// Convert string values to appropriate types
	const convertedData = {
		...backendData,
		availableCreditLimit: BigInt(backendData.availableCreditLimit || "0"),
		refinancingLoanId: BigInt(backendData.refinancingLoanId || "0"),
		nonceSpace: BigInt(backendData.nonceSpace || "0"),
		nonce: BigInt(backendData.nonce || "0"),
		minCreditAmount: BigInt(backendData.minCreditAmount || "0"),
		fixedInterestAmount: BigInt(
			backendData.creditData.fixedInterestAmount || "0",
		),
		accruingInterestAPR: BigInt(
			backendData.creditData.accruingInterestApr || "0",
		),
		durationOrDate: BigInt(backendData.duration || "0"),
		signature: backendData.signature,
		hash: backendData.hash,
		sourceOfFunds: backendData.sourceOfFunds,
		multiproposalMerkleRoot: backendData.multiproposalMerkleRoot,
		type: backendData.type,
		creditAddress: backendData.creditAsset.address,
		collateralAddress: backendData.collateral.address,
		collateralCategory: backendData.collateral.category,
		collateralId: BigInt(backendData.collateral.tokenId || "0"),
	};

	const chainId = backendData.chainId;

	let proposal: Proposal | null = null;

	// Create the appropriate proposal type
	if (convertedData.type === ProposalType.ChainLink) {
		proposal = new ChainLinkProposal(
			convertedData as unknown as IOracleProposalBase,
			chainId,
		);
	} else if (convertedData.type === ProposalType.Elastic) {
		proposal = new ElasticProposal(
			{
				...convertedData,
				creditPerCollateralUnit: BigInt(
					(convertedData.creditData.creditPerCollateralUnit as string) || "0",
				),
			} as unknown as IElasticProposalBase,
			chainId,
		);
	}

	invariant(proposal, "Unknown proposal type from backend data");

	Object.assign(proposal, {
		hash: convertedData.hash,
		signature: convertedData.signature,
		chainId: chainId,
		sourceOfFunds: convertedData.sourceOfFunds,
		multiproposalMerkleRoot: convertedData.multiproposalMerkleRoot,
		proposalContract: convertedData.proposalContractAddress,
		loanContract: convertedData.loanContract,
	});

	return proposal as ProposalWithSignature;
};
