/**
 * Gets the base URL for API requests from environment variables
 * Prioritizes VITE_PWN_API_URL for client-side, falls back to PWN_API_URL for server-side,
 * and defaults to production API if neither is available
 * @returns {string} The base URL for API requests
 */
const getBaseURL = (): string => {
	// Check for Vite environment (browser/client-side)
	if (typeof import.meta !== "undefined" && import.meta.env) {
		if (import.meta.env.VITE_PWN_API_URL) {
			return import.meta.env.VITE_PWN_API_URL;
		}
	}

	// Check for Node.js environment (server-side)
	if (typeof process !== "undefined" && process.env) {
		if (process.env.NEXT_PUBLIC_PWN_API_URL) {
			return process.env.NEXT_PUBLIC_PWN_API_URL;
		}
		if (process.env.VITE_PWN_API_URL) {
			return process.env.VITE_PWN_API_URL;
		}
		if (process.env.PWN_API_URL) {
			return process.env.PWN_API_URL;
		}
	}

	// Default fallback for any environment
	return "https://api.pwn.xyz";
};

export const customInstance = async <T>(
	url: string,
	{
		method,
		headers,
		body,
		params,
	}: {
		method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
		headers?: HeadersInit;
		body?: RequestInit["body"];
		params?: Record<string, string>;
	},
): Promise<T> => {
	const baseURL = getBaseURL();
	let targetUrl = `${baseURL}${url}`;

	if (params) {
		targetUrl += `?${new URLSearchParams(params).toString()}`;
	}

	const response = await fetch(targetUrl, {
		method,
		headers,
		body,
	});

	return response.json();
};

export default customInstance;
