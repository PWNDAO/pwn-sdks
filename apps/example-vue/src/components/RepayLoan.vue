<template>
  <div
    class="w-full max-w-md mx-auto bg-white rounded-lg shadow-md border border-gray-200"
  >
    <!-- Card Header -->
    <div class="p-6 pb-0">
      <h2 class="text-2xl font-semibold text-center mb-1">Repay Loan</h2>
      <p class="text-center text-gray-500 text-sm mb-4">
        Enter loan details to repay your loan
      </p>
    </div>

    <!-- Card Content -->
    <div class="p-6 space-y-4">
      <div class="space-y-2">
        <label for="loanId" class="text-sm font-medium text-gray-700 block"
          >Loan ID</label
        >
        <input
          id="loanId"
          v-model="loanId"
          type="text"
          placeholder="Enter loan ID"
          class="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div class="space-y-2">
        <label for="chainId" class="text-sm font-medium text-gray-700 block"
          >Chain</label
        >
        <select
          id="chainId"
          v-model="chainId"
          class="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="1">Ethereum (1)</option>
          <option value="137">Polygon (137)</option>
          <option value="10">Optimism (10)</option>
          <option value="42161">Arbitrum (42161)</option>
        </select>
      </div>

      <!-- Error Alert -->
      <div
        v-if="error"
        class="bg-destructive/15 text-destructive text-sm rounded-md p-4 border border-destructive/30 flex items-start"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2 h-4 w-4 shrink-0 mt-0.5"
          aria-label="Warning icon"
          role="img"
        >
          <path
            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
          />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <div>{{ error }}</div>
      </div>

      <!-- Success Alert -->
      <div
        v-if="transactionHash"
        class="bg-green-50 text-green-800 border-green-200 border rounded-md p-4 text-sm flex items-start"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2 h-4 w-4 shrink-0 mt-0.5"
          aria-label="Success icon"
          role="img"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <div class="flex flex-col">
          <span>Transaction successful!</span>
          <a
            :href="getBlockExplorerLink()"
            target="_blank"
            class="flex items-center text-blue-600 hover:underline mt-2"
          >
            View on Block Explorer
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ml-1 h-3 w-3"
              aria-label="External link icon"
              role="img"
            >
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
              />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Card Footer -->
    <div class="p-6 pt-0">
      <button
        @click="handleRepayLoan"
        :disabled="isLoading"
        class="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
      >
        {{ isLoading ? 'Processing...' : 'Repay Loan' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { repayLoan } from '@pwndao/v1-core';
import { SimpleLoanContract } from '@pwndao/v1-core';
import { useAccount, useConfig } from 'vagmi';
import { computed, ref } from 'vue';

const loanId = ref('');
const chainId = ref('1');
const isLoading = ref(false);
const error = ref('');
const transactionHash = ref('');

const { address } = useAccount();
const config = useConfig();

const handleRepayLoan = async () => {
  if (!loanId.value) {
    error.value = 'Please enter a valid Loan ID';
    return;
  }

  if (!address.value) {
    error.value = 'Please connect your wallet';
    return;
  }

  error.value = '';
  isLoading.value = true;
  transactionHash.value = '';

  try {
    const loanContract = new SimpleLoanContract(config);

    await repayLoan(
      {
        loanId: BigInt(loanId.value),
        repayer: address.value,
        chainId: Number(chainId.value),
      },
      {
        loanContract,
      }
    );

    // This would typically come from a transaction receipt
    transactionHash.value = 'transaction-hash';
  } catch (err) {
    console.error('Error repaying loan:', err);
    error.value = err.message || 'Failed to repay loan';
  } finally {
    isLoading.value = false;
  }
};

const getBlockExplorerLink = () => {
  const blockExplorers = {
    1: 'https://etherscan.io/tx/',
    137: 'https://polygonscan.com/tx/',
    10: 'https://optimistic.etherscan.io/tx/',
    42161: 'https://arbiscan.io/tx/',
  };

  return blockExplorers[chainId.value] + transactionHash.value;
};
</script>

<style>
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --destructive: 0 84.2% 60.2%;
  --ring: 210 40% 96.1%;
}

.bg-primary {
  background-color: hsl(var(--primary));
}

.text-primary-foreground {
  color: hsl(var(--primary-foreground));
}

.bg-destructive\/15 {
  background-color: hsla(var(--destructive), 0.15);
}

.text-destructive {
  color: hsl(var(--destructive));
}

.border-destructive\/30 {
  border-color: hsla(var(--destructive), 0.3);
}

.focus\:ring-primary:focus {
  --tw-ring-color: hsl(var(--primary));
}

.focus\:border-primary:focus {
  border-color: hsl(var(--primary));
}

.focus\:ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}
</style>
