/**
 * 汉设计系统 - 间距令牌
 */

export const spacing = {
  'space-0': '0',
  'space-1': '4px',
  'space-2': '8px',
  'space-3': '12px',
  'space-4': '16px',
  'space-5': '24px',
  'space-6': '32px',
  'space-7': '48px',
  'space-8': '64px',
  'space-9': '96px',
  'space-10': '128px',
  'space-12': '192px',
  'space-16': '256px',
} as const;

export type SpacingKey = keyof typeof spacing;

export const layout = {
  'container-sm': '640px',
  'container-md': '960px',
  'container-lg': '1280px',
  'container-xl': '1440px',
  'gutter': '24px',
} as const;
