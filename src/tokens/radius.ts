/**
 * 汉设计系统 - 圆角令牌
 */

export const radius = {
  'none': '0',
  'radius-sm': '4px',
  'radius-md': '8px',
  'radius-lg': '12px',
  'radius-xl': '20px',
  'radius-pill': '999px',
} as const;

export type RadiusKey = keyof typeof radius;
