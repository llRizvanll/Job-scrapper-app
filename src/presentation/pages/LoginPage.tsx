import { Header } from '@/presentation/components/landing/Header';
import { Footer } from '@/presentation/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Header />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto flex justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
           <h1 className="text-2xl font-bold text-center mb-2">Welcome back</h1>
           <p className="text-slate-600 text-center mb-8">Log in to your account.</p>
           
           <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                <Input type="email" placeholder="you@example.com" className="rounded-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <Input type="password" placeholder="••••••••" className="rounded-full" />
              </div>
              <Button className="w-full bg-[#0055FF] hover:bg-[#0044CC] text-white rounded-full py-6 font-semibold">
                Log In
              </Button>
           </div>

           <div className="mt-6 text-center text-sm text-slate-500">
              Don't have an account? <a href="/sign-up" className="text-blue-600 font-medium hover:underline">Sign up</a>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
