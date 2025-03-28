import type { BaseTerm, IServerAPI } from './types.js';
import type { IOracleProposalBase } from '../models/proposals/proposal-base.js';
import type {
  IProposalStrategy,
  StrategyTerm,
} from '../models/strategies/types.js';
import {
  getLendingCommonProposalFields,
  type ILoanContract,
} from './helpers.js';
import type {
  Hex,
  UserWithNonceManager,
} from '@pwndao/sdk-core';
import { ChainLinkProposal } from '../models/proposals/chainlink-proposal.js';
import { getLoanContractAddress } from '@pwndao/sdk-core';
import type { IProposalChainLinkContract } from 'src/contracts/chain-link-proposal-contract.js';
import { type ChainsWithChainLinkFeedSupport, getFeedData } from '../utils/chainlink-feeds.js';
import invariant from 'ts-invariant';

export type CreateChainLinkElasticProposalParams = BaseTerm & {
	minCreditAmountPercentage: number;
};

export class ChainLinkProposalStrategy
  implements IProposalStrategy<IOracleProposalBase>
{
  constructor(
    public term: StrategyTerm ,
    public contract: IProposalChainLinkContract,
    public loanContract: ILoanContract,
  ) {}

  async implementChainLinkProposal(
    params: CreateChainLinkElasticProposalParams,
    contract: IProposalChainLinkContract
  ): Promise<ChainLinkProposal | undefined> {
    // Calculate expiration timestamp
    const expiration = Math.floor(Date.now() / 1000) + params.expirationDays * 24 * 60 * 60;

    // Get duration in seconds or timestamp
    let durationOrDate: number;
    if (params.duration.days !== undefined) {
      durationOrDate = params.duration.days * 24 * 60 * 60;
    } else {
      durationOrDate = Math.floor(params.duration.date.getTime() / 1000);
    }

    const ltv =
      typeof params.ltv === 'object' 
        ? params.ltv[
          `${params.collateral.address}/${params.collateral.chainId}-${params.credit.address}/${params.credit.chainId}`
        ] ?? 0
        : params.ltv;


    const feedData = getFeedData(params.collateral.chainId as ChainsWithChainLinkFeedSupport, params.collateral.address, params.credit.address)
    invariant(feedData, "We did not find a suitable price feed. Create classic elastic proposal instead.")

		const minCreditAmount =
			(BigInt(params.minCreditAmountPercentage) * params.creditAmount) / BigInt(100);

    // Get common proposal fields
    const commonFields = await getLendingCommonProposalFields(
      {
        user: params.user,
        collateral: params.collateral,
        credit: params.credit,
        creditAmount: params.creditAmount,
        utilizedCreditId: params.utilizedCreditId,
        durationOrDate,
        apr: params.apr,
        expiration,
        loanContract: getLoanContractAddress(params.collateral.chainId),
        relatedStrategyId: this.term.relatedStrategyId,
      },
      {
        contract: contract,
        loanContract: this.loanContract,
      }
    );

    // Create and return the ChainLink proposal
    return new ChainLinkProposal(
      {
        ...commonFields,
        feedIntermediaryDenominations: feedData.feedIntermediaryDenominations,
        feedInvertFlags: feedData.feedInvertFlags,
        loanToValue: BigInt(ltv),
        minCreditAmount,
        chainId: params.collateral.chainId,
      },
      params.collateral.chainId
    );
  }

  getProposalsParams(
    user: UserWithNonceManager,
    creditAmount: bigint,
    utilizedCreditId: Hex,
    isOffer: boolean
  ): CreateChainLinkElasticProposalParams[] {
    const result: CreateChainLinkElasticProposalParams[] = [];
    for (const credit of this.term.creditAssets) {
      for (const collateral of this.term.collateralAssets) {
        result.push({
          collateral,
          credit,
          user,
          creditAmount,
          utilizedCreditId,
          apr: this.term.apr,
					duration: {
						days: this.term.durationDays,
						date: undefined,
					},
					ltv: this.term.ltv,
					expirationDays: this.term.expirationDays,
					minCreditAmountPercentage: this.term.minCreditAmountPercentage,
					relatedStrategyId: this.term.id,
					isOffer,
				});
			}
		}

    return result;
  }

  async createLendingProposals(
    user: UserWithNonceManager,
    creditAmount: bigint,
    utilizedCreditId: Hex,
    isOffer: boolean,
  ): Promise<ChainLinkProposal[]> {
    const paramsArray = this.getProposalsParams(
      user,
      creditAmount,
      utilizedCreditId,
      isOffer,
    );
    const result: ChainLinkProposal[] = [];

    const proposals = await Promise.allSettled(
      paramsArray.map(async (params) => {
        try {
          // Use the shared implementation directly
          return await this.implementChainLinkProposal(
            params,
            this.contract,
          );
        } catch (error) {
          console.error('Error creating ChainLink proposal:', error);
          throw error;
        }
      })
    );

    for (const proposal of proposals) {
      if (proposal.status === 'fulfilled' && proposal.value) {
        result.push(proposal.value);
      }
    }

    return result;
  }
}

