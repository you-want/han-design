<script lang="ts">
defineProps<{
  size?: number;
  color?: string;
}>();
</script>

<template>
  <svg
    class="dq-icon dq-icon-chrysanthemum"
    :width="size"
    :height="size"
    viewBox="0 0 60 80"
    fill="none"
    :style="{ color }"
  >
    <path d="M30 75 Q30 50 30 30" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M25 50 Q18 40 12 42" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
    <path d="M35 55 Q45 48 50 52" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
    <ellipse cx="30" cy="30" rx="18" ry="8" fill="currentColor" fill-opacity="0.2" />
    <ellipse cx="30" cy="30" rx="12" ry="5" fill="currentColor" fill-opacity="0.3" />
    <ellipse cx="30" cy="30" rx="6" ry="3" fill="currentColor" fill-opacity="0.5" />
    <circle cx="30" cy="30" r="3" fill="var(--gold)" />
    <g stroke="currentColor" stroke-width="0.8" opacity="0.6">
      <path d="M12 30 L48 30" />
      <path d="M30 14 L30 46" />
    </g>
  </svg>
</template>
