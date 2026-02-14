import { useState } from 'react';
import { Menu, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-[#5D3FD3] rounded-full flex items-center justify-center text-white font-bold text-lg">
              R
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              remote<span className="text-gray-400 font-normal">.com/jobs</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
              For job seekers
            </a>
            <a href="#" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
              For employers
            </a>
            <a href="#" className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-[#3b82f6] hover:text-[#2563eb] hover:bg-blue-50 font-medium">
              <Plus className="w-4 h-4 mr-2" />
              Post a job
            </Button>
            <Button className="bg-[#0055FF] hover:bg-[#0044CC] text-white rounded-full px-6 font-medium shadow-sm hover:shadow transition-all duration-200">
              Sign up
            </Button>
            <Button variant="outline" className="rounded-full px-6 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium">
              Log in
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              For job seekers
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              For employers
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Pricing
            </a>
          </div>
          <div className="pt-4 pb-4 border-t border-gray-100 px-4 space-y-3">
            <Button variant="ghost" className="w-full justify-start text-[#3b82f6]">
              <Plus className="w-4 h-4 mr-2" />
              Post a job
            </Button>
            <Button className="w-full bg-[#0055FF] text-white rounded-full">
              Sign up
            </Button>
            <Button variant="outline" className="w-full rounded-full">
              Log in
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
