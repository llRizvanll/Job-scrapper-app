import React from 'react';
import type { DesignSettings } from '../../types';
import { fontOptions, colors } from '../../theme';

interface StyleEditorProps {
  settings: DesignSettings;
  onChange: (settings: DesignSettings) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ settings, onChange }) => {
  const updateFamily = (type: keyof DesignSettings['fontFamily'], value: string) => {
    onChange({
      ...settings,
      fontFamily: {
        ...settings.fontFamily,
        [type]: value,
      },
    });
  };

  const updateSetting = (key: keyof DesignSettings, value: unknown) => {
    onChange({
      ...settings,
      [key]: value as never,
    });
  };

  const renderSlider = (
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    onValueChange: (val: number) => void,
  ) => (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-bold text-gray-700">{label}</label>
      </div>
      <div className="relative w-full h-4 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onValueChange(parseFloat(e.target.value))}
          className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-0"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-full pb-20">
      <div className="p-5 border-b border-gray-100 bg-white sticky top-0 z-10">
        <h2 className="text-xl font-bold text-gray-800">Design &amp; Formatting</h2>
        <p className="text-xs text-gray-500 mt-1">Customize your resume appearance</p>
      </div>

      <div className="px-5 py-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
        <div>
          <div className="flex justify-between items-center mb-2 border-b pb-2">
            <h3 className="font-bold text-gray-900">Font style</h3>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">Font</label>
            <div className="relative">
              <select
                value={settings.fontFamily.text}
                onChange={(e) => {
                  updateFamily('text', e.target.value);
                  updateFamily('heading', e.target.value);
                  updateFamily('display', e.target.value);
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none hover:border-gray-400 transition-colors appearance-none"
              >
                <option disabled>Select...</option>
                {fontOptions.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Font Size</label>
              <div className="relative">
                <select
                  value={settings.fontSize}
                  onChange={(e) => updateSetting('fontSize', Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {[8, 9, 10, 10.5, 11, 11.5, 12, 14, 16, 18].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Heading Size</label>
              <div className="relative">
                <select
                  value={settings.headingSize || 14}
                  onChange={(e) => updateSetting('headingSize', Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {[10, 11, 12, 13, 14, 15, 16, 18, 20, 24, 28, 32].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {renderSlider(
              'Section Spacing',
              settings.sectionSpacing ?? 5,
              0,
              20,
              1,
              (v) => updateSetting('sectionSpacing', v),
            )}
            {renderSlider(
              'Paragraph Spacing',
              settings.paragraphSpacing ?? 2,
              0,
              10,
              0.5,
              (v) => updateSetting('paragraphSpacing', v),
            )}
            {renderSlider(
              'Line Spacing',
              settings.lineHeight ?? 1.3,
              0.8,
              2.5,
              0.1,
              (v) => updateSetting('lineHeight', v),
            )}
            {renderSlider(
              'Top & Bottom Margin',
              settings.page.margins.top,
              5,
              50,
              1,
              (v) =>
                updateSetting('page', {
                  ...settings.page,
                  margins: { ...settings.page.margins, top: v, bottom: v },
                }),
            )}
            {renderSlider(
              'Side Margins',
              settings.page.margins.left,
              5,
              50,
              1,
              (v) =>
                updateSetting('page', {
                  ...settings.page,
                  margins: { ...settings.page.margins, left: v, right: v },
                }),
            )}
            {renderSlider(
              'Paragraph Indent',
              settings.paragraphIndent ?? 0,
              0,
              20,
              1,
              (v) => updateSetting('paragraphIndent', v),
            )}
            {renderSlider(
              'Line Weight',
              settings.lineWeight ?? 1,
              0,
              5,
              0.5,
              (v) => updateSetting('lineWeight', v),
            )}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-bold text-gray-900 mb-4">Page</h3>
          <div className="relative">
            <select
              value={settings.page.format || 'A4'}
              onChange={(e) =>
                updateSetting('page', { ...settings.page, format: e.target.value as 'A4' | 'Letter' })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="A4">A4 (8.27" x 11.69")</option>
              <option value="Letter">Letter (8.5" x 11")</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-900">Theme Color</h3>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={settings.themeColor || colors.indigo[600]}
              onChange={(e) => updateSetting('themeColor', e.target.value)}
              className="w-full h-10 cursor-pointer rounded border border-gray-300"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Sections</h3>
          </div>
          <div className="space-y-3">
            {settings.sections.map((section, index) => (
              <div
                key={section.id}
                className="bg-gray-50 border border-gray-200 rounded-md overflow-hidden"
              >
                <div className="flex items-center p-3">
                  <button
                    type="button"
                    onClick={() => {
                      const newSections = [...settings.sections];
                      newSections[index] = { ...section, visible: !section.visible };
                      updateSetting('sections', newSections);
                    }}
                    className={`flex-1 flex items-center gap-3 text-sm font-bold ${
                      section.visible ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        section.visible ? '' : '-rotate-90'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    {section.name}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => {
                        const newSections = [...settings.sections];
                        [newSections[index - 1], newSections[index]] = [
                          newSections[index],
                          newSections[index - 1],
                        ];
                        updateSetting('sections', newSections);
                      }}
                      className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-20"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      disabled={index === settings.sections.length - 1}
                      onClick={() => {
                        const newSections = [...settings.sections];
                        [newSections[index + 1], newSections[index]] = [
                          newSections[index],
                          newSections[index + 1],
                        ];
                        updateSetting('sections', newSections);
                      }}
                      className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-20"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {section.visible &&
                  (section.id === 'experience' ||
                    section.id === 'education' ||
                    section.id === 'skills') && (
                    <div className="px-3 pb-3 pt-0 border-t border-gray-100 bg-white">
                      <div className="flex flex-wrap gap-4 mt-2">
                        {(section.id === 'experience' || section.id === 'education') && (
                          <>
                            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={section.settings?.showLocation !== false}
                                onChange={(e) => {
                                  const newSections = [...settings.sections];
                                  newSections[index] = {
                                    ...section,
                                    settings: {
                                      ...section.settings,
                                      showLocation: e.target.checked,
                                    },
                                  };
                                  updateSetting('sections', newSections);
                                }}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              Show Location
                            </label>
                            {section.id === 'experience' && (
                              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={section.settings?.showDate !== false}
                                  onChange={(e) => {
                                    const newSections = [...settings.sections];
                                    newSections[index] = {
                                      ...section,
                                      settings: {
                                        ...section.settings,
                                        showDate: e.target.checked,
                                      },
                                    };
                                    updateSetting('sections', newSections);
                                  }}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                Show Date
                              </label>
                            )}
                          </>
                        )}
                        {section.id === 'skills' && (
                          <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                            <span>Layout:</span>
                            <select
                              value={section.settings?.layout || 'comma'}
                              onChange={(e) => {
                                const newSections = [...settings.sections];
                                newSections[index] = {
                                  ...section,
                                  settings: {
                                    ...section.settings,
                                    layout: e.target.value as 'list' | 'tags' | 'columns' | 'comma',
                                  },
                                };
                                updateSetting('sections', newSections);
                              }}
                              className="border-gray-300 rounded text-xs py-0.5"
                            >
                              <option value="comma">Comma List</option>
                              <option value="tags">Tags / Chips</option>
                            </select>
                          </label>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleEditor;

