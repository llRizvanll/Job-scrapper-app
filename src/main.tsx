import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import { initializeContainer } from '@/core/container';
import { JOB_SOURCES } from '@/data/sources';
import { AuthProvider } from '@/core/contexts/AuthContext';
import App from './App';

// Initialize DI container with built-in sources
initializeContainer(JOB_SOURCES);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
