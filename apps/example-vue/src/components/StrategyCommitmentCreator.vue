<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMakeProposals, useUserWithNonce } from '@pwndao/sdk-v1-vue';
import {
  type Strategy,
  createElasticProposals,
} from '@pwndao/v1-core';
import { serialize } from '@wagmi/core';
import { useAccount, useConfig, useConnect, useDisconnect } from '@wagmi/vue';
import { ref } from 'vue';
import { sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

const props = defineProps<{
  strategy: Strategy;
}>();

const { address, isConnected } = useAccount();
const { connect } = useConnect();
const { disconnect } = useDisconnect();
const config = useConfig();

// Form state
const creditAmount = ref('100');
const errorMessage = ref<string | null>(null);

const { userWithNonce: user } = useUserWithNonce([sepolia.id]);
const {
  mutateAsync: makeProposal,
  isPending: isLoading,
  isSuccess,
  error,
  data: txHash,
} = useMakeProposals(user);

// Handle form submission
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  errorMessage.value = null;

  if (!isConnected.value || !address.value || !user.value) {
    connect({ connector: injected() });
    return;
  }

  try {
    // Create proposals with proper parameters
    const proposalsToCreate = createElasticProposals(
      props.strategy,
      address.value,
      creditAmount.value,
      config
    );

    const res = await makeProposal(proposalsToCreate);
    console.log('Proposals created successfully:', res);
  } catch (err) {
    console.error('Error creating commitment:', err);
    errorMessage.value =
      err instanceof Error ? err.message : 'An unknown error occurred';
  }
};
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Commit Funds to Strategy</CardTitle>
      <CardDescription>
        Commit funds to {{ strategy.name }} strategy
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form class="space-y-4" @submit="handleSubmit">
        <!-- Wallet Connection -->
        <div class="p-4 bg-muted rounded-md">
          <div v-if="isConnected" class="space-y-2">
            <p class="text-green-600 font-medium">Connected: {{ address }}</p>
            <Button variant="destructive" size="sm" @click="disconnect">
              Disconnect
            </Button>
          </div>
          <div v-else class="space-y-2">
            <p class="text-yellow-600">Wallet not connected</p>
            <Button
              variant="default"
              @click="connect({ connector: injected() })"
            >
              Connect Wallet
            </Button>
          </div>
        </div>

        <!-- Credit Amount Input -->
        <div class="space-y-2">
          <Label for="creditAmount">Credit Amount</Label>
          <Input
            id="creditAmount"
            v-model="creditAmount"
            type="text"
            placeholder="Enter amount to commit"
            required
          />
          <p class="text-sm text-muted-foreground">
            Enter the amount you want to commit to this strategy
          </p>
        </div>

        <!-- Strategy Terms Display -->
        <div class="space-y-2">
          <h3 class="font-medium">Strategy Terms</h3>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-muted-foreground">APR:</span>
              <span class="ml-2"
                >{{
                  strategy.terms.apr[Object.keys(strategy.terms.apr)[0]]
                }}%</span
              >
            </div>
            <div>
              <span class="text-muted-foreground">LTV:</span>
              <span class="ml-2"
                >{{
                  strategy.terms.ltv[Object.keys(strategy.terms.ltv)[0]]
                }}%</span
              >
            </div>
            <div>
              <span class="text-muted-foreground">Duration:</span>
              <span class="ml-2">{{ strategy.terms.durationDays }} days</span>
            </div>
            <div>
              <span class="text-muted-foreground">Expiration:</span>
              <span class="ml-2">{{ strategy.terms.expirationDays }} days</span>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <Button
          :type="'submit'"
          as="button"
          :disabled="isLoading || (!isConnected && !address)"
          class="w-full"
        >
          {{
            isLoading
              ? 'Creating Commitment...'
              : !isConnected
              ? 'Connect Wallet to Continue'
              : 'Commit Funds'
          }}
        </Button>
      </form>

      <!-- Transaction Status -->
      <div
        v-if="isLoading"
        class="mt-6 p-4 bg-blue-50 text-blue-700 rounded-md"
      >
        <p class="font-medium">Transaction in progress...</p>
      </div>

      <div
        v-if="isSuccess"
        class="mt-6 p-4 bg-green-50 text-green-700 rounded-md"
      >
        <p class="font-medium">Commitment created successfully!</p>
        <p v-if="txHash" class="mt-2">
          Transaction Hash:
          <a
            :href="`https://sepolia.etherscan.io/tx/${txHash}`"
            target="_blank"
            rel="noopener noreferrer"
            class="ml-2 text-blue-500 hover:underline"
          >
            {{ JSON.stringify(serialize(txHash)) }}
          </a>
        </p>
      </div>

      <div
        v-if="error || errorMessage"
        class="mt-6 p-4 bg-red-50 text-red-700 rounded-md"
      >
        <p class="font-medium">Error creating commitment:</p>
        <p class="mt-1">
          {{ errorMessage || error?.message || String(error) }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>
