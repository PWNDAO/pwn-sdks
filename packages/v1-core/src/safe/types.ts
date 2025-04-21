import type { Address, Hex } from "viem";

export enum SafeMessageType {
	TYPED_MESSAGE = "TYPED_MESSAGE",
	MESSAGE = "MESSAGE",
}

export interface SafeConfig {
	threshold?: number;
	owners?: Address[];
	fallbackHandler?: Address;
	signatureTimeoutMs?: number;
	maxRetries?: number;
}

export interface SafeSignatureResult {
	signature: Hex;
	signers: Address[];
	timestamp: number;
}

export class SafeSignatureError extends Error {
	constructor(
		message: string,
		public readonly code: string,
		public readonly originalError?: Error,
	) {
		super(message);
		this.name = "SafeSignatureError";
	}
}

export const SAFE_ERROR_CODES = {
	TIMEOUT: "SIGNATURE_TIMEOUT",
	INSUFFICIENT_SIGNATURES: "INSUFFICIENT_SIGNATURES",
	INVALID_SAFE: "INVALID_SAFE",
	NOT_OWNER: "NOT_OWNER",
	EXECUTION_FAILURE: "EXECUTION_FAILURE",
} as const;

export const DEFAULT_SAFE_CONFIG: Required<SafeConfig> = {
	threshold: 1,
	owners: [],
	fallbackHandler: "0x" as Address,
	signatureTimeoutMs: 300000, // 5 minutes
	maxRetries: 3,
};
