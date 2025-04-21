import type { IRevokedNonceContract } from "../contracts/revoked-nonce-contract.js";
import { revokeProposals } from "./revoke-proposals.js";
import { SupportedChain } from "@pwndao/sdk-core";


describe("RevokedNonceContract", () => {
	it("should revoke nonces", async () => {
        const mock = vi.fn() as unknown as IRevokedNonceContract;
        mock.revokeNonces = vi.fn().mockResolvedValue("0x0");

		const txHash = await revokeProposals([1n, 2n], SupportedChain.Ethereum, "0x0", 1n, mock);
		expect(txHash).toEqual("0x0");
		expect(mock.revokeNonces).toHaveBeenCalledWith([1n, 2n], 1n, SupportedChain.Ethereum, "0x0");
		expect(mock.revokeNonces).toHaveBeenCalledTimes(1);
	});
});
