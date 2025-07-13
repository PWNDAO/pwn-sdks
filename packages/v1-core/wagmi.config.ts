import { defineConfig } from "@wagmi/cli";
import { foundry } from "@wagmi/cli/plugins";
import { actions } from "@wagmi/cli/plugins";
// eslint-disable-next-line @nx/enforce-module-boundaries
import deployments from "../../contracts/solidity/deployments/protocol/v1.4.json";

export default defineConfig({
	out: "src/generated.ts",
	plugins: [
		foundry({
			deployments: deployments,
			project: "../../contracts/solidity",
		}),
		actions(),
	],
});
