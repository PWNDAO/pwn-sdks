import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useConfig } from "wagmi"
import { getCollateralAmount, IProposalSpecificParams } from "@pwndao/v1-core";
import { ChainLinkProposalContract } from "@pwndao/v1-core";
import { ElasticProposalContract } from "@pwndao/v1-core";
import { ProposalType } from "@pwndao/v1-core";
import { useState } from "react";


export const useGetCollateralAmount = (params: IProposalSpecificParams, options?: UseQueryOptions) => {
    const config = useConfig()
    const [contract, _] = useState<ElasticProposalContract | ChainLinkProposalContract>(() => {
        if (params.type === ProposalType.Elastic) {
            return new ElasticProposalContract(config);
        } else {
            return new ChainLinkProposalContract(config);
        }
    });

    return useQuery({
        queryKey: ["get-proposal-collateral-amount", params],
        queryFn: () => getCollateralAmount(contract, params.availableCreditLimit, params),
        ...options,
    });
};