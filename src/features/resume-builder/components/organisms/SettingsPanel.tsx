import React, { useState } from 'react';
import type { Profile } from '../../types';

interface SettingsPanelProps {
  onClose: () => void;
  profiles?: Profile[];
  activeProfileId?: string;
  onSwitchProfile?: (profileId: string) => void;
  onDeleteProfile?: (profileId: string) => void;
  onProfileNameChange?: (name: string) => void;
  activeProfileName?: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onClose,
  profiles = [],
  activeProfileId,
  onSwitchProfile,
  onDeleteProfile,
  onProfileNameChange,
  activeProfileName = '',
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'profiles' | 'export'>('general');
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(activeProfileName);

  const handleSaveName = () => {
    if (onProfileNameChange && tempName.trim()) {
      onProfileNameChange(tempName.trim());
      setEditingName(false);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-96 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Settings
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex border-b bg-white">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'general'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          General
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('profiles')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'profiles'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Profiles ({profiles.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('export')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'export'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Export
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume Name
              </label>
              {editingName ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md text-sm"
                    placeholder="Enter resume name"
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                  />
                  <button
                    type="button"
                    onClick={handleSaveName}
                    className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingName(false);
                      setTempName(activeProfileName);
                    }}
                    className="px-3 py-2 border rounded-md text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
                  <span className="text-sm font-medium">
                    {activeProfileName || 'Unnamed Resume'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingName(true)}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium text-gray-700 mb-2">App Version</h3>
              <p className="text-sm text-gray-500">Resume Maker v1.0.0</p>
            </div>
          </div>
        )}

        {activeTab === 'profiles' && (
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-900">Manage Your Resumes</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Create and switch between different resume variations for different jobs
                  </p>
                </div>
              </div>
            </div>

            {profiles.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <svg
                  className="w-12 h-12 mx-auto mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-sm">No profiles yet</p>
              </div>
            ) : (
              profiles.map((profile) => {
                const isActive = profile.id === activeProfileId;
                return (
                  <div
                    key={profile.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      isActive
                        ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => !isActive && onSwitchProfile?.(profile.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {isActive && (
                            <svg
                              className="w-4 h-4 text-indigo-600 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          <h4
                            className={`text-sm font-semibold truncate ${
                              isActive ? 'text-indigo-900' : 'text-gray-900'
                            }`}
                          >
                            {profile.name}
                          </h4>
                        </div>

                        {profile.targetRole && (
                          <p className="text-xs text-gray-600 mb-1 truncate">
                            🎯 {profile.targetRole}
                          </p>
                        )}

                        <p className="text-xs text-gray-500">
                          Modified {formatDate(profile.lastModified)}
                        </p>
                      </div>

                      {!isActive && profiles.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteProfile?.(profile.id);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Delete profile"
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
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Export Options</h3>

              <button
                type="button"
                className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 mb-2"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Export as PDF</p>
                    <p className="text-xs text-gray-500">Download your resume</p>
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Export Data as JSON</p>
                    <p className="text-xs text-gray-500">For AI optimization</p>
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;

