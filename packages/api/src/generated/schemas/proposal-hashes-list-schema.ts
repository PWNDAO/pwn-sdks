/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */

export interface ProposalHashesListSchema {
	/**
	 * @minLength 66
	 * @maxLength 66
	 * @pattern 0x[0-9A-Fa-f]{64,64}
	 */
	multiproposal_merkle_root: string;
	proposal_hashes: string[];
}
