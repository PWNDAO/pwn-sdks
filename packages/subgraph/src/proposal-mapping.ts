// Placeholder for SimpleLoanSimpleProposal contract event handlers
import { type Address, BigInt as BigIntType } from "@graphprotocol/graph-ts";
import type { ProposalMade } from "../generated/PWN_SimpleLoanSimpleProposal/SimpleLoanSimpleProposal";
import { Account, Proposal } from "../generated/schema";

// Helper to get or create an Account entity
function getOrCreateAccount(address: Address): Account {
	let account = Account.load(address);
	if (account == null) {
		account = new Account(address);
		account.save();
	}
	return account;
}

export function handleProposalMade(event: ProposalMade): void {
	const proposalEntityId = event.params.proposalHash.toHex();
	const proposal = new Proposal(proposalEntityId);

	proposal.chainId = BigIntType.fromI32(1); // TODO: Hardcoded Mainnet
	proposal.contractAddress = event.address;
	proposal.borrower = getOrCreateAccount(event.params.proposer).id;

	proposal.collateralType =
		proposal.collateralType === "0"
			? "ERC20"
			: proposal.collateralType === "1"
				? "ERC721"
				: "ERC1155";

	proposal.status = "PENDING";
	proposal.createdAtTimestamp = event.block.timestamp;
	proposal.createdAtBlockNumber = event.block.number;
	proposal.transactionHash = event.transaction.hash;

	proposal.save();
}
