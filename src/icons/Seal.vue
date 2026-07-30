<script lang="ts">
defineProps<{
  size?: number;
  color?: string;
}>();
</script>

<template>
  <svg
    class="dq-icon dq-icon-seal"
    :width="size"
    :height="size"
    viewBox="0 0 60 60"
    :style="{ color }"
  >
    <rect
      x="6"
      y="6"
      width="48"
      height="48"
      rx="4"
      fill="var(--cinnabar, #c0392b)"
      stroke="var(--cinnabar-deep, #9c2d22)"
      stroke-width="1"
      transform="rotate(-3 30 30)"
    />
    <g transform="rotate(-3 30 30)" fill="var(--paper-light, #faf7ef)">
      <rect x="12" y="14" width="10" height="20" rx="1" />
      <rect x="25" y="14" width="10" height="20" rx="1" />
      <rect x="38" y="14" width="10" height="20" rx="1" />
    </g>
  </svg>
</template>
