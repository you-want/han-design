<script lang="ts">
defineProps<{
  size?: number;
  color?: string;
}>();
</script>

<template>
  <svg
    class="dq-icon dq-icon-fan"
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    fill="none"
    :style="{ color }"
  >
    <path d="M50 50 L50 12" stroke="currentColor" stroke-width="1.2" />
    <path d="M50 50 L20 20" stroke="currentColor" stroke-width="1.2" />
    <path d="M50 50 L12 50" stroke="currentColor" stroke-width="1.2" />
    <path d="M50 50 L20 80" stroke="currentColor" stroke-width="1.2" />
    <path d="M50 50 L50 88" stroke="currentColor" stroke-width="1.2" />
    <path d="M50 50 L80 80" stroke="currentColor" stroke-width="1.2" />
    <path d="M50 50 L88 50" stroke="currentColor" stroke-width="1.2" />
    <path d="M50 50 L80 20" stroke="currentColor" stroke-width="1.2" />
    <path
      d="M12 50 Q30 10 50 12 Q70 10 88 50"
      fill="currentColor"
      fill-opacity="0.08"
    />
    <circle cx="50" cy="50" r="3" fill="currentColor" />
    <text x="50" y="32" text-anchor="middle" font-size="8" fill="currentColor" opacity="0.6">汉</text>
  </svg>
</template>
