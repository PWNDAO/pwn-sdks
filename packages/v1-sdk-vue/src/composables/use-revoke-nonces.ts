import type { AddressString, SupportedChain } from "@pwndao/sdk-core";
import { RevokedNonceContract, revokeProposals } from "@pwndao/v1-core";
import { useMutation } from "@tanstack/vue-query";
import { useConfig } from "@wagmi/vue";
import { computed } from "vue";

export const useRevokeNonces = () => {
    const config = useConfig();
    const contract = computed(() => new RevokedNonceContract(config))

    return useMutation({
        mutationKey: ['revokeNonces'],
        mutationFn: ({
            proposalNonces,
            chainId,
            owner,
            nonceSpace,
        }: {
            proposalNonces: bigint[];
            chainId: SupportedChain;
            owner: AddressString;
            nonceSpace: bigint;
        }) => revokeProposals(proposalNonces, chainId, owner, nonceSpace, contract.value),
    });
}