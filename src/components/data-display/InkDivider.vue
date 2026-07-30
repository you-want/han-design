<script lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps<{
  direction?: 'horizontal' | 'vertical';
  color?: string;
  showDiamond?: boolean;
  width?: string;
  height?: string;
}>();

const style = computed((): CSSProperties => ({
  color: props.color ?? 'var(--ink-300)',
  width: props.direction === 'vertical' ? (props.width ?? '20px') : (props.width ?? '100%'),
  height: props.direction === 'vertical' ? (props.height ?? '100%') : (props.height ?? '20px'),
  flexDirection: props.direction === 'vertical' ? 'column' : 'row',
}));
</script>

<template>
  <div
    :class="[
      'dq-ink-divider',
      `dq-ink-divider--${direction}`,
    ]"
    :style="style"
  >
    <span class="dq-ink-divider__line"></span>
    <span v-if="showDiamond !== false" class="dq-ink-divider__diamond"></span>
    <span v-if="showDiamond !== false" class="dq-ink-divider__line"></span>
  </div>
</template>

<style scoped>
.dq-ink-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  pointer-events: none;
}

.dq-ink-divider--vertical {
  flex-direction: column;
  width: 20px;
  height: 100%;
}

.dq-ink-divider__line {
  flex: 1;
  background: linear-gradient(
    90deg,
    transparent,
    currentColor,
    transparent
  );
  height: 1px;
  min-width: 40px;
  opacity: 0.6;
}

.dq-ink-divider--vertical .dq-ink-divider__line {
  background: linear-gradient(
    180deg,
    transparent,
    currentColor,
    transparent
  );
  height: auto;
  width: 1px;
  min-width: 0;
  min-height: 40px;
}

.dq-ink-divider__diamond {
  width: 8px;
  height: 8px;
  background: var(--cinnabar);
  transform: rotate(45deg);
  flex-shrink: 0;
  opacity: 0.8;
}
</style>
