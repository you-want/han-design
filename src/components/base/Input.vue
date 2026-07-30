<script lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  clearable?: boolean;
  maxlength?: number;
  showWordLimit?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'clear'): void;
}>();

const inputValue = computed({
  get: () => props.modelValue ?? '',
  set: (val) => emit('update:modelValue', val),
});

const classes = computed(() => [
  'dq-input',
  `dq-input--${props.size}`,
  {
    'dq-input--disabled': props.disabled,
    'dq-input--readonly': props.readonly,
    'dq-input--error': props.error,
  },
]);

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleChange = (e: Event) => {
  emit('change', (e.target as HTMLInputElement).value);
};

const clear = () => {
  emit('update:modelValue', '');
  emit('clear');
};
</script>

<template>
  <div :class="classes">
    <slot name="prefix" class="dq-input__prefix" />
    <input
      class="dq-input__inner"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="handleInput"
      @change="handleChange"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <span
      v-if="clearable && inputValue"
      class="dq-input__clear"
      role="button"
      tabindex="-1"
      @click="clear"
    >
      ✕
    </span>
    <slot name="suffix" class="dq-input__suffix" />
    <span v-if="showWordLimit && maxlength" class="dq-input__limit">
      {{ inputValue.length }}/{{ maxlength }}
    </span>
  </div>
</template>

<style scoped>
.dq-input {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  background: var(--paper-light);
  border: 1px solid var(--ink-300);
  border-radius: var(--radius-md);
  padding: 0 var(--space-4);
  transition: all var(--duration-normal) var(--ease-ink);
  position: relative;
}

.dq-input:hover:not(.dq-input--disabled) {
  border-color: var(--ink-400);
}

.dq-input:focus-within {
  border-color: var(--ink-700);
  box-shadow: 0 0 0 3px rgba(63, 59, 53, 0.1);
}

.dq-input--error {
  border-color: var(--cinnabar) !important;
}

.dq-input--error:focus-within {
  box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.15);
}

.dq-input--disabled {
  background: var(--ink-50);
  cursor: not-allowed;
  opacity: 0.7;
}

.dq-input--sm {
  height: 32px;
  font-size: var(--fs-small);
}
.dq-input--md {
  height: 40px;
  font-size: var(--fs-body);
}
.dq-input--lg {
  height: 48px;
  font-size: var(--fs-h5);
}

.dq-input__inner {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  color: var(--ink-900);
  font-family: var(--font-serif);
  width: 100%;
}

.dq-input__inner::placeholder {
  color: var(--ink-400);
}

.dq-input__clear {
  cursor: pointer;
  color: var(--ink-400);
  font-size: var(--fs-small);
  transition: color var(--duration-fast);
  padding: 2px;
}

.dq-input__clear:hover {
  color: var(--ink-700);
}

.dq-input__prefix,
.dq-input__suffix {
  color: var(--ink-500);
  flex-shrink: 0;
}

.dq-input__limit {
  position: absolute;
  right: var(--space-3);
  bottom: calc(100% + var(--space-1));
  font-size: var(--fs-tiny);
  color: var(--ink-400);
}
</style>
