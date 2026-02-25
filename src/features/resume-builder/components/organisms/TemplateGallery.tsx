import React, { useState } from 'react';
import { DESIGN_TEMPLATES, type DesignTemplate } from '../../designTemplates';

interface TemplateGalleryProps {
  onClose: () => void;
  onSelectTemplate: (template: DesignTemplate) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onClose, onSelectTemplate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = DESIGN_TEMPLATES.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 text-center relative">
          <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-800">Resume Templates</h2>
          <p className="text-sm text-gray-500 mt-1">
            Choose a design template to instantly style your resume.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="relative max-w-md mx-auto">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <h3 className="text-lg font-bold text-gray-800 text-center mb-6">All Templates</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => onSelectTemplate(template)}
                className="group text-left"
              >
                <div className="aspect-[8.5/11] bg-white rounded-lg border-2 border-gray-200 overflow-hidden group-hover:border-blue-400 group-hover:shadow-lg transition-all relative">
                  <div className="p-3 h-full flex flex-col">
                    <div
                      className="h-12 rounded mb-2 flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: template.color }}
                    >
                      {template.name}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="h-1.5 bg-gray-200 rounded w-3/4" />
                      <div className="h-1.5 bg-gray-200 rounded w-full" />
                      <div className="h-1.5 bg-gray-200 rounded w-5/6" />

                      <div
                        className="h-2 rounded mt-3 mb-1"
                        style={{
                          backgroundColor: `${template.color}30`,
                          borderLeft: `3px solid ${template.color}`,
                        }}
                      />
                      <div className="h-1 bg-gray-200 rounded w-full" />
                      <div className="h-1 bg-gray-200 rounded w-4/5" />
                      <div className="h-1 bg-gray-200 rounded w-full" />

                      <div
                        className="h-2 rounded mt-2 mb-1"
                        style={{
                          backgroundColor: `${template.color}30`,
                          borderLeft: `3px solid ${template.color}`,
                        }}
                      />
                      <div className="h-1 bg-gray-200 rounded w-full" />
                      <div className="h-1 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                    <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 px-4 py-2 rounded-lg">
                      Apply
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm font-bold text-gray-800 text-center group-hover:text-blue-600 transition-colors">
                  {template.name}
                </p>
                <p className="text-xs text-gray-500 text-center capitalize">{template.theme}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateGallery;

