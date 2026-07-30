<script lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps<{
  text: string;
  size?: number;
  color?: string;
  rotation?: number;
  variant?: 'solid' | 'outline';
  borderWidth?: number;
}>();

const style = computed((): CSSProperties => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  background: props.variant === 'outline' ? 'transparent' : (props.color ?? 'var(--cinnabar)'),
  color: props.variant === 'outline' ? (props.color ?? 'var(--cinnabar)') : 'var(--paper-light)',
  border: props.variant === 'outline'
    ? `${props.borderWidth ?? 2}px solid ${props.color ?? 'var(--cinnabar)'}`
    : 'none',
  transform: `rotate(${props.rotation}deg)`,
  fontSize: `${Math.floor(props.size * 0.35)}px`,
  lineHeight: `${props.size}px`,
  boxShadow: props.variant === 'solid' ? 'var(--shadow-seal)' : 'none',
}));
</script>

<template>
  <span :class="['dq-seal', `dq-seal--${variant}`]" :style="style">
    {{ text }}
  </span>
</template>

<style scoped>
.dq-seal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-kai);
  font-weight: var(--fw-bold);
  border-radius: var(--radius-sm);
  position: relative;
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-ink);
  user-select: none;
}

.dq-seal--solid {
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.15),
    inset 0 0 12px rgba(0, 0, 0, 0.2);
}

.dq-seal--solid::after {
  content: '';
  position: absolute;
  inset: 3px;
  border: 1px solid rgba(255, 235, 220, 0.25);
  border-radius: calc(var(--radius-sm) - 2px);
  pointer-events: none;
}

.dq-seal--outline {
  background: transparent;
}
</style>
