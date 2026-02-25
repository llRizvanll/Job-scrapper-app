import type { Theme, DesignSettings } from './types';
import { themeColors, fontFamilies, resumeFontSizes, lineHeights, resumeSpacing } from './theme';

export interface DesignTemplate {
  id: string;
  name: string;
  theme: Theme;
  color: string;
  designSettings: Partial<DesignSettings>;
}

export const DESIGN_TEMPLATES: DesignTemplate[] = [
  {
    id: 'summit',
    name: 'Summit',
    theme: 'modern',
    color: themeColors.summit,
    designSettings: {
      themeColor: themeColors.summit,
      fontFamily: {
        display: fontFamilies.montserrat,
        heading: fontFamilies.montserrat,
        text: fontFamilies.openSans,
      },
      fontSize: resumeFontSizes.base,
      headingSize: resumeFontSizes.headingSmall,
      lineHeight: lineHeights.relaxed,
    },
  },
  {
    id: 'maple',
    name: 'Maple',
    theme: 'professional',
    color: themeColors.maple,
    designSettings: {
      themeColor: themeColors.maple,
      fontFamily: {
        display: fontFamilies.raleway,
        heading: fontFamilies.raleway,
        text: fontFamilies.lato,
      },
      fontSize: resumeFontSizes.base,
      headingSize: resumeFontSizes.headingMedium,
      lineHeight: lineHeights.standard,
    },
  },
  {
    id: 'valiant',
    name: 'Valiant',
    theme: 'modern',
    color: themeColors.valiant,
    designSettings: {
      themeColor: themeColors.valiant,
      fontFamily: {
        display: fontFamilies.inter,
        heading: fontFamilies.inter,
        text: fontFamilies.inter,
      },
      fontSize: resumeFontSizes.base,
      headingSize: resumeFontSizes.headingMedium,
      lineHeight: lineHeights.relaxed,
    },
  },
  {
    id: 'quartz',
    name: 'Quartz',
    theme: 'creative',
    color: themeColors.quartz,
    designSettings: {
      themeColor: themeColors.quartz,
      fontFamily: {
        display: fontFamilies.playfairDisplay,
        heading: fontFamilies.playfairDisplay,
        text: fontFamilies.lato,
      },
      fontSize: resumeFontSizes.base,
      headingSize: resumeFontSizes.headingLarge,
      lineHeight: lineHeights.normal,
    },
  },
  {
    id: 'zenith',
    name: 'Zenith',
    theme: 'minimal',
    color: themeColors.zenith,
    designSettings: {
      themeColor: themeColors.zenith,
      fontFamily: {
        display: fontFamilies.inter,
        heading: fontFamilies.inter,
        text: fontFamilies.inter,
      },
      fontSize: resumeFontSizes.base,
      headingSize: resumeFontSizes.large,
      lineHeight: lineHeights.standard,
      sectionSpacing: resumeSpacing.sectionSpacing.relaxed,
    },
  },
  {
    id: 'ats',
    name: 'ATS',
    theme: 'classic',
    color: themeColors.ats,
    designSettings: {
      themeColor: themeColors.ats,
      fontFamily: {
        display: fontFamilies.roboto,
        heading: fontFamilies.roboto,
        text: fontFamilies.roboto,
      },
      fontSize: resumeFontSizes.medium,
      headingSize: resumeFontSizes.large,
      lineHeight: lineHeights.tight,
      sectionSpacing: resumeSpacing.sectionSpacing.compact,
    },
  },
  {
    id: 'denali',
    name: 'Denali',
    theme: 'executive',
    color: themeColors.denali,
    designSettings: {
      themeColor: themeColors.denali,
      fontFamily: {
        display: fontFamilies.merriweather,
        heading: fontFamilies.merriweather,
        text: fontFamilies.openSans,
      },
      fontSize: resumeFontSizes.base,
      headingSize: resumeFontSizes.headingMedium,
      lineHeight: lineHeights.relaxed,
    },
  },
  {
    id: 'arya',
    name: 'Arya',
    theme: 'modern',
    color: themeColors.arya,
    designSettings: {
      themeColor: themeColors.arya,
      fontFamily: {
        display: fontFamilies.nunito,
        heading: fontFamilies.nunito,
        text: fontFamilies.openSans,
      },
      fontSize: resumeFontSizes.base,
      headingSize: resumeFontSizes.headingSmall,
      lineHeight: lineHeights.standard,
    },
  },
  {
    id: 'nevis',
    name: 'Nevis',
    theme: 'creative',
    color: themeColors.nevis,
    designSettings: {
      themeColor: themeColors.nevis,
      fontFamily: {
        display: fontFamilies.raleway,
        heading: fontFamilies.raleway,
        text: fontFamilies.lato,
      },
      fontSize: resumeFontSizes.base,
      headingSize: resumeFontSizes.headingMedium,
      lineHeight: lineHeights.relaxed,
    },
  },
  {
    id: 'corporate',
    name: 'Corporate',
    theme: 'professional',
    color: themeColors.corporate,
    designSettings: {
      themeColor: themeColors.corporate,
      fontFamily: {
        display: fontFamilies.libreBaskerville,
        heading: fontFamilies.libreBaskerville,
        text: fontFamilies.lato,
      },
      fontSize: resumeFontSizes.base,
      headingSize: resumeFontSizes.headingSmall,
      lineHeight: lineHeights.standard,
    },
  },
  {
    id: 'gallant',
    name: 'Gallant',
    theme: 'modern',
    color: themeColors.gallant,
    designSettings: {
      themeColor: themeColors.gallant,
      fontFamily: {
        display: fontFamilies.montserrat,
        heading: fontFamilies.montserrat,
        text: fontFamilies.openSans,
      },
      fontSize: resumeFontSizes.base,
      headingSize: resumeFontSizes.headingMedium,
      lineHeight: lineHeights.relaxed,
    },
  },
  {
    id: 'air',
    name: 'Air',
    theme: 'minimal',
    color: themeColors.air,
    designSettings: {
      themeColor: themeColors.air,
      fontFamily: {
        display: fontFamilies.inter,
        heading: fontFamilies.inter,
        text: fontFamilies.inter,
      },
      fontSize: resumeFontSizes.base,
      headingSize: resumeFontSizes.large,
      lineHeight: lineHeights.normal,
      sectionSpacing: 7,
    },
  },
];

