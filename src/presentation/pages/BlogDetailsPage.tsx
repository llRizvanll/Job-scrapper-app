import { useParams, Link } from 'react-router-dom';
import { Header } from '@/presentation/components/landing/Header';
import { Footer } from '@/presentation/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const BLOG_CONTENT = {
  '1': {
    title: 'What job seekers need to know about remote work in 2026',
    date: 'February 05, 2026',
    author: 'Sarah Jenkins',
    category: 'Remote Work',
    readTime: '5 min read',
    content: `
      <p class="mb-6 text-lg text-slate-600 leading-relaxed">
        The remote work landscape has evolved significantly over the last few years. As we step into 2026, the expectations from both employers and employees have shifted towards a more mature, results-oriented model of distributed work.
      </p>
      
      <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">The Rise of Asynchronous-First</h2>
      <p class="mb-4 text-slate-600 leading-relaxed">
        Gone are the days of being constantly on Zoom. The most successful remote companies in 2026 have adopted an asynchronous-first mindset. This means writing skills are more important than ever. Documentation, clear memos, and concise chat messages are the lifeblood of distributed teams.
      </p>

      <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">Global Compensation Models</h2>
      <p class="mb-4 text-slate-600 leading-relaxed">
        We're seeing a trend towards location-agnostic pay keying into global tiers rather than strictly local adjustments. Talented professionals in lower cost-of-living areas are seeing their earning potential rise as companies compete for the best global talent.
      </p>

      <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">AI as a Remote Colleague</h2>
      <p class="mb-4 text-slate-600 leading-relaxed">
        AI tools are now standard in the remote toolkit, acting as meeting notetakers, code assistants, and even draft writers. Being comfortable with these tools is no longer a "nice to have"—it's a requirement for efficiency in a remote setting.
      </p>
      
      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
        <p class="text-blue-800 font-medium italic">
          "The future of remote work isn't just about where you work, but how you work. Autonomy and mastery of digital tools are the new currencies of the modern workplace."
        </p>
      </div>

      <h2 class="text-2xl font-bold text-slate-900 mb-4 mt-8">Conclusion</h2>
      <p class="mb-4 text-slate-600 leading-relaxed">
        If you're looking for a remote role in 2026, focus on showcasing your ability to work autonomously, communicate clearly in writing, and leverage modern AI tools. The opportunities are vast for those who adapt.
      </p>
    `
  }
};

export function BlogDetailsPage() {
  const { id } = useParams();
  // In a real app, fetch post by ID
  const post = BLOG_CONTENT[id as keyof typeof BLOG_CONTENT] || BLOG_CONTENT['1'];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Header />
      
      <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          {/* Breadcrumb / Back */}
          <Link to="/blog" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10 text-center">
             <div className="flex items-center justify-center gap-2 mb-4">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold tracking-wide uppercase">
                  {post.category}
                </span>
             </div>
             <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
               {post.title}
             </h1>
             
             <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                   <User className="w-4 h-4 text-slate-400" />
                   <span className="font-medium text-slate-900">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                   <Calendar className="w-4 h-4 text-slate-400" />
                   <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                   <Clock className="w-4 h-4 text-slate-400" />
                   <span>{post.readTime}</span>
                </div>
             </div>
          </header>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-[21/9] mb-12 flex items-center justify-center text-slate-400 border border-slate-200">
             <span className="font-medium">Featured Image Placeholder</span>
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg prose-slate max-w-none text-slate-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer / Share */}
          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
             <div className="text-slate-900 font-bold text-lg">
                Share this article
             </div>
             <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="rounded-full hover:text-blue-600 hover:border-blue-200">
                   <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:text-blue-800 hover:border-blue-200">
                   <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:text-blue-700 hover:border-blue-200">
                   <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:text-gray-900">
                   <Share2 className="w-4 h-4" />
                </Button>
             </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
