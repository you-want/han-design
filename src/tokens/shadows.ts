/**
 * 汉设计系统 - 阴影令牌
 * 克制使用，以墨色层次代替厚重阴影
 */

export const shadows = {
  'shadow-sm': '0 1px 2px rgba(26, 24, 22, 0.06)',
  'shadow-md': '0 4px 12px rgba(26, 24, 22, 0.08)',
  'shadow-lg': '0 8px 24px rgba(26, 24, 22, 0.10)',
  'shadow-xl': '0 16px 48px rgba(26, 24, 22, 0.12)',
  'shadow-seal': '2px 3px 8px rgba(156, 45, 34, 0.3)',
  'shadow-inner': 'inset 0 2px 4px rgba(26, 24, 22, 0.06)',
} as const;

export type ShadowKey = keyof typeof shadows;
