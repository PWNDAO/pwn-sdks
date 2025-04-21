<script setup lang="ts">
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useStrategies } from "@pwndao/sdk-v1-vue";
import { formatUnits } from "viem";

const chainId = 11155111; // sepolia
const { data: strategies, isLoading, error } = useStrategies(chainId);
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Strategies</h1>
    
    <div v-if="isLoading" class="text-center">
      Loading strategies...
    </div>
    
    <div v-else-if="error" class="text-red-500">
      Error: {{ error.message }}
    </div>
    
    <div v-else-if="strategies" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="strategy in strategies" :key="strategy.id" class="h-full">
        <CardHeader>
          <CardTitle>{{ strategy.name }}</CardTitle>
          <CardDescription class="text-sm text-gray-500">ID: {{ strategy.id }}</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="mb-4">{{ strategy.description }}</p>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="font-medium">Total Committed:</span>
              <span>{{ formatUnits(strategy.lendingStats.totalCommittedAmount, 18) || "0" }} USD</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Credit Assets:</span>
              <span>{{ strategy.terms.creditAssets.map((asset) => asset.symbol).join(", ") || "None" }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Collateral Assets:</span>
              <span>{{ strategy.terms.collateralAssets.map((asset) => asset.symbol).join(", ") || "None" }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">APR:</span>
              <span>{{ strategy.terms.apr[`${strategy.terms.collateralAssets[0].address}/${strategy.terms.collateralAssets[0].chainId}-${strategy.terms.creditAssets[0].address}/${strategy.terms.creditAssets[0].chainId}`] || "0" }} %</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">LTV:</span>
              <span>{{ strategy.terms.ltv[`${strategy.terms.collateralAssets[0].address}/${strategy.terms.collateralAssets[0].chainId}-${strategy.terms.creditAssets[0].address}/${strategy.terms.creditAssets[0].chainId}`] || "0" }} %</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <router-link 
            :to="{ name: 'strategy', params: { id: strategy.id }}"
            class="w-full"
          >
            <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              View Details
            </button>
          </router-link>
        </CardFooter>
      </Card>
    </div>
  </main>
</template> 