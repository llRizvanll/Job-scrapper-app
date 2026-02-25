import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  writeBatch 
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Job } from '../entities';

const JOBS_COLLECTION = 'jobs';

export const JobFirestoreService = {
  getTodayDateString: () => {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  },

  getCachedJobsToday: async (): Promise<Job[]> => {
    try {
      const today = JobFirestoreService.getTodayDateString();
      const q = query(collection(db, JOBS_COLLECTION), where('cacheDate', '==', today));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        const { cacheDate, ...jobData } = data;
        return jobData as Job;
      });
    } catch (error) {
      console.error('Error fetching jobs from Firestore:', error);
      return [];
    }
  },

  getOldJobs: async (): Promise<Job[]> => {
    try {
      const today = JobFirestoreService.getTodayDateString();
      const q = query(collection(db, JOBS_COLLECTION), where('cacheDate', '<', today));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        const { cacheDate, ...jobData } = data;
        return jobData as Job;
      });
    } catch (error) {
      console.error('Error fetching old jobs from Firestore:', error);
      return [];
    }
  },

  saveJobsToFirestore: async (jobs: Job[]) => {
    try {
      const today = JobFirestoreService.getTodayDateString();
      
      // 1. Clear existing data for today to avoid cumulative growth
      await JobFirestoreService.clearTodayCache();

      // 2. Enforce 5000 document hard limit
      const jobsToSave = jobs.slice(0, 5000);
      
      const jobsCol = collection(db, JOBS_COLLECTION);

      // 3. Batch save with job.id as Document ID (Deduplication)
      const CHUNK_SIZE = 400;
      for (let i = 0; i < jobsToSave.length; i += CHUNK_SIZE) {
        const chunk = jobsToSave.slice(i, i + CHUNK_SIZE);
        const chunkBatch = writeBatch(db);
        
        chunk.forEach(job => {
          // Use job.id for deduplication. Fallback to sanitized URL if ID missing.
          const docId = job.id || job.url.replace(/[^a-zA-Z0-9]/g, '_');
          const docRef = doc(jobsCol, docId);
          chunkBatch.set(docRef, { ...job, cacheDate: today });
        });
        
        await chunkBatch.commit();
      }
      
      console.log(`Saved ${jobsToSave.length} jobs to Firestore (Deduplicated by job.id) for ${today}`);
    } catch (error) {
      console.error('Error saving jobs to Firestore:', error);
    }
  },

  clearTodayCache: async () => {
    try {
      const today = JobFirestoreService.getTodayDateString();
      const q = query(collection(db, JOBS_COLLECTION), where('cacheDate', '==', today));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) return;

      const chunks: any[] = [];
      let currentChunk: any[] = [];
      
      querySnapshot.docs.forEach((doc) => {
        currentChunk.push(doc.ref);
        if (currentChunk.length === 400) {
          chunks.push(currentChunk);
          currentChunk = [];
        }
      });
      if (currentChunk.length > 0) chunks.push(currentChunk);

      for (const chunk of chunks) {
        const batch = writeBatch(db);
        chunk.forEach((ref: any) => batch.delete(ref));
        await batch.commit();
      }
      console.log('Cleared existing Firestore cache for today');
    } catch (error) {
      console.error('Error clearing today\'s cache:', error);
    }
  },

  clearOldCache: async () => {
    try {
      const today = JobFirestoreService.getTodayDateString();
      const q = query(collection(db, JOBS_COLLECTION), where('cacheDate', '<', today));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) return;

      const chunks: any[] = [];
      let currentChunk: any[] = [];
      
      querySnapshot.docs.forEach((doc) => {
        currentChunk.push(doc.ref);
        if (currentChunk.length === 400) {
          chunks.push(currentChunk);
          currentChunk = [];
        }
      });
      if (currentChunk.length > 0) chunks.push(currentChunk);

      for (const chunk of chunks) {
        const batch = writeBatch(db);
        chunk.forEach((ref: any) => batch.delete(ref));
        await batch.commit();
      }
      console.log('Cleared old Firestore cache');
    } catch (error) {
      console.error('Error clearing old cache:', error);
    }
  }
};
