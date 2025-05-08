import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";
import {
	type Config,
	getAccount,
	getPublicClient,
	readContract,
	signTypedData,
	watchContractEvent,
} from "@wagmi/core";
import type { GetAccountReturnType } from "@wagmi/core";
import type {
	IProposalContract,
	IServerAPI,
	Proposal,
	ProposalWithHash,
} from "src/index.js";
import type { ProposalWithSignature } from "src/models/strategies/types.js";
import type { Address, Chain, Hex, Log, PublicClient } from "viem";
import { SafeService } from "../safe/safe-service.js";
import type { SafeConfig } from "../safe/types.js";
import { Loan } from "src/models/loan/index.js";
import { AddressString } from "@pwndao/sdk-core";

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

export abstract class BaseProposalContract<TProposal extends Proposal>
	implements IProposalContract<TProposal>
{
	protected readonly safeService: SafeService;

	constructor(
		protected readonly config: Config,
		safeConfig?: Partial<SafeConfig>,
	) {
		const publicClient = getPublicClient(config) as PublicClient;
		this.safeService = new SafeService(publicClient, config, safeConfig);
	}

	abstract getProposalHash(proposal: TProposal): Promise<Hex>;
	abstract createProposal(
		params: TProposal,
		deps: { persistProposal: IServerAPI["post"]["persistProposal"] },
	): Promise<ProposalWithSignature>;
	abstract createOnChainProposal(
		params: TProposal,
	): Promise<ProposalWithSignature>;
	abstract createMultiProposal(
		proposals: ProposalWithHash[],
	): Promise<ProposalWithSignature[]>;

	abstract acceptProposal(
		proposal: ProposalWithSignature,
		acceptor: AddressString,
		creditAmount: bigint,
	): Promise<Loan>

	protected async signWithSafeWalletSupport(
		domain: {
			name: string;
			version?: string;
			chainId?: number;
			verifyingContract?: Address;
		},
		types: Record<string, Array<{ name: string; type: string }>>,
		primaryType: string,
		message: Record<string, unknown>,
	): Promise<Hex> {
		const account = getAccount(this.config) as GetAccountReturnType<
			Config,
			Chain
		>;

		if (!account.isConnected || !account.address) {
			throw new Error("No connected account found");
		}

		// Check if the account is a Safe
		const isSafe = await this.safeService.isSafeAddress(
			account.address as Address,
		);

		if (!isSafe) {
			return await signTypedData(this.config, {
				domain,
				types,
				primaryType,
				message,
			});
		}

		// Handle Safe signature
		return await this.safeService.signTypedData(
			account.address as Address,
			domain,
			types,
			message,
		);
	}

	protected async waitForSafeWalletOnchainSignature(
		safeAddress: Address,
		hash: Hex,
		chainId: number,
	): Promise<Hex> {
		const messageHash = await readContract(this.config, {
			address: safeAddress,
			abi: SAFE_ABI,
			functionName: "getMessageHash",
			args: [hash],
			chainId,
		});

		return new Promise<Hex>((resolve) => {
			const unwatch = watchContractEvent(this.config, {
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
						unwatch();
						resolve("0x" as Hex);
					}
				},
			});
		});
	}

	getMerkleTreeForSigning(proposals: ProposalWithHash[]) {
		const merkleTree = SimpleMerkleTree.of(
			proposals.map((proposal) => proposal.hash),
		);
		const multiproposalMerkleRoot = merkleTree.root;

		const multiproposalDomain = {
			name: "PWNMultiproposal",
		};

		const types = {
			Multiproposal: [{ name: "multiproposalMerkleRoot", type: "bytes32" }],
		};

		return {
			domain: multiproposalDomain,
			types,
			primaryType: "Multiproposal",
			message: { multiproposalMerkleRoot },
		} as const;
	}
}
