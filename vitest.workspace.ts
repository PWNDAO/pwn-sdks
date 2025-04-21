import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
	"apps/example-next/**",
	{
		plugins: [nxViteTsPaths()],
		test: {
			globals: true,
			environment: "jsdom",
		},
	},
	"packages/*/vitest.config.{e2e,unit}.ts",
	{
		plugins: [nxViteTsPaths()],
		test: {
			globals: true,
			environment: "jsdom",
		},
	},
]);
