import React from 'react';
import type { ResumeData, DesignSettings, Profile, PanelType } from '../../types';
import ResumePreview from '../organisms/ResumePreview';
import Editor from '../organisms/Editor';
import StyleEditor from '../organisms/StyleEditor';
import Header from '../organisms/Header';
import DesignToolbar from '../organisms/DesignToolbar';
import IconSidebar from '../organisms/IconSidebar';
import SettingsPanel from '../organisms/SettingsPanel';
import TemplateGallery from '../organisms/TemplateGallery';
import HistoryPanel from '../organisms/HistoryPanel';
import AIPrompter from '../AIPrompter';
import LoadProfileDialog from '../LoadProfileDialog';
import type { DesignTemplate } from '../../designTemplates';

interface ResumeBuilderTemplateProps {
  activeProfile: Profile;
  activePanel: PanelType;
  showTemplateGallery: boolean;
  showAIPanel: boolean;
  previewMode: boolean;
  editMode: boolean;
  selectedSection: string | null;
  isExporting: boolean;
  isTailoring: boolean;
  onPrint: () => void;
  onExportPDF: () => void;
  onPreviewModeChange: (enabled: boolean) => void;
  updateDesignSetting: (key: keyof DesignSettings, value: unknown) => void;
  updateFontFamily: (type: keyof DesignSettings['fontFamily'], value: string) => void;
  resetStyling: () => void;
  toggleSidebar: () => void;
  addPageBreak: () => void;
  removePageBreaks: () => void;
  updateDesignSettings: (settings: DesignSettings) => void;
  setActivePanel: (panel: PanelType) => void;
  closePanel: () => void;
  setShowTemplateGallery: (show: boolean) => void;
  applyTemplate: (template: DesignTemplate) => void;
  setShowAIPanel: (show: boolean) => void;
  setTargetRole: (role: string) => void;
  setJobDescription: (desc: string) => void;
  handleTailor: (role?: string, desc?: string) => void;
  updateResumeData: (data: ResumeData) => void;
  moveSectionUp: (id: string) => void;
  moveSectionDown: (id: string) => void;
  deleteSection: (id: string) => void;
  handleSectionImprove: (id: string) => void;
  setSelectedSection: (id: string | null) => void;
  onSaveSnapshot: () => void;
  onRestoreSnapshot: (id: string) => void;
  onDeleteSnapshot: (id: string) => void;
  onNewResumeCreated?: (profile: Profile) => void;
  profiles?: Profile[];
  activeProfileId?: string;
  onSwitchProfile?: (profileId: string) => void;
  onDeleteProfile?: (profileId: string) => void;
  onProfileNameChange?: (name: string) => void;
  onLoadProfileData?: (data: ResumeData) => void;
  textFormatActions?: {
    onBold: () => void;
    onItalic: () => void;
    onUnderline: () => void;
    onBulletList: () => void;
    onNumberedList: () => void;
    onAlignLeft: () => void;
    onAlignCenter: () => void;
    onAlignRight: () => void;
    onAlignJustify: () => void;
    onLink: () => void;
    onClearFormatting: () => void;
  };
}

