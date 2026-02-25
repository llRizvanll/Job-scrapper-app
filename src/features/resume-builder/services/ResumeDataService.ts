import type { ResumeData } from '../types';
import { exportConfigAsJSON, importConfigFromJSON } from '../utils/configUtils';

class ResumeDataService {
  exportResumeData(data: ResumeData, filename: string = 'resume-data.json'): void {
    exportConfigAsJSON(data, filename);
  }

  exportExperienceBullets(
    data: ResumeData,
    targetRole: string = '',
    jobDescription: string = '',
    filename: string = 'experience-bullets.json',
  ): void {
    const experienceData = {
      targetRole,
      jobDescription,
      experiences: data.experience.map((exp) => ({
        company: exp.company,
        role: exp.role,
        period: exp.period,
        bullets: exp.bullets,
      })),
      instructions: {
        aiPrompt:
          'Optimize ALL bullets above for the targetRole position. For each bullet: 1) Start with strong action verb, 2) Include quantifiable metrics, 3) Add relevant keywords from jobDescription, 4) Maintain technical accuracy, 5) Keep same JSON structure. Return only the optimized JSON.',
        usage:
          '1. Fill in targetRole and jobDescription fields, 2. Copy this entire JSON, 3. Paste to Claude/ChatGPT with the aiPrompt, 4. Get optimized results back in same format',
      },
    };

    exportConfigAsJSON(experienceData, filename);
  }

  exportSkills(
    data: ResumeData,
    targetRole: string = '',
    jobDescription: string = '',
    filename: string = 'skills.json',
  ): void {
    const skillsData = {
      targetRole,
      jobDescription,
      currentSkills: data.skills,
      instructions: {
        aiPrompt:
          'Reorder these skills by relevance to the targetRole. Consider keywords from jobDescription. Remove irrelevant skills. Add missing relevant skills based on industry standards. Return as JSON array in "optimizedSkills" field.',
        usage: 'Fill in targetRole and jobDescription, then ask AI to optimize skills list',
      },
      optimizedSkills: [] as string[],
    };

    exportConfigAsJSON(skillsData, filename);
  }

  exportFlattenedForAI(data: ResumeData, filename: string = 'resume-flattened.json'): void {
    const flattened: Record<string, unknown> = {
      'personal.name': data.name,
      'personal.headline': data.headline,
      'personal.location': data.location,
      'personal.phone': data.phone,
      'personal.email': data.email,
      'personal.website': data.website,
      'personal.linkedin': data.linkedin,
      'personal.github': data.github,
      'content.summary': data.summary,
      skills: data.skills.join(', '),
      ...this.flattenExperience(data.experience),
      ...this.flattenEducation(data.education),
      ...this.flattenCertifications(data.certifications),
    };

    exportConfigAsJSON(flattened, filename);
  }

  async importResumeData(file: File): Promise<ResumeData> {
    return importConfigFromJSON<ResumeData>(file);
  }

  exportAllForAI(data: ResumeData, targetRole?: string, jobDescription?: string): void {
    this.exportResumeData(data);
    this.exportExperienceBullets(data, targetRole, jobDescription);
    this.exportSkills(data, targetRole, jobDescription);
    this.exportFlattenedForAI(data);
  }

  private flattenExperience(experience: ResumeData['experience']): Record<string, unknown> {
    const flattened: Record<string, unknown> = {};

    experience.forEach((exp, idx) => {
      const prefix = `experience.${idx}`;
      flattened[`${prefix}.company`] = exp.company;
      flattened[`${prefix}.location`] = exp.location;
      flattened[`${prefix}.role`] = exp.role;
      flattened[`${prefix}.period`] = exp.period;

      exp.bullets.forEach((bullet, bulletIdx) => {
        flattened[`${prefix}.bullets.${bulletIdx}`] = bullet;
      });
    });

    return flattened;
  }

  private flattenEducation(education: ResumeData['education']): Record<string, unknown> {
    const flattened: Record<string, unknown> = {};

    education.forEach((edu, idx) => {
      const prefix = `education.${idx}`;
      flattened[`${prefix}.school`] = edu.school;
      flattened[`${prefix}.location`] = edu.location;
      flattened[`${prefix}.degree`] = edu.degree;
      flattened[`${prefix}.period`] = edu.period;
    });

    return flattened;
  }

  private flattenCertifications(
    certifications: ResumeData['certifications'],
  ): Record<string, unknown> {
    const flattened: Record<string, unknown> = {};

    certifications.forEach((cert, idx) => {
      const prefix = `certifications.${idx}`;
      flattened[`${prefix}.name`] = cert.name;
      flattened[`${prefix}.issuer`] = cert.issuer;
      flattened[`${prefix}.date`] = cert.date;
      if (cert.expiry) {
        flattened[`${prefix}.expiry`] = cert.expiry;
      }
    });

    return flattened;
  }
}

export const resumeDataService = new ResumeDataService();

export default ResumeDataService;

