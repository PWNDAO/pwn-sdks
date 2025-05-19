import { faker } from "@faker-js/faker";
import type { AddressString } from "@pwndao/sdk-core";
import { describe, it, vi } from "vitest";
import type { ProposalWithSignature } from "../models/strategies/types.js";
import { acceptProposal } from "./accept-proposal.js";

describe("Test accept proposal", () => {
	it("Should accept proposal", async () => {
		const proposal = vi.fn() as unknown as ProposalWithSignature;
		const acceptor = faker.finance.ethereumAddress() as AddressString;
		const creditAmount = BigInt(1e18);

		const acceptProposalsMock = vi.fn();
		const reqParams = {
			proposalToAccept: proposal,
			acceptor,
			creditAmount,
		};

		await acceptProposal([reqParams], {
			proposalContract: {
				acceptProposals: acceptProposalsMock,
			},
		});

		expect(acceptProposalsMock).toHaveBeenCalledWith(
			[
				{
					proposal: proposal,
					acceptor,
					creditAmount,
					proposalContract: {
						acceptProposals: acceptProposalsMock,
					},
				},
			],
		);
	});

	it("Credit amount must be greater than zero", async () => {
		const proposal = vi.fn() as unknown as ProposalWithSignature;
		const acceptor = faker.finance.ethereumAddress() as AddressString;
		const creditAmount = -1n;

		const acceptProposalsMock = vi.fn();

		const reqParams = {
			proposalToAccept: proposal,
			acceptor,
			creditAmount,
		};

		const mockError = "Credit amount must be greater than zero";

		await expect(
			acceptProposal([reqParams], {
				proposalContract: {
					acceptProposals: acceptProposalsMock,
				},
			}),
		).rejects.toThrow(mockError);
	});
});
