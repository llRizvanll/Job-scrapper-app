import { useState } from 'react';
import type { PanelType } from '../types';

export const useAppNavigation = () => {
  const [activePanel, setActivePanel] = useState<PanelType | null>('style');
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const editMode = !previewMode;

  const handlePanelChange = (panel: PanelType | null) => {
    if (panel === 'templates') {
      setShowTemplateGallery(true);
      setActivePanel(null);
    } else {
      setActivePanel(panel);
    }
  };

  const toggleSidebar = () => {
    setActivePanel((prev) => (prev ? null : 'style'));
  };

  return {
    activePanel,
    showTemplateGallery,
    setShowTemplateGallery,
    previewMode,
    setPreviewMode,
    editMode,
    selectedSection,
    setSelectedSection,
    handlePanelChange,
    toggleSidebar,
  };
};

