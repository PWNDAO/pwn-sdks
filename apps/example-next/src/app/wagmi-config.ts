import { defineChain } from "viem";
import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

export const sonicMainnet = defineChain({
	id: 4337,
	name: "Sonic Mainnet",
	nativeCurrency: {
		decimals: 18,
		name: "Sonic",
		symbol: "S",
	},
	rpcUrls: {
		default: {
			http: ["https://mainnet.sonic.app/rpc"],
		},
		public: {
			http: ["https://mainnet.sonic.app/rpc"],
		},
	},
	blockExplorers: {
		default: {
			name: "Sonic Explorer",
			url: "https://explorer.sonic.app",
		},
	},
});

export const wagmiConfig = createConfig({
	chains: [sepolia, sonicMainnet],
	transports: {
		[sepolia.id]: http("https://sepolia.drpc.org"),
		[sonicMainnet.id]: http("https://mainnet.sonic.app/rpc"),
	},
});
