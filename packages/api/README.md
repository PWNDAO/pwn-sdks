# pwn-sdk-api

This library was generated with [Nx](https://nx.dev).

## Configuration

The SDK uses environment variables to determine the API endpoint:

```bash
# Client-side (Vite-based applications)
VITE_PWN_API_URL=https://your-custom-api.example.com

# Server-side applications
PWN_API_URL=https://your-custom-api.example.com

# Defaults to https://api.pwn.xyz if no environment variables are set
```

## Building

Run `nx build pwn-sdk-api` to build the library.

## Running unit tests

Run `nx test pwn-sdk-api` to execute the unit tests via [Vitest](https://vitest.dev/).
