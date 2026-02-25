import { useState, useEffect, useCallback } from 'react';
import type { Profile, ResumeData, DesignSettings, Theme } from '../types';
import { profileRepository } from '../repositories/ProfileRepository';

export const useProfileManager = () => {
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const loaded = profileRepository.getAllProfiles();
    return loaded.length > 0 ? loaded : [profileRepository.createNewProfile('My Resume')];
  });

  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    return profileRepository.getActiveProfileId() || profiles[0]?.id;
  });

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  useEffect(() => {
    profileRepository.saveProfiles(profiles);
  }, [profiles]);

  useEffect(() => {
    profileRepository.saveActiveProfileId(activeProfileId);
  }, [activeProfileId]);

  const createProfile = useCallback(() => {
    const newProfile = profileRepository.createNewProfile(`Resume ${profiles.length + 1}`);
    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newProfile.id);
  }, [profiles.length]);

  const createProfileFromData = useCallback(
    (data: ResumeData) => {
      const newProfile = profileRepository.createNewProfile(
        `Imported Resume ${profiles.length + 1}`,
      );
      newProfile.data = data;
      newProfile.lastModified = Date.now();

      setProfiles((prev) => [...prev, newProfile]);
      setActiveProfileId(newProfile.id);
      return newProfile;
    },
    [profiles.length],
  );

  const deleteProfile = useCallback(
    (profileId: string) => {
      if (profiles.length === 1) {
        alert('You must have at least one profile.');
        return;
      }
      if (confirm('Are you sure you want to delete this profile?')) {
        const newProfiles = profiles.filter((p) => p.id !== profileId);
        setProfiles(newProfiles);
        if (activeProfileId === profileId) {
          setActiveProfileId(newProfiles[0].id);
        }
      }
    },
    [profiles, activeProfileId],
  );

  const updateProfileName = useCallback(
    (name: string) => {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === activeProfileId ? { ...p, name, lastModified: Date.now() } : p,
        ),
      );
    },
    [activeProfileId],
  );

  const updateResumeData = useCallback(
    (newData: ResumeData | ((prev: ResumeData) => ResumeData)) => {
      setProfiles((prev) =>
        prev.map((p) => {
          if (p.id === activeProfileId) {
            const updatedData = typeof newData === 'function' ? newData(p.data) : newData;
            return { ...p, data: updatedData, lastModified: Date.now() };
          }
          return p;
        }),
      );
    },
    [activeProfileId],
  );

  const updateDesignSettings = useCallback(
    (newSettings: DesignSettings | ((prev: DesignSettings) => DesignSettings)) => {
      setProfiles((prev) =>
        prev.map((p) => {
          if (p.id === activeProfileId) {
            const updatedSettings =
              typeof newSettings === 'function' ? newSettings(p.design) : newSettings;
            return { ...p, design: updatedSettings, lastModified: Date.now() };
          }
          return p;
        }),
      );
    },
    [activeProfileId],
  );

  const updateTheme = useCallback(
    (newTheme: Theme) => {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === activeProfileId ? { ...p, theme: newTheme, lastModified: Date.now() } : p,
        ),
      );
    },
    [activeProfileId],
  );

  const setTargetRole = useCallback(
    (role: string) => {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === activeProfileId ? { ...p, targetRole: role, lastModified: Date.now() } : p,
        ),
      );
    },
    [activeProfileId],
  );

  const setJobDescription = useCallback(
    (desc: string) => {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === activeProfileId
            ? { ...p, jobDescription: desc, lastModified: Date.now() }
            : p,
        ),
      );
    },
    [activeProfileId],
  );

  const saveSnapshot = useCallback(() => {
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === activeProfileId) {
          const newEntry = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            data: JSON.parse(JSON.stringify(p.data)),
            design: JSON.parse(JSON.stringify(p.design)),
            theme: p.theme,
            targetRole: p.targetRole,
            jobDescription: p.jobDescription,
          };
          const history = [newEntry, ...(p.history || [])].slice(0, 50);
          return { ...p, history, lastModified: Date.now() };
        }
        return p;
      }),
    );
  }, [activeProfileId]);

  const restoreSnapshot = useCallback(
    (historyId: string) => {
      if (
        !confirm(
          'Are you sure you want to restore this version? Current unsaved changes will be lost.',
        )
      ) {
        return;
      }

      setProfiles((prev) =>
        prev.map((p) => {
          if (p.id === activeProfileId && p.history) {
            const entry = p.history.find((h) => h.id === historyId);
            if (entry) {
              return {
                ...p,
                data: JSON.parse(JSON.stringify(entry.data)),
                design: JSON.parse(JSON.stringify(entry.design)),
                theme: entry.theme,
                targetRole: entry.targetRole,
                jobDescription: entry.jobDescription,
                lastModified: Date.now(),
              };
            }
          }
          return p;
        }),
      );
    },
    [activeProfileId],
  );

  const deleteSnapshot = useCallback(
    (historyId: string) => {
      setProfiles((prev) =>
        prev.map((p) => {
          if (p.id === activeProfileId && p.history) {
            return { ...p, history: p.history.filter((h) => h.id !== historyId) };
          }
          return p;
        }),
      );
    },
    [activeProfileId],
  );

  return {
    profiles,
    activeProfileId,
    activeProfile,
    setActiveProfileId,
    createProfile,
    createProfileFromData,
    deleteProfile,
    updateProfileName,
    updateResumeData,
    updateDesignSettings,
    updateTheme,
    setTargetRole,
    setJobDescription,
    saveSnapshot,
    restoreSnapshot,
    deleteSnapshot,
  };
};

