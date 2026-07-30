import { ref, onMounted, onUnmounted } from 'vue';

export function useScrollReveal(threshold = 0.1) {
  const ref = ref<HTMLElement | null>(null);
  const isVisible = ref(false);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') {
      isVisible.value = true;
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
            observer!.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    if (ref.value) {
      observer.observe(ref.value);
    }
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    ref,
    isVisible,
  };
}
