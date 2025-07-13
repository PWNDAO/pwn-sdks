import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Account } from "../generated/schema";

// TODO add logs where applicable
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
	return assetAddress.concat(Bytes.fromByteArray(Bytes.fromBigInt(assetId)));
}
