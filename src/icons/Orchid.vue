<script lang="ts">
defineProps<{
  size?: number;
  color?: string;
}>();
</script>

<template>
  <svg
    class="dq-icon dq-icon-orchid"
    :width="size"
    :height="size"
    viewBox="0 0 60 80"
    fill="none"
    :style="{ color }"
  >
    <path d="M30 75 Q25 50 20 30 Q15 20 12 15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
    <path d="M30 75 Q35 45 40 25 Q45 15 48 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
    <path d="M30 75 Q30 50 30 30 Q30 20 30 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <ellipse cx="15" cy="22" rx="8" ry="3" fill="currentColor" fill-opacity="0.3" transform="rotate(-30 15 22)" />
    <ellipse cx="45" cy="18" rx="8" ry="3" fill="currentColor" fill-opacity="0.3" transform="rotate(30 45 18)" />
    <ellipse cx="30" cy="15" rx="6" ry="2.5" fill="currentColor" fill-opacity="0.4" />
    <circle cx="30" cy="75" r="4" fill="var(--cinnabar)" />
  </svg>
</template>
