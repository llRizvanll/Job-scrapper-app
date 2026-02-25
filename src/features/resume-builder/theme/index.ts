export * from './colors';
export * from './typography';
export * from './spacing';
export * from './borders';
export * from './shadows';
export * from './transitions';
export * from './breakpoints';

import { colors, themeColors, colorAliases } from './colors';
import {
  typography,
  fontFamilies,
  fontOptions,
  fontWeights,
  fontSizes,
  resumeFontSizes,
  lineHeights,
  lineHeightOptions,
  defaultFontFamily,
} from './typography';
import { spacing, resumeSpacing, spacingAliases } from './spacing';
import { borderRadius, borderWidths, borderStyles, borderAliases } from './borders';
import { shadows, resumeShadows, shadowAliases } from './shadows';
import { transitions, durations, easings, animations } from './transitions';
import { breakpoints, mediaQueries, tailwindBreakpoints } from './breakpoints';

export const theme = {
  colors: {
    ...colors,
    theme: themeColors,
    aliases: colorAliases,
  },
  typography: {
    ...typography,
    fontFamilies,
    fontOptions,
    fontWeights,
    fontSizes,
    resumeFontSizes,
    lineHeights,
    lineHeightOptions,
    defaultFontFamily,
  },
  spacing: {
    ...spacing,
    resume: resumeSpacing,
    aliases: spacingAliases,
  },
  borders: {
    radius: borderRadius,
    width: borderWidths,
    style: borderStyles,
    aliases: borderAliases,
  },
  shadows: {
    ...shadows,
    resume: resumeShadows,
    aliases: shadowAliases,
  },
  transitions: {
    ...transitions,
    durations,
    easings,
    animations,
  },
  breakpoints: {
    ...breakpoints,
    mediaQueries,
    tailwind: tailwindBreakpoints,
  },
} as const;

export type Theme = typeof theme;
export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type Borders = typeof borderRadius;
export type Shadows = typeof shadows;
export type Transitions = typeof transitions;
export type Breakpoints = typeof breakpoints;

