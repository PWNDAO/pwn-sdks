import { SupportedChain } from "@pwndao/sdk-core";
import { revokeProposals } from "@pwndao/v1-core";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { flushPromises, mount } from "@vue/test-utils";
import { useRevokeNonces } from "./use-revoke-nonces";
// Mock the core functions
vi.mock("@pwndao/v1-core", () => ({
	revokeProposals: vi.fn().mockResolvedValue("0x0"),
	RevokedNonceContract: vi.fn().mockImplementation(() => ({})),
}));

// Mock the wagmi config
vi.mock("@wagmi/vue", () => ({
	useConfig: vi.fn().mockReturnValue({
		chains: [SupportedChain.Sepolia],
	}),
}));

describe("useRevokeNonces", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should revoke nonces", async () => {
		const wrapper = mount(
			{
				template: "<div></div>",
				setup() {
					return useRevokeNonces();
				},
			},
			{
				global: {
					plugins: [[VueQueryPlugin, { ssr: false }]],
				},
			},
		);

		expect(wrapper.vm.mutate).toBeInstanceOf(Function);

		await (
			wrapper.vm as unknown as { mutate: (params: unknown) => Promise<void> }
		).mutate({
			proposalNonces: [1n, 2n],
			chainId: SupportedChain.Sepolia,
			owner: "0x0",
			nonceSpace: 1n,
		});
		await flushPromises();

		expect(revokeProposals).toHaveBeenCalledWith(
			[1n, 2n],
			SupportedChain.Sepolia,
			"0x0",
			1n,
			expect.anything(),
		);

		expect(wrapper.vm).toBeDefined();
	});
});
