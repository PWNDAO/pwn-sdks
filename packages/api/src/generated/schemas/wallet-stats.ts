/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { WalletStatsNextLentLoanDefault } from './wallet-stats-next-lent-loan-default';
import type { WalletStatsNextBorrowedLoanDefault } from './wallet-stats-next-borrowed-loan-default';
import type { WalletStatsLoans } from './wallet-stats-loans';
import type { WalletStatsOffers } from './wallet-stats-offers';

export interface WalletStats {
  total_lent: number;
  total_lent_value_usd: string;
  total_lent_value_eth: string;
  total_borrowed: number;
  total_borrowed_value_usd: string;
  total_borrowed_value_eth: string;
  total_earned: number;
  total_earned_value_usd: string;
  total_earned_value_eth: string;
  active_lent_loans: number;
  active_lent_loans_value_usd: string;
  active_lent_loans_value_eth: string;
  active_borrowed_loans: number;
  active_borrowed_loans_value_usd: string;
  active_borrowed_loans_value_eth: string;
  defaulted_lent_loans: number;
  defaulted_lent_loans_value_usd: string;
  defaulted_lent_loans_value_eth: string;
  defaulted_borrowed_loans: number;
  defaulted_borrowed_loans_value_usd: string;
  defaulted_borrowed_loans_value_eth: string;
  paid_back_lent_loans: number;
  paid_back_lent_loans_value_usd: string;
  paid_back_lent_loans_value_eth: string;
  paid_back_borrowed_loans: number;
  paid_back_borrowed_loans_value_usd: string;
  paid_back_borrowed_loans_value_eth: string;
  total_requests: number;
  total_requests_value_usd: string;
  total_requests_value_eth: string;
  next_lent_loan_default?: WalletStatsNextLentLoanDefault;
  next_borrowed_loan_default?: WalletStatsNextBorrowedLoanDefault;
  loans?: WalletStatsLoans;
  offers?: WalletStatsOffers;
}
