/**
 * Gets the base URL for API requests from environment variables
 * Prioritizes VITE_PWN_API_URL for client-side, falls back to PWN_API_URL for server-side,
 * and defaults to production API if neither is available
 * @returns {string} The base URL for API requests
 */
const getBaseURL = (): string => {
  return process.env.VITE_PWN_API_URL || process.env.PWN_API_URL || 'https://api.pwn.xyz';
};

const baseURL = getBaseURL();
 
 export const customInstance = async <T>({
   url,
   method,
   params,
   data,
 }: {
   url: string;
   method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
   params?: Record<string, string>;
   data?: unknown;
   responseType?: string;
 }): Promise<T> => {
   let targetUrl = `${baseURL}${url}`;
 
   if (params) {
     targetUrl += `?${new URLSearchParams(params).toString()}`;
   }
 
   const response = await fetch(targetUrl, {
     method,
     ...(data ? { body: JSON.stringify(data) } : {}),
   });
 
   return response.json();
 };
 
 export default customInstance;