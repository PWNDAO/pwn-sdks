import { faker } from '@faker-js/faker'
import { describe, it, vi } from 'vitest'
import { acceptProposal } from './accept-proposal.js'
import { ProposalWithSignature } from '../models/strategies/types.js'
import { AddressString } from '@pwndao/sdk-core'

describe("Test accept proposal", () => {

    it("Should accept proposal", async () => {
        const proposal = vi.fn() as unknown as ProposalWithSignature
        const acceptor = faker.finance.ethereumAddress() as AddressString
        const creditAmount = BigInt(1e18)

        const acceptMock = vi.fn()
        const reqParams = {
            proposalToAccept: proposal,
            acceptor,
            creditAmount
        }

        await acceptProposal(
            reqParams,
            {
                proposalContract: {
                    acceptProposal: acceptMock,
                }
            }
        )

        expect(acceptMock).toHaveBeenCalledWith(
            reqParams.proposalToAccept,
            acceptor,
            creditAmount
        )
    })

    it("Credit amount must be greater than zero", async () => {
        const proposal = vi.fn() as unknown as ProposalWithSignature
        const acceptor = faker.finance.ethereumAddress() as AddressString
        const creditAmount = -1n

        const acceptMock = vi.fn()
        const reqParams = {
            proposalToAccept: proposal,
            acceptor,
            creditAmount
        }

        const mockError = "Credit amount must be greater than zero."

		await expect(
            acceptProposal(
                reqParams,
                {
                    proposalContract: {
                        acceptProposal: acceptMock,
                    }
                }
            )
        ).rejects.toThrow(mockError);
    })
})