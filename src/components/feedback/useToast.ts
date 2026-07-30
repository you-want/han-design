<script lang="ts">
import { ref } from 'vue';

export interface ToastOptions {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  seal?: string;
}

const toasts = ref<Array<{ id: number; message: string; type: string; seal?: string }>>([]);
let nextId = 1;
let timer: ReturnType<typeof setTimeout> | null = null;

export function showToast(options: ToastOptions) {
  const id = nextId++;
  const toast = {
    id,
    message: options.message,
    type: options.type ?? 'info',
    seal: options.seal,
  };
  toasts.value.push(toast);

  const duration = options.duration ?? 3000;
  timer = setTimeout(() => {
    removeToast(id);
  }, duration);

  return id;
}

export function removeToast(id: number) {
  const idx = toasts.value.findIndex((t) => t.id === id);
  if (idx > -1) toasts.value.splice(idx, 1);
}

export function useToast() {
  return {
    toasts,
    showToast,
    removeToast,
  };
}
</script>
