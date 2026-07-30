<script lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  variant?: 'default' | 'ink' | 'ghost' | 'seal';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  type?: 'button' | 'submit' | 'reset';
  htmlType?: 'button' | 'submit' | 'reset';
}>();

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const classes = computed(() => {
  return [
    'dq-btn',
    `dq-btn--${props.variant}`,
    `dq-btn--${props.size}`,
    {
      'dq-btn--disabled': props.disabled,
      'dq-btn--loading': props.loading,
      'dq-btn--block': props.block,
    },
  ];
});

const handleClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) return;
  emit('click', e);
};
</script>

<template>
  <button
    :class="classes"
    :type="htmlType"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="dq-btn__loading" aria-hidden="true">
      <svg viewBox="0 0 24 24" class="dq-btn__spinner">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="40 20" />
      </svg>
    </span>
    <span class="dq-btn__content" :class="{ 'dq-btn__content--hidden': loading }">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.dq-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-serif);
  font-weight: var(--fw-medium);
  border-radius: var(--radius-md);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-ink);
  user-select: none;
  white-space: nowrap;
  text-align: center;
}

.dq-btn:focus-visible {
  outline: 2px solid var(--ink-700);
  outline-offset: 2px;
}

/* 尺寸 */
.dq-btn--sm {
  height: 32px;
  padding: 0 var(--space-4);
  font-size: var(--fs-small);
}
.dq-btn--md {
  height: 40px;
  padding: 0 var(--space-5);
  font-size: var(--fs-body);
}
.dq-btn--lg {
  height: 48px;
  padding: 0 var(--space-7);
  font-size: var(--fs-h5);
}

/* 变体 */
.dq-btn--default {
  background: var(--ink-900);
  color: var(--paper-light);
}
.dq-btn--default:hover:not(.dq-btn--disabled) {
  background: var(--ink-700);
  box-shadow: var(--shadow-md);
}

.dq-btn--ink {
  background: var(--ink-900);
  color: var(--paper-light);
}
.dq-btn--ink:hover:not(.dq-btn--disabled) {
  background: var(--ink-700);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.dq-btn--ghost {
  background: transparent;
  color: var(--ink-900);
  border: 1px solid var(--ink-300);
}
.dq-btn--ghost:hover:not(.dq-btn--disabled) {
  background: var(--ink-50);
  border-color: var(--ink-500);
}

.dq-btn--seal {
  background: var(--cinnabar);
  color: var(--paper-light);
  font-family: var(--font-kai);
}
.dq-btn--seal:hover:not(.dq-btn--disabled) {
  background: var(--cinnabar-deep);
  box-shadow: var(--shadow-seal);
}

/* 状态 */
.dq-btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.dq-btn--loading {
  cursor: wait;
}

.dq-btn--block {
  display: flex;
  width: 100%;
}

.dq-btn__spinner {
  width: 16px;
  height: 16px;
  animation: dq-btn-spin 0.8s linear infinite;
}

.dq-btn__content--hidden {
  opacity: 0;
}

@keyframes dq-btn-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
