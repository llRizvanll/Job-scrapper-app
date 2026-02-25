import React, { useState } from 'react';
import type { ResumeData } from '../types';

interface LoadProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoad: (data: ResumeData) => void;
}

export const LoadProfileDialog: React.FC<LoadProfileDialogProps> = ({
  isOpen,
  onClose,
  onLoad,
}) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const parseAndLoad = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const sourceData = parsed.CURRENT_DATA || parsed;

      if (!sourceData) {
        throw new Error('Could not find valid resume data structure');
      }

      const resumeData: ResumeData = {
        name: sourceData.personalInfo?.name || '',
        headline: sourceData.personalInfo?.headline || '',
        location: sourceData.personalInfo?.location || '',
        phone: sourceData.personalInfo?.phone || '',
        email: sourceData.personalInfo?.email || '',
        website: sourceData.personalInfo?.website || '',
        linkedin: sourceData.personalInfo?.linkedin || '',
        github: sourceData.personalInfo?.github || '',
        summary: sourceData.summary?.current || sourceData.summary || '',
        experience: (sourceData.experience || []).map((exp: any) => ({
          id: exp.id || crypto.randomUUID(),
          company: exp.company || '',
          location: exp.location || '',
          role: exp.role || '',
          period: exp.period || '',
          bullets: exp.current_bullets || exp.bullets || [],
        })),
        skills: sourceData.skills?.current || sourceData.skills || [],
        education: (sourceData.education || []).map((edu: any) => ({
          id: edu.id || crypto.randomUUID(),
          school: edu.school || '',
          degree: edu.degree || '',
          period: edu.period || '',
          location: edu.location || '',
        })),
        certifications: (sourceData.certifications || []).map((cert: any) => ({
          id: cert.id || crypto.randomUUID(),
          name: cert.name || '',
          issuer: cert.issuer || '',
          date: cert.date || '',
          expiry: cert.expiry,
        })),
      };

      onLoad(resumeData);
      onClose();
    } catch (err) {
      setError('Invalid JSON format. Please check your data.');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Load Profile Data
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <strong>Tip:</strong> You can paste the <code>CURRENT_DATA</code> section from your AI
            optimization file, or any full valid resume JSON.
          </div>

          <textarea
            className="w-full h-64 p-4 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder={`Paste JSON here...\n\nExample:\n{\n  "CURRENT_DATA": {\n    "personalInfo": { ... },\n    "experience": [ ... ]\n  }\n}`}
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value);
              setError(null);
            }}
          />

          {error && (
            <div className="text-red-600 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={parseAndLoad}
            disabled={!jsonInput.trim()}
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            Create Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadProfileDialog;

