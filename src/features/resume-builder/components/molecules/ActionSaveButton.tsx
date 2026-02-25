import React, { useState } from 'react';

interface ActionSaveButtonProps {
  onClick: () => void;
}

export const ActionSaveButton: React.FC<ActionSaveButtonProps> = ({ onClick }) => {
  const [showSaved, setShowSaved] = useState(false);

  const handleClick = () => {
    onClick();
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Save Profile"
      className={`p-2 rounded-lg transition-all duration-300 ${
        showSaved ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
      }`}
    >
      {showSaved ? (
        <span className="flex items-center gap-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
          />
        </svg>
      )}
    </button>
  );
};

export default ActionSaveButton;

