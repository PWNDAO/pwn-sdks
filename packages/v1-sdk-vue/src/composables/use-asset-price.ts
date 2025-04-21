import type { BaseAsset } from "@pwndao/sdk-core";
import { useQuery } from "@tanstack/vue-query";
import { API } from "@pwndao/v1-core";

export const useAssetPrice = (asset: BaseAsset) => {
  return useQuery({
    queryKey: ["asset-price", asset],
    queryFn: ({ queryKey }) => API.get.getAssetUsdUnitPrice(queryKey[1] as BaseAsset),
  });
};
