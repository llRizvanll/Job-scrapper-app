import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { initializeContainer } from '@/core/container';
import { JOB_SOURCES } from '@/data/sources';
import App from './App';

// Initialize DI container with built-in sources
initializeContainer(JOB_SOURCES);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
