import React from 'react';
import { NewResumeButton } from '../NewResumeButton';
import type { ResumeData, Profile } from '../../types';

interface HeaderProps {
  onDownload: () => void;
  onExportPDF?: () => void;
  onPreviewPDF?: () => void;
  isExporting: boolean;
  previewMode: boolean;
  onPreviewModeChange: (enabled: boolean) => void;
  currentResumeData?: ResumeData;
  onNewResumeCreated?: (profile: Profile) => void;
  onOpenAIPrompter?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onDownload,
  onExportPDF,
  onPreviewPDF,
  isExporting,
  previewMode,
  onPreviewModeChange,
  currentResumeData,
  onNewResumeCreated,
  onOpenAIPrompter,
}) => {
  return (
    <header className="h-12 bg-white flex items-center justify-between px-4 sticky top-0 z-50 print:hidden">
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={onDownload}
          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-600">
          <span className="px-3 py-2 rounded-md text-indigo-600 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Resumes
          </span>
          <span className="px-3 py-2 text-gray-400 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Websites
          </span>
          <span className="px-3 py-2 text-gray-400 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              />
            </svg>
            Cover Letters
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {currentResumeData && onNewResumeCreated && (
          <>
            <NewResumeButton
              currentResumeData={currentResumeData}
              onNewResumeCreated={onNewResumeCreated}
              variant="secondary"
            />
            <div className="h-6 w-px bg-gray-300" />
          </>
        )}

        {onOpenAIPrompter && (
          <>
            <button
              type="button"
              onClick={onOpenAIPrompter}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-md shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Prompt Generator
            </button>
            <div className="h-6 w-px bg-gray-300" />
          </>
        )}

        <label className="hidden md:flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Preview Mode
          <div
            className={`relative inline-block w-10 h-5 rounded-full transition-colors cursor-pointer ${
              previewMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => onPreviewModeChange(!previewMode)}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                previewMode ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </div>
        </label>

        <div className="h-6 w-px bg-gray-300 mx-2" />

        <button
          type="button"
          onClick={onPreviewPDF}
          disabled={isExporting}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Preview
        </button>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          Share
        </button>

        <button
          type="button"
          onClick={onExportPDF}
          disabled={isExporting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {isExporting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
              Saving...
            </>
          ) : (
            <>
              Download PDF
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </>
          )}
        </button>

        <div className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-sm ml-2">
          R
        </div>
      </div>
    </header>
  );
};

export default Header;

