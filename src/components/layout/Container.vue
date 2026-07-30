<script lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fluid?: boolean;
  padding?: boolean;
}>();

const style = computed((): CSSProperties => ({
  maxWidth: props.fluid ? '100%' : `var(--container-${props.size})`,
  paddingLeft: props.padding ? 'var(--space-7)' : undefined,
  paddingRight: props.padding ? 'var(--space-7)' : undefined,
}));
</script>

<template>
  <div :class="['dq-container', `dq-container--${size}`, { 'dq-container--fluid': fluid }]" :style="style">
    <slot />
  </div>
</template>

<style scoped>
.dq-container {
  width: 100%;
  margin: 0 auto;
  position: relative;
}
</style>
