<script lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

const props = defineProps<{
  total: number;
  current: number;
  pageSize?: number;
  showSeal?: boolean;
  showJumper?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:current', page: number): void;
  (e: 'change', page: number): void;
}>();

const pageCount = computed(() => Math.ceil(props.total / (props.pageSize ?? 10)));

const pages = computed(() => {
  const result: (number | string)[] = [];
  const cur = props.current;
  const total = pageCount.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) result.push(i);
  } else {
    result.push(1);
    if (cur > 3) result.push('...');
    for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) {
      result.push(i);
    }
    if (cur < total - 2) result.push('...');
    result.push(total);
  }
  return result;
});

const changePage = (page: number) => {
  if (page < 1 || page > pageCount.value || page === props.current) return;
  emit('update:current', page);
  emit('change', page);
};

const jumpStyle = computed((): CSSProperties => ({
  width: `${props.showSeal ? 36 : 32}px`,
  height: `${props.showSeal ? 36 : 32}px`,
}));
</script>

<template>
  <nav class="dq-pagination" aria-label="分页">
    <button
      class="dq-pagination__btn"
      :disabled="current <= 1"
      @click="changePage(current - 1)"
    >
      ‹
    </button>

    <button
      v-for="(page, i) in pages"
      :key="i"
      :class="[
        'dq-pagination__page',
        { 'dq-pagination__page--seal': showSeal && page === current },
        { 'dq-pagination__page--active': page === current },
      ]"
      :style="jumpStyle"
      @click="typeof page === 'number' ? changePage(page) : null"
      :disabled="page === '...'"
    >
      {{ page }}
    </button>

    <button
      class="dq-pagination__btn"
      :disabled="current >= pageCount"
      @click="changePage(current + 1)"
    >
      ›
    </button>

    <div v-if="showJumper" class="dq-pagination__jumper">
      <span>跳至</span>
      <input
        v-model.number="current"
        type="number"
        :min="1"
        :max="pageCount"
        @change="changePage(current)"
        class="dq-pagination__input"
      />
      <span>页</span>
    </div>
  </nav>
</template>

<style scoped>
.dq-pagination {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-serif);
}

.dq-pagination__btn,
.dq-pagination__page {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: var(--paper-light);
  color: var(--ink-700);
  border: 1px solid var(--ink-200);
  font-size: var(--fs-small);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-ink);
}

.dq-pagination__btn:hover:not(:disabled),
.dq-pagination__page:hover:not(:disabled) {
  border-color: var(--ink-400);
  color: var(--ink-900);
}

.dq-pagination__page--active {
  background: var(--ink-900);
  color: var(--paper-light);
  border-color: var(--ink-900);
}

.dq-pagination__page--seal {
  background: var(--cinnabar);
  color: var(--paper-light);
  border-color: var(--cinnabar);
  font-family: var(--font-kai);
  font-weight: var(--fw-bold);
  transform: rotate(-2deg);
  box-shadow: var(--shadow-seal);
}

.dq-pagination__jumper {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-left: var(--space-4);
  font-size: var(--fs-small);
  color: var(--ink-500);
}

.dq-pagination__input {
  width: 48px;
  height: 28px;
  border: 1px solid var(--ink-200);
  border-radius: var(--radius-sm);
  padding: 0 var(--space-2);
  text-align: center;
  font-family: var(--font-serif);
  outline: none;
}

.dq-pagination__input:focus {
  border-color: var(--ink-700);
}
</style>
