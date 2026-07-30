<script lang="ts">
import { watch, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps<{
  modelValue?: boolean;
  title?: string;
  width?: string;
  closable?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closable !== false) {
    close();
  }
};

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      document.addEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    }
  },
);

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <Transition name="dq-modal-overlay">
      <div v-if="modelValue" class="dq-modal-overlay" @click.self="close">
        <Transition name="dq-modal-content">
          <div v-if="modelValue" class="dq-modal" :style="{ width }">
            <!-- 顶部卷轴 -->
            <div class="dq-modal__roller" />

            <div class="dq-modal__body">
              <header v-if="title || closable" class="dq-modal__header">
                <h3 v-if="title" class="dq-modal__title">{{ title }}</h3>
                <button
                  v-if="closable !== false"
                  class="dq-modal__close"
                  aria-label="关闭"
                  @click="close"
                >
                  ×
                </button>
              </header>

              <div class="dq-modal__content">
                <slot />
              </div>
            </div>

            <!-- 底部卷轴 -->
            <div class="dq-modal__roller dq-modal__roller--bottom" />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dq-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(26, 24, 22, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal-overlay);
  backdrop-filter: blur(4px);
}

.dq-modal {
  background: var(--paper-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  position: relative;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.dq-modal__roller {
  height: 20px;
  background: linear-gradient(
    180deg,
    var(--ink-700) 0%,
    var(--ink-800) 30%,
    var(--ink-900) 50%,
    var(--ink-800) 70%,
    var(--ink-700) 100%
  );
  position: relative;
  flex-shrink: 0;
}

.dq-modal__roller::before,
.dq-modal__roller::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 12px;
  height: 20px;
  background: linear-gradient(180deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
  border-radius: 3px;
  transform: translateY(-50%);
}

.dq-modal__roller::before { left: -3px; }
.dq-modal__roller::after { right: -3px; }

.dq-modal__roller--bottom {
  height: 16px;
}

.dq-modal__body {
  flex: 1;
  overflow: auto;
  padding: var(--space-7);
}

.dq-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-5);
}

.dq-modal__title {
  font-family: var(--font-kai);
  font-size: var(--fs-h3);
  color: var(--ink-900);
}

.dq-modal__close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ink-100);
  border-radius: var(--radius-sm);
  font-size: 20px;
  color: var(--ink-700);
  cursor: pointer;
  transition: all var(--duration-fast);
}

.dq-modal__close:hover {
  background: var(--ink-200);
}

/* 动画 */
.dq-modal-overlay-enter-active,
.dq-modal-overlay-leave-active {
  transition: opacity var(--duration-slow) var(--ease-ink);
}
.dq-modal-overlay-enter-from,
.dq-modal-overlay-leave-to {
  opacity: 0;
}

.dq-modal-content-enter-active,
.dq-modal-content-leave-active {
  transition: all var(--duration-slow) var(--ease-ink);
}
.dq-modal-content-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
.dq-modal-content-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
