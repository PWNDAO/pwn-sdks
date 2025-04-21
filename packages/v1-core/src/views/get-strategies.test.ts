import { SupportedChain } from "@pwndao/sdk-core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import { API } from "../api.js";
import { getStrategies } from "./get-strategies.js";

vi.mock("../api.js", () => ({
	API: {
		get: {
			getStrategies: vi.fn(),
		},
	},
}));

describe("getStrategies", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should call API.get.getStrategies with the correct chainId", async () => {
		const mockChainId = SupportedChain.Sepolia;
		const mockStrategies = [
			{ id: "1", name: "Strategy 1" },
			{ id: "2", name: "Strategy 2" },
		];

		(API.get.getStrategies as Mock).mockResolvedValue(mockStrategies);

		const result = await getStrategies(mockChainId);

		expect(API.get.getStrategies).toHaveBeenCalledTimes(1);
		expect(API.get.getStrategies).toHaveBeenCalledWith(mockChainId, undefined);
		expect(result).toEqual(mockStrategies);
	});

	it("should propagate API errors", async () => {
		const mockChainId = SupportedChain.Sepolia;
		const mockError = new Error("API Error");

		(API.get.getStrategies as Mock).mockRejectedValue(mockError);

		await expect(getStrategies(mockChainId)).rejects.toThrow(mockError);
	});
});
