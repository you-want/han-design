import { ref } from 'vue';

export function useSealDrop() {
  const targetRef = ref<HTMLElement | null>(null);
  const isDropping = ref(false);

  const drop = () => {
    isDropping.value = true;
    if (targetRef.value) {
      targetRef.value.style.animation = 'none';
      void targetRef.value.offsetWidth;
      targetRef.value.style.transform = 'scale(1)';
      targetRef.value.style.transition = 'transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)';
      targetRef.value.style.transform = 'scale(1.1)';
      setTimeout(() => {
        targetRef.value!.style.transform = 'scale(1)';
      }, 150);
    }
    setTimeout(() => {
      isDropping.value = false;
    }, 300);
  };

  return {
    targetRef,
    isDropping,
    drop,
  };
}
