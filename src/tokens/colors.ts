/**
 * 汉设计系统 - 色彩令牌
 * 墨色为主，朱砂点睛，宣纸为底
 */

export const ink = {
  'ink-50': '#f5f2ea',
  'ink-100': '#ece8df',
  'ink-200': '#d9d4ca',
  'ink-300': '#bdb7ad',
  'ink-400': '#9c968c',
  'ink-500': '#7a746b',
  'ink-600': '#5a554e',
  'ink-700': '#3f3b35',
  'ink-800': '#2d2a26',
  'ink-900': '#1a1816',
} as const;

export const paper = {
  'paper': '#f5efe2',
  'paper-light': '#faf7ef',
  'paper-deep': '#ebe3d0',
  'paper-aged': '#e8ddc4',
} as const;

export const accent = {
  'cinnabar': '#c0392b',
  'cinnabar-deep': '#9c2d22',
  'cinnabar-light': '#d9534f',
  'jade': '#4a7a5a',
  'jade-light': '#7ba88c',
  'gold': '#b8860b',
  'gold-light': '#d4a947',
} as const;

export const functional = {
  success: '#4a7a5a',
  warning: '#b8860b',
  error: '#c0392b',
  info: '#7a746b',
} as const;

export const colors = {
  ink,
  paper,
  accent,
  functional,
} as const;

export type InkColorKey = keyof typeof ink;
export type PaperColorKey = keyof typeof paper;
export type AccentColorKey = keyof typeof accent;
export type ColorKey = InkColorKey | PaperColorKey | AccentColorKey;
