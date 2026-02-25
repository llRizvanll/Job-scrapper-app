import { ref, uploadString } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import type { Job } from '../entities';

export const JobArchiveService = {
  archiveJobs: async (jobs: Job[], dateString: string): Promise<boolean> => {
    if (jobs.length === 0) return true;

    try {
      const storageRef = ref(storage, `archives/jobs_${dateString}.json`);
      const jsonData = JSON.stringify(jobs, null, 2);
      
      await uploadString(storageRef, jsonData, 'raw', {
        contentType: 'application/json',
      });
      
      console.log(`Archived ${jobs.length} jobs to Firebase Storage for ${dateString}`);
      return true;
    } catch (error) {
      console.error('Error archiving jobs to Storage:', error);
      return false;
    }
  }
};
