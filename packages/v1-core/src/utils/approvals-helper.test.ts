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
			const uniqueKey = getUniqueKey({
				address: mockAddress1,
				chainId,
			});
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

	describe("acceptProposals", () => {
		it("Should call acceptProposals on the contract", async () => {
			const proposals = [createMockProposalRequest()];

			await acceptProposals(proposals, mockDeps);

			expect(mockProposalContract.acceptProposals).toHaveBeenCalledWith(
				proposals,
				{},
			);
		});

		it("Should pass totalToApprove to the contract", async () => {
			const proposals = [createMockProposalRequest()];
			const totalToApprove = {
				uniqueKey: 5000n,
			};

			await acceptProposals(proposals, mockDeps, totalToApprove);

			expect(mockProposalContract.acceptProposals).toHaveBeenCalledWith(
				proposals,
				totalToApprove,
			);
		});

		it("Should throw error when no proposals provided", async () => {
			await expect(acceptProposals([], mockDeps)).rejects.toThrow(
				"Proposals must be provided",
			);
		});

		it("Should throw error when credit amount is zero", async () => {
			const invalidProposal = createMockProposalRequest();
			invalidProposal.creditAmount = 0n;

			await expect(
				acceptProposals([invalidProposal], mockDeps),
			).rejects.toThrow("Credit amount must be greater than zero");
		});

		it("Should throw error when proposals are from different chains", async () => {
			const proposal1 = createMockProposalRequest();

			// Create a proposal with a different chain ID
			const proposal2 = createMockProposalRequest();
			const differentChainProposal =
				proposal2.proposalToAccept as Partial<ProposalWithSignature>;
			differentChainProposal.chainId = SupportedChain.Polygon;

			await expect(
				acceptProposals([proposal1, proposal2], mockDeps),
			).rejects.toThrow("All proposals must be on the same chain");
		});
	});
});
