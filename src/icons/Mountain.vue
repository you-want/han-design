<script lang="ts">
defineProps<{
  size?: number;
  color?: string;
}>();
</script>

<template>
  <svg
    class="dq-icon dq-icon-mountain"
    :width="size"
    :height="size"
    viewBox="0 0 80 80"
    fill="none"
    :style="{ color }"
  >
    <path d="M8 50 Q20 30 30 42 Q40 28 50 40 Q60 30 72 50" fill="currentColor" fill-opacity="0.15" />
    <path d="M12 58 Q22 40 32 52 Q42 38 52 50 Q62 42 70 58" fill="currentColor" fill-opacity="0.25" />
    <path d="M4 66 Q18 46 28 58 Q38 44 48 56 Q58 48 68 66" fill="currentColor" fill-opacity="0.35" />
    <circle cx="58" cy="22" r="6" fill="currentColor" fill-opacity="0.4" />
  </svg>
</template>
