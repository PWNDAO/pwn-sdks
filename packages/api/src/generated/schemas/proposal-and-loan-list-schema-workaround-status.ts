/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import { ProposalStatus } from './proposal-status';
import { LoanStatus } from './loan-status';

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ProposalAndLoanListSchemaWorkaroundStatus = {
  ...ProposalStatus,
  ...LoanStatus,
} as const;
