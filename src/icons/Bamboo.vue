<script lang="ts">
defineProps<{
  size?: number;
  color?: string;
}>();
</script>

<template>
  <svg
    class="dq-icon dq-icon-bamboo"
    :width="size"
    :height="size"
    viewBox="0 0 40 80"
    fill="none"
    :style="{ color }"
  >
    <path d="M20 10 Q20 30 20 50 Q20 70 20 75" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    <path d="M18 25 Q10 20 5 25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M22 35 Q32 30 38 35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M18 45 Q8 42 4 48" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M22 55 Q30 52 36 55" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <ellipse cx="8" cy="26" rx="6" ry="3" fill="currentColor" fill-opacity="0.4" />
    <ellipse cx="35" cy="36" rx="5" ry="3" fill="currentColor" fill-opacity="0.3" />
    <ellipse cx="6" cy="48" rx="5" ry="2.5" fill="currentColor" fill-opacity="0.4" />
    <ellipse cx="34" cy="56" rx="4" ry="2" fill="currentColor" fill-opacity="0.3" />
  </svg>
</template>
