//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require("@nx/next");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	nx: {
		// Set this to true if you would like to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},

	eslint: {
		ignoreDuringBuilds: true,
	},

	// Add transpilePackages to ensure proper handling of monorepo packages
	transpilePackages: [
		"@pwndao/sdk-core",
		"@pwndao/v1-core",
		"@pwndao/sdk-v1-react",
		"@pwndao/api-sdk",
	],

	// Configure webpack to handle React Query properly
	webpack: (config, { isServer }) => {
		// Fix for pino-pretty
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
				net: false,
				tls: false,
				"pino-pretty": false,
			};
		}

		return config;
	},
	// backend expects trailing slashes
	trailingSlash: true,
	// showing kids how to bypass the cors
	async rewrites() {
		return [
			// Handle URLs without trailing slash
			{
				source: "/api/v1/:path*",
				destination: "http://api-staging.pwn.xyz/api/v1/:path*",
			},
			// Handle URLs that already have a trailing slash
			{
				source: "/api/v1/:path*/",
				destination: "https://api-staging.pwn.xyz/api/v1/:path*/",
			},
			// Handle URLs that already have a trailing slash
			{
				source: "/api/v2/:path*/",
				destination: "https://api-staging.pwn.xyz/api/v2/:path*/",
			},
			// Handle URLs without trailing slash
			{
				source: "/api/v2/:path*",
				destination: "https://api-staging.pwn.xyz/api/v2/:path*",
			},
		];
	},
};

const plugins = [
	// Add more Next.js plugins to this list if needed.
	withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
