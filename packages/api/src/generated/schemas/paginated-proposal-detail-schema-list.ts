/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { PaginatedProposalDetailSchemaListNext } from './paginated-proposal-detail-schema-list-next';
import type { PaginatedProposalDetailSchemaListPrevious } from './paginated-proposal-detail-schema-list-previous';
import type { ProposalDetailSchema } from './proposal-detail-schema';

export interface PaginatedProposalDetailSchemaList {
  count?: number;
  next?: PaginatedProposalDetailSchemaListNext;
  previous?: PaginatedProposalDetailSchemaListPrevious;
  results?: ProposalDetailSchema[];
}
