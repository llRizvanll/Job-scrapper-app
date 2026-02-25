import type { Profile } from '../types';
import { INITIAL_RESUME_DATA, INITIAL_DESIGN_SETTINGS } from '../constants';

const STORAGE_KEY = 'resume_profiles';
const ACTIVE_PROFILE_KEY = 'active_profile_id';

export const saveProfiles = (profiles: Profile[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  } catch (error) {
    console.error('Failed to save profiles to localStorage:', error);
  }
};

export const loadProfiles = (): Profile[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsedProfiles: Profile[] = JSON.parse(stored);

    return parsedProfiles.map((profile) => ({
      ...profile,
      data: { ...INITIAL_RESUME_DATA, ...profile.data },
      design: {
        ...INITIAL_DESIGN_SETTINGS,
        ...profile.design,
        page: {
          ...INITIAL_DESIGN_SETTINGS.page,
          ...profile.design?.page,
          margins: {
            ...INITIAL_DESIGN_SETTINGS.page.margins,
            ...profile.design?.page?.margins,
          },
        },
        sections: profile.design?.sections ?? INITIAL_DESIGN_SETTINGS.sections,
        themeConfig: {
          ...INITIAL_DESIGN_SETTINGS.themeConfig,
          ...profile.design?.themeConfig,
        },
        fontFamily: {
          ...INITIAL_DESIGN_SETTINGS.fontFamily,
          ...profile.design?.fontFamily,
        },
      },
      targetRole: profile.targetRole || '',
      jobDescription: profile.jobDescription || '',
      history: profile.history || [],
    }));
  } catch (error) {
    console.error('Failed to load profiles from localStorage:', error);
    return [];
  }
};

export const saveActiveProfileId = (id: string): void => {
  try {
    localStorage.setItem(ACTIVE_PROFILE_KEY, id);
  } catch (error) {
    console.error('Failed to save active profile ID:', error);
  }
};

export const loadActiveProfileId = (): string | null => {
  try {
    return localStorage.getItem(ACTIVE_PROFILE_KEY);
  } catch (error) {
    console.error('Failed to load active profile ID:', error);
    return null;
  }
};

export const createNewProfile = (name: string = 'My Resume'): Profile => ({
  id: crypto.randomUUID(),
  name,
  lastModified: Date.now(),
  data: { ...INITIAL_RESUME_DATA },
  design: { ...INITIAL_DESIGN_SETTINGS },
  theme: 'classic',
  targetRole: '',
  jobDescription: '',
  history: [],
});

