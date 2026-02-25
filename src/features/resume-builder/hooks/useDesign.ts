import { useCallback } from 'react';
import type { DesignSettings, Theme, SectionConfig } from '../types';
import { INITIAL_DESIGN_SETTINGS } from '../constants';
import type { DesignTemplate } from '../designTemplates';

interface UseDesignProps {
  designSettings: DesignSettings;
  updateDesignSettings: (
    newSettings: DesignSettings | ((prev: DesignSettings) => DesignSettings),
  ) => void;
  updateTheme: (newTheme: Theme) => void;
}

export const useDesign = ({ updateDesignSettings, updateTheme }: UseDesignProps) => {
  const updateDesignSetting = useCallback(
    (key: keyof DesignSettings, value: unknown) => {
      updateDesignSettings((prev) => ({ ...prev, [key]: value }));
    },
    [updateDesignSettings],
  );

  const updateFontFamily = useCallback(
    (type: keyof DesignSettings['fontFamily'], value: string) => {
      updateDesignSettings((prev) => ({
        ...prev,
        fontFamily: { ...prev.fontFamily, [type]: value },
      }));
    },
    [updateDesignSettings],
  );

  const resetStyling = useCallback(() => {
    if (confirm('Are you sure you want to reset all styling to default?')) {
      updateDesignSettings(INITIAL_DESIGN_SETTINGS);
    }
  }, [updateDesignSettings]);

  const applyTemplate = useCallback(
    (template: DesignTemplate) => {
      updateTheme(template.theme);
      updateDesignSettings((prev) => ({
        ...prev,
        ...template.designSettings,
        fontFamily: {
          ...prev.fontFamily,
          ...template.designSettings.fontFamily,
        },
      }));
    },
    [updateTheme, updateDesignSettings],
  );

  const moveSectionUp = useCallback(
    (sectionId: string) => {
      updateDesignSettings((prev) => {
        const sections = [...(prev.sections || [])];
        const visibleSections = sections.filter((s) => s.visible);
        const index = visibleSections.findIndex((s) => s.id === sectionId);

        if (index > 0) {
          const currentActualIndex = sections.findIndex((s) => s.id === sectionId);
          const prevVisibleSection = visibleSections[index - 1];
          const prevActualIndex = sections.findIndex((s) => s.id === prevVisibleSection.id);

          [sections[currentActualIndex], sections[prevActualIndex]] = [
            sections[prevActualIndex],
            sections[currentActualIndex],
          ];
        }
        return { ...prev, sections };
      });
    },
    [updateDesignSettings],
  );

  const moveSectionDown = useCallback(
    (sectionId: string) => {
      updateDesignSettings((prev) => {
        const sections = [...(prev.sections || [])];
        const visibleSections = sections.filter((s) => s.visible);
        const index = visibleSections.findIndex((s) => s.id === sectionId);

        if (index < visibleSections.length - 1) {
          const currentActualIndex = sections.findIndex((s) => s.id === sectionId);
          const nextVisibleSection = visibleSections[index + 1];
          const nextActualIndex = sections.findIndex((s) => s.id === nextVisibleSection.id);

          [sections[currentActualIndex], sections[nextActualIndex]] = [
            sections[nextActualIndex],
            sections[currentActualIndex],
          ];
        }
        return { ...prev, sections };
      });
    },
    [updateDesignSettings],
  );

  const deleteSection = useCallback(
    (sectionId: string) => {
      updateDesignSettings((prev) => {
        const sections = (prev.sections || []).map((s) =>
          s.id === sectionId ? { ...s, visible: false } : s,
        );
        return { ...prev, sections };
      });
    },
    [updateDesignSettings],
  );

  const addPageBreak = useCallback(() => {
    updateDesignSettings((prev) => {
      const newBreak: SectionConfig = {
        id: `break-${Date.now()}`,
        name: 'Page Break',
        visible: true,
        type: 'break',
      };
      const sections = [...(prev.sections || [])];
      sections.push(newBreak);
      return { ...prev, sections };
    });
  }, [updateDesignSettings]);

  const removePageBreaks = useCallback(() => {
    updateDesignSettings((prev) => {
      const sections = (prev.sections || []).filter((s) => s.type !== 'break');
      return { ...prev, sections };
    });
  }, [updateDesignSettings]);

  return {
    updateDesignSetting,
    updateFontFamily,
    resetStyling,
    applyTemplate,
    moveSectionUp,
    moveSectionDown,
    deleteSection,
    addPageBreak,
    removePageBreaks,
  };
};

