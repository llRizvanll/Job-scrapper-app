export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

export const borderWidths = {
  0: '0',
  1: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
} as const;

export const borderStyles = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  none: 'none',
} as const;

export const borderAliases = {
  default: borderWidths[1],
  thick: borderWidths[2],
  style: borderStyles.solid,
  radius: borderRadius.md,
  radiusLarge: borderRadius.lg,
  radiusFull: borderRadius.full,
} as const;

