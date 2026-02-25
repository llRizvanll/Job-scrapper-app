export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
  location: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
}

export interface ResumeData {
  name: string;
  headline?: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  experience: Experience[];
  skills: string[];
  education: Education[];
  certifications: Certification[];
}

export type Theme =
  | 'classic'
  | 'modern'
  | 'minimal'
  | 'professional'
  | 'creative'
  | 'executive';

export type SectionId =
  | 'summary'
  | 'experience'
  | 'skills'
  | 'education'
  | 'certifications';

export interface PageSettings {
  format: 'A4' | 'Letter';
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface SectionSettings {
  showLocation?: boolean;
  showDate?: boolean;
  layout?: 'list' | 'tags' | 'columns' | 'comma';
}

export interface SectionConfig {
  id: string;
  name: string;
  visible: boolean;
  settings?: SectionSettings;
  type?: 'section' | 'break';
}

export interface ThemeConfig {
  certificationLayout: 'inline' | 'stacked';
}

export interface DesignSettings {
  fontSize: number;
  headingSize: number;
  lineHeight: number;
  sectionSpacing: number;
  paragraphSpacing: number;
  paragraphIndent: number;
  lineWeight: number;
  itemSpacing: number;
  showPageNumbers?: boolean;
  themeColor: string;
  dateFormat: 'MM/YYYY' | 'MMM YYYY' | 'YYYY';
  fontFamily: {
    display: string;
    heading: string;
    text: string;
  };
  page: PageSettings;
  sections: SectionConfig[];
  themeConfig: ThemeConfig;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  data: ResumeData;
  design: DesignSettings;
  theme: Theme;
  targetRole?: string;
  jobDescription?: string;
}

export interface Profile {
  id: string;
  name: string;
  lastModified: number;
  data: ResumeData;
  design: DesignSettings;
  theme: Theme;
  targetRole?: string;
  jobDescription?: string;
  history?: HistoryEntry[];
}

export type PanelType =
  | 'style'
  | 'format'
  | 'templates'
  | 'upload'
  | 'modules'
  | 'settings'
  | 'history'
  | null;

