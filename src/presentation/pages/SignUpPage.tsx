import { Header } from '@/presentation/components/landing/Header';
import { Footer } from '@/presentation/components/landing/Footer';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input'; // Removing unused Input
import { useState } from 'react';
import { authService } from '@/core/services/authService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/core/contexts/AuthContext';
import { useEffect } from 'react';

export function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    const { user, error } = await authService.signInWithGoogle();
    setIsLoading(false);

    if (error) {
       toast.error(error);
       return;
    }

    if (user) {
      toast.success('Account created successfully!');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Header />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto flex justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
           <h1 className="text-2xl font-bold text-center mb-2">Create your account</h1>
           <p className="text-slate-600 text-center mb-8">Join thousands of remote workers and companies.</p>
           
           <div className="space-y-4">
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center gap-3 py-6 rounded-full border-slate-200 hover:bg-slate-50 transition-all font-medium"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.83c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {isLoading ? 'Connecting...' : 'Sign up with Google'}
              </Button>
           </div>

           <div className="mt-6 text-center text-sm text-slate-500">
              Already have an account? <a href="/login" className="text-blue-600 font-medium hover:underline">Log in</a>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
