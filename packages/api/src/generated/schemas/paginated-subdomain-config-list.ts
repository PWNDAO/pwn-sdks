/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { PaginatedSubdomainConfigListNext } from './paginated-subdomain-config-list-next';
import type { PaginatedSubdomainConfigListPrevious } from './paginated-subdomain-config-list-previous';
import type { SubdomainConfig } from './subdomain-config';

export interface PaginatedSubdomainConfigList {
  count?: number;
  next?: PaginatedSubdomainConfigListNext;
  previous?: PaginatedSubdomainConfigListPrevious;
  results?: SubdomainConfig[];
}
