import path from "node:path";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
/// <reference types='vitest' />
import { defineConfig } from "vite";

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: "../../node_modules/.vite/apps/example-vue",
	server: {
		port: 8080,
		host: "localhost",
		proxy: {
			"/api": {
				target: "https://api-staging.pwn.xyz",
				changeOrigin: true,
			},
		},
	},
	css: {
		postcss: {
			plugins: [tailwind(), autoprefixer()],
		},
	},
	preview: {
		port: 4300,
		host: "localhost",
	},
	plugins: [vue()],
	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ nxViteTsPaths() ],
	// },
	build: {
		outDir: "./dist",
		emptyOutDir: true,
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	define: {
		"process.env": {
			PWN_API_URL: process.env.VITE_PWN_API_URL,
		},
	},
	test: {
		watch: false,
		globals: true,
		environment: "jsdom",
		include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		reporters: ["default"],
		coverage: {
			reportsDirectory: "./test-output/vitest/coverage",
			provider: "v8" as const,
		},
	},
}));
