/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */

export type ThesisListParams = {
	chain_id?: number;
	curator?: string;
	/**
	 * Number of results to return per page.
	 */
	limit?: number;
	/**
	 * The initial index from which to return the results.
	 */
	offset?: number;
	user_address?: string;
};
