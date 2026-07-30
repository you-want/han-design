<script lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  color?: 'ink' | 'cinnabar' | 'jade' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  closable?: boolean;
  rounded?: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const classes = computed(() => [
  'dq-tag',
  `dq-tag--${props.color}`,
  `dq-tag--${props.size}`,
  {
    'dq-tag--rounded': props.rounded,
  },
]);
</script>

<template>
  <span :class="classes">
    <slot />
    <span
      v-if="closable"
      class="dq-tag__close"
      role="button"
      @click="emit('close')"
    >
      ×
    </span>
  </span>
</template>

<style scoped>
.dq-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-serif);
  font-weight: var(--fw-medium);
  line-height: 1;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  transition: all var(--duration-fast) var(--ease-ink);
}

.dq-tag--sm {
  height: 20px;
  padding: 0 var(--space-2);
  font-size: var(--fs-tiny);
}
.dq-tag--md {
  height: 24px;
  padding: 0 var(--space-3);
  font-size: var(--fs-small);
}
.dq-tag--lg {
  height: 32px;
  padding: 0 var(--space-4);
  font-size: var(--fs-body);
}

.dq-tag--ink {
  background: var(--ink-900);
  color: var(--paper-light);
}
.dq-tag--cinnabar {
  background: var(--cinnabar);
  color: var(--paper-light);
}
.dq-tag--jade {
  background: var(--jade);
  color: var(--paper-light);
}
.dq-tag--gold {
  background: var(--gold);
  color: var(--paper-light);
}

.dq-tag--rounded {
  border-radius: var(--radius-pill);
}

.dq-tag__close {
  cursor: pointer;
  opacity: 0.7;
  font-size: 0.85em;
  line-height: 1;
  transition: opacity var(--duration-fast);
}

.dq-tag__close:hover {
  opacity: 1;
}
</style>