// TODO create some base interface that contains all the necessary 
//  API deps for e.g. makeProposal / makeProposals functions (and some other shared functions?)?
export interface IProposalChainLinkAPIDeps {
	persistProposal: IServerAPI["post"]["persistProposal"];
	persistProposals: IServerAPI["post"]["persistProposals"];
	updateNonces: IServerAPI["post"]["updateNonce"];
}

export type ChainLinkElasticProposalDeps = {
  api: IProposalChainLinkAPIDeps
  contract: IProposalChainLinkContract;
  loanContract: ILoanContract;
}

export const createChainLinkElasticProposal = async (
  params: CreateChainLinkElasticProposalParams,
  deps: ChainLinkElasticProposalDeps
): Promise<ChainLinkProposal> => {
	// Create a dummy StrategyTerm with just enough data for the strategy to work
	const dummyTerm: StrategyTerm = {
		creditAssets: [params.credit],
		collateralAssets: [params.collateral],
		apr: params.apr,
		durationDays: params.duration.days || 0,
		ltv: params.ltv,
		expirationDays: params.expirationDays,
		minCreditAmountPercentage: params.minCreditAmountPercentage,
		relatedStrategyId: params.relatedStrategyId
	};

  const strategy = new ChainLinkProposalStrategy(
    dummyTerm,
    deps.contract as IProposalChainLinkContract,
    deps.loanContract,
  );
  const proposals = await strategy.createLendingProposals(
    params.user,
    params.creditAmount,
    params.utilizedCreditId,
    params.isOffer
  );
  return proposals[0];
};

/**
 * Parameters for creating a batch of elastic proposals
 */
export type CreateChainLinkElasticProposalBatchParams = CreateChainLinkElasticProposalParams[];

/**
 * Creates multiple elastic proposals in a batch
 *
 * @param params - The parameters for the batch of proposals
 * @param deps - RPC interface and contract
 * @returns Array of created elastic proposals
 */
// TODO do we even need this? or is it enough to handle batches inside of makeProposals?
// export const createChainLinkElasticProposalBatch = async (
//   params: CreateChainLinkElasticProposalBatchParams,
//   deps: ChainLinkElasticProposalDeps
// ): Promise<ChainLinkProposal[]> => {
//   // Create a strategy term with the batch parameters
//   const dummyTerm: StrategyTerm = {
//     creditAssets: params.creditAssets,
//     collateralAssets: params.collateralAssets,
//     apr: params.terms.apr,
//     durationDays: params.terms.duration.days || 0,
//     ltv: params.terms.ltv,
//     expirationDays: params.terms.expirationDays,
//     minCreditAmountPercentage: params.terms.minCreditAmountPercentage,
//     relatedStrategyId: params.terms.relatedStrategyId
//   };

//   // Create a strategy and generate all proposals
//   const strategy = new ChainLinkProposalStrategy(
//     dummyTerm,
//     deps.contract,
//     deps.loanContract,
//   );
//   const proposals = await strategy.createLendingProposals(
//     params.terms.user,
//     params.terms.creditAmount,
//     params.terms.utilizedCreditId,
//     params.terms.isOffer,
//   );

//   return proposals;
// };
