/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { PaginatedSafeListNext } from "./paginated-safe-list-next";
import type { PaginatedSafeListPrevious } from "./paginated-safe-list-previous";
import type { Safe } from "./safe";

export interface PaginatedSafeList {
	count?: number;
	next?: PaginatedSafeListNext;
	previous?: PaginatedSafeListPrevious;
	results?: Safe[];
}
