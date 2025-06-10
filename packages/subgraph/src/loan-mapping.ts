import { Address, BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { LOANClaimed, LOANCreated, LOANPaidBack, LOANCreatedTermsCollateralStruct, LOANCreatedTermsCreditStruct, LOANExtended } from "../generated/SimpleLoan/SimpleLoan"; // Path to generated code
import { Account, Asset, Loan, AssetContract } from "../generated/schema";

// TODO add logs where applicable

// Helper to get or create an Account entity
export function getOrCreateAccount(address: Address): Account {
	let account = Account.load(address);
	if (account == null) {
		account = new Account(address);
		account.save();
	}
	return account;
}

export function getAssetContractId(assetAddress: Address): Bytes {
	return assetAddress;
}

export function getAssetId(assetAddress: Address, assetId: BigInt): Bytes {
	return assetAddress.concat(Bytes.fromBigInt(assetId));
}

export function getOrCreateAsset(asset: LOANCreatedTermsCreditStruct): Asset {
	let assetContract = AssetContract.load(getAssetContractId(asset.assetAddress));
	if (assetContract == null) {
		assetContract = new AssetContract(getAssetContractId(asset.assetAddress));
		assetContract.category = asset.category;
		assetContract.save();
	}
	let assetResult = Asset.load(getAssetId(asset.assetAddress, asset.id));
	if (assetResult == null) {
		assetResult = new Asset(getAssetId(asset.assetAddress, asset.id));
		assetResult.contract = assetContract.id;
		assetResult.tokenId = asset.id;
		// assetResult.amount = new BigDecimal(asset.amount);
		assetResult.save();
	}
	return assetResult
}

// Updated function to handle both explicit defaults and time-based defaults
export function handleLOANClaimed(event: LOANClaimed): void {
	const loanEntityId = `${event.address.toHex()}-${event.params.loanId.toString()}`;
	const loan = Loan.load(loanEntityId);
	if (!loan) return;

	loan.status = "Claimed";
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
