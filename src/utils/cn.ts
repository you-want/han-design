/**
 * 类名合并工具
 */
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

export function cn(...args: ClassValue[]): string {
  const classes: string[] = [];

  const toVal = (v: ClassValue) => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') {
      classes.push(String(v));
    } else if (Array.isArray(v)) {
      v.forEach(toVal);
    } else if (typeof v === 'object') {
      for (const key in v) {
        if (v[key]) classes.push(key);
      }
    }
  };

  args.forEach(toVal);
  return classes.join(' ');
}
