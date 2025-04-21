import type { BaseAsset } from "@pwndao/sdk-core";
import { useAssetPrice } from "@pwndao/sdk-v1-react";
import { formatUnits } from "viem";

export const AssetPrice = ({ asset }: { asset: BaseAsset }) => {
	const { data: price } = useAssetPrice(asset);
	const formattedPrice = formatUnits(price ?? 0n, asset.decimals);
	if (!price) return null;
	return <span className="text-sm text-gray-500">${formattedPrice}</span>;
};
