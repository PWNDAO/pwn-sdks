import { faker } from "@faker-js/faker";
import {
	type AddressString,
	SupportedChain,
	generateAddress,
	getMockToken,
	getUniqueKey,
} from "@pwndao/sdk-core";
import { describe, it, vi } from "vitest";
import type { ProposalWithSignature } from "../models/strategies/types.js";
import { acceptProposals } from "./accept-proposals.js";

describe("Test accept proposals", () => {
	const proposalContract = {
		acceptProposals: vi.fn(),
		encodeProposalData: vi.fn(),
	};

	it("Should accept proposals", async () => {
		const proposal = vi.fn() as unknown as ProposalWithSignature;
		const acceptor = faker.finance.ethereumAddress() as AddressString;
		const creditAmount = BigInt(1e18);
		const mockToken = getMockToken();


		const reqParams = {
			proposalToAccept: proposal,
			acceptor,
			creditAmount,
			creditAsset: mockToken,
		};

		await acceptProposals([reqParams], { proposalContract });

		expect(proposalContract.acceptProposals).toHaveBeenCalledWith(
			[
				{
					proposalToAccept: proposal,
					acceptor,
					creditAmount,
					creditAsset: mockToken,
				},
			],
			{},
		);
	});

	it("Credit amount must be greater than zero", async () => {
		const proposal = vi.fn() as unknown as ProposalWithSignature;
		const acceptor = faker.finance.ethereumAddress() as AddressString;
		const creditAmount = 0n;
		const mockToken = getMockToken();

		const reqParams = {
			proposalToAccept: proposal,
			acceptor,
			creditAmount,
			creditAsset: mockToken,
		};

		const mockError = "Credit amount must be greater than zero";

		await expect(
			acceptProposals([reqParams], { proposalContract }),
		).rejects.toThrow(mockError);
	});

	it("Proposals must be on the same chain", async () => {
		const proposal = vi.fn() as unknown as ProposalWithSignature;
		const acceptor = faker.finance.ethereumAddress() as AddressString;
		const creditAmount = BigInt(1e18);
		const mockToken = getMockToken();

		const reqParams = {
			proposalToAccept: proposal,
			acceptor,
			creditAmount,
			creditAsset: mockToken,
		};

		const mockError = "All proposals must be on the same chain";

		await expect(
			acceptProposals(
				[
					{
						...reqParams,
						proposalToAccept: {
							...proposal,
							chainId: SupportedChain.Ethereum,
						} as ProposalWithSignature,
					},
					{
						...reqParams,
						proposalToAccept: {
							...proposal,
							chainId: SupportedChain.Base,
						} as ProposalWithSignature,
					},
				],
				{
					proposalContract,
				},
			),
		).rejects.toThrow(mockError);
	});

	it("Extra approval calls are added when needed", async () => {
		const proposal = vi.fn() as unknown as ProposalWithSignature;
		const acceptor = faker.finance.ethereumAddress() as AddressString;
		const creditAmount = BigInt(1e18);
		const mockToken = getMockToken();

		const reqParams = {
			proposalToAccept: proposal,
			acceptor,
			creditAmount,
			creditAsset: mockToken,
		};

		const additionalToApprove = {
			[`${mockToken.address}-${SupportedChain.Ethereum}`]: {
				amount: BigInt(1e18),
				asset: mockToken,
				spender: generateAddress(),
			},
		};

		await acceptProposals(
			[reqParams],
			{
				proposalContract,
			},
			additionalToApprove,
		);

		expect(proposalContract.acceptProposals).toHaveBeenCalledWith(
			[
				{
					proposalToAccept: proposal,
					acceptor,
					creditAmount,
					creditAsset: mockToken,
				},
			],
			additionalToApprove,
		);
	});

	it("Should issue approval with no proposals and totalToApprove provided", async () => {
		const mockToken = getMockToken();

		const spender = generateAddress();

		await acceptProposals(
			[],
			{ proposalContract },
			{
				[getUniqueKey(mockToken)]: {
					amount: BigInt(1e18),
					asset: mockToken,
					spender,
				},
			},
		);

		expect(proposalContract.acceptProposals).toHaveBeenCalledWith([], {
			[getUniqueKey(mockToken)]: {
				amount: BigInt(1e18),
				asset: mockToken,
				spender,
			},
		});
	});
});
