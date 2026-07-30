<script lang="ts">
defineProps<{
  size?: number;
  color?: string;
}>();
</script>

<template>
  <svg
    class="dq-icon dq-icon-cloud"
    :width="size"
    :height="size"
    viewBox="0 0 100 60"
    fill="none"
    :style="{ color }"
  >
    <path
      d="M10 40 Q10 28 22 28 Q24 18 36 20 Q42 10 52 16 Q62 12 66 22 Q80 20 84 32 Q92 36 88 44 Q84 52 72 50 Q60 56 48 50 Q36 56 24 50 Q14 48 10 44 Z"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M28 38 Q28 30 36 30 Q42 26 46 32 Q52 28 56 34 Q62 32 64 40 Q72 40 72 46"
      stroke="currentColor"
      stroke-width="0.8"
      opacity="0.6"
    />
    <circle cx="44" cy="40" r="1.5" fill="currentColor" />
    <circle cx="56" cy="38" r="1" fill="currentColor" opacity="0.7" />
  </svg>
</template>
