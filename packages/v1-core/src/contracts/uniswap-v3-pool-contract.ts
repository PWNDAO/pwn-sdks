import type { AddressString, SupportedChain } from "@pwndao/sdk-core";
import { type Config, getPublicClient, type GetPublicClientReturnType, getWalletClient, type GetWalletClientReturnType } from "@wagmi/core";
import { parseAbi } from "viem";

interface Slot0Response {
    sqrtPriceX96: bigint;
    tick: number;
    observationIndex: number;
    observationCardinality: number;
    observationCardinalityNext: number;
    feeProtocol: number;
    unlocked: boolean;
}

export interface IUniswapV3PoolContract {
    slot0(): Promise<Slot0Response>;
}

const uniswapV3PoolSlot0Abi = parseAbi([
    'function slot0() view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)'
]);

const uniswapV3PoolFnIncreaseObservationCardinalityNextAbi = parseAbi([
    'function increaseObservationCardinalityNext(uint16 observationCardinalityNext) external'
]);

export class UniswapV3PoolContract implements IUniswapV3PoolContract {
    constructor(
        private readonly config: Config,
        private readonly contractAddress: AddressString,
    ) {}

    async getClient(): Promise<GetPublicClientReturnType<Config, SupportedChain>> {
        try {
            return getPublicClient(this.config, )
        } catch (error) {
            throw new Error("UniswapV3PoolContract: Failed to get public client");
        }
    }

    async getWalletClient(): Promise<GetWalletClientReturnType<Config, SupportedChain>> {
        try {
            return getWalletClient(this.config)
        } catch (error) {
            throw new Error(`UniswapV3PoolContract getWalletClient: ${error}`);
        }
    }

    async slot0(): Promise<Slot0Response> {
        const client = await this.getClient();
        try {
            const response = await client?.readContract({
                address: this.contractAddress,
                abi: uniswapV3PoolSlot0Abi,
                functionName: "slot0",
            })
            if (!response) {
                throw new Error("UniswapV3PoolContract: Failed to read slot0");
            }
            return {
                sqrtPriceX96: response[0],
                tick: response[1],
                observationIndex: response[2],
                observationCardinality: response[3],
                observationCardinalityNext: response[4],
                feeProtocol: response[5],
                unlocked: response[6],
            }
        } catch (error) {
            throw new Error(`UniswapV3PoolContract: ${error}`);
        }
    }

    async canUseAsCollateral(): Promise<boolean> {
        const slot0 = await this.slot0();
        return slot0.observationCardinality > 1;
    }

    async increaseObservationCardinalityNext(observationCardinalityNext: number): Promise<void> {
        const client = await this.getWalletClient();
        try {
            await client?.writeContract({
                address: this.contractAddress,
                abi: uniswapV3PoolFnIncreaseObservationCardinalityNextAbi,
                functionName: "increaseObservationCardinalityNext",
                args: [observationCardinalityNext],
            })
        } catch (error) {
            throw new Error(`UniswapV3PoolContract: Failed to increase observation cardinality next: ${error}`);
        }
    }
    
}