<script lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  items: Array<{ label: string; icon?: string; children?: any[] }>;
  multiple?: boolean;
}>();

const activeItems = ref<Set<number>>(new Set());

const toggleItem = (index: number) => {
  if (props.multiple) {
    if (activeItems.value.has(index)) {
      activeItems.value.delete(index);
    } else {
      activeItems.value.add(index);
    }
  } else {
    if (activeItems.value.has(index)) {
      activeItems.value.clear();
    } else {
      activeItems.value.clear();
      activeItems.value.add(index);
    }
  }
};

const isActive = (index: number) => activeItems.value.has(index);
</script>

<template>
  <ul class="dq-menu" role="menu">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="dq-menu__item"
      :class="{ 'dq-menu__item--active': isActive(index) }"
      @click="toggleItem(index)"
    >
      <span v-if="item.icon" class="dq-menu__icon">
        <img :src="item.icon" alt="" />
      </span>
      <span class="dq-menu__label">{{ item.label }}</span>
      <span class="dq-menu__ink"></span>
    </li>
  </ul>
</template>

<style scoped>
.dq-menu {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 180px;
}

.dq-menu__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-serif);
  font-size: var(--fs-body);
  color: var(--ink-700);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all var(--duration-fast) var(--ease-ink);
  position: relative;
}

.dq-menu__item:hover {
  background: var(--ink-50);
  color: var(--ink-900);
}

.dq-menu__item--active {
  background: var(--ink-100);
  color: var(--ink-900);
  font-family: var(--font-kai);
  font-weight: var(--fw-semibold);
}

.dq-menu__item--active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background: var(--cinnabar);
  border-radius: 2px;
}

.dq-menu__icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dq-menu__icon img {
  width: 100%;
  height: 100%;
}

.dq-menu__ink {
  position: absolute;
  bottom: 2px;
  left: var(--space-4);
  right: var(--space-4);
  height: 1px;
  background: linear-gradient(90deg, var(--ink-300), transparent);
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-ink);
}

.dq-menu__item:hover .dq-menu__ink {
  opacity: 0.6;
}
</style>
