/**
 * Application Configuration
 * Centralized, type-safe configuration
 */
export interface AppConfig {
  scraping: {
    jobsPerBatch: number;
    maxConcurrency: number;
    cacheTtlMs: number;
    cacheMaxSize: number;
    requestTimeoutMs: number;
    maxRetries: number;
  };
  keywords: {
    default: string[];
  };
  corsProxies: string[];
}

const DEFAULT_CONFIG: AppConfig = {
  scraping: {
    jobsPerBatch: 30,
    maxConcurrency: 8,
    cacheTtlMs: 15 * 60 * 1000,
    cacheMaxSize: 100,
    requestTimeoutMs: 10000,
    maxRetries: 2,
  },
  keywords: {
    default: [
      'software engineer',
      'full stack developer',
      'frontend developer',
      'backend developer',
      'devops engineer',
      'data engineer',
      'cloud engineer',
      'security engineer',
      'mobile developer',
      'product manager',
      'react native',
    ],
  },
  corsProxies: [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
    'https://api.codetabs.com/v1/proxy?quest=',
  ],
};

let config: AppConfig = { ...DEFAULT_CONFIG };

/**
 * Get current configuration (read-only)
 */
export function getConfig(): Readonly<AppConfig> {
  return config;
}

/**
 * Override configuration - useful for testing or runtime config
 */
export function setConfig(overrides: Partial<AppConfig>): void {
  config = { ...config, ...overrides };
}

/**
 * Reset to default configuration
 */
export function resetConfig(): void {
  config = { ...DEFAULT_CONFIG };
}
