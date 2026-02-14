import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Toaster } from 'sonner';
import { initializeContainer } from '@/core/container';
import { JOB_SOURCES } from '@/data/sources';
import { JobsPage } from '@/features/jobs';

// Initialize DI container with built-in sources
initializeContainer(JOB_SOURCES);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JobsPage />
    <Toaster position="top-right" richColors />
  </StrictMode>
);
