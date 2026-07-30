<script lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  text: string;
  size?: 'sm' | 'md' | 'lg';
  tilt?: number;
  variant?: 'default' | 'outline';
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const classes = computed(() => [
  'dq-seal-btn',
  `dq-seal-btn--${props.size}`,
  `dq-seal-btn--${props.variant}`,
  { 'dq-seal-btn--disabled': props.disabled },
]);

const style = computed(() => ({
  transform: `rotate(${props.tilt}deg)`,
}));

const handleClick = (e: MouseEvent) => {
  if (props.disabled) return;
  emit('click', e);
};
</script>

<template>
  <button
    :class="classes"
    :style="style"
    :disabled="disabled"
    @click="handleClick"
  >
    <span class="dq-seal-btn__inner">
      {{ text }}
    </span>
  </button>
</template>

<style scoped>
.dq-seal-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--cinnabar);
  color: var(--paper-light);
  font-family: var(--font-kai);
  font-weight: var(--fw-bold);
  border-radius: var(--radius-sm);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition:
    transform var(--duration-slow) var(--ease-ink),
    background-color var(--duration-normal) var(--ease-ink),
    box-shadow var(--duration-normal) var(--ease-ink);
  user-select: none;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.15),
    inset 0 0 12px rgba(0, 0, 0, 0.2),
    2px 3px 8px rgba(156, 45, 34, 0.3);
}

.dq-seal-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 220, 200, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(0, 0, 0, 0.15) 0%, transparent 50%);
  pointer-events: none;
}

.dq-seal-btn::after {
  content: '';
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(255, 235, 220, 0.25);
  border-radius: calc(var(--radius-sm) - 2px);
  pointer-events: none;
}

.dq-seal-btn:hover:not(.dq-seal-btn--disabled) {
  transform: rotate(var(--tilt)) scale(1.05);
  background: var(--cinnabar-deep);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.2),
    inset 0 0 16px rgba(0, 0, 0, 0.25),
    3px 5px 14px rgba(156, 45, 34, 0.4);
}

.dq-seal-btn:active:not(.dq-seal-btn--disabled) {
  animation: dq-seal-shake 100ms var(--ease-ink);
}

.dq-seal-btn--sm {
  width: 40px;
  height: 40px;
  font-size: 16px;
}

.dq-seal-btn--md {
  width: 64px;
  height: 64px;
  font-size: 24px;
}

.dq-seal-btn--lg {
  width: 96px;
  height: 96px;
  font-size: 36px;
}

.dq-seal-btn--outline {
  background: transparent;
  color: var(--cinnabar);
  box-shadow: inset 0 0 0 2px var(--cinnabar);
}

.dq-seal-btn--outline::before {
  background: radial-gradient(circle at 30% 30%, rgba(192, 57, 43, 0.1) 0%, transparent 50%);
}

.dq-seal-btn--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

@keyframes dq-seal-shake {
  0%, 100% { transform: rotate(var(--tilt)) scale(1.05); }
  25% { transform: rotate(calc(var(--tilt) - 1deg)) scale(0.95); }
  50% { transform: rotate(var(--tilt)) scale(1.02); }
  75% { transform: rotate(calc(var(--tilt) + 0.5deg)) scale(0.98); }
}
</style>
