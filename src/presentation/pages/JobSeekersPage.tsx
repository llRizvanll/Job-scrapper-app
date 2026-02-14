import { Header } from '@/presentation/components/landing/Header';
import { Footer } from '@/presentation/components/landing/Footer';

export function JobSeekersPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Header />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Find your dream remote job
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Browse thousands of remote jobs from top companies. Work from anywhere, live everywhere.
          </p>
        </div>
        
        {/* Placeholder Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
           <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h2 className="text-2xl font-bold mb-4">For Developers</h2>
              <p className="text-slate-600 mb-4">Find the best remote development jobs. Frontend, Backend, Fullstack, and more.</p>
              <button className="text-blue-600 font-semibold hover:underline">Browse Developer Jobs &rarr;</button>
           </div>
           <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h2 className="text-2xl font-bold mb-4">For Designers</h2>
              <p className="text-slate-600 mb-4">Discover remote design opportunities. UI/UX, Product Design, Graphic Design.</p>
              <button className="text-blue-600 font-semibold hover:underline">Browse Design Jobs &rarr;</button>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
