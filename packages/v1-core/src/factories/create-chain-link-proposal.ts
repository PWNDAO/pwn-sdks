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
  AddressString,
  Token,
} from '@pwndao/sdk-core';
import { ChainLinkProposal } from '../models/proposals/chainlink-proposal.js';
import { getLoanContractAddress, SupportedChain } from '@pwndao/sdk-core';
import { type ChainsWithChainLinkFeedSupport, convertNameIntoDenominator, FEED_REGISTRY, isExistBasePair, WETH } from '../constants.js';
import type { IProposalChainLinkContract } from 'src/contracts/chain-link-proposal-contract.js';
import { MIN_CREDIT_CALCULATION_DENOMINATOR } from './constants.js';

export const getFeedData = (
  chainId: ChainsWithChainLinkFeedSupport, 
  base: AddressString, // collateral asset
  quote: AddressString, // credit asset
): { feedIntermediaryDenominations: AddressString[], feedInvertFlags: boolean[] } | null => {
  if (base === quote) {
    return null
  }

  const baseFeeds = FEED_REGISTRY?.[chainId]?.[base]
  const quoteFeeds = FEED_REGISTRY?.[chainId]?.[quote]

  if ((!baseFeeds?.length && base !== WETH[chainId]) || (!quoteFeeds?.length && quote !== WETH[chainId])) {
    return null
  }

  // check for 0 hop route if it's weth
  if (base === WETH[chainId]) {
    // we checking if exists ETH feed for quote
    const isExistDirectEthFeed = quoteFeeds.some(feed => feed === 'ETH')
    if (isExistDirectEthFeed) {
      if (isExistDirectEthFeed) {
        return {
          feedIntermediaryDenominations: [],
          feedInvertFlags: [false],
        }
      }
    }
  } else if (quote === WETH[chainId]) {
    // we checking if exists ETH feed for base
    const isExistDirectEthFeed = baseFeeds.some(feed => feed === 'ETH')
    if (isExistDirectEthFeed) {
      return {
        feedIntermediaryDenominations: [],
        feedInvertFlags: [true],
      }
    }
  }

  console.log('here')

  // Check for direct route (1-hop)
  const commonFeed = baseFeeds.find(_baseFeed => quoteFeeds.includes(_baseFeed))
  if (chainId === SupportedChain.Base) {
    console.log('commonFeed', commonFeed)
  }
  if (commonFeed) {
    return {
      feedIntermediaryDenominations: [convertNameIntoDenominator(commonFeed)],
      feedInvertFlags: [false, true],
    }
  }

  // TODO check that the invert flags values are always correct
  // e.g. check for 2-hop route
  for (const quoteFeed of quoteFeeds) {
    for (const baseFeed of baseFeeds) {
      // TODO is this correct or we also need to test some diifferent combination?
      const _isExistBasePair = isExistBasePair(chainId, quoteFeed, baseFeed)
      console.log('isExistBasePair', _isExistBasePair)
      console.log('quoteFeed', quoteFeed)
      console.log('baseFeed', baseFeed)
      if (_isExistBasePair?.found) {
        // TODO check if does not match also non inverted to have the algo deterministic?
        return {
          feedIntermediaryDenominations: [convertNameIntoDenominator(quoteFeed), convertNameIntoDenominator(baseFeed)],
          feedInvertFlags: [false, _isExistBasePair.isInverted, true]
        }
      } 
    }
  }

  // TODO should we throw an error here?
  return null
}

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

    // TODO is this correct?
    const ltvWithDecimals = BigInt(ltv * 100)

    const feedData = getFeedData(params.collateral.chainId as ChainsWithChainLinkFeedSupport, params.collateral.address, params.credit.address)
    if (!feedData) {
      // TODO should we throw an error here? probably yes?
      // TODO is this fine or we should use invariant or something?
      throw new Error("We did not find a suitable price feed. Create classic elastic proposal instead.")
    }

		const minCreditAmount =
			(BigInt(params.minCreditAmountPercentage) * params.creditAmount) / BigInt(MIN_CREDIT_CALCULATION_DENOMINATOR);

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
        loanToValue: ltvWithDecimals,
        minCreditAmount,
        chainId: params.collateral.chainId,
      },
      params.collateral.chainId
    );
  }

  getProposalsParams(
    user: UserWithNonceManager,
    creditAmount: bigint,
    utilizedCreditId: Hex
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
					isOffer: this.term.isOffer,
				});
			}
		}

    return result;
  }

  async createLendingProposals(
    user: UserWithNonceManager,
    creditAmount: bigint,
    utilizedCreditId: Hex
  ): Promise<ChainLinkProposal[]> {
    const paramsArray = this.getProposalsParams(
      user,
      creditAmount,
      utilizedCreditId
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
		isOffer: params.isOffer,
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
    params.utilizedCreditId
  );
  return proposals[0];
};

/**
 * Parameters for creating a batch of elastic proposals
 */
export type CreateChainLinkElasticProposalBatchParams = {
  terms: Omit<BaseTerm, 'collateral' | 'credit'> & {
    minCreditAmountPercentage: number;
  };
  collateralAssets: Token[];
  creditAssets: Token[];
};

/**
 * Creates multiple elastic proposals in a batch
 *
 * @param params - The parameters for the batch of proposals
 * @param deps - RPC interface and contract
 * @returns Array of created elastic proposals
 */
export const createChainLinkElasticProposalBatch = async (
  params: CreateChainLinkElasticProposalBatchParams,
  deps: ChainLinkElasticProposalDeps
): Promise<ChainLinkProposal[]> => {
  // Create a strategy term with the batch parameters
  const dummyTerm: StrategyTerm = {
    creditAssets: params.creditAssets,
    collateralAssets: params.collateralAssets,
    apr: params.terms.apr,
    durationDays: params.terms.duration.days || 0,
    ltv: params.terms.ltv,
    expirationDays: params.terms.expirationDays,
    // TODO is this correct? previously was here conversion to BigInt
    minCreditAmountPercentage: params.terms.minCreditAmountPercentage,
    // id: '1',
    isOffer: params.terms.isOffer,
    relatedStrategyId: params.terms.relatedStrategyId
  };

  // Create a strategy and generate all proposals
  const strategy = new ChainLinkProposalStrategy(
    dummyTerm,
    deps.contract,
    deps.loanContract,
  );
  const proposals = await strategy.createLendingProposals(
    params.terms.user,
    params.terms.creditAmount,
    params.terms.utilizedCreditId
  );

  return proposals;
};
