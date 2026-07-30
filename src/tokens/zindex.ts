/**
 * 汉设计系统 - 层级令牌
 */

export const zIndex = {
  'hide': '-1',
  'base': '0',
  'dropdown': '100',
  'sticky': '200',
  'fixed': '300',
  'modal-overlay': '400',
  'modal': '500',
  'popover': '600',
  'toast': '700',
  'tooltip': '800',
} as const;

export type ZIndexKey = keyof typeof zIndex;
