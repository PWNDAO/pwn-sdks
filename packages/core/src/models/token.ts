import invariant from "ts-invariant";
import type { SupportedChain } from "../chains.js";
import type { AddressString } from "../types.js";
import { BaseAsset, MultiTokenCategory } from "./asset.js";

export class ERC20Token extends BaseAsset {
	static category = MultiTokenCategory.ERC20;

	constructor(
		public override chainId: SupportedChain,
		address: string,
		public override decimals: number,
		public override name?: string,
		public override symbol?: string,
	) {
		invariant(address.startsWith("0x"), "Invalid address");

		super(
			chainId,
			address as AddressString,
			decimals,
			false,
			ERC20Token.category,
			name,
			symbol,
		);
	}
}
