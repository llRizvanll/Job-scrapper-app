import { Header } from '@/presentation/components/landing/Header';
import { Footer } from '@/presentation/components/landing/Footer';
import { Button } from '@/components/ui/button';

export function EmployersPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Header />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Hire the best remote talent
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Post your job to the #1 remote job board and reach millions of qualified candidates.
          </p>
          <Button className="bg-[#0055FF] hover:bg-[#0044CC] text-white rounded-full px-8 py-6 text-lg font-semibold">
            Post a Job for Free
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Reach Global Talent</h3>
              <p className="text-slate-600">Access a diverse pool of candidates from around the world.</p>
           </div>
           <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Simple & Fast</h3>
              <p className="text-slate-600">Post a job in minutes. No credit card required to start.</p>
           </div>
           <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Quality Candidates</h3>
              <p className="text-slate-600">Our advanced matching algorithm connects you with the right people.</p>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
