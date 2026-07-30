<script lang="ts">
import { useToast } from './useToast';
import { computed } from 'vue';

const { toasts } = useToast();

const typeColor = computed(() => ({
  info: 'var(--ink-700)',
  success: 'var(--jade)',
  warning: 'var(--gold)',
  error: 'var(--cinnabar)',
}));
</script>

<template>
  <Teleport to="body">
    <TransitionGroup name="dq-toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="dq-toast"
        :style="{ borderColor: typeColor[toast.type as keyof typeof typeColor] }"
      >
        <span v-if="toast.seal" class="dq-toast__seal">{{ toast.seal }}</span>
        <span class="dq-toast__message">{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
.dq-toast {
  position: fixed;
  top: var(--space-7);
  left: 50%;
  transform: translateX(-50%);
  background: var(--paper-light);
  color: var(--ink-900);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--ink-700);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  z-index: var(--z-toast);
  font-family: var(--font-serif);
  font-size: var(--fs-body);
  pointer-events: auto;
}

.dq-toast__seal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--cinnabar);
  color: var(--paper-light);
  font-size: 14px;
  font-family: var(--font-kai);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.dq-toast__message {
  line-height: 1.5;
}

.dq-toast-enter-active,
.dq-toast-leave-active {
  transition: all var(--duration-slow) var(--ease-ink);
}

.dq-toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -20px);
}

.dq-toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}
</style>
