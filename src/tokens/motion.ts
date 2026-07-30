/**
 * 汉设计系统 - 动画令牌
 */

export const easing = {
  'ease-ink': 'cubic-bezier(0.22, 1, 0.36, 1)',
  'ease-roll': 'cubic-bezier(0.65, 0, 0.35, 1)',
  'ease-soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export const duration = {
  'duration-fast': '150ms',
  'duration-normal': '250ms',
  'duration-slow': '400ms',
  'duration-slower': '600ms',
  'duration-slowest': '1000ms',
} as const;

export const keyframes = {
  'ink-spread': 'ink-spread',
  'seal-drop': 'seal-drop',
  'scroll-unroll': 'scroll-unroll',
  'brush-write': 'brush-write',
  'fade-in': 'fade-in',
  'fade-in-up': 'fade-in-up',
  'shake': 'shake',
} as const;

export const motion = {
  easing,
  duration,
  keyframes,
} as const;
