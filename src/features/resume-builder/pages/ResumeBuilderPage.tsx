import React, { useState, useCallback } from 'react';
import type { Profile } from '../types';
import { useProfileManager } from '../hooks/useProfileManager';
import { useResume } from '../hooks/useResume';
import { useDesign } from '../hooks/useDesign';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { ExportService } from '../services/ExportService';
import ResumeBuilderTemplate from '../components/templates/ResumeBuilderTemplate';
import { Header } from '@/presentation/components/landing/Header';
import { Footer } from '@/presentation/components/landing/Footer';
import '../index.css';

const ResumeBuilderPage: React.FC = () => {
  const {
    profiles,
    activeProfileId,
    activeProfile,
    setActiveProfileId,
    updateProfileName,
    deleteProfile,
    createProfileFromData,
    updateResumeData,
    updateDesignSettings,
    updateTheme,
    setTargetRole,
    setJobDescription,
    saveSnapshot,
    restoreSnapshot,
    deleteSnapshot,
  } = useProfileManager();

  const {
    isTailoring,
    showAIPanel,
    setShowAIPanel,
    handleTailor,
  } = useResume({
    resumeData: activeProfile.data,
    updateResumeData,
    targetRole: activeProfile.targetRole,
    jobDescription: activeProfile.jobDescription,
  });

  const {
    updateDesignSetting,
    updateFontFamily,
    resetStyling,
    applyTemplate,
    moveSectionUp,
    moveSectionDown,
    deleteSection,
    addPageBreak,
    removePageBreaks,
  } = useDesign({
    designSettings: activeProfile.design,
    updateDesignSettings,
    updateTheme,
  });

  const {
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
  } = useAppNavigation();

  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      await ExportService.exportToPDF(activeProfile.design);
    } catch (e) {
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [activeProfile.design]);

  const handleSectionImprove = (sectionId: string) => {
    setShowAIPanel(true);
    console.log('Improve section:', sectionId);
  };

  const handleClosePanel = () => handlePanelChange(null);

  const handleNewResumeCreated = (newProfile: Profile) => {
    console.log('✅ New resume created:', newProfile);
    alert(
      `New resume "${newProfile.name}" created!\n\nThis will be saved to your profiles in a future update.`,
    );
  };

  const handleLoadProfile = (data: any) => {
    const newProfile = createProfileFromData(data);
    alert(`Successfully loaded profile: "${newProfile.name}"`);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Header />
      <main className="pt-24 pb-24 bg-[#FAFAFA]">
        <ResumeBuilderTemplate
          activeProfile={activeProfile}
          activePanel={activePanel}
          showTemplateGallery={showTemplateGallery}
          showAIPanel={showAIPanel}
          previewMode={previewMode}
          editMode={editMode}
          selectedSection={selectedSection}
          isExporting={isExporting}
          isTailoring={isTailoring}
          onPrint={handlePrint}
          onExportPDF={handleExportPDF}
          onPreviewModeChange={setPreviewMode}
          updateDesignSetting={updateDesignSetting}
          updateFontFamily={updateFontFamily}
          updateDesignSettings={updateDesignSettings}
          resetStyling={resetStyling}
          toggleSidebar={toggleSidebar}
          addPageBreak={addPageBreak}
          removePageBreaks={removePageBreaks}
          setActivePanel={handlePanelChange}
          closePanel={handleClosePanel}
          setShowTemplateGallery={setShowTemplateGallery}
          applyTemplate={applyTemplate}
          setShowAIPanel={setShowAIPanel}
          setTargetRole={setTargetRole}
          setJobDescription={setJobDescription}
          handleTailor={handleTailor}
          updateResumeData={updateResumeData}
          moveSectionUp={moveSectionUp}
          moveSectionDown={moveSectionDown}
          deleteSection={deleteSection}
          handleSectionImprove={handleSectionImprove}
          setSelectedSection={setSelectedSection}
          onSaveSnapshot={saveSnapshot}
          onRestoreSnapshot={restoreSnapshot}
          onDeleteSnapshot={deleteSnapshot}
          onNewResumeCreated={handleNewResumeCreated}
          profiles={profiles}
          activeProfileId={activeProfileId}
          onSwitchProfile={setActiveProfileId}
          onDeleteProfile={deleteProfile}
          onProfileNameChange={updateProfileName}
          onLoadProfileData={handleLoadProfile}
        />
      </main>
      <Footer />
    </div>
  );
};

export { ResumeBuilderPage };

