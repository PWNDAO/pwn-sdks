import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";
import {
	type AddressString,
	type Hex,
	getLoanContractAddress,
} from "@pwndao/sdk-core";
import {
	type Config,
	getAccount,
	getPublicClient,
	readContract,
	sendCalls,
	sendTransaction,
	signTypedData,
	switchChain,
	watchContractEvent,
	waitForCallsStatus,
} from "@wagmi/core";
import type {
	GetAccountReturnType,
	ReadContractsParameters,
	WaitForCallsStatusReturnType,
} from "@wagmi/core";
import type { AcceptProposalRequest } from "src/actions/accept-proposals.js";
import {
	type Address,
	type Chain,
	type Log,
	type PublicClient,
	encodeFunctionData,
} from "viem";
import type { SendTransactionReturnType } from "viem";
import {
	type IProposalContract,
	type IServerAPI,
	type Proposal,
	type ProposalWithHash,
	type ProposalsToAccept,
	pwnSimpleLoanAbi,
} from "../index.js";
import type { ProposalWithSignature } from "../models/strategies/types.js";
import { SafeService } from "../safe/safe-service.js";
import type { SafeConfig } from "../safe/types.js";
import { getApprovals } from "../utils/approvals-helper.js";
import { getInclusionProof, mayUserSendCalls } from "./utilts.js";

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
		readonly config: Config,
		safeConfig?: Partial<SafeConfig>,
	) {
		const publicClient = getPublicClient(config) as PublicClient;
		this.safeService = new SafeService(publicClient, config, safeConfig);
	}

	abstract encodeProposalData(
		proposal: ProposalWithSignature,
		creditAmount: bigint,
	): Promise<Hex>;

	abstract getProposalHash(proposal: TProposal): Promise<Hex>;

	abstract createProposal(
		params: TProposal,
		deps: { persistProposal: IServerAPI["post"]["persistProposal"] },
	): Promise<ProposalWithSignature>;

	abstract createOnChainProposal(
		params: TProposal,
	): Promise<ProposalWithSignature>;

	async createMultiProposal(
		proposals: ProposalWithHash[],
	): Promise<ProposalWithSignature[]> {
		const structToSign = this.getMerkleTreeForSigning(proposals);

		const signature = await this.signWithSafeWalletSupport(
			structToSign.domain,
			structToSign.types,
			structToSign.primaryType,
			structToSign.message,
		);

		const merkleRoot = structToSign.message.multiproposalMerkleRoot;

		return proposals.map(
			(proposal) =>
				({
					...proposal,
					signature,
					hash: proposal.hash,
					isOnChain: false,
					multiproposalMerkleRoot: merkleRoot,
				}) as ProposalWithSignature,
		);
	}

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

		return await this.safeService.signTypedData(
			account.address as Address,
			domain,
			types,
			message,
			primaryType,
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

	async getApprovalCalls(
		proposals: ProposalsToAccept[],
	): Promise<{ to: AddressString; data: Hex }[]> {
		return getApprovals(proposals, this);
	}

	abstract getReadCollateralAmount(
		proposal: TProposal,
	): ReadContractsParameters["contracts"][number];

	async acceptProposals(
		proposals: [AcceptProposalRequest, ...AcceptProposalRequest[]],
	): Promise<WaitForCallsStatusReturnType | { status?: "success", receipts: SendTransactionReturnType[] }> {
		const calls = await Promise.all(
			proposals.map(
				async ({
					proposalToAccept: proposal,
					creditAmount,
					acceptor
				}) => {

					// if proposal is lending offer sourceOfFunds is already set. If not then it's lender address
					const sourceOfFunds =
						proposal.sourceOfFunds ||
						(proposal.isOffer && !proposal.sourceOfFunds
							? proposal.proposer
							: acceptor);

					Object.assign(proposal, {
						sourceOfFunds,
					});

					const encodedProposalData = await this.encodeProposalData(
						proposal,
						creditAmount,
					);

					const proposalInclusionProof = await getInclusionProof(proposal);

					const proposalSpec = {
						proposalContract: proposal.proposalContract,
						proposalData: encodedProposalData,
						proposalInclusionProof,
						signature: proposal.signature as Hex,
					};

					const lenderSpec = {
						sourceOfFunds,
					};

					const callerSpec = {
						refinancingLoanId: 0n,
						revokeNonce: false,
						nonce: 0n,
					};

					const extra = "0x";

					return {
						to: getLoanContractAddress(proposal.chainId),
						data: encodeFunctionData({
							abi: pwnSimpleLoanAbi,
							functionName: "createLOAN",
							args: [proposalSpec, lenderSpec, callerSpec, extra],
						}),
					};
				},
			),
		);

		const approvals = await this.getApprovalCalls(proposals);

		const chainId = proposals[0].proposalToAccept.chainId;

		const callsWithApprovals = approvals.concat(calls);

		// currently only signle chain-context is supported
		await switchChain(this.config, {
			chainId,
		});

		if (await mayUserSendCalls(this.config, chainId)) {
			const hash = await sendCalls(this.config, {
				calls: callsWithApprovals,
			});

			return await waitForCallsStatus(this.config, hash)
		}

		const receipts: SendTransactionReturnType[] = []

		for (const call of callsWithApprovals) {
			const receipt = await sendTransaction(this.config, call);
			receipts.push(receipt)
		}

		return {
			status: "success",
			receipts,
		}
	}
}
