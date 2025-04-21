import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
	SupportedChain,
	UserWithNonceManager,
	generateAddress,
	getMockUser,
} from "@pwndao/sdk-core";
import { API, getUserWithNonce } from "@pwndao/v1-core";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { useUserNonces } from "./use-user-nonces";

vi.mock("@pwndao/v1-core", () => {
	return {
		API: {
			get: {
				recentNonce: vi.fn(),
			},
		},
		getUserWithNonce: vi.fn(),
	};
});

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useUserNonces", () => {
	const TEST_ADDRESS = generateAddress();
	const TEST_CHAIN_IDS = [SupportedChain.Ethereum, SupportedChain.Polygon];
	const mockUser = getMockUser(TEST_ADDRESS);

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should return null when address is undefined", async () => {
		const { result } = renderHook(
			() => useUserNonces(undefined, TEST_CHAIN_IDS),
			{ wrapper },
		);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.data).toBeUndefined();
	});

	it("should return nonces for the given address and chains", async () => {
		const mockNonces = [
			[10n, 0n],
			[5n, 0n],
		];

		vi.mocked(getUserWithNonce).mockImplementation(async () => {
			return new UserWithNonceManager(mockUser, {
				[SupportedChain.Ethereum]: mockNonces[0] as [bigint, bigint],
				[SupportedChain.Polygon]: mockNonces[1] as [bigint, bigint],
			});
		});

		const { result } = renderHook(
			() => useUserNonces(TEST_ADDRESS, TEST_CHAIN_IDS),
			{ wrapper },
		);

		await waitFor(() => {
			expect(result.current.isFetched).toBe(true);
		});

		expect(result.current.data).toMatchObject({
			user: mockUser,
			nonces: {
				[SupportedChain.Ethereum]: [10n, 0n],
				[SupportedChain.Polygon]: [5n, 0n],
			},
		});

		expect(getUserWithNonce).toHaveBeenCalledWith(mockUser, API, [
			SupportedChain.Ethereum,
			SupportedChain.Polygon,
		]);
	});

	it("should not fetch when chainIds is empty", async () => {
		const { result } = renderHook(() => useUserNonces(TEST_ADDRESS, []), {
			wrapper,
		});

		expect(result.current.isLoading).toBe(false);
		expect(result.current.data).toBeUndefined();
		expect(API.get.recentNonce).not.toHaveBeenCalled();
	});
});
