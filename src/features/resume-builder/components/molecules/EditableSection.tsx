import React from 'react';

interface EditableSectionProps {
  id: string;
  title: string;
  isSelected: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  onImproveWithAI?: () => void;
  isBreak?: boolean;
  children: React.ReactNode;
}

const EditableSection: React.FC<EditableSectionProps> = ({
  id: _id,
  title,
  isSelected,
  canMoveUp,
  canMoveDown,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDelete,
  onImproveWithAI,
  isBreak,
  children,
}) => {
  return (
    <div
      className={`relative group transition-all duration-200 ${
        isSelected
          ? 'border-2 border-dashed border-blue-400 rounded-lg p-3 -m-3'
          : 'border-2 border-transparent hover:border-dashed hover:border-gray-300 rounded-lg p-3 -m-3'
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {isSelected && (
        <div className="absolute -left-12 top-0 flex flex-col gap-1 print:hidden">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp();
            }}
            disabled={!canMoveUp}
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
              canMoveUp ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            title="Move section up"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown();
            }}
            disabled={!canMoveDown}
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
              canMoveDown
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            title="Move section down"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Are you sure you want to remove the "${title}" section?`)) {
                onDelete();
              }
            }}
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            title="Delete section"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}

      {children}

      {isSelected && onImproveWithAI && !isBreak && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onImproveWithAI();
          }}
          className="absolute -bottom-4 left-4 flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors print:hidden"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L12.5 7.5H18L13.5 11.5L15.5 17L10 13.5L4.5 17L6.5 11.5L2 7.5H7.5L10 2Z" />
          </svg>
          Improve with AI
        </button>
      )}
    </div>
  );
};

export default EditableSection;

