<script lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps<{
  brand?: string;
  brandSeal?: string;
  items?: Array<{ label: string; active?: boolean; href?: string }>;
  sticky?: boolean;
}>();

const isScrolled = ref(false);
const isMobile = ref(false);
const menuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
  if (!isMobile.value) menuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
});

const navStyle = computed((): CSSProperties => ({
  background: isScrolled.value ? 'rgba(250, 247, 239, 0.95)' : 'rgba(250, 247, 239, 0.6)',
  boxShadow: isScrolled.value ? 'var(--shadow-sm)' : 'none',
}));
</script>

<template>
  <nav class="dq-navbar" :style="navStyle">
    <div class="dq-navbar__inner">
      <!-- 品牌 -->
      <a href="#" class="dq-navbar__brand">
        <span v-if="brandSeal" class="dq-navbar__seal">{{ brandSeal }}</span>
        <span class="dq-navbar__brand-text">{{ brand ?? '汉' }}</span>
      </a>

      <!-- 菜单项 -->
      <ul v-if="items && !isMobile" class="dq-navbar__menu">
        <NavbarItem
          v-for="(item, i) in items"
          :key="i"
          :active="item.active"
          :href="item.href"
        >
          {{ item.label }}
        </NavbarItem>
      </ul>

      <!-- 右侧操作区 -->
      <div class="dq-navbar__actions">
        <slot name="actions" />
      </div>

      <!-- 移动端菜单按钮 -->
      <button
        v-if="isMobile"
        class="dq-navbar__toggle"
        :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
        @click="menuOpen = !menuOpen"
      >
        <span :class="{ 'dq-navbar__bar--open': menuOpen }"></span>
        <span :class="{ 'dq-navbar__bar--open': menuOpen }"></span>
        <span :class="{ 'dq-navbar__bar--open': menuOpen }"></span>
      </button>
    </div>

    <!-- 移动端下拉菜单 -->
    <transition name="dq-fade">
      <ul v-if="menuOpen && isMobile" class="dq-navbar__mobile-menu">
        <NavbarItem
          v-for="(item, i) in items"
          :key="i"
          :active="item.active"
          :href="item.href"
        >
          {{ item.label }}
        </NavbarItem>
      </ul>
    </transition>
  </nav>
</template>

<style scoped>
.dq-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--ink-200);
  transition: all var(--duration-slow) var(--ease-ink);
}

.dq-navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 var(--space-7);
  max-width: var(--container-xl);
  margin: 0 auto;
}

.dq-navbar__brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-kai);
  font-size: var(--fs-h5);
  font-weight: var(--fw-bold);
  color: var(--ink-900);
  letter-spacing: 0.1em;
}

.dq-navbar__seal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--cinnabar);
  color: var(--paper-light);
  font-size: 18px;
  border-radius: var(--radius-sm);
  transform: rotate(-3deg);
}

.dq-navbar__menu {
  display: flex;
  align-items: center;
  gap: var(--space-7);
}

.dq-navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.dq-navbar__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
}

.dq-navbar__toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--ink-900);
  border-radius: 1px;
  transition: all var(--duration-normal) var(--ease-ink);
}

.dq-navbar__bar--open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.dq-navbar__bar--open:nth-child(2) {
  opacity: 0;
}
.dq-navbar__bar--open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.dq-navbar__mobile-menu {
  display: flex;
  flex-direction: column;
  padding: var(--space-5) var(--space-7);
  gap: var(--space-3);
  background: var(--paper-light);
  border-top: 1px solid var(--ink-200);
}

.dq-fade-enter-active,
.dq-fade-leave-active {
  transition: all var(--duration-normal) var(--ease-ink);
}
.dq-fade-enter-from,
.dq-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 768px) {
  .dq-navbar__inner {
    padding: 0 var(--space-4);
    height: 60px;
  }
  .dq-navbar__toggle {
    display: flex;
  }
}
</style>
