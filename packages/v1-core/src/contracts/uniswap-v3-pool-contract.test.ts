import { vi } from "vitest";
import { UniswapV3PoolContract } from "./uniswap-v3-pool-contract.js";
import type { Config, GetPublicClientReturnType, GetWalletClientReturnType } from "@wagmi/core";
import type { AddressString, SupportedChain } from "@pwndao/sdk-core";

vi.mock("@wagmi/core", () => ({
    getPublicClient: vi.fn().mockResolvedValue(true as unknown as GetPublicClientReturnType<Config, SupportedChain>),
    getWalletClient: vi.fn().mockResolvedValue(true as unknown as GetWalletClientReturnType<Config, SupportedChain>),
}))

const mockReadContract = vi.fn()
const mockWriteContract = vi.fn()

const mockPublicClient = { readContract: mockReadContract }
const mockWalletClient = { writeContract: mockWriteContract }

const config = {} as unknown as Config
const contractAddress = "0x123" as AddressString

beforeEach(() => {
    mockReadContract.mockReset();
    mockWriteContract.mockReset();
})

describe("UniswapV3PoolContract", () => {    
    it("should return public client", async () => {
        const contract = new UniswapV3PoolContract(config, contractAddress)
        expect(contract).toBeDefined();
        const client = await contract.getClient();
        expect(client).toBeDefined();
    })

    it("should return wallet client", async () => {
        const contract = new UniswapV3PoolContract(config, contractAddress)
        expect(contract).toBeDefined();
        const client = await contract.getWalletClient();
        expect(client).toBeDefined();
    })

    it("should return slot0", async () => {
        mockReadContract.mockResolvedValue([
            1234n, // sqrtPriceX96
            5, // tick
            1, // observationIndex
            2, // observationCardinality
            3, // observationCardinalityNext
            0, // feeProtocol
            true // unlocked
        ]);

        const _contract = new UniswapV3PoolContract(config, contractAddress)
        _contract.getClient = vi.fn().mockResolvedValue(mockPublicClient)
        const _slot0 = await _contract.slot0();

        expect(mockReadContract).toHaveBeenCalledWith({
            address: contractAddress,
            abi: expect.any(Array),
            functionName: "slot0"
        });

        expect(_slot0).toEqual({
            sqrtPriceX96: 1234n,
            tick: 5,
            observationIndex: 1,
            observationCardinality: 2,
            observationCardinalityNext: 3,
            feeProtocol: 0,
            unlocked: true
        });
    })

    it("should increase observation cardinality next", async () => {
        const contract = new UniswapV3PoolContract(config, contractAddress)
        contract.getWalletClient = vi.fn().mockResolvedValue(mockWalletClient)
        await contract.increaseObservationCardinalityNext(10);
        expect(mockWriteContract).toHaveBeenCalledWith({
            address: contractAddress,
            abi: expect.any(Array),
            functionName: "increaseObservationCardinalityNext",
            args: [10]
        });
    })

    it("should return can use as collateral", async () => {
        const contract = new UniswapV3PoolContract(config, contractAddress)
        contract.getClient = vi.fn().mockResolvedValue(mockPublicClient)
        contract.slot0 = vi.fn().mockResolvedValue({
            observationCardinality: 2
        })
        const canUseAsCollateral = await contract.canUseAsCollateral();
        expect(canUseAsCollateral).toBe(true);
    })
})