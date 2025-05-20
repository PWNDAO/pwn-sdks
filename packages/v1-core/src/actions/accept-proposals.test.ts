import { faker } from "@faker-js/faker";
import { type AddressString, getMockToken, SupportedChain } from "@pwndao/sdk-core";
import { describe, it, vi } from "vitest";
import type { ProposalWithSignature } from "../models/strategies/types.js";
import { acceptProposals } from "./accept-proposals.js";

describe("Test accept proposals", () => {
	it("Should accept proposals", async () => {
		const proposal = vi.fn() as unknown as ProposalWithSignature;
		const acceptor = faker.finance.ethereumAddress() as AddressString;
		const creditAmount = BigInt(1e18);
		const mockToken = getMockToken();

		const acceptProposalsMock = vi.fn();
		const encodeProposalDataMock = vi.fn();

		const reqParams = {
			proposalToAccept: proposal,
			acceptor,
			creditAmount,
			creditAsset: mockToken,
		};

		await acceptProposals([reqParams], {
			proposalContract: {
				acceptProposals: acceptProposalsMock,
				encodeProposalData: encodeProposalDataMock,
			},
		});

		expect(acceptProposalsMock).toHaveBeenCalledWith([
			{
				proposalToAccept: proposal,
				acceptor,
				creditAmount,
				creditAsset: mockToken,
			},
		]);
	});

	it("Credit amount must be greater than zero", async () => {
		const proposal = vi.fn() as unknown as ProposalWithSignature;
		const acceptor = faker.finance.ethereumAddress() as AddressString;
		const creditAmount = 0n;
		const mockToken = getMockToken();

		const acceptProposalsMock = vi.fn();
		const encodeProposalDataMock = vi.fn();

		const reqParams = {
			proposalToAccept: proposal,
			acceptor,
			creditAmount,
			creditAsset: mockToken,
		};

		const mockError = "Credit amount must be greater than zero";

		await expect(
			acceptProposals([reqParams], {
				proposalContract: {
					acceptProposals: acceptProposalsMock,
					encodeProposalData: encodeProposalDataMock,
				},
			}),
		).rejects.toThrow(mockError);
	});

	it("Proposals must be on the same chain", async () => {
		const proposal = vi.fn() as unknown as ProposalWithSignature;
		const acceptor = faker.finance.ethereumAddress() as AddressString;
		const creditAmount = BigInt(1e18);
		const mockToken = getMockToken();

		const proposalContract = {
			acceptProposals: vi.fn(),
			encodeProposalData: vi.fn(),
		};

		const reqParams = {
			proposalToAccept: proposal,
			acceptor,
			creditAmount,
			creditAsset: mockToken,
		};

		const mockError = "All proposals must be on the same chain";

		await expect(
			acceptProposals([
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
			], {
				proposalContract,
			}),
		).rejects.toThrow(mockError);
	});
});
