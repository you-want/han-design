/**
 * 汉设计系统 - 字体排印令牌
 */

export const fontFamily = {
  serif: '"Noto Serif SC", "Source Han Serif SC", "Songti SC", "SimSun", serif',
  kai: '"LXGW WenKai", "Kaiti SC", "STKaiti", "KaiTi", serif',
  sans: '"PingFang SC", "Noto Sans SC", -apple-system, BlinkMacSystemFont, sans-serif',
  mono: '"SF Mono", "JetBrains Mono", "Fira Code", Consolas, monospace',
} as const;

export const fontSize = {
  'fs-display': '72px',
  'fs-h1': '48px',
  'fs-h2': '36px',
  'fs-h3': '28px',
  'fs-h4': '22px',
  'fs-h5': '18px',
  'fs-body': '16px',
  'fs-small': '14px',
  'fs-caption': '12px',
  'fs-tiny': '10px',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeight = {
  tight: 1.1,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.9,
  loose: 2.2,
} as const;

export const letterSpacing = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.02em',
  wider: '0.08em',
  widest: '0.2em',
} as const;

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} as const;
