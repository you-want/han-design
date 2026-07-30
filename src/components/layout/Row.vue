<script lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  gutter?: string;
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch';
  wrap?: boolean;
}>();

const style = computed(() => ({
  gap: props.gutter ?? 'var(--gutter)',
  'justify-content': props.justify,
  'align-items': props.align,
  'flex-wrap': props.wrap ? 'wrap' : 'nowrap',
}));
</script>

<template>
  <div class="dq-row" :style="style">
    <slot />
  </div>
</template>

<style scoped>
.dq-row {
  display: flex;
  width: 100%;
}
</style>
