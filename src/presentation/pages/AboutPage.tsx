import { Header } from '@/presentation/components/landing/Header';
import { Footer } from '@/presentation/components/landing/Footer';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Header />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            About Adune.app
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We are on a mission to help people live anywhere and work everywhere.
          </p>
        </div>
        
        <div className="prose prose-lg mx-auto text-slate-600 mb-16">
           <p>
             Adune.app aggregates remote jobs from over 100+ sources to bring you the most comprehensive list of remote opportunities available.
           </p>
           <p>
             Whether you are looking for your first remote job or you are a seasoned nomad, we have the tools and resources you need to succeed.
           </p>
        </div>

        <div className="max-w-2xl mx-auto text-center bg-slate-50 rounded-3xl p-8 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Meet the Developer</h2>
          <p className="text-slate-600 mb-6">
            Adune.app was lovingly crafted by <strong className="text-slate-900">Rizvan</strong>, a passionate developer dedicated to building useful tools for the community.
          </p>
          <a 
            href="https://rizvan.work" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
          >
            Visit rizvan.work
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
