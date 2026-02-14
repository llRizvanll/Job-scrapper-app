import { Header } from '@/presentation/components/landing/Header';
import { Footer } from '@/presentation/components/landing/Footer';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Header />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            About LoadMore.in
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We are on a mission to help people live anywhere and work everywhere.
          </p>
        </div>
        
        <div className="prose prose-lg mx-auto text-slate-600">
           <p>
             LoadMore.in aggregates remote jobs from over 100+ sources to bring you the most comprehensive list of remote opportunities available.
           </p>
           <p>
             Whether you are looking for your first remote job or you are a seasoned nomad, we have the tools and resources you need to succeed.
           </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
