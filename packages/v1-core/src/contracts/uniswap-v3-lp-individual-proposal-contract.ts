import { type AddressString, getUniswapV3IndividualProposalContractAddress, type Hex, type SupportedChain } from "@pwndao/sdk-core";
import type { IProposalContract } from "../factories/helpers.js";
import { UniswapV3IndividualProposal } from "../models/proposals/uniswap-v3-lp-individual-proposal.js";
import { BaseProposalContract } from "./base-proposal-contract.js";
import { type IServerAPI, type ProposalWithHash, type ProposalWithSignature, readPwnSimpleLoanUniswapV3LpIndividualProposalGetCreditAmount, readPwnSimpleLoanUniswapV3LpIndividualProposalGetProposalHash, writePwnSimpleLoanUniswapV3LpIndividualProposalMakeProposal } from "../index.js";
import { getAccount } from "@wagmi/core";
import type { Address } from "viem";
export interface IProposalUniswapV3LpIndividualContract
    extends IProposalContract<UniswapV3IndividualProposal> {
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

export class UniswapV3LpIndividualProposalContract
    extends BaseProposalContract<UniswapV3IndividualProposal>
    implements IProposalUniswapV3LpIndividualContract {

    async getProposalHash(proposal: UniswapV3IndividualProposal): Promise<Hex> {
        const data = await readPwnSimpleLoanUniswapV3LpIndividualProposalGetProposalHash(
            this.config,
            {
                address: getUniswapV3IndividualProposalContractAddress(proposal.chainId),
                chainId: proposal.chainId,
                args: [proposal.createProposalStruct()],
            }
        )

        return data;
    }

    async signProposal(
        proposal: UniswapV3IndividualProposal,
    ): Promise<ProposalWithSignature> {
        const hash = await this.getProposalHash(proposal);

        const domain = {
            name: "PWNSimpleLoanUniswapV3LpIndividualProposal",
            version: "1.0",
            chainId: proposal.chainId,
            verifyingContract: getUniswapV3IndividualProposalContractAddress(proposal.chainId),
        }

        const signature = await this.signWithSafeWalletSupport(
            domain,
            UniswapV3IndividualProposal.ERC712_TYPES,
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
        const data = await readPwnSimpleLoanUniswapV3LpIndividualProposalGetCreditAmount(
            this.config,
            {
                address: getUniswapV3IndividualProposalContractAddress(chainId),
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
        proposal: UniswapV3IndividualProposal,
        deps: { persistProposal: IServerAPI["post"]["persistProposal"] },
    ): Promise<ProposalWithSignature> {
        console.warn(
            "UniswapV3IndividualProposalContract.createProposal is not implemented",
            proposal,
            deps,
        );
        // TODO: Implement actual proposal creation logic.
        // This involves signing the proposal (using getProposalHash and signProposal)
        // and potentially persisting it via the provided deps.persistProposal.
        throw new Error(
            "Method UniswapV3IndividualProposalContract.createProposal not implemented.",
        );
    }

    async createOnChainProposal(
        proposal: UniswapV3IndividualProposal,
    ): Promise<ProposalWithSignature> {
        const account = getAccount(this.config);
        const isSafe = account?.address
            ? await this.safeService.isSafeAddress(account.address as Address)
            : false;

        const proposalHash = await writePwnSimpleLoanUniswapV3LpIndividualProposalMakeProposal(
            this.config,
            {
                address: getUniswapV3IndividualProposalContractAddress(proposal.chainId),
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
            "UniswapV3IndividualProposalContract.createMultiProposal is not implemented",
            proposals,
        );
        // TODO: Implement actual multi-proposal creation using Merkle tree logic
        // See ChainLinkProposalContract for an example implementation.
        throw new Error(
            "Method UniswapV3IndividualProposalContract.createMultiProposal not implemented.",
        );
    }
}