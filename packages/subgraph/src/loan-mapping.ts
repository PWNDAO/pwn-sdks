// Placeholder for SimpleLoan contract event handlers
import { BigDecimal, BigInt as BigIntType, } from "@graphprotocol/graph-ts";
import { Address } from "@graphprotocol/graph-ts";
import { LOANClaimed, LOANCreated, LOANPaidBack, } from "../generated/PWN_SimpleLoan/SimpleLoan"; // Path to generated code
import { Account, Loan, Proposal } from "../generated/schema";

// Helper to get or create an Account entity
function getOrCreateAccount(address: Address): Account {
	let account = Account.load(address);
	if (account == null) {
		account = new Account(address);
		account.save();
	}
	return account;
}

function findProposalById(proposalId: BigIntType): Proposal {
	let proposal = Proposal.load(proposalId.toString());
	if (proposal == null) {
		proposal = new Proposal(proposalId.toString());
		proposal.save();
	}
	return proposal;
}

export function handleLOANCreated(event: LOANCreated): void {
	// TODO: Implement mapping logic based on LOANCreated event parameters
	// Need to parse the complex nested tuple for proposal details

	const loanEntityId = `${event.address.toHex()}-${event.params.loanId.toString()}`;
	const loan = new Loan(loanEntityId);
	loan.loanId = event.params.loanId;
	loan.chainId = BigIntType.fromI32(1); // TODO: Hardcoded Mainnet
	loan.contractAddress = event.address;

	// Example of accessing nested data (needs verification based on ABI)
	const proposalData = event.params.terms;
	loan.borrower = getOrCreateAccount(proposalData.borrower).id;
	loan.lender = getOrCreateAccount(proposalData.lender).id; // Lender should be set here
	loan.proposal = event.params.proposalHash.toHex(); // Need a way to find the original proposal

	loan.startDate = event.block.timestamp;
	loan.dueDate = event.block.timestamp.plus(proposalData.duration); // Calculate due date as start date + duration
	loan.repaymentAmount = BigDecimal.fromString(
		proposalData.accruingInterestAPR.toString(),
	).times(BigDecimal.fromString(proposalData.credit.amount.toString())); // Need to verify param names

	loan.status = "ACTIVE";
	loan.save();

	// TODO: Update the linked Proposal entity status
}

export function handleLOANPaidBack(event: LOANPaidBack): void {
	const loanEntityId = `${event.address.toHex()}-${event.params.loanId.toString()}`;
	const loan = Loan.load(loanEntityId);
	if (!loan) return;

	loan.status = "REPAID";
	loan.repaidTimestamp = event.block.timestamp;
	// loan.repaidAmount = ??? // Need event param or contract read
	loan.save();

	// TODO: Update the linked Proposal entity status
}

export function handleLOANClaimed(event: LOANClaimed): void {
	const loanEntityId = `${event.address.toHex()}-${event.params.loanId.toString()}`;
	const loan = Loan.load(loanEntityId);
	if (!loan) return;

	// Logic to determine if this is a liquidation or regular claim
	// Could check event.block.timestamp against loan.dueDate
	// Could check event.params.liquidated flag
	if (event.params.defaulted) {
		loan.status = "DEFAULTED";
		loan.liquidatedTimestamp = event.block.timestamp;
	} else {
		// Handle regular claim if necessary (maybe update status?)
	}
	loan.save();

	// TODO: Update the linked Proposal entity status accordingly
}
