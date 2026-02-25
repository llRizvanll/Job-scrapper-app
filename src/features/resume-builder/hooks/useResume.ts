import { useState, useCallback } from 'react';
import type { ResumeData } from '../types';
import { aiAdviceRepository } from '../repositories/AIAdviceRepository';
import { INITIAL_RESUME_DATA } from '../constants';

interface UseResumeProps {
  resumeData: ResumeData;
  updateResumeData: (newData: ResumeData | ((prev: ResumeData) => ResumeData)) => void;
  targetRole?: string;
  jobDescription?: string;
}

export const useResume = ({
  resumeData,
  updateResumeData,
  targetRole,
  jobDescription,
}: UseResumeProps) => {
  const [isTailoring, setIsTailoring] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);

  const handleTailor = useCallback(
    async (customRole?: string, customDesc?: string) => {
      const role = customRole || targetRole;
      const desc = customDesc || jobDescription;

      if (!role || !desc) {
        alert('Please enter target role and job description.');
        return;
      }

      setIsTailoring(true);
      try {
        const optimizedData = await aiAdviceRepository.tailorResume(resumeData, role, desc);
        updateResumeData(optimizedData);
        setShowAIPanel(false);
      } catch (error) {
        console.error('AI Tailoring failed', error);
        alert('AI Tailoring failed. Please check console or try again.');
      } finally {
        setIsTailoring(false);
      }
    },
    [resumeData, targetRole, jobDescription, updateResumeData],
  );

  const handleReset = useCallback(() => {
    if (confirm('Reset to your original resume data? All current changes will be lost.')) {
      updateResumeData(INITIAL_RESUME_DATA);
    }
  }, [updateResumeData]);

  return {
    isTailoring,
    showAIPanel,
    setShowAIPanel,
    handleTailor,
    handleReset,
  };
};

