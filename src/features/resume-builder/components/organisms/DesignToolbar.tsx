import React from 'react';
import type { DesignSettings } from '../../types';
import FontSelect from '../molecules/FontSelect';
import { colors } from '../../theme';

interface DesignToolbarProps {
  settings: DesignSettings;
  updateSetting: (key: keyof DesignSettings, value: unknown) => void;
  updateFamily: (type: keyof DesignSettings['fontFamily'], value: string) => void;
  onReset: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onAddPageBreak: () => void;
  onRemovePageBreaks: () => void;
}

const THEME_COLORS = [
  colors.gray[900],
  colors.gray[600],
  colors.blue[600],
  colors.indigo[600],
  colors.success[600],
  colors.pink[600],
];

const DesignToolbar: React.FC<DesignToolbarProps> = ({
  settings,
  updateSetting,
  updateFamily,
  onReset,
  onToggleSidebar,
  isSidebarOpen,
  onAddPageBreak,
  onRemovePageBreaks,
}) => {
  return (
    <div className="h-12 bg-white flex items-center px-4 gap-4 sticky top-12 z-40 shadow-sm print:hidden">
      <button
        type="button"
        onClick={onToggleSidebar}
        className={`p-2 rounded-full transition-all duration-200 ${
          isSidebarOpen
            ? 'bg-green-50 text-green-600 ring-2 ring-green-500 ring-offset-1'
            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
        }`}
        title="Toggle Style Editor"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>

      <div className="h-8 w-px bg-gray-200 mx-1" />

      <FontSelect
        label="Header Font"
        value={settings.fontFamily.heading}
        onChange={(val) => updateFamily('heading', val)}
      />

      <FontSelect
        label="Body Font"
        value={settings.fontFamily.text}
        onChange={(val) => updateFamily('text', val)}
      />

      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-gray-500 hidden md:block whitespace-nowrap">
          Skills Style
        </label>
        <select
          value={settings.sections.find((s) => s.id === 'skills')?.settings?.layout || 'comma'}
          onChange={(e) => {
            const newLayout = e.target.value;
            const newSections = settings.sections.map((s) =>
              s.id === 'skills' ? { ...s, settings: { ...s.settings, layout: newLayout as any } } : s,
            );
            updateSetting('sections', newSections);
          }}
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 h-9 w-28 cursor-pointer hover:border-blue-400 transition-colors"
        >
          <option value="comma">Comma</option>
          <option value="list">List</option>
          <option value="columns">Columns</option>
          <option value="tags">Tags</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-gray-500 hidden md:block whitespace-nowrap">
          Font Size
        </label>
        <select
          value={settings.fontSize}
          onChange={(e) => updateSetting('fontSize', Number(e.target.value))}
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 h-9 w-24 cursor-pointer hover:border-blue-400 transition-colors"
        >
          {[8, 9, 10, 10.5, 11, 11.5, 12, 14, 16, 18].map((s) => (
            <option key={s} value={s}>
              {s} px
            </option>
          ))}
        </select>
      </div>

      <div className="h-8 w-px bg-gray-200 mx-1" />

      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-gray-500 hidden md:block">Colors</span>
        <div className="flex items-center gap-1.5">
          {THEME_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => updateSetting('themeColor', color)}
              className={`w-6 h-6 rounded-full transition-transform hover:scale-110 focus:outline-none ${
                settings.themeColor === color ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          <div className="relative w-6 h-6 rounded-full overflow-hidden hover:scale-110 transition-transform ring-1 ring-gray-200">
            <input
              type="color"
              value={settings.themeColor || colors.indigo[600]}
              onChange={(e) => updateSetting('themeColor', e.target.value)}
              className="absolute inset-[-4px] w-[150%] h-[150%] cursor-pointer p-0 border-0"
              title="Custom Color"
            />
          </div>
        </div>
      </div>

      <div className="h-8 w-px bg-gray-200 mx-1" />

      <div
        className="flex items-center gap-2 group cursor-pointer"
        onClick={() => updateSetting('showPageNumbers', !settings.showPageNumbers)}
      >
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={settings.showPageNumbers}
            readOnly
          />
          <div
            className={`w-9 h-5 rounded-full shadow-inner transition-colors duration-200 ${
              settings.showPageNumbers ? 'bg-gray-500' : 'bg-gray-300'
            }`}
          />
          <div
            className={`absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0.5 left-0.5 transition-transform duration-200 ${
              settings.showPageNumbers ? 'translate-x-full transform' : ''
            }`}
          />
        </div>
        <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors select-none">
          Page numbers
        </span>
      </div>

      <div className="h-8 w-px bg-gray-200 mx-1" />

      <button
        type="button"
        onClick={onAddPageBreak}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded transition-colors"
        title="Insert a page break at the end"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
        Add Break
      </button>

      <button
        type="button"
        onClick={onRemovePageBreaks}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded transition-colors"
        title="Remove all page breaks"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Clear Breaks
      </button>

      <div className="flex-1" />

      <button
        type="button"
        onClick={onReset}
        className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded px-3 py-1.5 transition-colors whitespace-nowrap"
      >
        Reset Styling
      </button>
    </div>
  );
};

export default DesignToolbar;

