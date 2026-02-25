import type { ResumeData, DesignSettings } from './types';
import {
  fontOptions,
  lineHeightOptions,
  colors,
  fontFamilies,
  resumeFontSizes,
  resumeSpacing,
} from './theme';

export const FONT_OPTIONS = fontOptions;
export const LINE_HEIGHT_OPTIONS = lineHeightOptions;

export const INITIAL_DESIGN_SETTINGS: DesignSettings = {
  fontSize: resumeFontSizes.base,
  headingSize: resumeFontSizes.headingMedium,
  lineHeight: lineHeightOptions[1].value,
  sectionSpacing: resumeSpacing.sectionSpacing.standard,
  paragraphSpacing: resumeSpacing.paragraphSpacing.standard,
  paragraphIndent: resumeSpacing.paragraphIndent.none,
  lineWeight: 1,
  itemSpacing: resumeSpacing.itemSpacing.standard,
  showPageNumbers: false,
  themeColor: colors.indigo[600],
  dateFormat: 'MMM YYYY',
  fontFamily: {
    display: fontFamilies.inter,
    heading: fontFamilies.inter,
    text: fontFamilies.inter,
  },
  page: {
    format: 'A4',
    margins: {
      top: resumeSpacing.pageMargins.top,
      right: resumeSpacing.pageMargins.right,
      bottom: resumeSpacing.pageMargins.bottom,
      left: resumeSpacing.pageMargins.left,
    },
  },
  sections: [
    { id: 'summary', name: 'Professional Summary', visible: true },
    {
      id: 'experience',
      name: 'Work History',
      visible: true,
      settings: { showLocation: true, showDate: true },
    },
    {
      id: 'skills',
      name: 'Skills',
      visible: true,
      settings: { layout: 'comma' },
    },
    {
      id: 'education',
      name: 'Education',
      visible: true,
      settings: { showLocation: true },
    },
    { id: 'certifications', name: 'Certifications', visible: true },
  ],
  themeConfig: {
    certificationLayout: 'inline',
  },
};

export const INITIAL_RESUME_DATA: ResumeData = {
  name: 'Your Name',
  headline: 'Senior Software Engineer | React & Node.js',
  location: 'City, Country',
  phone: '+1 (000) 000-0000',
  email: 'you@example.com',
  website: 'your-portfolio.com',
  linkedin: 'linkedin.com/in/your-profile',
  github: 'github.com/your-handle',
  summary:
    'Senior software engineer with 8+ years of experience designing, building, and scaling web and mobile applications. Comfortable owning products end to end, mentoring teammates, and collaborating with cross-functional partners to ship high‑quality, user‑focused features.',
  experience: [
    {
      id: '1',
      company: 'Acme Corp',
      location: 'Remote',
      role: 'Senior Software Engineer',
      period: '2021 - Present',
      bullets: [
        'Lead engineer on a cross‑functional squad building a customer‑facing web platform using React, TypeScript, and Node.js, serving thousands of monthly active users.',
        'Collaborated with product and design to deliver features from discovery through release, improving key conversion and retention metrics.',
        'Mentored junior engineers through code reviews, pairing sessions, and architecture discussions to raise overall code quality.',
      ],
    },
    {
      id: '2',
      company: 'Global Tech Solutions',
      location: 'Remote',
      role: 'Full‑Stack Engineer',
      period: '2018 - 2021',
      bullets: [
        'Implemented REST and GraphQL APIs, integrating with React frontends and third‑party services to support internal tools and customer dashboards.',
        'Improved application performance and reliability by introducing caching, monitoring, and automated test coverage.',
        'Worked closely with stakeholders to clarify requirements, propose technical solutions, and break work into incremental, testable pieces.',
      ],
    },
    {
      id: '3',
      company: 'Startup Labs',
      location: 'On‑site',
      role: 'Software Engineer',
      period: '2015 - 2018',
      bullets: [
        'Built and maintained core backend services and admin tools, working across the stack as part of a small engineering team.',
        'Contributed to the initial architecture and coding standards for a greenfield product, helping the team move quickly while keeping quality high.',
        'Participated in on‑call rotation, debugging production issues and communicating impact and timelines with non‑technical stakeholders.',
      ],
    },
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'React Native',
    'TypeScript',
    'REST APIs',
    'GraphQL',
    'SQL / NoSQL Databases',
    'Testing (Jest, React Testing Library)',
    'Git & CI/CD',
  ],
  education: [
    {
      id: 'e1',
      school: 'Example University',
      location: 'City, Country',
      degree: 'M.Sc. | Computer Science',
      period: '2016',
    },
    {
      id: 'e2',
      school: 'Example Institute of Technology',
      location: 'City, Country',
      degree: 'B.Sc. | Software Engineering',
      period: '2014',
    },
  ],
  certifications: [
    {
      id: 'c1',
      name: 'Certified Cloud Practitioner',
      issuer: 'Example Cloud Provider',
      date: '2020',
      expiry: '2023',
    },
    {
      id: 'c2',
      name: 'Frontend Web Development Nanodegree',
      issuer: 'Online Learning Platform',
      date: '2018',
      expiry: 'N/A',
    },
    {
      id: 'c3',
      name: 'Agile Fundamentals',
      issuer: 'Example Certification Board',
      date: '2017',
      expiry: 'N/A',
    },
    {
      id: 'c4',
      name: 'React & TypeScript Specialization',
      issuer: 'Online Learning Provider',
      date: '2019',
      expiry: 'N/A',
    },
  ],
};

