import { getPwnSimpleLoanAddress, type Hex, type SupportedChain, isChainSupported } from "@pwndao/sdk-core";
import type { Config } from "@wagmi/core";
import type { ILoanContract } from "src/factories/helpers.js";
import { readPwnSimpleLoanGetLenderSpecHash } from "../generated.js";
import type { ILenderSpec } from "src/models/terms.js";
import invariant from "ts-invariant";

export class SimpleLoanContract implements ILoanContract {
	constructor(private readonly config: Config) {}

    async getLenderSpecHash(
		params: ILenderSpec,
		chainId: SupportedChain,
	): Promise<Hex> {
		invariant(isChainSupported(chainId), "Chain not supported");
		invariant(
			params?.sourceOfFunds?.startsWith?.("0x"),
			"Invalid params.sourceOfFunds address arg passed to getLenderSpecHash.",
		);
		const data = await readPwnSimpleLoanGetLenderSpecHash(this.config, {
			address: getPwnSimpleLoanAddress(chainId),
			chainId: chainId,
			args: [
				{
					sourceOfFunds: params.sourceOfFunds,
				},
			],
		});
		return data as Hex;
	}
}