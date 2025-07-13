import { UniswapV3LpSetProposal } from '../models/proposals/uniswap-v3-lp-set-proposal.js'
import { BaseProposalContract } from './base-proposal-contract.js'
import {
    type IServerAPI,
    type ProposalWithHash,
    type ProposalWithSignature,
    readPwnSimpleLoanUniswapV3LpSetProposalGetCreditAmount,
    readPwnSimpleLoanUniswapV3LpSetProposalGetProposalHash,
    writePwnSimpleLoanUniswapV3LpSetProposalMakeProposal,
    type IProposalContract
} from '../index.js'
import { type AddressString, getUniswapV3LpSetProposalContractAddress, type Hex, type SupportedChain } from '@pwndao/sdk-core';
import type { Address } from 'viem';
import { getAccount } from '@wagmi/core';

export interface IProposalUniswapV3LpSetContract
    extends IProposalContract<UniswapV3LpSetProposal> {
    getCreditAmount(
        creditAddress: AddressString,
        collateralId: bigint,
        token0Denominator: boolean,
        feedIntermediaryDenominations: AddressString[],
        feedInvertFlags: boolean[],
        loanToValue: bigint,
        chainId: SupportedChain
    ): Promise<bigint>;
}

export class UniswapV3LpSetProposalContract
    extends BaseProposalContract<UniswapV3LpSetProposal>
    implements IProposalUniswapV3LpSetContract {


	async getProposalHash(proposal: UniswapV3LpSetProposal): Promise<Hex> {
		const data = await readPwnSimpleLoanUniswapV3LpSetProposalGetProposalHash(
            this.config,
            {
                address: getUniswapV3LpSetProposalContractAddress(proposal.chainId),
                chainId: proposal.chainId,
                args: [proposal.createProposalStruct()],
            }
        )

		return data;
	}

    async signProposal(
        proposal: UniswapV3LpSetProposal,
    ): Promise<ProposalWithSignature> {
        const hash = await this.getProposalHash(proposal);

        const domain = {
            name: "PWNSimpleLoanUniswapV3LpSetProposal",
            version: "1.0",
            chainId: proposal.chainId,
            verifyingContract: getUniswapV3LpSetProposalContractAddress(proposal.chainId),
        }

        const signature = await this.signWithSafeWalletSupport(
            domain,
            UniswapV3LpSetProposal.ERC712_TYPES,
            "Proposal",
            proposal.createProposalStruct(),
        )

        return Object.assign(proposal, {
            signature,
            hash,
            isOnChain: true,
        }) as ProposalWithSignature;
    }

    async getCreditAmount(
        creditAddress: AddressString,
        collateralId: bigint,
        token0Denominator: boolean,
        feedIntermediaryDenominations: AddressString[],
        feedInvertFlags: boolean[],
        loanToValue: bigint,
        chainId: SupportedChain
    ): Promise<bigint> {
        const data = await readPwnSimpleLoanUniswapV3LpSetProposalGetCreditAmount(
            this.config,
            {
                address: getUniswapV3LpSetProposalContractAddress(chainId),
                chainId,
                args: [
                    creditAddress,
                    collateralId,
                    token0Denominator,
                    feedIntermediaryDenominations,
                    feedInvertFlags,
                    loanToValue
                ],
            }
        )

        return data;
    }

	async createProposal(
		proposal: UniswapV3LpSetProposal,
		deps: { persistProposal: IServerAPI["post"]["persistProposal"] },
	): Promise<ProposalWithSignature> {
		console.warn(
			"UniswapV3LpSetProposalContract.createProposal is not implemented",
			proposal,
			deps,
		);
		// TODO: Implement actual proposal creation logic.
		// This involves signing the proposal (using getProposalHash and signProposal)
		// and potentially persisting it via the provided deps.persistProposal.
		// See ChainLinkProposalContract for an example implementation.
		throw new Error(
			"Method UniswapV3LpSetProposalContract.createProposal not implemented.",
		);
	}

	async createOnChainProposal(
		proposal: UniswapV3LpSetProposal,
	): Promise<ProposalWithSignature> {
		const account = getAccount(this.config);
        const isSafe = account?.address
            ? await this.safeService.isSafeAddress(account.address as Address)
            : false;

        const proposalHash = await writePwnSimpleLoanUniswapV3LpSetProposalMakeProposal(
            this.config,
            {
                address: getUniswapV3LpSetProposalContractAddress(proposal.chainId),
                chainId: proposal.chainId,
                args: [proposal.createProposalStruct()],
            }
        )

        if (isSafe) {
            await this.safeService.waitForTransaction(proposalHash);
        }
        
        return Object.assign(proposal, {
            signature: null,
            hash: proposalHash,
            isOnChain: true,
        }) as ProposalWithSignature;
	}

    async createMultiProposal(
		proposals: ProposalWithHash[],
	): Promise<ProposalWithSignature[]> {
		console.warn(
			"UniswapV3LpSetProposalContract.createMultiProposal is not implemented",
			proposals,
		);
		// TODO: Implement actual multi-proposal creation using Merkle tree logic
		// See ChainLinkProposalContract for an example implementation.
		throw new Error(
			"Method UniswapV3LpSetProposalContract.createMultiProposal not implemented.",
		);
	}
}