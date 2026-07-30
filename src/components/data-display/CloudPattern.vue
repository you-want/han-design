<script lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps<{
  size?: number;
  color?: string;
  animated?: boolean;
  float?: boolean;
}>();

const style = computed((): CSSProperties => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  color: props.color ?? 'var(--ink-500)',
}));
</script>

<template>
  <span
    :class="[
      'dq-cloud-pattern',
      { 'dq-cloud-pattern--animated': animated, 'dq-cloud-pattern--float': float },
    ]"
    :style="style"
    aria-hidden="true"
  >
    <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 40 Q10 28 22 28 Q24 18 36 20 Q42 10 52 16 Q62 12 66 22 Q80 20 84 32 Q92 36 88 44 Q84 52 72 50 Q60 56 48 50 Q36 56 24 50 Q14 48 10 44 Z" />
      <path d="M28 38 Q28 30 36 30 Q42 26 46 32 Q52 28 56 34 Q62 32 64 40 Q72 40 72 46" opacity="0.6" />
      <circle cx="44" cy="40" r="1.5" fill="currentColor" />
      <circle cx="56" cy="38" r="1" fill="currentColor" opacity="0.7" />
    </svg>
  </span>
</template>

<style scoped>
.dq-cloud-pattern {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.dq-cloud-pattern svg {
  width: 100%;
  height: 100%;
}

.dq-cloud-pattern--animated {
  animation: dq-cloud-drift 8s var(--ease-soft) infinite alternate;
}

.dq-cloud-pattern--float {
  animation: dq-cloud-float 6s var(--ease-soft) infinite ease-in-out;
}

@keyframes dq-cloud-drift {
  from { transform: translateX(0); }
  to { transform: translateX(10px); }
}

@keyframes dq-cloud-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
</style>
