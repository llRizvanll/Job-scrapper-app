import React, { useState } from 'react';
import type { ResumeData } from '../types';

interface AIPrompterProps {
  isOpen: boolean;
  onClose: () => void;
  currentResumeData: ResumeData;
}

interface FormData {
  jobTitle: string;
  company: string;
  industry: string;
  jobDescription: string;
  applicationDeadline: string;
  priority: 'high' | 'medium' | 'low';
  notes: string;
  q1_whatAttractsYou: string;
  q2_keyResponsibilities: string;
  q3_requiredSkills: string;
  q4_preferredSkills: string;
  q5_cultureFit: string;
  q6_relevantExperience: string;
  q7_biggestAchievement: string;
  q8_technicalMatch: string;
  q9_learningNeeds: string;
  q10_uniqueValue: string;
  q11_summaryFocus: string;
  q12_experienceToHighlight: string;
  q13_skillsToFeature: string;
  q14_metricsToAdd: string;
  q15_keywordsToInclude: string;
}

export const AIPrompter: React.FC<AIPrompterProps> = ({
  isOpen,
  onClose,
  currentResumeData,
}) => {
  const [step, setStep] = useState(1);
  const [showJSON, setShowJSON] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    company: '',
    industry: '',
    jobDescription: '',
    applicationDeadline: '',
    priority: 'medium',
    notes: '',
    q1_whatAttractsYou: '',
    q2_keyResponsibilities: '',
    q3_requiredSkills: '',
    q4_preferredSkills: '',
    q5_cultureFit: '',
    q6_relevantExperience: '',
    q7_biggestAchievement: '',
    q8_technicalMatch: '',
    q9_learningNeeds: '',
    q10_uniqueValue: '',
    q11_summaryFocus: '',
    q12_experienceToHighlight: '',
    q13_skillsToFeature: '',
    q14_metricsToAdd: '',
    q15_keywordsToInclude: '',
  });

  if (!isOpen) return null;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateJSON = () => {
    const aiMasterJSON = {
      ___INSTRUCTIONS___: {
        readme:
          'This is your master AI optimization file. Fill in the sections below, then copy the entire JSON and paste to Claude/ChatGPT for optimization.',
        workflow: [
          '1. Fill in TARGET section with job details',
          '2. Review CURRENT_DATA and mark what needs optimization',
          '3. Answer PREPARATION_QUESTIONS',
          '4. Choose AI_TASKS you want performed',
          '5. Copy entire JSON to AI',
          '6. Get optimized results back',
          '7. Review and update your resume',
        ],
        quickStart: 'All fields have been filled. Copy this entire JSON to Claude/ChatGPT!',
      },
      TARGET: {
        jobTitle: formData.jobTitle,
        company: formData.company,
        industry: formData.industry,
        jobDescription: formData.jobDescription,
        applicationDeadline: formData.applicationDeadline,
        priority: formData.priority,
        notes: formData.notes,
      },
      PREPARATION_QUESTIONS: {
        aboutTheRole: {
          q1_whatAttractsYou: formData.q1_whatAttractsYou,
          q2_keyResponsibilities: formData.q2_keyResponsibilities,
          q3_requiredSkills: formData.q3_requiredSkills,
          q4_preferredSkills: formData.q4_preferredSkills,
          q5_cultureFit: formData.q5_cultureFit,
        },
        aboutYourExperience: {
          q1_relevantExperience: formData.q6_relevantExperience,
          q2_biggestAchievement: formData.q7_biggestAchievement,
          q3_technicalMatch: formData.q8_technicalMatch,
          q4_learningNeeds: formData.q9_learningNeeds,
          q5_uniqueValue: formData.q10_uniqueValue,
        },
        aboutTheContent: {
          q1_summaryFocus: formData.q11_summaryFocus,
          q2_experienceToHighlight: formData.q12_experienceToHighlight,
          q3_skillsToFeature: formData.q13_skillsToFeature,
          q4_metricsToAdd: formData.q14_metricsToAdd,
          q5_keywordsToInclude: formData.q15_keywordsToInclude,
        },
      },
      CURRENT_DATA: {
        personalInfo: {
          name: currentResumeData.name,
          headline: currentResumeData.headline,
          location: currentResumeData.location,
          phone: currentResumeData.phone,
          email: currentResumeData.email,
          website: currentResumeData.website,
          linkedin: currentResumeData.linkedin,
          github: currentResumeData.github,
        },
        summary: {
          current: currentResumeData.summary,
        },
        experience: currentResumeData.experience.map((exp) => ({
          id: exp.id,
          company: exp.company,
          location: exp.location,
          role: exp.role,
          period: exp.period,
          current_bullets: exp.bullets,
        })),
        skills: {
          current: currentResumeData.skills,
        },
        education: currentResumeData.education,
        certifications: currentResumeData.certifications,
      },
      AI_TASKS: {
        _instructions:
          'Enable the tasks you want AI to perform by setting enabled: true',
        tasks: {
          '1_optimizeSummary': { enabled: true },
          '2_optimizeAllBullets': { enabled: true },
          '3_tailorSkills': { enabled: true },
          '4_generateHeadline': { enabled: false },
          '5_atsOptimization': { enabled: true },
          '6_experiencePrioritization': { enabled: false },
          '7_addMetrics': { enabled: true },
          '8_keywordExtraction': { enabled: true },
        },
      },
      AI_PROMPT_TEMPLATE: {
        systemPrompt:
          'You are an expert resume writer and career coach. You help candidates optimize their resumes for specific job applications while maintaining honesty and accuracy.',
        userPrompt:
          "I need help optimizing my resume for a specific job application. I've provided my current resume data, target job details, preparation questions, and specific tasks I need help with. Please read the entire JSON above and perform all tasks marked as enabled: true. Return optimized resume data in OPTIMIZED_OUTPUT section and explanations in OPTIMIZATION_REPORT section.",
      },
      OPTIMIZED_OUTPUT: {},
      OPTIMIZATION_REPORT: {},
    };

    return JSON.stringify(aiMasterJSON, null, 2);
  };

  const handleCopyJSON = () => {
    const json = generateJSON();
    navigator.clipboard
      .writeText(json)
      .then(() => {
        alert('✅ JSON copied to clipboard! Paste it to Claude/ChatGPT.');
      })
      .catch((err) => {
        console.error('Failed to copy JSON:', err);
      });
  };

  const handleSubmit = () => {
    setShowJSON(true);
  };

  if (showJSON) {
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
          padding: '20px',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '900px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
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
              background: '#4f46e5',
              color: 'white',
              borderRadius: '12px 12px 0 0',
            }}
          >
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>
              🤖 AI Optimization JSON Ready!
            </h2>
            <button
              type="button"
              onClick={() => {
                setShowJSON(false);
                onClose();
              }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: 'white',
              }}
            >
              ×
            </button>
          </div>

          <div
            style={{
              padding: '16px 24px',
              background: '#f0f9ff',
              borderBottom: '1px solid #bfdbfe',
            }}
          >
            <p style={{ margin: 0, fontSize: '14px', color: '#1e40af' }}>
              <strong>Next steps:</strong> Copy this JSON and paste it to Claude or ChatGPT. The AI
              will optimize your resume based on your inputs!
            </p>
          </div>

          <div
            style={{
              flex: 1,
              overflow: 'auto',
              padding: '24px',
              background: '#1e1e1e',
            }}
          >
            <pre
              style={{
                margin: 0,
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#d4d4d4',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
              }}
            >
              {generateJSON()}
            </pre>
          </div>

          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid #e5e5e5',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
              background: '#fafafa',
            }}
          >
            <button
              type="button"
              onClick={() => setShowJSON(false)}
              style={{
                padding: '10px 20px',
                border: '1px solid #ddd',
                background: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              ← Back to Edit
            </button>

            <button
              type="button"
              onClick={handleCopyJSON}
              style={{
                padding: '10px 24px',
                background: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              📋 Copy JSON
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            position: 'sticky',
            top: 0,
            background: 'white',
            zIndex: 1,
          }}
        >
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>🤖 AI Prompter</h2>
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
            { num: 1, label: 'Job Details' },
            { num: 2, label: 'About Role' },
            { num: 3, label: 'Your Experience' },
            { num: 4, label: 'Content Focus' },
          ].map((s) => (
            <div
              key={s.num}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '8px',
                color: step >= s.num ? '#4f46e5' : '#999',
                fontWeight: step === s.num ? 600 : 400,
                fontSize: '13px',
                borderBottom: step >= s.num ? '2px solid #4f46e5' : '2px solid transparent',
              }}
            >
              {s.num}. {s.label}
            </div>
          ))}
        </div>

        <div style={{ padding: '24px' }}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ marginTop: 0 }}>Job Details</h3>

              <div>
                <label
                  style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}
                >
                  Job Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Senior Mobile Engineer"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label
                  style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}
                >
                  Company *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Google"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label
                  style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}
                >
                  Industry
                </label>
                <input
                  type="text"
                  placeholder="e.g., Tech, Finance, Healthcare"
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

              <div>
                <label
                  style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}
                >
                  Job Description *
                </label>
                <textarea
                  placeholder="Paste the full job description here..."
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

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: 500,
                      fontSize: '14px',
                    }}
                  >
                    Deadline
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
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: 500,
                      fontSize: '14px',
                    }}
                  >
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      handleInputChange('priority', e.target.value as FormData['priority'])
                    }
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

              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 500,
                    fontSize: '14px',
                  }}
                >
                  Notes
                </label>
                <textarea
                  placeholder="Any specific requirements or notes about this role..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ marginTop: 0 }}>About the Role</h3>

              {[
                {
                  key: 'q1_whatAttractsYou',
                  label: 'Why are you interested in this specific role?',
                },
                {
                  key: 'q2_keyResponsibilities',
                  label: 'What are the top 3 responsibilities from the job description?',
                },
                {
                  key: 'q3_requiredSkills',
                  label: 'List the must-have skills mentioned (technical)',
                },
                {
                  key: 'q4_preferredSkills',
                  label: 'List the nice-to-have skills mentioned',
                },
                {
                  key: 'q5_cultureFit',
                  label: 'What does the company value? (based on JD and research)',
                },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: 500,
                      fontSize: '14px',
                    }}
                  >
                    {label}
                  </label>
                  <textarea
                    placeholder="Your answer..."
                    value={formData[key as keyof FormData]}
                    onChange={(e) =>
                      handleInputChange(key as keyof FormData, e.target.value)
                    }
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      resize: 'vertical',
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ marginTop: 0 }}>About Your Experience</h3>

              {[
                {
                  key: 'q6_relevantExperience',
                  label: 'Which of your past roles is most relevant to this position?',
                },
                {
                  key: 'q7_biggestAchievement',
                  label: "What's your biggest achievement related to this role?",
                },
                {
                  key: 'q8_technicalMatch',
                  label: 'Which required skills do you have strong experience with?',
                },
                {
                  key: 'q9_learningNeeds',
                  label: 'Which required skills do you need to learn/improve?',
                },
                {
                  key: 'q10_uniqueValue',
                  label: 'What unique value do you bring that others might not?',
                },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: 500,
                      fontSize: '14px',
                    }}
                  >
                    {label}
                  </label>
                  <textarea
                    placeholder="Your answer..."
                    value={formData[key as keyof FormData]}
                    onChange={(e) =>
                      handleInputChange(key as keyof FormData, e.target.value)
                    }
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      resize: 'vertical',
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ marginTop: 0 }}>Content Focus</h3>

              {[
                {
                  key: 'q11_summaryFocus',
                  label: 'What should your summary emphasize for this role?',
                },
                {
                  key: 'q12_experienceToHighlight',
                  label: 'Which experiences should be emphasized?',
                },
                {
                  key: 'q13_skillsToFeature',
                  label: 'Which skills should appear first in your skills list?',
                },
                {
                  key: 'q14_metricsToAdd',
                  label: 'Any metrics you can quantify? (%, time saved, scale, etc.)',
                },
                {
                  key: 'q15_keywordsToInclude',
                  label: 'Keywords from JD that MUST appear in resume?',
                },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: 500,
                      fontSize: '14px',
                    }}
                  >
                    {label}
                  </label>
                  <textarea
                    placeholder="Your answer..."
                    value={formData[key as keyof FormData]}
                    onChange={(e) =>
                      handleInputChange(key as keyof FormData, e.target.value)
                    }
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      resize: 'vertical',
                    }}
                  />
                </div>
              ))}
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
            position: 'sticky',
            bottom: 0,
            background: 'white',
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
            {step === 1 ? 'Cancel' : '← Back'}
          </button>

          <button
            type="button"
            onClick={() => {
              if (step < 4) {
                setStep(step + 1);
              } else {
                handleSubmit();
              }
            }}
            disabled={
              step === 1 &&
              (!formData.jobTitle || !formData.company || !formData.jobDescription)
            }
            style={{
              padding: '10px 24px',
              background:
                step === 1 &&
                (!formData.jobTitle || !formData.company || !formData.jobDescription)
                  ? '#9ca3af'
                  : '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor:
                step === 1 &&
                (!formData.jobTitle || !formData.company || !formData.jobDescription)
                  ? 'not-allowed'
                  : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {step === 4 ? '✨ Generate JSON' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIPrompter;

