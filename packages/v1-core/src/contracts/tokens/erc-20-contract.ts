import type {
	AddressString,
	ERC20TokenLike,
	SupportedChain,
} from "@pwndao/sdk-core";
import { type Config, getPublicClient } from "@wagmi/core";
import invariant from "ts-invariant";
import { http, erc20Abi } from "viem";

export class ERC20Contract {
	constructor(public config: Config) {}

	public async readAllowance(
		token: ERC20TokenLike,
		spender: AddressString,
		owner: AddressString,
	): Promise<bigint> {
		const client = getPublicClient(this.config);
		invariant(client, "client is not defined");

		return await client.readContract({
			address: token.address,
			abi: erc20Abi,
			functionName: "allowance",
			args: [owner, spender],
		});
	}
}
