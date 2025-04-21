import { safeWaitForTransactionReceipt } from "@moleculexyz/wagmi-safe-wait-for-tx";
import {
	type Config,
	getAccount,
	getBytecode,
	readContract,
	signMessage,
	signTypedData,
	watchContractEvent,
} from "@wagmi/core";
import invariant from "ts-invariant";
import type { Address, Hex, Log, PublicClient } from "viem";
import { hashMessage, hashTypedData } from "viem";
import {
	DEFAULT_SAFE_CONFIG,
	SAFE_ERROR_CODES,
	type SafeConfig,
	SafeMessageType,
	SafeSignatureError,
} from "./types.js";

const SAFE_ABI = [
	{
		inputs: [{ name: "message", type: "bytes" }],
		name: "getMessageHash",
		outputs: [{ name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		anonymous: false,
		inputs: [{ indexed: true, name: "msgHash", type: "bytes32" }],
		name: "SignMsg",
		type: "event",
	},
] as const;

interface SignMsgEvent {
	args: {
		msgHash: string;
	};
}

export class SafeService {
	private readonly config: Required<SafeConfig>;
	private readonly publicClient: PublicClient;
	private readonly _config: Config;

	constructor(
		publicClient: PublicClient,
		config: Config,
		safeConfig?: Partial<SafeConfig>,
	) {
		this._config = config;
		this.config = { ...DEFAULT_SAFE_CONFIG, ...safeConfig };
		this.publicClient = publicClient;
	}

	async isSafeAddress(address: Address): Promise<boolean> {
		try {
			const code = await getBytecode(this._config, {
				address: address as Address,
			});
			return code !== undefined && code !== "0x";
		} catch (error) {
			console.error("Error checking Safe address:", error);
			return false;
		}
	}

	private async waitForSafeWalletOnchainSignature(
		safeAddress: Address,
		hash: Hex,
		chainId: number,
	): Promise<Hex> {
		const messageHash = await readContract(this._config, {
			address: safeAddress,
			abi: SAFE_ABI,
			functionName: "getMessageHash",
			args: [hash],
			chainId,
		});

		return new Promise<Hex>((resolve, reject) => {
			const timeout = setTimeout(() => {
				unwatch();
				reject(
					new SafeSignatureError(
						"Timeout waiting for Safe signature",
						SAFE_ERROR_CODES.TIMEOUT,
					),
				);
			}, this.config.signatureTimeoutMs);

			const unwatch = watchContractEvent(this._config, {
				abi: SAFE_ABI,
				address: safeAddress,
				eventName: "SignMsg",
				chainId,
				onLogs(logs: Log[]) {
					const log = logs.find(
						(eventLog) =>
							(eventLog as unknown as SignMsgEvent).args.msgHash ===
							messageHash,
					);
					if (log) {
						clearTimeout(timeout);
						unwatch();
						resolve("0x" as Hex);
					}
				},
			});
		});
	}

	async signTypedData(
		safeAddress: Address,
		domain: Record<string, unknown>,
		types: Record<string, Array<{ name: string; type: string }>>,
		message: Record<string, unknown>,
		primaryType = "Multiproposal",
	): Promise<Hex> {
		try {
			const hash = hashTypedData({
				domain,
				types,
				primaryType,
				message,
			});

			return await Promise.any([
				signTypedData(this._config, {
					account: safeAddress,
					domain,
					types,
					primaryType,
					message,
				}),
				this.waitForSafeWalletOnchainSignature(
					safeAddress,
					hash,
					domain.chainId as number,
				),
			]).catch((error) => {
				if (error instanceof AggregateError) {
					throw new SafeSignatureError(
						"All signature methods failed",
						SAFE_ERROR_CODES.EXECUTION_FAILURE,
						error,
					);
				}
				throw error;
			});
		} catch (error) {
			console.error("Error signing typed data:", error);
			throw new SafeSignatureError(
				`Failed to sign typed data with Safe: ${error instanceof Error ? error.message : "Unknown error"}`,
				SAFE_ERROR_CODES.EXECUTION_FAILURE,
				error as Error,
			);
		}
	}

	async signMessage(
		safeAddress: Address,
		message: string,
		chainId: number,
	): Promise<Hex> {
		try {
			const hash = hashMessage(message);

			return await Promise.any([
				signMessage(this._config, {
					account: safeAddress,
					message,
				}),
				this.waitForSafeWalletOnchainSignature(safeAddress, hash, chainId),
			]).catch((error) => {
				if (error instanceof AggregateError) {
					throw new SafeSignatureError(
						"All signature methods failed",
						SAFE_ERROR_CODES.EXECUTION_FAILURE,
						error,
					);
				}
				throw error;
			});
		} catch (error) {
			console.error("Error signing message:", error);
			throw new SafeSignatureError(
				`Failed to sign message with Safe: ${error instanceof Error ? error.message : "Unknown error"}`,
				SAFE_ERROR_CODES.EXECUTION_FAILURE,
				error as Error,
			);
		}
	}

	async getMessageHash(
		safeAddress: Address,
		message: string | Record<string, unknown>,
		messageType: SafeMessageType,
	): Promise<string> {
		try {
			if (messageType === SafeMessageType.TYPED_MESSAGE) {
				return await signTypedData(this._config, {
					account: safeAddress,
					domain: message as Record<string, unknown>,
					types: { SafeMessage: [] },
					primaryType: "SafeMessage",
					message: {},
				});
			}
			return await signMessage(this._config, {
				account: safeAddress,
				message: message as string,
			});
		} catch (error) {
			console.error("Error getting message hash:", error);
			throw new SafeSignatureError(
				"Failed to get message hash",
				SAFE_ERROR_CODES.EXECUTION_FAILURE,
				error as Error,
			);
		}
	}

	async waitForTransaction(hash: Hex): Promise<void> {
		const address = getAccount(this._config)?.address;
		invariant(address, "Wallet client account is required");

		try {
			await safeWaitForTransactionReceipt(this.publicClient, {
				hash,
				address,
			});
		} catch (error) {
			console.error("Error waiting for transaction:", error);
			throw error;
		}
	}
}
