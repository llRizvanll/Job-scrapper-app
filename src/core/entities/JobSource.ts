export interface JobSource {
  id: string;
  name: string;
  url: string;
  type: 'api' | 'rss' | 'json' | 'html';
  enabled: boolean;
  category: string;
  description: string;
}
