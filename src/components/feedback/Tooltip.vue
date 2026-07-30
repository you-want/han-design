<script lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps<{
  show: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  content: string;
  delay?: number;
}>();

const tooltipRef = ref<HTMLElement | null>(null);

const tooltipStyle = computed((): CSSProperties => {
  const styles: CSSProperties = { position: 'absolute' };
  const pos = props.position;

  switch (pos) {
    case 'top':
      styles.bottom = '100%';
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
      styles.marginBottom = '8px';
      break;
    case 'bottom':
      styles.top = '100%';
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
      styles.marginTop = '8px';
      break;
    case 'left':
      styles.right = '100%';
      styles.top = '50%';
      styles.transform = 'translateY(-50%)';
      styles.marginRight = '8px';
      break;
    case 'right':
      styles.left = '100%';
      styles.top = '50%';
      styles.transform = 'translateY(-50%)';
      styles.marginLeft = '8px';
      break;
  }
  return styles;
});
</script>

<template>
  <div class="dq-tooltip" ref="tooltipRef">
    <slot />
    <Transition name="dq-tooltip">
      <span v-if="show" class="dq-tooltip__content" :style="tooltipStyle" role="tooltip">
        {{ content }}
      </span>
    </Transition>
  </div>
</template>

<style scoped>
.dq-tooltip {
  position: relative;
  display: inline-flex;
}

.dq-tooltip__content {
  background: var(--ink-900);
  color: var(--paper-light);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: var(--fs-small);
  font-family: var(--font-serif);
  white-space: nowrap;
  pointer-events: none;
  z-index: var(--z-tooltip);
  box-shadow: var(--shadow-md);
}

.dq-tooltip-enter-active,
.dq-tooltip-leave-active {
  transition: all var(--duration-normal) var(--ease-ink);
}

.dq-tooltip-enter-from,
.dq-tooltip-leave-to {
  opacity: 0;
}
</style>
