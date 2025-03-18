import type { LendingProposalTermSuggestionApy } from "./lending-proposal-term-suggestion-apy";
import type { LendingProposalTermSuggestionLiquid } from "./lending-proposal-term-suggestion-liquid";
import type { LendingProposalTermSuggestionLocked } from "./lending-proposal-term-suggestion-locked";
import type { LendingProposalTermSuggestionNumberOfHolders } from "./lending-proposal-term-suggestion-number-of-holders";
/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { LendingProposalTermSuggestionTvl } from "./lending-proposal-term-suggestion-tvl";

export interface LendingProposalTermSuggestion {
	name: string;
	address: string;
	protocol: string;
	tvl: LendingProposalTermSuggestionTvl;
	liquid: LendingProposalTermSuggestionLiquid;
	locked: LendingProposalTermSuggestionLocked;
	numberOfHolders: LendingProposalTermSuggestionNumberOfHolders;
	apy: LendingProposalTermSuggestionApy;
}
