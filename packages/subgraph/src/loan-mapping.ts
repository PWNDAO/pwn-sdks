import { Address, BigDecimal } from "@graphprotocol/graph-ts";
import { LOANClaimed, LOANCreated, LOANPaidBack, LOANCreatedTermsCollateralStruct, LOANCreatedTermsCreditStruct } from "../generated/PWN_SimpleLoan/SimpleLoan"; // Path to generated code
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
	loan.collateral = getOrCreateCollateralAsset(terms.collateral).id;
	loan.credit = getOrCreateCreditAsset(terms.credit).id;

	loan.status = "ACTIVE";

	loan.extra = event.params.extra;

	loan.save();

}

export function handleLOANPaidBack(event: LOANPaidBack): void {
	const loanEntityId = `${event.address.toHex()}-${event.params.loanId.toString()}`;
	const loan = Loan.load(loanEntityId);
	if (!loan) return;

	loan.status = "REPAID";
	loan.save();

	// TODO: Update the linked Proposal entity status
}

export function handleLOANClaimed(event: LOANClaimed): void {
	const loanEntityId = `${event.address.toHex()}-${event.params.loanId.toString()}`;
	const loan = Loan.load(loanEntityId);
	if (!loan) return;

	if (event.params.defaulted) {
		loan.status = "DEFAULTED";
	}

	loan.save();
}
