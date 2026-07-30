/**
 * 汉设计系统 - 设计令牌主集合
 * 所有令牌统一在此集合，便于 CSS 变量生成
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing, layout } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { motion } from './motion';
import { zIndex } from './zindex';

export const tokens = {
  colors,
  typography,
  spacing,
  layout,
  radius,
  shadows,
  motion,
  zIndex,
} as const;

export type DesignTokens = typeof tokens;
