import type { ResumeData } from '../types';

export interface IAIAdviceRepository {
  tailorResume(
    currentData: ResumeData,
    targetRole: string,
    jobDescription: string,
  ): Promise<ResumeData>;
}

export class AIAdviceRepository implements IAIAdviceRepository {
  async tailorResume(
    currentData: ResumeData,
    targetRole: string,
    jobDescription: string,
  ): Promise<ResumeData> {
    console.warn(
      'AI tailoring is not configured in this environment. Returning original resume data.',
      { targetRole, jobDescription },
    );
    return currentData;
  }
}

export const aiAdviceRepository = new AIAdviceRepository();

