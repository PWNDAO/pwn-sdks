import { SupportedChain } from "@pwndao/sdk-core";
import { RevokedNonceContract, revokeProposals } from "@pwndao/v1-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useRevokeNonces } from "./use-revoke-nonces";

vi.mock("wagmi", () => ({
	useConfig: vi.fn().mockReturnValue({
		chains: [SupportedChain.Sepolia],
	}),
}));

vi.mock("@pwndao/v1-core", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@pwndao/v1-core")>();
	return {
		...actual,
		RevokedNonceContract: vi.fn(),
		revokeProposals: vi.fn(),
	};
});

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useRevokeNonces", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should revoke nonces", async () => {
		const mockContractInstance = {};
		vi.mocked(RevokedNonceContract).mockReturnValue(mockContractInstance as any);
		
		vi.mocked(revokeProposals).mockResolvedValue("0x0");
		
		const { result } = renderHook(() => useRevokeNonces(), { wrapper });

		result.current.mutate({
			proposalNonces: [1n, 2n],
			chainId: SupportedChain.Sepolia,
			owner: "0x0",
			nonceSpace: 1n,
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
			expect(result.current.data).toBe("0x0");
			expect(revokeProposals).toHaveBeenCalledWith(
				[1n, 2n],
				SupportedChain.Sepolia,
				"0x0",
				1n,
				mockContractInstance,
			);
		});
	});
});
