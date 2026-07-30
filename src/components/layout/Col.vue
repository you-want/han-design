<script lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps<{
  span?: number;
  offset?: number;
  order?: number;
}>();

const style = computed((): CSSProperties => ({
  flex: `0 0 ${(props.span ?? 12) / 12 * 100}%`,
  maxWidth: `${(props.span ?? 12) / 12 * 100}%`,
  marginLeft: props.offset ? `${props.offset / 12 * 100}%` : undefined,
  order: props.order,
}));
</script>

<template>
  <div class="dq-col" :style="style">
    <slot />
  </div>
</template>

<style scoped>
.dq-col {
  min-width: 0;
}
</style>
