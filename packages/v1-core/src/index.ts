import { makeProposals } from "./actions/make-proposals.js";
import * as addresses from "./addresses.js";
import type { ChainLinkElasticProposalDeps } from "./factories/create-chain-link-proposal.js";
import { ChainLinkProposalStrategy } from "./factories/create-chain-link-proposal.js";
import {
	createElasticProposal,
	createElasticProposalBatch,
} from "./factories/create-elastic-proposal.js";
import { ElasticProposalStrategy } from "./factories/create-elastic-proposal.js";
import type { ElasticProposal } from "./models/proposals/elastic-proposal.js";
import { ProposalType } from "./models/proposals/proposal-base.js";
import type {
	ProposalWithHash,
	ProposalWithSignature,
} from "./models/strategies/types.js";

export * from "./models/terms.js";
export * from "./models/strategies/types.js";
export * from "./models/proposals/index.js";
export * from "./models/strategies/index.js"; // unused

export * from "./factories/create-elastic-proposal.js";
export * from "./factories/create-chain-link-proposal.js";
export * from "./factories/types.js";
export * from "./factories/helpers.js";
export * from "./factories/constants.js";

export * from "./views/get-user-with-nonce.js";
export * from "./views/get-strategies.js";
export * from "./views/get-proposals-by-strategy.js";
export * from "./views/get-strategy.js";

export * from "./actions/make-proposal.js";
export * from "./actions/make-proposals.js";
export * from "./actions/revoke-proposals.js";

export * from "./generated.js";
export * from "./utils/index.js";

export * from "./api.js";
export * from "./abi.js";

export * from "./contracts/index.js";

export const strategies = {
	elastic: ElasticProposalStrategy,
	chainlink: ChainLinkProposalStrategy,
};

// Export wallet assets functionality
export {
	getWalletAssetsFromEvents,
	type WalletAssets,
} from "./utils/get-wallet-assets-from-events.js";
export * from "./hooks/use-wallet-assets-from-events.js";
export {
	AssetStorage,
	type AssetType,
	type AssetKey,
} from "./utils/pmt-storage.js";
export {
	erc20Abi,
	erc721Abi,
} from "./utils/abis.js";

export type {
	ElasticProposal,
	ProposalWithHash,
	ProposalWithSignature,
	ChainLinkElasticProposalDeps,
};

export {
	addresses,
	createElasticProposal,
	createElasticProposalBatch,
	makeProposals,
	ProposalType,
};
