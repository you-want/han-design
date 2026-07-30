<script lang="ts">
import Container from './Container.vue';
import type { Component } from 'vue';

const FooterSection: Component = {
  name: 'FooterSection',
  props: { title: String },
  template: `
    <div class="dq-footer__section">
      <h4 v-if="title" class="dq-footer__title">{{ title }}</h4>
      <div class="dq-footer__content">
        <slot />
      </div>
    </div>
  `,
};
</script>

<template>
  <footer class="dq-footer">
    <div class="dq-footer__top" />
    <Container>
      <div class="dq-footer__grid">
        <FooterSection v-if="brand" :title="brandText">
          <p class="dq-footer__desc">{{ brand }}</p>
        </FooterSection>
        <slot />
      </div>
      <div class="dq-footer__bottom">
        <slot name="bottom">
          <span>© 2025 汉设计系统</span>
        </slot>
      </div>
    </Container>
  </footer>
</template>

<style scoped>
.dq-footer {
  background: var(--ink-900);
  color: var(--ink-300);
  padding: var(--space-10) 0 var(--space-7);
  position: relative;
  overflow: hidden;
}

.dq-footer__top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--cinnabar);
}

.dq-footer__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--space-7);
  margin-bottom: var(--space-8);
}

.dq-footer__title {
  font-family: var(--font-kai);
  color: var(--paper-light);
  margin-bottom: var(--space-4);
  font-size: var(--fs-h5);
}

.dq-footer__desc {
  font-size: var(--fs-small);
  line-height: 1.9;
  color: var(--ink-400);
}

.dq-footer__bottom {
  border-top: 1px solid var(--ink-700);
  padding-top: var(--space-5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--fs-small);
  color: var(--ink-500);
  flex-wrap: wrap;
  gap: var(--space-3);
}
</style>
