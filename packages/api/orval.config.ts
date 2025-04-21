import { defineConfig } from "orval";

export default defineConfig({
	"pwn-api-transformer": {
		output: {
			mode: "tags",
			namingConvention: "kebab-case",
			httpClient: "fetch",
			client: "fetch",
			workspace: "./src/generated",
			target: "./methods",
			schemas: "./schemas",
			docs: true,
			prettier: true,
			// baseUrl: 'https://api.pwn.xyz'
			override: {
				mutator: {
					path: "../custom-instance.ts",
					name: "customInstance",
				},
				fetch: { 
					includeHttpResponseReturnType: false,
				},
			},
		},
		input: "./src/schema.yaml",
	},
});
