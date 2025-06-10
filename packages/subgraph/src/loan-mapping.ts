import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { LOANClaimed, LOANCreated, LOANPaidBack, LOANCreatedTermsCollateralStruct, LOANCreatedTermsCreditStruct, LOANExtended } from "../generated/SimpleLoan/SimpleLoan"; // Path to generated code
import { Account, Asset, Loan } from "../generated/schema";

// Helper to get or create an Account entity
function getOrCreateAccount(address: Address): Account {
	let account = Account.load(address);
	if (account == null) {
		account = new Account(address);
		account.save();
	}
	return account;
}

function getOrCreateCollateralAsset(asset: LOANCreatedTermsCollateralStruct): Asset {
	const assetEntityId = `${asset.assetAddress.toHex()}-${asset.id.toString()}`;
	let collateralAsset = Asset.load(assetEntityId);
	if (collateralAsset == null) {
		collateralAsset = new Asset(assetEntityId);
		collateralAsset.category = asset.category;
		collateralAsset.assetAddress = asset.assetAddress;
		collateralAsset.assetId = asset.id;
		collateralAsset.amount = new BigDecimal(asset.amount);
		collateralAsset.save();
	}
	return collateralAsset;
}

function getOrCreateCreditAsset(asset: LOANCreatedTermsCreditStruct): Asset {
	const assetEntityId = `${asset.assetAddress.toHex()}-${asset.id.toString()}`;
	let creditAsset = Asset.load(assetEntityId);
	if (creditAsset == null) {
		creditAsset = new Asset(assetEntityId);
		creditAsset.category = asset.category;
		creditAsset.assetAddress = asset.assetAddress;
		creditAsset.assetId = asset.id;
		creditAsset.amount = new BigDecimal(asset.amount);
		creditAsset.save();
	}
	return creditAsset;
}

// Helper function to check if a loan should be considered defaulted based on time
function isLoanDefaulted(loan: Loan, currentTimestamp: BigInt): boolean {
	// Only check for default if loan is still active
	if (loan.status != "Active") {
		return false;
	}
	
	// Calculate default deadline: createdAt + duration
	const defaultDeadline = loan.createdAt.plus(loan.duration);
	
	// Loan is defaulted if current time is past the deadline
	return currentTimestamp.gt(defaultDeadline);
}

// Helper function to update loan status based on time
function updateLoanStatusIfDefaulted(loan: Loan, currentTimestamp: BigInt): void {
	if (isLoanDefaulted(loan, currentTimestamp)) {
		loan.status = "Defaulted";
	}
}

// Helper function to check and update multiple loans for defaults
// This can be called from any event handler to update loan statuses
function checkAndUpdateLoansForDefaults(currentTimestamp: BigInt, loanIds: string[]): void {
	for (let i = 0; i < loanIds.length; i++) {
		const loan = Loan.load(loanIds[i]);
		if (loan && loan.status == "Active") {
			updateLoanStatusIfDefaulted(loan, currentTimestamp);
			loan.save();
		}
	}
}

export function handleLOANCreated(event: LOANCreated): void {
	const loanEntityId = `${event.address.toHex()}-${event.params.loanId.toString()}`;
	const loan = new Loan(loanEntityId);

	loan.loanId = event.params.loanId;
	loan.proposalHash = event.params.proposalHash;
	loan.contractAddress = event.address;
	loan.proposalContract = event.params.proposalContract;

	const terms = event.params.terms;

	loan.borrower = getOrCreateAccount(terms.borrower).id;
	loan.lender = getOrCreateAccount(terms.lender).id;

	loan.createdAt = event.block.timestamp;

	// terms setting
	loan.duration = terms.duration;
	// Calculate and store the default deadline for easier querying
	// loan.defaultDeadline = event.block.timestamp.plus(terms.duration); // Uncomment after codegen
	loan.collateral = getOrCreateCollateralAsset(terms.collateral).id;
	loan.credit = getOrCreateCreditAsset(terms.credit).id;

	loan.status = "Active";

	loan.extra = event.params.extra;

	loan.save();

}

export function handleLOANPaidBack(event: LOANPaidBack): void {
	const loanEntityId = `${event.address.toHex()}-${event.params.loanId.toString()}`;
	const loan = Loan.load(loanEntityId);
	if (!loan) return;

	loan.status = "Repaid";
	loan.save();

	// TODO: Update the linked Proposal entity status
}

// Updated function to handle both explicit defaults and time-based defaults
export function handleLOANClaimed(event: LOANClaimed): void {
	const loanEntityId = `${event.address.toHex()}-${event.params.loanId.toString()}`;
	const loan = Loan.load(loanEntityId);
	if (!loan) return;

	if (event.params.defaulted) {
		loan.status = "Defaulted";
	} else {
		// Even if not explicitly defaulted, check if it should be considered defaulted based on time
		updateLoanStatusIfDefaulted(loan, event.block.timestamp);
	}

	loan.save();
}

// New handler for loan extensions - this updates the default deadline
export function handleLOANExtended(event: LOANExtended): void {
	const loanEntityId = `${event.address.toHex()}-${event.params.loanId.toString()}`;
	const loan = Loan.load(loanEntityId);
	if (!loan) return;

	// Update the duration to reflect the extension
	// The new default deadline is the extendedDefaultTimestamp
	const originalDeadline = loan.createdAt.plus(loan.duration);
	const extensionDuration = event.params.extendedDefaultTimestamp.minus(originalDeadline);
	loan.duration = loan.duration.plus(extensionDuration);
	
	// Update default deadline if the field is available after codegen
	// loan.defaultDeadline = event.params.extendedDefaultTimestamp;

	loan.save();
}
