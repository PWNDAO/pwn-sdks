import { fetchAssetPrice } from "@pwndao/api-sdk";
import { type BaseAsset, getMockToken } from "@pwndao/sdk-core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { API } from "./api.js";

vi.mock("@pwndao/api-sdk", async () => ({
	fetchAssetPrice: vi.fn(),
}));

describe("API.get.getAssetUsdUnitPrice", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	const mockAsset: BaseAsset = getMockToken();

	it("should correctly convert USD price to unit price with decimals", async () => {
		vi.mocked(fetchAssetPrice).mockResolvedValue({
			best_price: {
				price: {
					usd_amount: "1234.56", // $1,234.56
				},
			},
			is_task_scheduled: false,
		});

		const result = await API.get.getAssetUsdUnitPrice(mockAsset);

		expect(result).toBe(1234560000000000000000n);

		expect(fetchAssetPrice).toHaveBeenCalledWith(
			"1",
			mockAsset.address,
			"null",
		);
	});

	it("should handle small decimal prices correctly", async () => {
		vi.mocked(fetchAssetPrice).mockResolvedValue({
			best_price: {
				price: {
					usd_amount: "0.000001", // $0.000001
				},
			},
			is_task_scheduled: false,
		});

		const result = await API.get.getAssetUsdUnitPrice(mockAsset);

		expect(result).toBe(1_000_000_000_000n);
	});

	it("should throw error when no price is found", async () => {
		vi.mocked(fetchAssetPrice).mockResolvedValue({
			best_price: null,
			is_task_scheduled: false,
		});

		await expect(API.get.getAssetUsdUnitPrice(mockAsset)).rejects.toThrow(
			"No price found for asset",
		);
	});

	it("should throw error when price is undefined", async () => {
		vi.mocked(fetchAssetPrice).mockResolvedValue({
			best_price: {
				price: {
					usd_amount: undefined,
				},
			},
			is_task_scheduled: false,
		});

		await expect(API.get.getAssetUsdUnitPrice(mockAsset)).rejects.toThrow(
			"No price found for asset",
		);
	});

	it("should handle assets with different decimal places", async () => {
		const mockAsset6Decimals: BaseAsset = {
			...mockAsset,
			decimals: 6,
		};

		vi.mocked(fetchAssetPrice).mockResolvedValue({
			best_price: {
				price: {
					usd_amount: "1.0", // $1.00
				},
			},
			is_task_scheduled: false,
		});

		const result = await API.get.getAssetUsdUnitPrice(mockAsset6Decimals);

		expect(result).toBe(1_000_000n);
	});
	it("should re-fetch if price is being fetched", async () => {
		let i = 0;

		vi.mocked(fetchAssetPrice).mockImplementation(async () => {
			if (i === 0) {
				i += 1;
				return {
					best_price: null,
					is_task_scheduled: true,
					task_info: {
						scheduled: [],
						skipped: [],
					},
				};
			}
			return {
				best_price: {
					price: {
						usd_amount: "2.5", // $2.50
					},
				},
				task_info: {
					scheduled: [],
					skipped: [],
				},
				is_task_scheduled: false,
			};
		});

		const resultPromise = API.get.getAssetUsdUnitPrice(mockAsset);

		await vi.advanceTimersByTimeAsync(600);

		const result = await resultPromise;
		expect(result).toBe(2_500_000_000_000_000_000n);
		expect(fetchAssetPrice).toHaveBeenCalledTimes(2);
	});
});
