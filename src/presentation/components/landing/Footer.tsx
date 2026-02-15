import { Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-12 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-1">
                adune<span className="text-gray-400 font-normal">.app</span>
            </Link>
            <div className="flex items-center gap-4">
               {/* Social icons remain unchanged */}
               <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                  <Twitter className="w-5 h-5" />
               </a>
               <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                  <Linkedin className="w-5 h-5" />
               </a>
               <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                  <Instagram className="w-5 h-5" />
               </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Rebranding</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-[15px] text-gray-500 hover:text-gray-900">About Adune</Link></li>
              <li><Link to="/job-seekers" className="text-[15px] text-gray-500 hover:text-gray-900">Careers</Link></li>
              <li><Link to="/blog" className="text-[15px] text-gray-500 hover:text-gray-900">Blog</Link></li>
              <li><Link to="/about" className="text-[15px] text-gray-500 hover:text-gray-900">Press</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Job Seekers</h3>
            <ul className="space-y-3">
              <li><Link to="/sign-up" className="text-[15px] text-gray-500 hover:text-gray-900">Sign up with Adune</Link></li>
              <li><Link to="/" className="text-[15px] text-gray-500 hover:text-gray-900">Browse remote jobs</Link></li>
              <li><Link to="/job-seekers" className="text-[15px] text-gray-500 hover:text-gray-900">Job seeker help docs</Link></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Employers</h3>
            <ul className="space-y-3">
              <li><Link to="/employers" className="text-[15px] text-gray-500 hover:text-gray-900">Post a remote job</Link></li>
              <li><Link to="/employers" className="text-[15px] text-gray-500 hover:text-gray-900">Employer help docs</Link></li>
              <li><Link to="/employers" className="text-[15px] text-gray-500 hover:text-gray-900">Pricing</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            Copyright © {new Date().getFullYear()} Adune, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
             <a href="#" className="hover:text-gray-900">Terms</a>
             <a href="#" className="hover:text-gray-900">Privacy</a>
             <a href="#" className="hover:text-gray-900">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
