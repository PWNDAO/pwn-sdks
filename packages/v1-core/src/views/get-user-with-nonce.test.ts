import { SupportedChain, UserWithNonceManager } from "@pwndao/sdk-core";
import { generateAddress, getMockUser } from "@pwndao/sdk-core";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { IServerAPI } from "../factories/types.js";
import { getUserWithNonce } from "./get-user-with-nonce.js";

vi.mock("@pwndao/sdk-core", async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		UserWithNonceManager: vi.fn().mockImplementation((user, nonces) => ({
			user,
			nonces,
		})),
	};
});

describe("useGetUserWithNonce", () => {
	const mockUser = getMockUser(generateAddress());
	const mockChainIds: SupportedChain[] = [SupportedChain.Ethereum, SupportedChain.Polygon];

	const mockApi: IServerAPI = {
		get: {
			recentNonce: vi.fn(),
		},
	} as unknown as IServerAPI;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("should fetch nonces for all chains and create UserWithNonceManager", async () => {
		vi.mocked(mockApi.get.recentNonce).mockImplementation((address, chainId) => {
			if (chainId === SupportedChain.Ethereum) return Promise.resolve([100n, 101n]);
			if (chainId === SupportedChain.Polygon) return Promise.resolve([200n, 201n]);
			return Promise.reject(new Error("Unsupported chain"));
		});

		const result = await getUserWithNonce(mockUser, mockApi, mockChainIds);

		// Verify API calls
		expect(mockApi.get.recentNonce).toHaveBeenCalledTimes(2);
		expect(mockApi.get.recentNonce).toHaveBeenCalledWith(mockUser.address, SupportedChain.Ethereum);
		expect(mockApi.get.recentNonce).toHaveBeenCalledWith(mockUser.address, SupportedChain.Polygon);

		// Verify UserWithNonceManager creation
		expect(UserWithNonceManager).toHaveBeenCalledWith(mockUser, {
			[SupportedChain.Ethereum]: [BigInt(100), BigInt(101)],
			[SupportedChain.Polygon]: [BigInt(200), BigInt(201)],
		});

		// Verify the returned object
		expect(result).toEqual({
			user: mockUser,
			nonces: {
				[SupportedChain.Ethereum]: [BigInt(100), BigInt(101)],
				[SupportedChain.Polygon]: [BigInt(200), BigInt(201)],
			},
		});
	});

	test("should handle failed nonce requests gracefully", async () => {
		vi.mocked(mockApi.get.recentNonce).mockImplementation((address, chainId) => {
			if (chainId === SupportedChain.Ethereum) return Promise.resolve([100n, 101n]);
			return Promise.reject(new Error("Failed to fetch nonce"));
		});

		await expect(
			getUserWithNonce(mockUser, mockApi, mockChainIds),
		).rejects.toThrow();
	});

	test("should handle empty chain IDs array", async () => {
		const result = await getUserWithNonce(mockUser, mockApi, []);

		expect(mockApi.get.recentNonce).not.toHaveBeenCalled();
		expect(UserWithNonceManager).toHaveBeenCalledWith(mockUser, {});
		expect(result).toEqual({
			user: mockUser,
			nonces: {},
		});
	});
});
