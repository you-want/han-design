<script lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps<{
  src?: string;
  alt?: string;
  size?: number;
  shape?: 'circle' | 'square';
  bgColor?: string;
  textColor?: string;
  fontFamily?: string;
}>();

const classes = computed(() => [
  'dq-avatar',
  `dq-avatar--${props.shape}`,
]);

const style = computed((): CSSProperties => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  background: props.bgColor ?? 'var(--ink-200)',
  color: props.textColor ?? 'var(--ink-700)',
  fontFamily: props.fontFamily ?? 'var(--font-kai)',
  fontSize: `${Math.floor(props.size * 0.4)}px`,
  lineHeight: `${props.size}px`,
}));
</script>

<template>
  <span :class="classes" :style="style">
    <img
      v-if="src"
      class="dq-avatar__img"
      :src="src"
      :alt="alt"
      @error="(e: Event) => (e.target as HTMLImageElement).style.display = 'none'"
    />
    <span v-else class="dq-avatar__fallback">
      <slot>{{ (alt ?? '').charAt(0) }}</slot>
    </span>
  </span>
</template>

<style scoped>
.dq-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--fw-semibold);
  overflow: hidden;
  user-select: none;
}

.dq-avatar--circle {
  border-radius: 50%;
}

.dq-avatar--square {
  border-radius: var(--radius-md);
}

.dq-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dq-avatar__fallback {
  font-family: inherit;
}
</style>
