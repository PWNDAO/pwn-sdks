/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { WalletStatsBreakdownTotal } from './wallet-stats-breakdown-total';
import type { WalletStatsBreakdownActive } from './wallet-stats-breakdown-active';
import type { WalletStatsBreakdownDefaulted } from './wallet-stats-breakdown-defaulted';
import type { WalletStatsBreakdownPaid } from './wallet-stats-breakdown-paid';
import type { WalletStatsBreakdownExpired } from './wallet-stats-breakdown-expired';
import type { WalletStatsBreakdownNextDefaultOrExpiration } from './wallet-stats-breakdown-next-default-or-expiration';
import type { WalletStatsBreakdownClosestDefaultChainId } from './wallet-stats-breakdown-closest-default-chain-id';
import type { WalletStatsBreakdownClosestDefaultOnChainId } from './wallet-stats-breakdown-closest-default-on-chain-id';
import type { WalletStatsBreakdownClosestDefaultLoanTokenContractAddress } from './wallet-stats-breakdown-closest-default-loan-token-contract-address';

export interface WalletStatsBreakdown {
  total?: WalletStatsBreakdownTotal;
  active?: WalletStatsBreakdownActive;
  defaulted?: WalletStatsBreakdownDefaulted;
  paid?: WalletStatsBreakdownPaid;
  expired?: WalletStatsBreakdownExpired;
  nextDefaultOrExpiration?: WalletStatsBreakdownNextDefaultOrExpiration;
  closestDefaultChainId?: WalletStatsBreakdownClosestDefaultChainId;
  closestDefaultOnChainId?: WalletStatsBreakdownClosestDefaultOnChainId;
  closestDefaultLoanTokenContractAddress?: WalletStatsBreakdownClosestDefaultLoanTokenContractAddress;
}
