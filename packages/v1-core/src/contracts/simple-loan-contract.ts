import { getPwnSimpleLoanAddress, Hex, SupportedChain } from "@pwndao/sdk-core";
import { Config } from "@wagmi/core";
import { ILoanContract } from "src/factories/helpers.js";
import { readPwnSimpleLoanGetLenderSpecHash } from "src/generated.js";
import { ILenderSpec } from "src/models/terms.js";

export class SimpleLoanContract implements ILoanContract {
	constructor(private readonly config: Config) {}

    async getProposerSpec(
		params: ILenderSpec,
		chainId: SupportedChain,
	): Promise<Hex> {
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