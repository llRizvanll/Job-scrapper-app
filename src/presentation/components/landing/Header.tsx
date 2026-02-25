import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/core/contexts/AuthContext';
import { authService } from '@/core/services/authService';
import { toast } from 'sonner';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    const { error } = await authService.signOut();
    if (error) {
      toast.error('Error logging out: ' + error);
    } else {
      toast.success('Logged out successfully');
      navigate('/');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src="/adune-logo-rebrand.png" alt="Adune" className="h-12 w-auto md:h-16" />
              <div className="flex flex-col -ml-2"> </div>
            </Link>


          {/* Desktop Navigation - Hidden on smaller screens, visible on xl */}
          <nav className="hidden xl:flex items-center gap-6">
            <Link to="/job-seekers" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
              For job seekers
            </Link>
            <Link
              to="/resume-builder"
              className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              Resume Builder
            </Link>
            <Link to="/freelancer-hub" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
              Freelance Hub
            </Link>
            <Link to="/employers" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
              For employers
            </Link>
            <Link to="/saved-jobs" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
              Saved Jobs
            </Link>
            <Link to="/contracts" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
              Contracts
            </Link>
          </nav>

          {/* Actions - Hidden on smaller screens, visible on xl */}
          <div className="hidden xl:flex items-center gap-3">
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                      <UserIcon className="w-4 h-4" />
                      {user.email}
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={handleLogout}
                      className="text-[15px] font-medium text-red-600 hover:text-red-700 hover:bg-red-50 whitespace-nowrap gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link to="/sign-up">
                      <Button variant="ghost" className="text-[15px] font-medium text-primary-800 hover:text-primary-500 hover:bg-gray-50 whitespace-nowrap">
                        Sign up
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button className="bg-[#0055FF] hover:bg-[#0044CC] text-white rounded-full px-5 text-[15px] font-medium transition-colors shadow-sm shadow-blue-500/20 whitespace-nowrap">
                        Log in
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button - Visible on lg and below */}
          <button 
            className="xl:hidden text-primary-800 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 shadow-lg animate-in slide-in-from-top-5 h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="flex flex-col gap-2">
            <Link to="/job-seekers" className="text-lg font-medium text-gray-900 py-3 px-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
              For job seekers
            </Link>
            <Link
              to="/resume-builder"
              className="text-lg font-medium text-gray-900 py-3 px-2 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resume Builder
            </Link>
            <Link to="/employers" className="text-lg font-medium text-gray-900 py-3 px-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
              For employers
            </Link>
            <Link to="/freelancer-hub" className="text-lg font-medium text-gray-900 py-3 px-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
              Freelancer Hub
            </Link>
            <Link to="/contracts" className="text-lg font-medium text-gray-900 py-3 px-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
              Contracts
            </Link>
             <Link to="/saved-jobs" className="text-lg font-medium text-gray-900 py-3 px-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
              Saved Jobs
            </Link>
            
            <hr className="border-gray-100 my-2" />
            
            <Link to="/employers" className="text-lg font-medium text-gray-600 py-3 px-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
              Post a job
            </Link>
            {user ? (
              <>
                <div className="py-3 px-2 text-sm text-gray-500 border-b border-gray-50 mb-2">
                  Signed in as: <br />
                  <span className="font-semibold text-gray-900">{user.email}</span>
                </div>
                <button 
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="w-full text-left text-lg font-medium text-red-600 py-3 px-2 hover:bg-red-50 rounded-lg flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/sign-up" className="text-lg font-medium text-gray-600 py-3 px-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign up
                </Link>
                <div className="pt-2">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-[#0055FF] hover:bg-[#0044CC] text-white rounded-full h-12 text-lg">
                      Log in
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
