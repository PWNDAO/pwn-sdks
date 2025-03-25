import * as path from "node:path";
/// <reference types='vitest' />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	root: __dirname,
	cacheDir: "../../node_modules/.vite/packages/core",
	plugins: [
		dts({
			entryRoot: "src",
			tsconfigPath: path.join(__dirname, "tsconfig.lib.json"),
		}),
	],
	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ nxViteTsPaths() ],
	// },
	// Configuration for building your library.
	// See: https://vitejs.dev/guide/build.html#library-mode
	build: {
		outDir: "./dist",
		emptyOutDir: true,
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
		lib: {
			// Could also be a dictionary or array of multiple entry points.
			entry: "src/index.ts",
			name: "@pwndao/sdk-core",
			fileName: "index",
			// Change this to the formats you want to support.
			// Don't forget to update your package.json as well.
			formats: ["es"],
		},
		rollupOptions: {
			// External packages that should not be bundled into your library.
			external: [
				"@faker-js/faker",
			],
		},
	},
});
