import { describe, it, expect, vi } from 'vitest';
import type { Mock } from 'vitest';
import { generateAddress, SupportedChain } from '@pwndao/sdk-core';
import { API } from '@pwndao/v1-core';
import { useUserWithNonce } from './use-user-with-nonce';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';

vi.mock('wagmi', () => ({
  useAccount: vi.fn().mockReturnValue({ address: generateAddress(), isConnected: true }),
}));

vi.mock('@pwndao/v1-core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@pwndao/v1-core')>();
  return {
    ...actual,
    API: {
      get: {
        recentNonce: vi.fn().mockResolvedValue([1n, 0n]),
      },
    },
  };
});

const queryClient = new QueryClient()
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useUserWithNonce', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the user with nonce', async () => {

    (API.get.recentNonce as unknown as Mock).mockResolvedValue([1n, 0n]);

    const { result } = renderHook(() => useUserWithNonce([SupportedChain.Sepolia]), { wrapper });

    await waitFor(() => expect(result.current.userWithNonce).toBeDefined());
    
    expect(result.current.userWithNonce).toBeDefined();
    expect(result.current.userWithNonce?.user.address).toBeDefined();
    expect(result.current.userWithNonce?.nonces).toBeDefined();
    expect(result.current.userWithNonce?.nonces[SupportedChain.Sepolia]).toBeDefined();
    expect(result.current.userWithNonce?.nonces[SupportedChain.Sepolia]?.[0]).toBe(1n);
    expect(result.current.userWithNonce?.nonces[SupportedChain.Sepolia]?.[1]).toBe(0n);
  });
});
