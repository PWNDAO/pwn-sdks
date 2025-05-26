import {
	SupportedProtocol,
	generateAddress,
	getMockPoolToken,
	getMockToken,
	getPwnSimpleLoanAddress,
	getUniqueKey,
} from "@pwndao/sdk-core";
import { SupportedChain } from "@pwndao/sdk-core";
import type { ERC20Token, UniqueKey } from "@pwndao/sdk-core";
import type { AddressString } from "@pwndao/sdk-core";
import { readContracts } from "@wagmi/core";
import { decodeFunctionData } from "viem";
import { erc20Abi } from "viem";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type {
	AcceptProposalDeps,
	AcceptProposalRequest,
} from "../actions/accept-proposals.js";
import type { BaseProposalContract } from "../contracts/base-proposal-contract.js";
import { ProposalType } from "../models/proposals/proposal-base.js";
import type { ProposalWithSignature } from "../models/strategies/types.js";
import type { Proposal } from "../models/strategies/types.js";
import { getApprovals, getApprovalsToVerify } from "./approvals-helper.js";

vi.mock("@wagmi/core", () => ({
	readContracts: vi.fn(),
}));

// --- Helper Functions ---
const mockAddress1 = generateAddress() as AddressString;
const mockAddress2 = generateAddress() as AddressString;
const mockLoanContract = generateAddress() as AddressString;
const chainId = SupportedChain.Ethereum;
const userAddress = generateAddress() as AddressString;

const getMockProposalContract = () => ({
	acceptProposals: vi.fn().mockResolvedValue({ status: "success" }),
	encodeProposalData: vi.fn(),
	config: {},
	getReadCollateralAmount: vi.fn(),
	getProposalHash: vi.fn(),
	createProposal: vi.fn(),
	createOnChainProposal: vi.fn(),
	createMultiProposal: vi.fn(),
	safeService: {},
	signProposal: vi.fn(),
});

const mockToken: ERC20Token = getMockToken();

const createBasicProposal = (): Partial<ProposalWithSignature> => ({
	chainId,
	creditAddress: mockAddress1,
	collateralAddress: mockAddress2,
	loanContract: mockLoanContract,
	signature: "0xsignature" as `0x${string}`,
	hash: "0xhash" as `0x${string}`,
	isOnChain: false,
	type: ProposalType.Elastic,
	isOffer: false,
});

const createMockProposal = (isOffer = false): ProposalWithSignature => {
	const proposal = createBasicProposal();
	proposal.isOffer = isOffer;
	return proposal as ProposalWithSignature;
};

const createMockProposalRequest = (isOffer = false): AcceptProposalRequest => ({
	proposalToAccept: createMockProposal(isOffer),
	acceptor: "0x9876543210987654321098765432109876543210" as AddressString,
	creditAmount: 1000n,
	creditAsset: mockToken,
});

