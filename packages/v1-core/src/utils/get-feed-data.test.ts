import { SupportedChain, type AddressString, generateAddress } from '@pwndao/sdk-core';
import { convertNameIntoDenominator, FEED_REGISTRY, getFeedData, CHAINS_WITH_CHAINLINK_FEED_SUPPORT } from './chainlink-feeds.js';
import type { AllowedQuotes, ChainsWithChainLinkFeedSupport } from './chainlink-feeds.js';
import { DAI, ezETH, LBTC, PYUSD, stETH, sUSDe, tBTC, USDC, USDT, WBTC, weETH, WETH } from '../addresses.js';

describe('getFeedData', () => {
  const testFeedData = (
    _name: string,
    chainId: SupportedChain,
    collateral: AddressString,
    credit: AddressString,
    expectedDenominations: string[],
    expectedInvertFlags: boolean[]
  ) => {
    if (!CHAINS_WITH_CHAINLINK_FEED_SUPPORT.includes(chainId as ChainsWithChainLinkFeedSupport)) {
      throw new Error(`Chain ${chainId} does not support ChainLink feeds`);
    }
    
    const result = getFeedData(chainId as ChainsWithChainLinkFeedSupport, collateral, credit);

    expect(result).toBeDefined();
    expect(result?.feedIntermediaryDenominations).toHaveLength(expectedDenominations.length);
    expect(result?.feedInvertFlags).toHaveLength(expectedInvertFlags.length);
    
    expectedDenominations.forEach((denom, index) => {
      expect(result?.feedIntermediaryDenominations[index]).toBe(
        convertNameIntoDenominator(denom as AllowedQuotes<ChainsWithChainLinkFeedSupport>)
      );
    });

    expectedInvertFlags.forEach((flag, index) => {
      expect(result?.feedInvertFlags[index]).toBe(flag);
    });
  };

  describe('0 hops', () => {
    it.each([
      [
        'USDC->ETH==WETH',
        SupportedChain.Ethereum,
        WETH[SupportedChain.Ethereum],
        USDC[SupportedChain.Ethereum],
        [],
        [false]
      ],
      [
        'WETH==ETH->USDC',
        SupportedChain.Ethereum,
        USDC[SupportedChain.Ethereum],
        WETH[SupportedChain.Ethereum],
        [],
        [true]
      ],
      [
        'WETH to token with both USD and ETH feeds (stETH) should use ETH feed',
        SupportedChain.Ethereum,
        stETH[SupportedChain.Ethereum],
        WETH[SupportedChain.Ethereum],
        [],
        [true]
      ],
      [
        'WETH to token with both USD and ETH feeds (stETH) should use ETH feed',
        SupportedChain.Ethereum,
        WETH[SupportedChain.Ethereum],
        stETH[SupportedChain.Ethereum],
        [],
        [false]
      ],
    ])('%s route', testFeedData)
  })

  describe('1 hop', () => {
    it.each([
      [
        'DAI->ETH->weETH',
        SupportedChain.Ethereum,
        weETH[SupportedChain.Ethereum],
        DAI[SupportedChain.Ethereum],
        ['ETH'],
        [false, true]
      ],
      [
        'tBTC->USD->ETH==WETH',
        SupportedChain.Ethereum,
        WETH[SupportedChain.Ethereum],
        tBTC[SupportedChain.Ethereum],
        ['USD'],
        [false, true]
      ],
      [
        'WETH==ETH->USD->tBTC',
        SupportedChain.Ethereum,
        tBTC[SupportedChain.Ethereum],
        WETH[SupportedChain.Ethereum],
        ['USD'],
        [false, true]
      ],
      [
        'WBTC->BTC->WETH==ETH',
        SupportedChain.Ethereum,
        WETH[SupportedChain.Ethereum],
        WBTC[SupportedChain.Ethereum],
        ['BTC'],
        [false, true]
      ],
      [
        'PYUSD->USD->WETH==ETH',
        SupportedChain.Ethereum,
        WETH[SupportedChain.Ethereum],
        PYUSD[SupportedChain.Ethereum],
        ['USD'],
        [false, true]
      ],
      [
        'USDC->ETH->stETH',
        SupportedChain.Ethereum,
        stETH[SupportedChain.Ethereum],
        USDC[SupportedChain.Ethereum],
        ['ETH'],
        [false, true]
      ],
      [
        'USDC->ETH->stETH',
        SupportedChain.Sepolia,
        USDC[SupportedChain.Sepolia],
        DAI[SupportedChain.Sepolia],
        ['USD'],
        [false, true]
      ],
    ])('%s route', testFeedData)
  });

  describe('shortest path finding', () => {
    it.each([
      [
        'WBTC->USD vs WBTC->BTC->USD (should use direct USD)',
        SupportedChain.Arbitrum,
        USDC[SupportedChain.Arbitrum],
        WBTC[SupportedChain.Arbitrum],
        ['USD'],
        [false, true]
      ],
      [
        'stETH->ETH vs stETH->USD->ETH (should use direct ETH)',
        SupportedChain.Ethereum,
        WETH[SupportedChain.Ethereum],
        stETH[SupportedChain.Ethereum],
        [],
        [false]
      ],
      [
        'USDT->ETH vs USDT->USD->ETH (should use direct ETH)',
        SupportedChain.Ethereum,
        WETH[SupportedChain.Ethereum],
        USDT[SupportedChain.Ethereum],
        [],
        [false]
      ],
      [
        'DAI->ETH vs DAI->USD->ETH (should use direct ETH)',
        SupportedChain.Ethereum,
        WETH[SupportedChain.Ethereum],
        DAI[SupportedChain.Ethereum],
        [],
        [false]
      ],
      [
        'WBTC->BTC->ETH vs WBTC->USD->ETH (should use BTC->ETH as its in NATIVE_PAIRS)',
        SupportedChain.Ethereum,
        WETH[SupportedChain.Ethereum],
        WBTC[SupportedChain.Ethereum],
        ['BTC'],
        [false, true]
      ],
    ])('%s', testFeedData);
  });

  describe('2-hop routes', () => {
    it.each([
      [
        'PYUSD->USD->BTC->LBTC',
        SupportedChain.Ethereum,
        LBTC[SupportedChain.Ethereum],
        PYUSD[SupportedChain.Ethereum],
        ['USD', 'BTC'],
        [false, true, true]
      ],
      [
        'LBTC->BTC->ETH->stETH',
        SupportedChain.Ethereum,
        stETH[SupportedChain.Ethereum],
        LBTC[SupportedChain.Ethereum],
        ['BTC', 'ETH'],
        [false, false, true]
      ],
      [
        'LBTC->BTC->ETH->USDC',
        SupportedChain.Ethereum,
        USDC[SupportedChain.Ethereum],
        LBTC[SupportedChain.Ethereum],
        ['BTC', 'ETH'],
        [false, false, true]
      ],
      [
        'WBTC->BTC->ETH->USDT',
        SupportedChain.Ethereum,
        USDT[SupportedChain.Ethereum],
        WBTC[SupportedChain.Ethereum],
        ['BTC', 'ETH'],
        [false, false, true]
      ],
      [
        'USDT->ETH->BTC->WBTC',
        SupportedChain.Ethereum,
        WBTC[SupportedChain.Ethereum],
        USDT[SupportedChain.Ethereum],
        ['ETH', 'BTC'],
        [false, false, true]
      ],
      [
        'LBTC->BTC->USD->ETH==WETH',
        SupportedChain.Base,
        WETH[SupportedChain.Base],
        LBTC[SupportedChain.Base],
        ['BTC', 'USD'],
        [false, false, true]
      ]
    ])('%s route', testFeedData)
  });

  describe('3-hop routes', () => {
    it.each([
      [
        'LBTC->BTC->USD->ETH->ezETH',
        SupportedChain.Base,
        ezETH[SupportedChain.Base],
        LBTC[SupportedChain.Base],
        ['BTC', 'USD', 'ETH'],
        [false, false, true, true]
      ],
      [
        'ezETH->ETH->BTC->LBTC',
        SupportedChain.Base,
        LBTC[SupportedChain.Base],
        ezETH[SupportedChain.Base],
        ['ETH', 'USD', 'BTC'],
        [false, false, true, true]
      ]
    ])('%s route', testFeedData)
  });

  describe('edge cases', () => {
    it.each([
      [
        'same asset feeds',
        SupportedChain.Ethereum,
        PYUSD[SupportedChain.Ethereum],
        PYUSD[SupportedChain.Ethereum]
      ],
      [
        'non-existent token',
        SupportedChain.Ethereum,
        generateAddress(),
        PYUSD[SupportedChain.Ethereum]
      ],
      [
        'unsupported chain token',
        SupportedChain.Ethereum,
        generateAddress(),
        PYUSD[SupportedChain.Ethereum]
      ],
      // TODO is there any case where there is too much hops (more than 4)?
    ])(
      'should return null for %s',
      (
        _name,
        chainId,
        collateral,
        credit
      ) => {
        const result = getFeedData(
          chainId as ChainsWithChainLinkFeedSupport,
          collateral,
          credit
        );
        
        expect(result).toBeNull();
      }
    );

    it('should handle undefined registry entries', () => {
      const originalRegistry = { ...FEED_REGISTRY };
      // @ts-expect-error - intentionally setting undefined for test
      FEED_REGISTRY[SupportedChain.Ethereum] = undefined;

      const result = getFeedData(
        SupportedChain.Ethereum,
        LBTC[SupportedChain.Ethereum] as AddressString,
        PYUSD[SupportedChain.Ethereum] as AddressString
      );
      
      expect(result).toBeNull();

      // Cleanup
      // @ts-expect-error - intentionally setting undefined for test
      FEED_REGISTRY[SupportedChain.Ethereum] = originalRegistry[SupportedChain.Ethereum];
    });

    it('should handle empty feed arrays', () => {
      const originalRegistry = { ...FEED_REGISTRY };
      // @ts-expect-error - intentionally setting empty arrays for test
      FEED_REGISTRY[SupportedChain.Ethereum] = {
        [LBTC[SupportedChain.Ethereum]]: [],
        [PYUSD[SupportedChain.Ethereum]]: []
      };

      const result = getFeedData(
        SupportedChain.Ethereum,
        LBTC[SupportedChain.Ethereum] as AddressString,
        PYUSD[SupportedChain.Ethereum] as AddressString
      );
      
      expect(result).toBeNull();

      // Cleanup
      // @ts-expect-error - intentionally setting empty arrays for test
      FEED_REGISTRY[SupportedChain.Ethereum] = originalRegistry[SupportedChain.Ethereum];
    });
  });
});