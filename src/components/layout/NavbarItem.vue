<script lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  active?: boolean;
  href?: string;
  tag?: keyof HTMLAnchorElement;
}>();

const tag = computed(() => (props.href ? 'a' : 'div'));
</script>

<template>
  <component
    :is="tag"
    :class="['dq-navbar-item', { 'dq-navbar-item--active': active }]"
    :href="href"
  >
    <slot />
    <span class="dq-navbar-item__ink"></span>
  </component>
</template>

<style scoped>
.dq-navbar-item {
  position: relative;
  padding: var(--space-2) 0;
  font-family: var(--font-serif);
  font-size: var(--fs-body);
  color: var(--ink-700);
  cursor: pointer;
  transition: color var(--duration-normal) var(--ease-ink);
  text-decoration: none;
}

.dq-navbar-item:hover,
.dq-navbar-item--active {
  color: var(--ink-900);
}

.dq-navbar-item__ink {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: radial-gradient(ellipse at center, var(--ink-900) 0%, var(--ink-700) 60%, transparent 100%);
  border-radius: 2px;
  transform: translateX(-50%);
  transition: width var(--duration-slow) var(--ease-ink);
}

.dq-navbar-item:hover .dq-navbar-item__ink,
.dq-navbar-item--active .dq-navbar-item__ink {
  width: 100%;
}

/* 移动端样式 */
@media (max-width: 768px) {
  .dq-navbar-item {
    font-size: var(--fs-h5);
    font-family: var(--font-kai);
    padding: var(--space-2) 0;
  }
  .dq-navbar-item__ink {
    display: none;
  }
}
</style>
