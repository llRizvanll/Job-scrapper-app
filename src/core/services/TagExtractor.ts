/**
 * Service to extract tags (skills, roles, technologies) from job text.
 */

// Map of categories to keywords
const SKILL_KEYWORDS: Record<string, string[]> = {
  // Languages
  'JavaScript': ['javascript', 'js ', 'es6', 'esnext'],
  'TypeScript': ['typescript', 'ts '],
  'Python': ['python', 'py '],
  'Java': ['java ', 'jvm'],
  'Go': ['golang', 'go language'],
  'Rust': ['rust '],
  'C++': ['c++', 'cpp'],
  'C#': ['c#', '.net'],
  'Ruby': ['ruby', 'rails'],
  'PHP': ['php', 'laravel'],
  'Swift': ['swift', 'ios'],
  'Kotlin': ['kotlin', 'android'],
  'SQL': ['sql', 'mysql', 'postgresql', 'postgres'],
  'NoSQL': ['nosql', 'mongodb', 'dynamodb', 'redis'],

  // Frontend
  'React': ['react', 'reactjs', 'react.js'],
  'Vue': ['vue', 'vuejs', 'vue.js'],
  'Angular': ['angular'],
  'Next.js': ['next.js', 'nextjs'],
  'Tailwind': ['tailwind', 'tailwindcss'],
  'HTML/CSS': ['html', 'css', 'sass', 'scss'],

  // Backend
  'Node.js': ['node.js', 'nodejs', 'express'],
  'Django': ['django'],
  'Flask': ['flask'],
  'Spring': ['spring boot', 'spring framework'],
  'GraphQL': ['graphql'],

  // Infrastructure / DevOps
  'AWS': ['aws', 'amazon web services', 'ec2', 'lambda', 's3'],
  'Azure': ['azure'],
  'GCP': ['gcp', 'google cloud'],
  'Docker': ['docker'],
  'Kubernetes': ['kubernetes', 'k8s'],
  'Terraform': ['terraform'],
  'CI/CD': ['ci/cd', 'jenkins', 'github actions', 'gitlab ci'],

  // Roles/Domains
  'Frontend': ['frontend', 'front-end', 'ui engineer'],
  'Backend': ['backend', 'back-end'],
  'Fullstack': ['fullstack', 'full-stack'],
  'DevOps': ['devops', 'sre', 'reliability engineer'],
  'Mobile': ['mobile', 'ios', 'android', 'react native', 'flutter'],
  'Data Science': ['data science', 'data scientist', 'machine learning', 'ai', 'nlp', 'computer vision'],
  'Product': ['product manager', 'product owner', 'pm'],
  'Design': ['ui/ux', 'product design', 'designer', 'figma'],
};

export class TagExtractor {
  static extract(title: string, description: string): string[] {
    const text = `${title} ${description}`.toLowerCase();
    const tags = new Set<string>();

    for (const [tag, keywords] of Object.entries(SKILL_KEYWORDS)) {
      // Check title first with higher priority (maybe for ordering later, but here just existence)
      if (keywords.some(kw => title.toLowerCase().includes(kw))) {
        tags.add(tag);
        continue;
      }

      // Check description
      if (keywords.some(kw => text.includes(kw))) {
        tags.add(tag);
      }
    }

    return Array.from(tags);
  }

  // Helper to categorize tags (optional, for UI grouping if needed)
  static getState(tags: string[]) {
    // Implementation for future if we want to group tags by type
    return tags;
  }
}
