import { Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-primary-900 border-t border-primary-800/20 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
               <img src="/adune-logo-rebrand.png" alt="A Dune" className="h-30 w-auto hover:opacity-90 transition-opacity" />
            </Link>
            <p className="text-primary-100/70 mb-6 max-w-sm">
               One dune. Every source.
            </p>
            <div className="flex items-center gap-4">
               <a href="#" className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                  <Twitter className="w-5 h-5" />
               </a>
               <a href="#" className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                  <Linkedin className="w-5 h-5" />
               </a>
               <a href="#" className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                  <Instagram className="w-5 h-5" />
               </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="font-semibold text-white mb-4">Rebranding</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-[15px] text-primary-100/80 hover:text-white transition-colors">About Adune</Link></li>
              <li><Link to="/job-seekers" className="text-[15px] text-primary-100/80 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-[15px] text-primary-100/80 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-[15px] text-primary-100/80 hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="col-span-1 lg:col-span-3">
            <h3 className="font-semibold text-white mb-4">Job Seekers</h3>
            <ul className="space-y-3">
              <li><Link to="/sign-up" className="text-[15px] text-primary-100/80 hover:text-white transition-colors">Sign up with Adune</Link></li>
              <li><Link to="/" className="text-[15px] text-primary-100/80 hover:text-white transition-colors">Browse remote jobs</Link></li>
              <li><Link to="/job-seekers" className="text-[15px] text-primary-100/80 hover:text-white transition-colors">Job seeker help docs</Link></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="col-span-1 lg:col-span-3">
            <h3 className="font-semibold text-white mb-4">Employers</h3>
            <ul className="space-y-3">
              <li><Link to="/employers" className="text-[15px] text-primary-100/80 hover:text-white transition-colors">Post a remote job</Link></li>
              <li><Link to="/employers" className="text-[15px] text-primary-100/80 hover:text-white transition-colors">Employer help docs</Link></li>
              <li><Link to="/employers" className="text-[15px] text-primary-100/80 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-800/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-primary-200/60">
            Copyright © {new Date().getFullYear()} Adune, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-primary-200/80 font-medium">
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
