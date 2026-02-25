import React, { useState } from 'react';
import type { ResumeData, Profile } from '../types';
import { colors } from '../theme';
import NewResumeDialog from './NewResumeDialog';

interface NewResumeButtonProps {
  currentResumeData: ResumeData;
  onNewResumeCreated: (profile: Profile) => void;
  style?: React.CSSProperties;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const NewResumeButton: React.FC<NewResumeButtonProps> = ({
  currentResumeData,
  onNewResumeCreated,
  style,
  variant = 'primary',
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const buttonStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
      transition: 'all 0.2s ease',
      ...style,
    },
    secondary: {
      background: colors.indigo[600],
      color: colors.white,
      border: 'none',
      padding: '8px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      transition: 'all 0.2s ease',
      ...style,
    },
    outline: {
      background: colors.white,
      color: colors.indigo[600],
      border: `2px solid ${colors.indigo[600]}`,
      padding: '8px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      transition: 'all 0.2s ease',
      ...style,
    },
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsDialogOpen(true)}
        style={buttonStyles[variant]}
        onMouseEnter={(e) => {
          if (variant === 'primary') {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
          } else {
            e.currentTarget.style.opacity = '0.9';
          }
        }}
        onMouseLeave={(e) => {
          if (variant === 'primary') {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
          } else {
            e.currentTarget.style.opacity = '1';
          }
        }}
      >
        New Resume
      </button>

      <NewResumeDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        baseResumeData={currentResumeData}
        onResumeCreated={(newProfile) => {
          onNewResumeCreated(newProfile);
          setIsDialogOpen(false);
        }}
      />
    </>
  );
};

export default NewResumeButton;

