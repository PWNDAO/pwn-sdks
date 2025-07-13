import type { AddressString, ERC20TokenLike } from "@pwndao/sdk-core";
import { useAcceptProposals } from "@pwndao/sdk-v1-react";
import {
	ChainLinkProposalContract,
	ElasticProposalContract,
	ProposalType,
	type ProposalWithSignature,
	mayUserSendCalls,
} from "@pwndao/v1-core";
import { sendCalls, sendTransaction, waitForCallsStatus } from "@wagmi/core";
import { useMemo } from "react";
import { useAccount, useConfig } from "wagmi";
import { fixProposalLtv } from "./AcceptProposalButton";

type AcceptProposalsProps = {
	proposals: (ProposalWithSignature & { creditAsset: ERC20TokenLike })[];
	proposer?: AddressString;
};

export const AcceptProposals = ({
	proposals,
	proposer,
}: AcceptProposalsProps) => {
	const config = useConfig();
	const { address } = useAccount();

	const proposalContract = useMemo(() => {
		if (proposals.length === 0) {
			return new ElasticProposalContract(config);
		}

		if (proposals[0].type === ProposalType.Elastic) {
			return new ElasticProposalContract(config);
		}
		if (proposals[0].type === ProposalType.ChainLink) {
			return new ChainLinkProposalContract(config);
		}
		throw new Error("Invalid proposal type");
	}, [config, proposals[0]?.type, proposals.length]);

	const {
		mutateAsync: acceptProposal,
		isPending,
		error,
	} = useAcceptProposals({
		proposalContract,
	});

	if (!proposer) {
		return null;
	}

	const handleAcceptProposals = async () => {
		const toExecute = await acceptProposal({
			proposalsToAccept: proposals.map((proposal) => ({
				proposalToAccept: fixProposalLtv(proposal),
				acceptor: proposer,
				creditAmount: BigInt(proposal.availableCreditLimit),
				creditAsset: proposal.creditAsset,
			})),
			userAddress: address,
		});

		if (await mayUserSendCalls(config, proposals[0].chainId)) {
			const toAwait = await sendCalls(config, {
				calls: toExecute,
			});

			const res = await waitForCallsStatus(config, toAwait);
			console.log(res);
		} else {
			for (const call of toExecute) {
				sendTransaction(config, call);
			}
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<span>Accepting {proposals.length} proposals</span>
			<button onClick={handleAcceptProposals} type="button">
				{isPending ? "Accepting..." : "Accept Proposals"}
			</button>

			{error && <span>Error: {error.message}</span>}
		</div>
	);
};
