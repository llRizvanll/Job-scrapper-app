import React, { useState } from 'react';
import type { ResumeData, Profile } from '../types';
import { resumeDataService } from '../services/ResumeDataService';

interface NewResumeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  baseResumeData: ResumeData;
  onResumeCreated: (newProfile: Profile) => void;
}

export const NewResumeDialog: React.FC<NewResumeDialogProps> = ({
  isOpen,
  onClose,
  baseResumeData,
  onResumeCreated,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    resumeName: '',
    targetRole: '',
    targetCompany: '',
    industry: '',
    jobDescription: '',
    applicationDeadline: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    emphasize: {
      technical: true,
      leadership: false,
      domain: false,
      innovation: false,
    },
    summaryFocus: '',
    keySkills: '',
    mustHaveKeywords: '',
    includeAllJobs: true,
    selectedJobIds: [] as string[],
    useAI: false,
    autoOptimize: false,
  });

  const [isCreating, setIsCreating] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmphasisChange = (key: string) => {
    setFormData((prev) => ({
      ...prev,
      emphasize: {
        ...prev.emphasize,
        [key]: !prev.emphasize[key as keyof typeof prev.emphasize],
      },
    }));
  };

  const createNewResume = () => {
    setIsCreating(true);

    try {
      const newResumeData: ResumeData = {
        ...baseResumeData,
        experience: formData.includeAllJobs
          ? baseResumeData.experience
          : baseResumeData.experience.filter((exp) => formData.selectedJobIds.includes(exp.id)),
      };

      const newProfile: Profile = {
        id: crypto.randomUUID(),
        name: formData.resumeName || `${formData.targetRole} - ${formData.targetCompany}`,
        lastModified: Date.now(),
        data: newResumeData,
        design: { ...(baseResumeData as unknown as Profile['design']) },
        theme: 'professional',
        targetRole: formData.targetRole,
        jobDescription: formData.jobDescription,
        history: [],
      };

      if (formData.useAI) {
        const fileName = `${formData.targetRole.replace(/\s+/g, '-').toLowerCase()}-${formData.targetCompany
          .replace(/\s+/g, '-')
          .toLowerCase()}.json`;
        resumeDataService.exportResumeData(newResumeData, fileName);
      }

      onResumeCreated(newProfile);

      alert(
        `✅ New resume created: "${newProfile.name}"\n\n${
          formData.useAI
            ? 'AI optimization file exported to downloads!'
            : 'You can now customize it in the editor.'
        }`,
      );
      onClose();
    } catch (error) {
      console.error('Error creating resume:', error);
      alert('Failed to create new resume. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '700px',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid #e5e5e5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>🎯 Create New Resume</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
            }}
          >
            ×
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            background: '#f9fafb',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          {[
            { num: 1, label: 'Basic Info' },
            { num: 2, label: 'Job Details' },
            { num: 3, label: 'Preferences' },
          ].map((s) => (
            <div
              key={s.num}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '8px',
                color: step >= s.num ? '#4f46e5' : '#999',
                fontWeight: step === s.num ? 600 : 400,
                borderBottom: step >= s.num ? '2px solid #4f46e5' : '2px solid transparent',
              }}
            >
              {s.num}. {s.label}
            </div>
          ))}
        </div>

        <div style={{ padding: '24px' }}>
          {step === 1 && (
            <div>
              <h3 style={{ marginTop: 0 }}>Basic Information</h3>

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}
                >
                  Resume Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Senior Engineer - Meta"
                  value={formData.resumeName}
                  onChange={(e) => handleInputChange('resumeName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}
                >
                  Target Role *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Senior Mobile Engineer"
                  value={formData.targetRole}
                  onChange={(e) => handleInputChange('targetRole', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}
                >
                  Target Company *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Meta"
                  value={formData.targetCompany}
                  onChange={(e) => handleInputChange('targetCompany', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}
                >
                  Industry
                </label>
                <input
                  type="text"
                  placeholder="e.g., Tech - Social Media"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label
                    style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}
                  >
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) =>
                      handleInputChange('applicationDeadline', e.target.value)
                    }
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label
                    style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}
                  >
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ marginTop: 0 }}>Job Details</h3>

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}
                >
                  Job Description
                  <span
                    style={{
                      color: '#666',
                      fontWeight: 400,
                      fontSize: '12px',
                      marginLeft: '8px',
                    }}
                  >
                    (Paste the full job description for better AI optimization)
                  </span>
                </label>
                <textarea
                  placeholder="Paste the complete job description here..."
                  value={formData.jobDescription}
                  onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                  rows={10}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}
                >
                  Must-Have Keywords
                  <span
                    style={{
                      color: '#666',
                      fontWeight: 400,
                      fontSize: '12px',
                      marginLeft: '8px',
                    }}
                  >
                    (Comma-separated)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., React Native, TypeScript, iOS, Android"
                  value={formData.mustHaveKeywords}
                  onChange={(e) =>
                    handleInputChange('mustHaveKeywords', e.target.value)
                  }
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ marginTop: 0 }}>Resume Preferences</h3>

              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}
                >
                  What to Emphasize
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                  }}
                >
                  {Object.entries(formData.emphasize).map(([key, value]) => (
                    <label
                      key={key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px',
                        border: `2px solid ${value ? '#4f46e5' : '#ddd'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: value ? '#f5f3ff' : 'white',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleEmphasisChange(key)}
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ textTransform: 'capitalize' }}>{key}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}
                >
                  Summary Focus
                </label>
                <input
                  type="text"
                  placeholder="e.g., Mobile architecture, team leadership, performance"
                  value={formData.summaryFocus}
                  onChange={(e) => handleInputChange('summaryFocus', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.useAI}
                    onChange={(e) => handleInputChange('useAI', e.target.checked)}
                  />
                  <span style={{ fontWeight: 500 }}>🤖 Export AI Optimization File</span>
                </label>
                <p
                  style={{
                    marginLeft: '28px',
                    fontSize: '13px',
                    color: '#666',
                    marginTop: '4px',
                  }}
                >
                  Creates an AI-ready JSON file you can paste to Claude/ChatGPT for
                  optimization
                </p>
              </div>

              <div
                style={{
                  padding: '16px',
                  background: '#f0fdf4',
                  border: '1px solid #86efac',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              >
                <strong>📝 What happens next:</strong>
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>New resume profile created with your settings</li>
                  <li>Based on your master resume data</li>
                  {formData.useAI && <li>AI optimization file exported to downloads</li>}
                  <li>Ready to customize and export as PDF</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #e5e5e5',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <button
            type="button"
            onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
            style={{
              padding: '10px 20px',
              border: '1px solid #ddd',
              background: 'white',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>

          <button
            type="button"
            onClick={() => {
              if (step < 3) {
                setStep(step + 1);
              } else {
                createNewResume();
              }
            }}
            disabled={
              isCreating ||
              (step === 1 &&
                (!formData.resumeName || !formData.targetRole || !formData.targetCompany))
            }
            style={{
              padding: '10px 24px',
              background:
                isCreating ||
                (step === 1 &&
                  (!formData.resumeName || !formData.targetRole || !formData.targetCompany))
                  ? '#9ca3af'
                  : '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor:
                isCreating ||
                (step === 1 &&
                  (!formData.resumeName || !formData.targetRole || !formData.targetCompany))
                  ? 'not-allowed'
                  : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {isCreating ? 'Creating...' : step === 3 ? '🎯 Create Resume' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewResumeDialog;

