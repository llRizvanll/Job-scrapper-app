export const fontFamilies = {
  inter: 'Inter',
  roboto: 'Roboto',
  openSans: 'Open Sans',
  lato: 'Lato',
  montserrat: 'Montserrat',
  raleway: 'Raleway',
  merriweather: 'Merriweather',
  playfairDisplay: 'Playfair Display',
  nunito: 'Nunito',
  libreBaskerville: 'Libre Baskerville',
  ptSerif: 'PT Serif',
} as const;

export const fontOptions = [
  { label: 'Inter', value: fontFamilies.inter },
  { label: 'Roboto', value: fontFamilies.roboto },
  { label: 'Open Sans', value: fontFamilies.openSans },
  { label: 'Lato', value: fontFamilies.lato },
  { label: 'Montserrat', value: fontFamilies.montserrat },
  { label: 'Raleway', value: fontFamilies.raleway },
  { label: 'Merriweather', value: fontFamilies.merriweather },
  { label: 'Playfair Display', value: fontFamilies.playfairDisplay },
  { label: 'Nunito', value: fontFamilies.nunito },
  { label: 'Libre Baskerville', value: fontFamilies.libreBaskerville },
  { label: 'PT Serif', value: fontFamilies.ptSerif },
] as const;

export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
} as const;

export const resumeFontSizes = {
  tiny: 8,
  small: 9,
  base: 10,
  medium: 11,
  large: 12,
  headingSmall: 13,
  headingMedium: 14,
  headingLarge: 15,
} as const;

export const lineHeights = {
  none: 1,
  tight: 1.2,
  compact: 1.0,
  standard: 1.3,
  relaxed: 1.4,
  normal: 1.5,
  loose: 1.7,
} as const;

export const lineHeightOptions = [
  { label: 'Compact', value: lineHeights.compact },
  { label: 'Standard', value: lineHeights.standard },
  { label: 'Relaxed', value: lineHeights.relaxed },
  { label: 'Loose', value: lineHeights.loose },
] as const;

export const typography = {
  h1: {
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
  },
  h2: {
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
  },
  h3: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
  },
  h4: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.standard,
  },
  h5: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.standard,
  },
  h6: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.standard,
  },
  body: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  bodySmall: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.standard,
  },
  bodyLarge: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  caption: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.standard,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.standard,
  },
  button: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.none,
  },
} as const;

export const defaultFontFamily = `${fontFamilies.inter}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;

