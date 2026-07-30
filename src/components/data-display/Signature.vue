<script lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps<{
  text: string;
  author?: string;
  date?: string;
  sealText?: string;
  vertical?: boolean;
}>();

const style = computed((): CSSProperties => ({
  flexDirection: props.vertical ? 'column' : 'row',
}));
</script>

<template>
  <div :class="['dq-signature', { 'dq-signature--vertical': vertical }]" :style="style">
    <div class="dq-signature__text">
      <span class="dq-signature__content">{{ text }}</span>
      <span v-if="author" class="dq-signature__author">— {{ author }}</span>
      <span v-if="date" class="dq-signature__date">{{ date }}</span>
    </div>
    <span v-if="sealText" class="dq-signature__seal">{{ sealText }}</span>
  </div>
</template>

<style scoped>
.dq-signature {
  display: inline-flex;
  align-items: flex-end;
  gap: var(--space-4);
  font-family: var(--font-kai);
}

.dq-signature--vertical {
  flex-direction: column;
  align-items: center;
}

.dq-signature__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.dq-signature__content {
  font-size: var(--fs-h5);
  color: var(--ink-700);
  letter-spacing: 0.1em;
  line-height: 1.6;
}

.dq-signature__author {
  font-size: var(--fs-small);
  color: var(--ink-500);
  font-style: italic;
}

.dq-signature__date {
  font-size: var(--fs-caption);
  color: var(--ink-400);
  letter-spacing: 0.05em;
}

.dq-signature__seal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--cinnabar);
  color: var(--paper-light);
  font-size: 16px;
  font-weight: var(--fw-bold);
  border-radius: var(--radius-sm);
  transform: rotate(-3deg);
  box-shadow: var(--shadow-seal);
  flex-shrink: 0;
}

.dq-signature--vertical .dq-signature__content {
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: var(--space-3);
}
</style>