const ResumeBuilderTemplate: React.FC<ResumeBuilderTemplateProps> = ({
  activeProfile,
  activePanel,
  showTemplateGallery,
  showAIPanel,
  previewMode,
  editMode,
  selectedSection,
  isExporting,
  isTailoring,
  onPrint,
  onExportPDF,
  onPreviewModeChange,
  updateDesignSetting,
  updateFontFamily,
  resetStyling,
  toggleSidebar,
  addPageBreak,
  removePageBreaks,
  updateDesignSettings,
  setActivePanel,
  closePanel,
  setShowTemplateGallery,
  applyTemplate,
  setShowAIPanel,
  setTargetRole,
  setJobDescription,
  handleTailor,
  updateResumeData,
  moveSectionUp,
  moveSectionDown,
  deleteSection,
  handleSectionImprove,
  setSelectedSection,
  onSaveSnapshot,
  onRestoreSnapshot,
  onDeleteSnapshot,
  onNewResumeCreated,
  profiles,
  activeProfileId,
  onSwitchProfile,
  onDeleteProfile,
  onProfileNameChange,
  onLoadProfileData,
  textFormatActions = {
    onBold: () => {},
    onItalic: () => {},
    onUnderline: () => {},
    onBulletList: () => {},
    onNumberedList: () => {},
    onAlignLeft: () => {},
    onAlignCenter: () => {},
    onAlignRight: () => {},
    onAlignJustify: () => {},
    onLink: () => {},
    onClearFormatting: () => {},
  },
}) => {
  const resumeData = activeProfile.data;
  const designSettings = activeProfile.design;
  const theme = activeProfile.theme;

  const [previewPdfUrl, setPreviewPdfUrl] = React.useState<string | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = React.useState(false);
  const [showAIPrompter, setShowAIPrompter] = React.useState(false);
  const [showLoadProfile, setShowLoadProfile] = React.useState(false);

  const handlePreviewPDF = async () => {
    try {
      setIsGeneratingPreview(true);
      const { ExportService } = await import('../../services/ExportService');
      const url = await ExportService.getPDFBlobUrl(designSettings);
      setPreviewPdfUrl(url);
    } catch (err) {
      console.error(err);
      window.alert('Failed to generate preview');
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  React.useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-pdf-export-scroll]');
    if (el) el.scrollTop = 0;
  }, []);

  const renderPanel = () => {
    switch (activePanel) {
      case 'style':
        return (
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <StyleEditor
              settings={designSettings}
              onChange={updateDesignSettings}
              isOpen
              onToggle={closePanel}
            />
          </div>
        );
      case 'format':
        return (
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto p-6">
            <Editor data={resumeData} onChange={updateResumeData} />
          </div>
        );
      case 'settings':
        return (
          <SettingsPanel
            onClose={closePanel}
            profiles={profiles}
            activeProfileId={activeProfileId}
            onSwitchProfile={onSwitchProfile}
            onDeleteProfile={onDeleteProfile}
            onProfileNameChange={onProfileNameChange}
            activeProfileName={activeProfile.name}
          />
        );
      case 'history':
        return (
          <HistoryPanel
            history={activeProfile.history || []}
            onSaveSnapshot={onSaveSnapshot}
            onRestore={onRestoreSnapshot}
            onDelete={onDeleteSnapshot}
            onClose={closePanel}
          />
        );
      case 'upload':
      case 'modules':
        return (
          <div className="w-80 bg-white border-r border-gray-200 p-6 flex flex-col items-center justify-center text-gray-400">
            <svg
              className="w-12 h-12 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p className="text-sm font-medium">Coming Soon</p>
            <p className="text-xs text-gray-300 mt-1">This feature is under development.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden font-sans">
      <Header
        onDownload={onPrint}
        onExportPDF={onExportPDF}
        isExporting={isExporting || isGeneratingPreview}
        previewMode={previewMode}
        onPreviewModeChange={onPreviewModeChange}
        onPreviewPDF={handlePreviewPDF}
        currentResumeData={resumeData}
        onNewResumeCreated={onNewResumeCreated}
        onOpenAIPrompter={() => setShowAIPrompter(true)}
      />

      <DesignToolbar
        settings={designSettings}
        updateSetting={updateDesignSetting}
        updateFamily={updateFontFamily}
        onReset={resetStyling}
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={!!activePanel}
        onAddPageBreak={addPageBreak}
        onRemovePageBreaks={removePageBreaks}
      />

      <div className="flex flex-1 overflow-hidden">
        <IconSidebar
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          onLoadProfile={() => setShowLoadProfile(true)}
        />

        {renderPanel()}

        <div className="flex-1 flex flex-col overflow-hidden">
          <main
            className="flex-1 bg-gray-200 overflow-y-auto p-8 flex justify-center items-start"
            onClick={() => setSelectedSection(null)}
            data-pdf-export-scroll
          >
            <div
              className="transform origin-top scale-[0.7] xl:scale-[0.85] 2xl:scale-100 shadow-2xl transition-all"
              data-pdf-export-scale-wrapper
            >
              <ResumePreview
                data={resumeData}
                theme={theme}
                designSettings={designSettings}
                editMode={editMode}
                selectedSection={selectedSection}
                onSectionSelect={setSelectedSection}
                onSectionMoveUp={moveSectionUp}
                onSectionMoveDown={moveSectionDown}
                onSectionDelete={deleteSection}
                onSectionImprove={handleSectionImprove}
                onDataChange={updateResumeData}
                textFormatActions={textFormatActions}
              />
            </div>
          </main>
        </div>
      </div>

      {showTemplateGallery && (
        <TemplateGallery
          onClose={() => setShowTemplateGallery(false)}
          onSelectTemplate={applyTemplate}
        />
      )}

      {showAIPanel && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:hidden">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center bg-indigo-600 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L14.5 9H22L16 14L18.5 21L12 17L5.5 21L8 14L2 9H9.5L12 2Z" />
                </svg>
                AI Resume Tailoring
              </h2>
              <button
                type="button"
                onClick={() => setShowAIPanel(false)}
                className="hover:bg-white/20 p-1 rounded"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Target Job Title
                </label>
                <input
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800"
                  placeholder="e.g. Senior Mobile Architect - Remote"
                  value={activeProfile.targetRole || ''}
                  onChange={(e) => setTargetRole(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Job Description / Requirements
                </label>
                <textarea
                  className="w-full p-3 border rounded-xl h-64 focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-gray-800"
                  placeholder="Paste the job description here. AI will extract keywords and highlight relevant experience..."
                  value={activeProfile.jobDescription || ''}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <div className="flex gap-4 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowAIPanel(false)}
                  className="px-6 py-2 border rounded-xl font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleTailor(activeProfile.targetRole, activeProfile.jobDescription)}
                  disabled={isTailoring}
                  className="px-8 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {isTailoring ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Tailoring...
                    </>
                  ) : (
                    'Optimize Resume'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <LoadProfileDialog
        isOpen={showLoadProfile}
        onClose={() => setShowLoadProfile(false)}
        onLoad={(data) => {
          if (onLoadProfileData) {
            onLoadProfileData(data);
          }
        }}
      />

      <AIPrompter
        isOpen={showAIPrompter}
        onClose={() => setShowAIPrompter(false)}
        currentResumeData={resumeData}
      />

      {previewPdfUrl && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm print:hidden">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" />
                </svg>
                PDF Preview
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = previewPdfUrl;
                    link.download = 'Resume_Preview.pdf';
                    link.click();
                  }}
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Download File
                </button>
                <button
                  type="button"
                  onClick={() => {
                    URL.revokeObjectURL(previewPdfUrl);
                    setPreviewPdfUrl(null);
                  }}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 bg-gray-100 p-4 overflow-hidden">
              <iframe
                src={previewPdfUrl}
                className="w-full h-full rounded-lg shadow-inner border border-gray-200"
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilderTemplate;

