import {
	SupportedProtocol,
	generateAddress,
	getMockPoolToken,
	getMockToken,
	getUniqueKey,
} from "@pwndao/sdk-core";
import { SupportedChain } from "@pwndao/sdk-core";
import type { ERC20Token } from "@pwndao/sdk-core";
import type { AddressString } from "@pwndao/sdk-core";
import { readContracts } from "@wagmi/core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	type AcceptProposalDeps,
	type AcceptProposalRequest,
	acceptProposals,
} from "../actions/accept-proposals.js";
import type { BaseProposalContract } from "../contracts/base-proposal-contract.js";
import { ProposalType } from "../models/proposals/proposal-base.js";
import type { ProposalWithSignature } from "../models/strategies/types.js";
import type { Proposal } from "../models/strategies/types.js";
import { getApprovals } from "./approvals-helper.js";
import { decodeFunctionData } from "viem";
import { erc20Abi } from "viem";

vi.mock("@wagmi/core", () => ({
	readContracts: vi.fn(),
}));

describe("Approvals Helper", () => {
	const mockAddress1 = generateAddress() as AddressString;
	const mockAddress2 = generateAddress() as AddressString;
	const mockLoanContract = generateAddress() as AddressString;
	const chainId = SupportedChain.Ethereum;

	const mockProposalContract = {
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
	};

	const mockDeps: AcceptProposalDeps = {
		proposalContract: mockProposalContract,
	};

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

	// Create a mock proposal request
	const createMockProposalRequest = (
		isOffer = false,
	): AcceptProposalRequest => ({
		proposalToAccept: createMockProposal(isOffer),
		acceptor: "0x9876543210987654321098765432109876543210" as AddressString,
		creditAmount: 1000n,
		creditAsset: mockToken,
	});

	beforeEach(() => {
		vi.clearAllMocks();

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
		it("Should return approval transactions when allowance is insufficient", async () => {
			const proposals = [createMockProposalRequest()];

			(
				readContracts as unknown as ReturnType<typeof vi.fn>
			).mockResolvedValueOnce([
				{ result: 500n, status: "success" }, // allowance
				{ result: 2000n, status: "success" }, // balance
			]);

			const contractWithType =
				mockProposalContract as unknown as BaseProposalContract<Proposal>;
			const approvals = await getApprovals(proposals, contractWithType);

			expect(approvals).toHaveLength(1);
			expect(approvals[0].to).toBe(mockAddress1);
			expect(typeof approvals[0].data).toBe("string");
		});

		it("Should return empty array when allowance is sufficient", async () => {
			(
				readContracts as unknown as ReturnType<typeof vi.fn>
			).mockResolvedValueOnce([
				{ result: 2000n, status: "success" }, // allowance > amount
				{ result: 2000n, status: "success" }, // balance
			]);

			const proposals = [createMockProposalRequest()];

			const contractWithType =
				mockProposalContract as unknown as BaseProposalContract<Proposal>;
			const approvals = await getApprovals(proposals, contractWithType);

			expect(approvals).toHaveLength(0);
		});

		it("Should throw error when balance is insufficient", async () => {
			(
				readContracts as unknown as ReturnType<typeof vi.fn>
			).mockResolvedValueOnce([
				{ result: 2000n, status: "success" }, // allowance
				{ result: 500n, status: "success" }, // balance < amount
			]);

			const proposals = [createMockProposalRequest()];

			const contractWithType =
				mockProposalContract as unknown as BaseProposalContract<Proposal>;
			await expect(getApprovals(proposals, contractWithType)).rejects.toThrow(
				/Not enough balance/,
			);
		});

		it("Should handle lending proposals correctly", async () => {
			const proposals = [createMockProposalRequest(true)]; // isOffer = true for lending

			(readContracts as unknown as ReturnType<typeof vi.fn>)
				.mockResolvedValueOnce([
					{ result: 1000n, status: "success" }, // readCollateralAmount
				])
				.mockResolvedValueOnce([
					{ result: 500n, status: "success" }, // allowance
					{ result: 2000n, status: "success" }, // balance
				]);

			const contractWithType =
				mockProposalContract as unknown as BaseProposalContract<Proposal>;
			const result = await getApprovals(proposals, contractWithType);

			expect(mockProposalContract.getReadCollateralAmount).toHaveBeenCalled();
			expect(result).toHaveLength(1);
			expect(result[0].to).toBe(mockAddress2);
			expect(typeof result[0].data).toBe("string");
		});

		it("Should use totalToApprove value when provided", async () => {
			const proposals = [createMockProposalRequest()];
			const uniqueKey = getUniqueKey({
				address: mockAddress1,
				chainId,
			});

			(
				readContracts as unknown as ReturnType<typeof vi.fn>
			).mockResolvedValueOnce([
				{ result: 500n, status: "success" }, // allowance
				{ result: 2000n, status: "success" }, // balance
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
				totalToApprove,
			);

			expect(approvals[0].to).toBe(mockAddress1);
		});

		it("Should issue approval for proposal and additional approval for unrelated token", async () => {
			const proposals = [createMockProposalRequest()];
			const spender = generateAddress();
			const mockToken2 = getMockPoolToken(
				mockAddress1,
				SupportedProtocol.AAVE,
				chainId,
			);

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
				totalToApprove,
			);

			// one approval for proposal token, one for pool token, one for underlying token
			expect(approvals).toHaveLength(3);
			expect(approvals[0].to).toBe(mockAddress1);
			expect(approvals[1].to).toBe(mockToken2.address);
			expect(approvals[2].to).toBe(mockToken2.underlyingAddress);
		});
	});

	it("Should issue 2 approvals when is accepting borrowing proposal with pool token as credit asset", async () => {
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
			[getUniqueKey({
				address: poolTokenUnderlyingAddress,
				chainId,
			})]: {
				amount: 5000n,
				asset: mockToken2,
				spender,
			},
		};

		const contractWithType =
			mockProposalContract as unknown as BaseProposalContract<Proposal>;
		const approvals = await getApprovals([
			{
				...proposals[0],
				proposalToAccept: {
					...proposals[0].proposalToAccept,
					creditAddress: mockToken2.address,
				} as ProposalWithSignature,
			},
		], contractWithType, totalToApprove);

		expect(approvals).toHaveLength(2);
	});

	it("Should issue 2 + 2 approvals when is accepting borrowing proposal with pool token as credit asset and a separate credit", async () => {
		const proposals = [createMockProposalRequest()];
		const spender = generateAddress();
		const poolTokenUnderlyingAddress = generateAddress();

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
			[getUniqueKey({
				address: poolTokenUnderlyingAddress,
				chainId,
			})]: {
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
		const approvals = await getApprovals([
			{
				...proposals[0],
				proposalToAccept: {
					...proposals[0].proposalToAccept,
					creditAddress: mockToken2.address,
				} as ProposalWithSignature,
			},
		], contractWithType, totalToApprove);

		expect(approvals).toHaveLength(4);
	});

	it("Should correctly summarize amount of pool and underlying tokens to approve", async () => {
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
			[getUniqueKey({
				address: mockToken2.address,
				chainId,
			})]: {
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
		const approvals = await getApprovals([
			{
				...proposals[0],
				proposalToAccept: {
					...proposals[0].proposalToAccept,
					creditAddress: mockToken2.address,
				} as ProposalWithSignature,
			},
		], contractWithType, totalToApprove);

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
});
