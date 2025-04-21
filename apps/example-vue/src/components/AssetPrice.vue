<template>
  <span class="text-sm text-gray-500">{{ formattedPrice }}</span>
</template>

<script setup lang="ts">
import type { BaseAsset } from '@pwndao/sdk-core';
import { useAssetPrice } from '@pwndao/sdk-v1-vue';
import { formatUnits } from 'viem';
import { computed } from 'vue';
const props = defineProps<{
  asset: BaseAsset;
}>();

const { data: price } = useAssetPrice(props.asset);

const formattedPrice = computed(() => {
  return `$${formatUnits(price.value ?? 0n, props.asset.decimals)}`;
});
</script>
