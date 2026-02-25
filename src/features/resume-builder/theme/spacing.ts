export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const;

export const resumeSpacing = {
  sectionSpacing: {
    compact: 4,
    standard: 5,
    relaxed: 6,
    loose: 7,
  },
  paragraphSpacing: {
    none: 0,
    small: 1,
    standard: 2,
    large: 3,
  },
  paragraphIndent: {
    none: 0,
    small: 2,
    standard: 4,
    large: 6,
  },
  itemSpacing: {
    compact: 2,
    standard: 3,
    relaxed: 4,
    loose: 5,
  },
  pageMargins: {
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
  },
} as const;

export const spacingAliases = {
  xs: spacing[1],
  sm: spacing[2],
  md: spacing[4],
  lg: spacing[6],
  xl: spacing[8],
  '2xl': spacing[12],
  '3xl': spacing[16],
} as const;

