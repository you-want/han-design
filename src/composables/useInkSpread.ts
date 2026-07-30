import { ref, onMounted, onUnmounted } from 'vue';

export function useInkSpread() {
  const targetRef = ref<HTMLElement | null>(null);
  const isSpreading = ref(false);

  const trigger = () => {
    isSpreading.value = true;
    if (targetRef.value) {
      targetRef.value.style.animation = 'none';
      void targetRef.value.offsetWidth;
      targetRef.value.style.animation = '';
    }
    setTimeout(() => {
      isSpreading.value = false;
    }, 600);
  };

  return {
    targetRef,
    isSpreading,
    trigger,
  };
}
