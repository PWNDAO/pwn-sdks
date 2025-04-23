import { ChainLinkProposalStrategy } from "./factories/create-chain-link-proposal.js";
import { ElasticProposalStrategy } from "./factories/create-elastic-proposal.js";

// Models
export * from "./models/terms.js";
export * from "./models/strategies/types.js";
export * from "./models/proposals/index.js";
export * from "./models/strategies/index.js"; // unused

// Factories
export * from "./factories/create-elastic-proposal.js";
export * from "./factories/create-chain-link-proposal.js";
export * from "./factories/types.js";
export * from "./factories/helpers.js";
export * from "./factories/constants.js";

// Views
export * from "./views/get-user-with-nonce.js";
export * from "./views/get-strategies.js";
export * from "./views/get-proposals-by-strategy.js";
export * from "./views/get-strategy.js";

// Actions
export * from "./actions/make-proposal.js";
export * from "./actions/make-proposals.js";
export * from "./actions/revoke-proposals.js";
export * from "./actions/accept-proposal.js";
export * from "./actions/repay-loan.js";
export * from "./actions/types.js";

// Utilities
export * from "./generated.js";
export * from "./utils/index.js";
export * from "./api.js";
export * from "./abi.js";

// Contracts
export * from "./contracts/index.js";

// Strategy objects
export const strategies = {
	elastic: ElasticProposalStrategy,
	chainlink: ChainLinkProposalStrategy,
};
