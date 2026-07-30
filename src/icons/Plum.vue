<script lang="ts">
defineProps<{
  size?: number;
  color?: string;
}>();
</script>

<template>
  <svg
    class="dq-icon dq-icon-plum"
    :width="size"
    :height="size"
    viewBox="0 0 60 80"
    fill="none"
    :style="{ color }"
  >
    <path d="M30 10 Q28 30 25 50 Q22 65 20 72" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <circle cx="18" cy="25" r="6" fill="currentColor" fill-opacity="0.5" />
    <circle cx="24" cy="22" r="5" fill="currentColor" fill-opacity="0.6" />
    <circle cx="32" cy="20" r="7" fill="currentColor" fill-opacity="0.4" />
    <circle cx="22" cy="35" r="5" fill="currentColor" fill-opacity="0.5" />
    <circle cx="28" cy="38" r="4" fill="currentColor" fill-opacity="0.3" />
    <circle cx="15" cy="18" r="2" fill="var(--cinnabar)" />
    <circle cx="26" cy="16" r="2" fill="var(--cinnabar)" />
    <circle cx="34" cy="28" r="2" fill="var(--cinnabar)" />
  </svg>
</template>