// --- Test Suite ---
describe("Approvals Helper", () => {
	let mockProposalContract: ReturnType<typeof getMockProposalContract>;
	let mockDeps: AcceptProposalDeps;

	beforeEach(() => {
		vi.clearAllMocks();
		mockProposalContract = getMockProposalContract();
		mockDeps = { proposalContract: mockProposalContract };

		(readContracts as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([
			{ result: 500n, status: "success" }, // allowance
			{ result: 2000n, status: "success" }, // balance
		]);

		mockProposalContract.getReadCollateralAmount.mockReturnValue({
			abi: [],
			address: mockAddress2,
			functionName: "getRequiredCollateral",
			args: [],
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("getApprovals", () => {
		describe("Borrowing Proposals", () => {
			it("returns approval transactions when allowance is insufficient", async () => {
				const proposals = [createMockProposalRequest()];
				(
					readContracts as unknown as ReturnType<typeof vi.fn>
				).mockResolvedValueOnce([
					{ result: 500n, status: "success" },
					{ result: 2000n, status: "success" },
				]);
				const contractWithType =
					mockProposalContract as unknown as BaseProposalContract<Proposal>;
				const approvals = await getApprovals(
					proposals,
					contractWithType,
					userAddress,
				);
				expect(approvals).toHaveLength(1);
				expect(approvals[0].to).toBe(mockAddress1);
				expect(typeof approvals[0].data).toBe("string");
			});

			it("returns empty array when allowance is sufficient", async () => {
				(
					readContracts as unknown as ReturnType<typeof vi.fn>
				).mockResolvedValueOnce([
					{ result: 2000n, status: "success" },
					{ result: 2000n, status: "success" },
				]);
				const proposals = [createMockProposalRequest()];
				const contractWithType =
					mockProposalContract as unknown as BaseProposalContract<Proposal>;
				const approvals = await getApprovals(
					proposals,
					contractWithType,
					userAddress,
				);
				expect(approvals).toHaveLength(0);
			});
		});

		describe("Lending Proposals", () => {
			it("handles lending proposals correctly", async () => {
				const proposals = [createMockProposalRequest(true)]; // isOffer = true for lending
				(readContracts as unknown as ReturnType<typeof vi.fn>)
					.mockResolvedValueOnce([
						{ result: 1000n, status: "success" }, // readCollateralAmount
					])
					.mockResolvedValueOnce([
						{ result: 500n, status: "success" },
						{ result: 2000n, status: "success" },
					]);
				const contractWithType =
					mockProposalContract as unknown as BaseProposalContract<Proposal>;
				const result = await getApprovals(
					proposals,
					contractWithType,
					userAddress,
				);
				expect(mockProposalContract.getReadCollateralAmount).toHaveBeenCalled();
				expect(result).toHaveLength(1);
				expect(result[0].to).toBe(mockAddress2);
				expect(typeof result[0].data).toBe("string");
			});
		});

		describe("totalToApprove Scenarios", () => {
			it("uses totalToApprove value when provided", async () => {
				const proposals = [createMockProposalRequest()];
				const uniqueKey = getUniqueKey({ address: mockAddress1, chainId });
				(
					readContracts as unknown as ReturnType<typeof vi.fn>
				).mockResolvedValueOnce([
					{ result: 500n, status: "success" },
					{ result: 2000n, status: "success" },
				]);
				const totalToApprove = {
					[uniqueKey]: {
						amount: 5000n,
						asset: mockToken,
					},
				};
				const contractWithType =
					mockProposalContract as unknown as BaseProposalContract<Proposal>;
				const approvals = await getApprovals(
					proposals,
					contractWithType,
					userAddress,
					totalToApprove,
				);
				expect(approvals[0].to).toBe(mockAddress1);
			});

			it("issues approval for proposal and additional approval for unrelated token", async () => {
				const proposals = [createMockProposalRequest()];
				const spender = generateAddress();

				const token2Address = generateAddress();
				const token3Address = generateAddress();

				const mockToken2 = getMockPoolToken(
					token2Address,
					SupportedProtocol.AAVE,
					chainId,
					token3Address,
				);

				(
					readContracts as unknown as ReturnType<typeof vi.fn>
				).mockResolvedValueOnce([
					{ result: 0n, status: "success" },
					{ result: 0n, status: "success" },
					{ result: 0n, status: "success" },
				]);

				const totalToApprove = {
					[getUniqueKey(mockToken2)]: {
						amount: 5000n,
						asset: mockToken2,
						spender,
					},
				};
				const contractWithType =
					mockProposalContract as unknown as BaseProposalContract<Proposal>;
				const approvals = await getApprovals(
					proposals,
					contractWithType,
					userAddress,
					totalToApprove,
				);
				expect(approvals).toHaveLength(3);
				expect(approvals[0].to).toBe(mockAddress1);
				expect(approvals[1].to).toBe(mockToken2.address);
				expect(approvals[2].to).toBe(mockToken2.underlyingAddress);
			});
		});
	});

	describe("Pool Token and Underlying Approvals", () => {
		it("issues 2 approvals for borrowing proposal with pool token as credit asset", async () => {
			const proposals = [createMockProposalRequest()];
			const spender = generateAddress();
			const poolTokenUnderlyingAddress = generateAddress();
			const mockToken2 = getMockPoolToken(
				mockAddress1,
				SupportedProtocol.AAVE,
				chainId,
				poolTokenUnderlyingAddress,
			);
			const totalToApprove = {
				[getUniqueKey({ address: poolTokenUnderlyingAddress, chainId })]: {
					amount: 5000n,
					asset: mockToken2,
					spender,
				},
			};
			const contractWithType =
				mockProposalContract as unknown as BaseProposalContract<Proposal>;
			const approvals = await getApprovals(
				[
					{
						...proposals[0],
						proposalToAccept: {
							...proposals[0].proposalToAccept,
							creditAddress: mockToken2.address,
						} as ProposalWithSignature,
					},
				],
				contractWithType,
				userAddress,
				totalToApprove,
			);
			expect(approvals).toHaveLength(2);
		});

		it("issues 2 approvals when accepting borrowing proposal with no proposals", async () => {
			const spender = generateAddress();
			const poolTokenUnderlyingAddress = generateAddress();
			const mockToken2 = getMockPoolToken(
				mockAddress1,
				SupportedProtocol.AAVE,
				chainId,
				poolTokenUnderlyingAddress,
			);
			const totalToApprove = {
				[getUniqueKey({ address: poolTokenUnderlyingAddress, chainId })]: {
					amount: 5000n,
					asset: mockToken2,
					spender,
				},
			};
			const contractWithType =
				mockProposalContract as unknown as BaseProposalContract<Proposal>;
			const approvals = await getApprovals(
				[],
				contractWithType,
				userAddress,
				totalToApprove,
			);
			expect(approvals).toHaveLength(2);
		});

		it("issues 2 + 2 approvals for borrowing proposal with pool token as credit asset and a separate credit", async () => {
			const proposals = [createMockProposalRequest()];
			const spender = generateAddress();
			const poolTokenUnderlyingAddress = generateAddress();

			(readContracts as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([
				{ result: 0n, status: "success" },
				{ result: 0n, status: "success" },
				{ result: 0n, status: "success" },
				{ result: 0n, status: "success" },
			]);

			const mockToken2 = getMockPoolToken(
				mockAddress1,
				SupportedProtocol.AAVE,
				chainId,
				poolTokenUnderlyingAddress,
			);
			const mockToken3 = getMockPoolToken(
				mockAddress2,
				SupportedProtocol.AAVE,
				chainId,
				generateAddress(),
			);

			const totalToApprove = {
				[getUniqueKey(mockToken2)]: {
					amount: 5000n,
					asset: mockToken2,
					spender,
				},
				[getUniqueKey(mockToken3)]: {
					amount: 5000n,
					asset: mockToken3,
					spender,
				},
			};
			const contractWithType =
				mockProposalContract as unknown as BaseProposalContract<Proposal>;
			const approvals = await getApprovals(
				[
					{
						...proposals[0],
						proposalToAccept: {
							...proposals[0].proposalToAccept,
							creditAddress: mockToken2.address,
						} as ProposalWithSignature,
					},
				],
				contractWithType,
				userAddress,
				totalToApprove,
			);

			expect(approvals).toHaveLength(4);
		});
	});

	describe("Summarizing Pool and Underlying Token Approvals", () => {
		it("correctly summarizes amount of pool and underlying tokens to approve", async () => {
			const proposals = [createMockProposalRequest()];
			const spender = generateAddress();
			const token3Address = generateAddress();
			const mockToken3 = getMockToken(
				SupportedChain.Ethereum,
				token3Address,
				18,
			);
			const mockToken2 = getMockPoolToken(
				mockToken3.address,
				SupportedProtocol.AAVE,
				chainId,
				mockAddress1,
			);
			const totalToApprove = {
				[getUniqueKey({ address: mockToken2.address, chainId })]: {
					amount: 5000n,
					asset: mockToken2,
					spender,
				},
				[getUniqueKey(mockToken3)]: {
					amount: 5000n,
					asset: mockToken3,
					spender,
				},
			};
			const contractWithType =
				mockProposalContract as unknown as BaseProposalContract<Proposal>;
			const approvals = await getApprovals(
				[
					{
						...proposals[0],
						proposalToAccept: {
							...proposals[0].proposalToAccept,
							creditAddress: mockToken2.address,
						} as ProposalWithSignature,
					},
				],
				contractWithType,
				userAddress,
				totalToApprove,
			);
			expect(approvals).toHaveLength(2);

			const tx1Decoded = decodeFunctionData({
				abi: erc20Abi,
				data: approvals[0].data,
			});
			const tx2Decoded = decodeFunctionData({
				abi: erc20Abi,
				data: approvals[1].data,
			});
			expect(tx1Decoded.args[1]).toBe(5000n);
			expect(tx2Decoded.args[1]).toBe(10000n);
		});

		it("correctly summarizes amount of pool and underlying tokens to approve with no proposals", async () => {
			const spender = generateAddress();
			const token3Address = generateAddress();

			const mockToken3 = getMockToken(
				SupportedChain.Ethereum,
				token3Address,
				18,
			);

			const mockToken2 = getMockPoolToken(
				mockToken3.address,
				SupportedProtocol.AAVE,
				chainId,
				mockAddress1,
			);

			const totalToApprove = {
				[getUniqueKey(mockToken3)]: {
					amount: 5000n,
					asset: mockToken3,
					spender,
				},
				[getUniqueKey(mockToken2)]: {
					amount: 5000n,
					asset: mockToken2,
					spender,
				},
			};
			const contractWithType =
				mockProposalContract as unknown as BaseProposalContract<Proposal>;
			const approvals = await getApprovals(
				[],
				contractWithType,
				userAddress,
				totalToApprove,
			);
			expect(approvals).toHaveLength(2);

			const tx1Decoded = decodeFunctionData({
				abi: erc20Abi,
				data: approvals[0].data,
			});
			const tx2Decoded = decodeFunctionData({
				abi: erc20Abi,
				data: approvals[1].data,
			});
			expect(tx1Decoded.args[1]).toBe(10000n);
			expect(tx2Decoded.args[1]).toBe(5000n);
		});

		it("Does not issue approvals is already approved", async () => {
			const spender = generateAddress();
			const token3Address = generateAddress();

			const mockToken3 = getMockToken(
				SupportedChain.Ethereum,
				token3Address,
				18,
			);

			const mockToken2 = getMockPoolToken(
				mockToken3.address,
				SupportedProtocol.AAVE,
				chainId,
				mockAddress1,
			);

			(
				readContracts as unknown as ReturnType<typeof vi.fn>
			).mockResolvedValueOnce([
				{ result: 20000n, status: "success" }, // allowance
				{ result: 20000n, status: "success" }, // balance
			]);

			const totalToApprove = {
				[getUniqueKey(mockToken3)]: {
					amount: 5000n,
					asset: mockToken3,
					spender,
				},
				[getUniqueKey(mockToken2)]: {
					amount: 5000n,
					asset: mockToken2,
					spender,
				},
			};
			const contractWithType =
				mockProposalContract as unknown as BaseProposalContract<Proposal>;
			const approvals = await getApprovals(
				[],
				contractWithType,
				userAddress,
				totalToApprove,
			);

			expect(approvals).toHaveLength(0);
		});
	});

	describe("createAllowanceAndBalanceCalls", () => {
		const spender = getPwnSimpleLoanAddress(
			SupportedChain.Ethereum,
		) as AddressString;

		it("Creates allowance and balance calls for normal token", () => {
			const token3Address = generateAddress();

			const mockToken3 = getMockToken(
				SupportedChain.Ethereum,
				token3Address,
				18,
			);

			const items = {
				[getUniqueKey(mockToken3)]: {
					proposals: [],
					acceptor: spender,
					amount: 5000n,
					asset: mockToken3,
				},
			};
			const totalToApprove = {};

			const calls = getApprovalsToVerify(items, userAddress, totalToApprove);

			expect(Object.keys(calls).length).toBe(1);

			for (const [key, value] of Object.entries(calls)) {
				expect(key).toBe(getUniqueKey(mockToken3));
				expect(value.address).toBe(mockToken3.address);
				expect(value.amount).toBe(5000n);
				expect(value.userAddress).toBe(userAddress as AddressString);
				expect(value.spender).toBe(spender);
			}
		});

		it("Creates allowance and balance calls for pool token", () => {
			// pool token spender is the acceptor
			const spender = generateAddress();
			const token3Address = generateAddress();

			const mockToken3 = getMockToken(
				SupportedChain.Ethereum,
				token3Address,
				18,
			);

			const mockToken2 = getMockPoolToken(
				mockToken3.address,
				SupportedProtocol.AAVE,
				chainId,
				mockAddress1,
			);

			const items = {
				[getUniqueKey(mockToken2)]: {
					proposals: [],
					acceptor: spender,
					amount: 5000n,
					asset: mockToken2,
				},
			};
			const totalToApprove = {};

			const calls = getApprovalsToVerify(items, userAddress, totalToApprove);

			const firstApproval = calls[Object.keys(calls)[0] as UniqueKey];
			const secondApproval = calls[Object.keys(calls)[1] as UniqueKey];

			expect(Object.keys(calls).length).toBe(2);

			expect(firstApproval.address).toBe(mockToken2.address);
			expect(firstApproval.amount).toBe(5000n);
			expect(firstApproval.userAddress).toBe(userAddress as AddressString);
			expect(firstApproval.spender).toBe(spender as AddressString);

			expect(secondApproval.address).toBe(mockToken2.underlyingAddress);
			expect(secondApproval.amount).toBe(5000n);
			expect(secondApproval.userAddress).toBe(userAddress as AddressString);
			expect(secondApproval.spender).toBe(
				getPwnSimpleLoanAddress(chainId) as AddressString,
			);
		});

		it("Proposals are not provided only totalToApprove with credit token", () => {
			const token3Address = generateAddress();

			const mockToken3 = getMockToken(
				SupportedChain.Ethereum,
				token3Address,
				18,
			);

			const items = {};
			const totalToApprove = {
				[getUniqueKey(mockToken3)]: {
					amount: 5000n,
					asset: mockToken3,
					spender,
				},
			};

			const calls = getApprovalsToVerify(items, userAddress, totalToApprove);

			const firstApproval = calls[Object.keys(calls)[0] as UniqueKey];

			expect(firstApproval.address).toBe(mockToken3.address);
			expect(firstApproval.amount).toBe(5000n);
			expect(firstApproval.userAddress).toBe(userAddress as AddressString);
			expect(firstApproval.spender).toBe(spender as AddressString);
		});

		it("Proposals are not provided only totalToApprove with pool token", () => {
			const token3Address = generateAddress();
			const mockToken3 = getMockToken(
				SupportedChain.Ethereum,
				token3Address,
				18,
			);

			const mockToken2 = getMockPoolToken(
				mockToken3.address,
				SupportedProtocol.AAVE,
				chainId,
				mockAddress1,
			);

			const totalToApprove = {
				[getUniqueKey(mockToken2)]: {
					amount: 5000n,
					asset: mockToken2,
					spender,
				},
			};

			const calls = getApprovalsToVerify({}, userAddress, totalToApprove);

			const firstApproval = calls[Object.keys(calls)[0] as UniqueKey];
			const secondApproval = calls[Object.keys(calls)[1] as UniqueKey];

			expect(Object.keys(calls).length).toBe(2);

			expect(firstApproval.address).toBe(mockToken2.address);
			expect(firstApproval.amount).toBe(5000n);
			expect(firstApproval.userAddress).toBe(userAddress as AddressString);
			expect(firstApproval.spender).toBe(spender as AddressString);

			expect(secondApproval.address).toBe(mockToken2.underlyingAddress);
			expect(secondApproval.amount).toBe(5000n);
			expect(secondApproval.userAddress).toBe(userAddress as AddressString);
			expect(secondApproval.spender).toBe(spender as AddressString);
		});
	});
});
