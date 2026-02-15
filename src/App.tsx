import { Routes, Route } from 'react-router-dom';
import { JobsPage } from '@/features/jobs';
import { JobSeekersPage } from '@/presentation/pages/JobSeekersPage';
import { EmployersPage } from '@/presentation/pages/EmployersPage';
import { SignUpPage } from '@/presentation/pages/SignUpPage';
import { LoginPage } from '@/presentation/pages/LoginPage';
import { AboutPage } from '@/presentation/pages/AboutPage';
import { BlogPage } from '@/presentation/pages/BlogPage';
import { BlogDetailsPage } from '@/presentation/pages/BlogDetailsPage';
import { ContractorManagementPage } from '@/presentation/pages/ContractorManagementPage';
import { FreelancerHubPage } from '@/presentation/pages/FreelancerHubPage';
import { SavedJobsPage } from '@/presentation/pages/SavedJobsPage';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<JobsPage />} />
        <Route path="/job-seekers" element={<JobSeekersPage />} />
        <Route path="/employers" element={<EmployersPage />} />
        <Route path="/freelancer-hub" element={<FreelancerHubPage />} />
        <Route path="/contracts" element={<ContractorManagementPage />} />
        <Route path="/saved-jobs" element={<SavedJobsPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
}
