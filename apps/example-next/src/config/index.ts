import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage } from "@wagmi/core";
import { mainnet, arbitrum, base, polygon, sepolia } from '@reown/appkit/networks'


export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
	throw new Error("Project ID is not defined");
}

export const networks = [mainnet, arbitrum, base, polygon, sepolia];

export const wagmiAdapter = new WagmiAdapter({
	storage: createStorage({
		storage: cookieStorage,
	}),
	ssr: true,
	projectId,
	networks,
});

export const config = wagmiAdapter.wagmiConfig;
