<script setup lang="ts">
import ProposalsList from '@/components/ProposalsList.vue';
import StrategyCommitmentCreator from '@/components/StrategyCommitmentCreator.vue';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useStrategy } from '@pwndao/sdk-v1-vue';
import { formatUnits } from 'viem';
import { useRoute, useRouter } from 'vue-router';
import AssetPrice from '@/components/AssetPrice.vue';
const route = useRoute();
const router = useRouter();
const strategyId = route.params.id as string;

const {
  data: strategy,
  isLoading: isLoadingStrategy,
  error: strategyError,
} = useStrategy(strategyId);

const firstCollateralAsset = strategy.value?.terms.collateralAssets[0];
const firstCreditAsset = strategy.value?.terms.creditAssets[0];
const pairKey =
  firstCollateralAsset && firstCreditAsset
    ? `${firstCollateralAsset.address}/${firstCollateralAsset.chainId}-${firstCreditAsset.address}/${firstCreditAsset.chainId}`
    : '';
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <div v-if="isLoadingStrategy" class="animate-pulse">
      <div class="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div class="space-y-4">
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>

    <div
      v-else-if="strategyError"
      class="bg-red-50 border-l-4 border-red-500 p-4"
    >
      <p class="text-red-700">
        Error loading strategy details: {{ strategyError.message }}
      </p>
    </div>

    <div
      v-else-if="!strategy"
      class="bg-yellow-50 border-l-4 border-yellow-500 p-4"
    >
      <p class="text-yellow-700">Strategy not found</p>
    </div>

    <div v-else class="max-w-4xl mx-auto">
      <div class="mb-6">
        <Button variant="outline" size="sm" @click="router.push('/strategies')">
          ← Back to Strategies
        </Button>
      </div>

      <h1 class="text-3xl font-bold mb-2">{{ strategy.name }}</h1>
      <p class="text-gray-600 mb-8">Strategy ID: {{ strategyId }}</p>

      <div class="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Strategy Overview</CardTitle>
            <CardDescription>Details about this strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div v-if="strategy.description">
                <h3 class="font-semibold text-lg mb-2">Description</h3>
                <p class="text-gray-700">{{ strategy.description }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 class="font-semibold text-lg mb-2">Lending Stats</h3>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Total Committed:</span>
                      <span class="font-medium"
                        >{{
                          formatUnits(
                            strategy.lendingStats.totalCommittedAmount,
                            18
                          )
                        }}
                        USD</span
                      >
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Total Utilized:</span>
                      <span class="font-medium"
                        >{{
                          formatUnits(
                            strategy.lendingStats.totalUtilizedAmount,
                            18
                          )
                        }}
                        USD</span
                      >
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Total Available:</span>
                      <span class="font-medium"
                        >{{
                          formatUnits(
                            strategy.lendingStats.totalAvailableAmount,
                            18
                          )
                        }}
                        USD</span
                      >
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="font-semibold text-lg mb-2">Borrowing Stats</h3>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Total Borrowed:</span>
                      <span class="font-medium"
                        >{{
                          formatUnits(
                            strategy.borrowingStats.totalBorrowedAmount,
                            18
                          )
                        }}
                        USD</span
                      >
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Total Repaid:</span>
                      <span class="font-medium"
                        >{{
                          formatUnits(
                            strategy.borrowingStats.totalRepaidAmount,
                            18
                          )
                        }}
                        USD</span
                      >
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Total Defaulted:</span>
                      <span class="font-medium"
                        >{{
                          formatUnits(
                            strategy.borrowingStats.totalDefaultedAmount,
                            18
                          )
                        }}
                        USD</span
                      >
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Active Borrowed:</span>
                      <span class="font-medium"
                        >{{
                          formatUnits(
                            strategy.borrowingStats.activeBorrowedAmount,
                            18
                          )
                        }}
                        USD</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <StrategyCommitmentCreator :strategy="strategy" />

        <Card>
          <CardHeader>
            <CardTitle>Terms</CardTitle>
            <CardDescription>Strategy terms and conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-semibold text-lg mb-2">Credit Assets</h3>
                <ul class="list-disc pl-5 space-y-1">
                  <li
                    v-for="(asset, index) in strategy.terms.creditAssets"
                    :key="index"
                    class="flex items-center"
                  >
                    <img
                      :src="asset.icon"
                      :alt="asset.name"
                      class="w-4 h-4 mr-2"
                    />
                    <span class="flex-1">
                      {{ asset.symbol }} ({{ asset.name }})
                    </span>
                    <AssetPrice :asset="asset" />
                  </li>
                </ul>
              </div>

              <div>
                <h3 class="font-semibold text-lg mb-2">Collateral Assets</h3>
                <ul class="list-disc pl-5 space-y-1">
                  <li
                    v-for="(asset, index) in strategy.terms.collateralAssets"
                    :key="index"
                    class="flex items-center"
                  >
                    <img
                      :src="asset.icon"
                      :alt="asset.name"
                      class="w-4 h-4 mr-2"
                    />
                    <span class="flex-1">
                      {{ asset.symbol }} ({{ asset.name }})
                    </span>
                    <AssetPrice :asset="asset" />
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-6 space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">APR:</span>
                <span class="font-medium"
                  >{{
                    pairKey && strategy.terms.apr[pairKey]
                      ? strategy.terms.apr[pairKey]
                      : 'N/A'
                  }}%</span
                >
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">LTV:</span>
                <span class="font-medium"
                  >{{
                    pairKey && strategy.terms.ltv[pairKey]
                      ? strategy.terms.ltv[pairKey]
                      : 'N/A'
                  }}%</span
                >
              </div>
            </div>
          </CardContent>
        </Card>

        <Card v-if="strategy.curator">
          <CardHeader>
            <CardTitle>Curator</CardTitle>
            <CardDescription>Strategy curator information</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-center space-x-4">
              <img
                v-if="strategy.curator.avatar"
                :src="strategy.curator.avatar"
                :alt="strategy.curator.name"
                class="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 class="font-semibold text-lg">
                  {{ strategy.curator.name }}
                </h3>
                <p class="text-gray-600">{{ strategy.curator.description }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Proposals</CardTitle>
            <CardDescription
              >List of proposals for this strategy</CardDescription
            >
          </CardHeader>
          <CardContent>
            <ProposalsList :strategy-id="strategyId" />
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
</template>
