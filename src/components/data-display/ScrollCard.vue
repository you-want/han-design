<script lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps<{
  rollerHeight?: number;
  showTopRoller?: boolean;
  showBottomRoller?: boolean;
  showCorners?: boolean;
}>();

const topStyle = computed((): CSSProperties => ({
  height: `${props.rollerHeight}px`,
}));

const bottomStyle = computed((): CSSProperties => ({
  height: `${Math.max(props.rollerHeight - 4, 16)}px`,
}));
</script>

<template>
  <article class="dq-scroll-card">
    <!-- 顶部卷轴 -->
    <div v-if="showTopRoller !== false" class="dq-scroll-card__roller dq-scroll-card__roller--top" :style="topStyle"></div>

    <!-- 画芯内容 -->
    <div
      class="dq-scroll-card__body"
      :class="{ 'dq-scroll-card__body--no-corners': showCorners === false }"
    >
      <slot />
    </div>

    <!-- 底部卷轴 -->
    <div v-if="showBottomRoller !== false" class="dq-scroll-card__roller dq-scroll-card__roller--bottom" :style="bottomStyle"></div>
  </article>
</template>

<style scoped>
.dq-scroll-card {
  position: relative;
  background: var(--paper-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition:
    transform var(--duration-slow) var(--ease-roll),
    box-shadow var(--duration-slow) var(--ease-roll);
}

.dq-scroll-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* 卷轴样式 */
.dq-scroll-card__roller {
  background: linear-gradient(
    180deg,
    var(--ink-700) 0%,
    var(--ink-800) 30%,
    var(--ink-900) 50%,
    var(--ink-800) 70%,
    var(--ink-700) 100%
  );
  position: relative;
}

.dq-scroll-card__roller::before,
.dq-scroll-card__roller::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 14px;
  height: 28px;
  background: linear-gradient(180deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
  border-radius: 4px;
  transform: translateY(-50%);
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
}

.dq-scroll-card__roller::before {
  left: -4px;
}

.dq-scroll-card__roller::after {
  right: -4px;
}

.dq-scroll-card__roller--top {
  height: 24px;
}

.dq-scroll-card__roller--bottom {
  height: 20px;
}

/* 画芯内容 */
.dq-scroll-card__body {
  padding: var(--space-7);
  position: relative;
}

/* 四角祥云装饰 */
.dq-scroll-card__body::before,
.dq-scroll-card__body::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  border: 1px solid var(--ink-300);
  opacity: 0.5;
}

.dq-scroll-card__body::before {
  top: var(--space-4);
  left: var(--space-4);
  border-right: none;
  border-bottom: none;
  border-top-left-radius: var(--radius-sm);
}

.dq-scroll-card__body::after {
  bottom: var(--space-4);
  right: var(--space-4);
  border-left: none;
  border-top: none;
  border-bottom-right-radius: var(--radius-sm);
}

.dq-scroll-card__body--no-corners::before,
.dq-scroll-card__body--no-corners::after {
  display: none;
}
</style>
