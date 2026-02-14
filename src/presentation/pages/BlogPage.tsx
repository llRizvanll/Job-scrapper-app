import { Link } from 'react-router-dom';
import { Header } from '@/presentation/components/landing/Header';
import { Footer } from '@/presentation/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  readTime?: string;
}

const FEATURED_POST: BlogPost = {
  id: '1',
  title: 'What job seekers need to know about remote work in 2026',
  excerpt:
    'Remote work continues to evolve. We break down the latest trends, tools, and tips to help you find and succeed in remote roles—from timezone alignment to async communication.',
  category: 'Remote Work',
  date: 'February 05, 2026',
  readTime: '5 min read',
};

const RECENT_POSTS: BlogPost[] = [
  {
    id: '2',
    title: 'How to stand out in remote job applications',
    excerpt: 'Practical advice on tailoring your resume and cover letter for remote-first companies.',
    category: 'Career Tips',
    date: 'January 28, 2026',
    readTime: '4 min read',
  },
  {
    id: '3',
    title: 'Best tools for distributed teams in 2026',
    excerpt: 'A roundup of communication, project management, and async tools that remote teams rely on.',
    category: 'Tools',
    date: 'January 22, 2026',
    readTime: '6 min read',
  },
  {
    id: '4',
    title: 'Remote salary negotiation: what to ask for',
    excerpt: 'Navigate compensation, benefits, and equity when interviewing for remote roles.',
    category: 'Compensation',
    date: 'January 15, 2026',
    readTime: '5 min read',
  },
  {
    id: '5',
    title: 'Building a remote-first culture at your company',
    excerpt: 'Lessons from companies that have made remote work central to how they operate.',
    category: 'Company News',
    date: 'January 08, 2026',
    readTime: '7 min read',
  },
  {
    id: '6',
    title: 'Time zone overlap: making global teams work',
    excerpt: 'Strategies for collaboration when your team is spread across multiple continents.',
    category: 'Global HR',
    date: 'January 02, 2026',
    readTime: '5 min read',
  },
];

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  if (featured) {
    return (
      <article className="group">
        <Link to="#" className="block">
          <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[21/9] mb-6 flex items-center justify-center text-slate-400">
            <span className="text-sm font-medium">Featured image</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-3">
            <span className="font-medium text-slate-700">{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4 max-w-3xl">{post.excerpt}</p>
          <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-blue-600 group-hover:gap-2 transition-all">
            Continue reading
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </article>
    );
  }

  return (
    <article className="group">
      <Link to="#" className="block">
        <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-video mb-4 flex items-center justify-center text-slate-400 text-sm">
          <span>Image</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-2">
          <span className="font-medium text-slate-700">{post.category}</span>
          <span>{post.date}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <span className="inline-flex items-center gap-1 text-[15px] font-medium text-blue-600 group-hover:gap-1.5 transition-all">
          Learn more
          <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </article>
  );
}

export function BlogPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Header />
      <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Page title */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Blog</h1>
            <p className="mt-2 text-lg text-slate-600">
              Insights on remote work, careers, and building distributed teams.
            </p>
          </div>

          {/* Featured post */}
          <section className="mb-16">
            <BlogCard post={FEATURED_POST} featured />
          </section>

          {/* Recent stories */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Recent stories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {RECENT_POSTS.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          {/* Subscribe */}
          <section className="rounded-2xl bg-slate-50 border border-slate-200 p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Subscribe for the latest updates
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto mb-6">
              Sign up for our newsletter to get the inside scoop on remote work, job tips, and new
              features.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 pl-12 pr-4 rounded-full border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button
                type="submit"
                className="h-12 px-6 rounded-full bg-[#0055FF] hover:bg-[#0044CC] text-white font-medium shrink-0"
              >
                Subscribe
              </Button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
