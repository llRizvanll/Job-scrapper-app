import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#5D3FD3] rounded-full flex items-center justify-center text-white font-bold text-lg">
              R
            </div>
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-1">
              loadmore<span className="text-gray-400 font-normal">.in</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/job-seekers" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
              For job seekers
            </Link>
            <Link to="/employers" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
              For employers
            </Link>
            <Link to="/freelancer-hub" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Freelancer Hub
            </Link>
            <Link to="/contracts" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Contracts
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/employers">
              <Button variant="ghost" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                Post a job
              </Button>
            </Link>
            <div className="h-4 w-px bg-gray-200"></div>
            <Link to="/sign-up">
              <Button variant="ghost" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                Sign up
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-[#0055FF] hover:bg-[#0044CC] text-white rounded-full px-5 text-[15px] font-medium transition-colors shadow-sm shadow-blue-500/20">
                Log in
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 shadow-lg animate-in slide-in-from-top-5">
          <nav className="flex flex-col gap-4">
            <Link to="/job-seekers" className="text-lg font-medium text-gray-900 py-2">
              For job seekers
            </Link>
            <Link to="/employers" className="text-lg font-medium text-gray-900 py-2">
              For employers
            </Link>
            <Link to="/freelancer-hub" className="text-lg font-medium text-gray-900 py-2">
              Freelancer Hub
            </Link>
            <Link to="/contracts" className="text-lg font-medium text-gray-900 py-2">
              Contracts
            </Link>
            <Link to="/employers" className="text-lg font-medium text-gray-900 py-2">
              Pricing
            </Link>
            <hr className="border-gray-100" />
            <Link to="/employers" className="text-lg font-medium text-gray-600 py-2">
              Post a job
            </Link>
            <Link to="/sign-up" className="text-lg font-medium text-gray-600 py-2">
              Sign up
            </Link>
            <Link to="/login">
              <Button className="w-full bg-[#0055FF] hover:bg-[#0044CC] text-white rounded-full">
                Log in
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
