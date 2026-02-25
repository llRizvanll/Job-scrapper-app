import React from 'react';
import type { HistoryEntry } from '../../types';

interface HistoryPanelProps {
  history: HistoryEntry[];
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
  onSaveSnapshot: () => void;
  onClose: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onRestore,
  onDelete,
  onSaveSnapshot,
  onClose,
}) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - timestamp;

    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return minutes <= 0 ? 'Just now' : `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getFullDateTime = (timestamp: number) =>
    new Date(timestamp).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full font-sans">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h2 className="font-bold text-gray-800">Revision History</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4 border-b bg-indigo-50">
        <button
          type="button"
          onClick={onSaveSnapshot}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          Save Current Version
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {history.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <svg
              className="w-12 h-12 mx-auto mb-3 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm">No history yet.</p>
            <p className="text-xs mt-1">Save a version to revert later.</p>
          </div>
        ) : (
          history.map((entry) => (
            <div
              key={entry.id}
              className="group relative pl-4 border-l-2 border-gray-100 hover:border-indigo-300 transition-colors"
            >
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 group-hover:bg-indigo-500 border-2 border-white" />

              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-gray-800 text-sm">{formatTime(entry.timestamp)}</span>
              </div>
              <div className="text-xs text-gray-500 mb-3">{getFullDateTime(entry.timestamp)}</div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onRestore(entry.id)}
                  className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-semibold rounded hover:bg-indigo-50 transition-colors"
                >
                  Restore
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(entry.id)}
                  className="px-2 py-1.5 text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete version"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;

