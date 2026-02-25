import React, { useState, useRef, useEffect } from 'react';
import { fontOptions } from '../../theme';

interface FontSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const FontSelect: React.FC<FontSelectProps> = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedFont = fontOptions.find((f) => f.value === value) ?? fontOptions[0];

  return (
    <div className="relative flex items-center gap-2" ref={containerRef}>
      <label className="text-xs font-medium text-gray-500 hidden md:block whitespace-nowrap">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-40 h-9 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:border-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <span
          className="text-sm text-gray-700 truncate font-medium"
          style={{ fontFamily: selectedFont.value }}
        >
          {selectedFont.label}
        </span>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 max-h-80 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-xl z-50">
          <div className="p-2 sticky top-0 bg-white border-b border-gray-100 mb-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 block">
              {label}
            </span>
          </div>
          {fontOptions.map((font) => (
            <button
              key={font.value}
              type="button"
              onClick={() => {
                onChange(font.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition-colors flex items-center justify-between group ${
                value === font.value ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
              }`}
            >
              <span style={{ fontFamily: font.value }} className="text-base">
                {font.label}
              </span>
              {value === font.value && (
                <svg
                  className="w-4 h-4 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FontSelect;

