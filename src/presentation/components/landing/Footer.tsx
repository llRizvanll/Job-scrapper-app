import { Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-12 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl font-bold text-gray-900">
                remote<span className="text-gray-400 font-normal">.com/jobs</span>
              </span>
            </div>
            {/* Product Hunt Badge Mockup */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 mb-6">
              <span className="bg-white/20 p-0.5 rounded-full">P</span>
              #1 Product of the Week
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[15px] text-gray-500 hover:text-gray-900">About Remote</a></li>
              <li><a href="#" className="text-[15px] text-gray-500 hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="text-[15px] text-gray-500 hover:text-gray-900">Support</a></li>
              <li><a href="#" className="text-[15px] text-gray-500 hover:text-gray-900">Contact us</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For job seekers</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[15px] text-gray-500 hover:text-gray-900">Sign up with Remote Jobs</a></li>
              <li><a href="#" className="text-[15px] text-gray-500 hover:text-gray-900">Browse remote jobs</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For companies</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[15px] text-gray-500 hover:text-gray-900">Post a remote job</a></li>
              <li><a href="#" className="text-[15px] text-gray-500 hover:text-gray-900">Create a company bio</a></li>
              <li><a href="#" className="text-[15px] text-gray-500 hover:text-gray-900">Pricing</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-500">
            Copyright © {new Date().getFullYear()} Remote Technology, Inc. All rights reserved.
          </div>
          
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <div className="flex gap-6 text-sm text-gray-500">
               <a href="#" className="hover:text-gray-900">Privacy Policy</a>
               <a href="#" className="hover:text-gray-900">Cookie Policy</a>
               <a href="#" className="hover:text-gray-900">Terms of Use</a>
            </div>
            
            <div className="flex items-center gap-4">
               <a href="#" className="text-gray-400 hover:text-gray-900"><Youtube className="w-5 h-5"/></a>
               <a href="#" className="text-gray-400 hover:text-gray-900"><Linkedin className="w-5 h-5"/></a>
               <a href="#" className="text-gray-400 hover:text-gray-900"><Twitter className="w-5 h-5"/></a>
               <a href="#" className="text-gray-400 hover:text-gray-900"><Instagram className="w-5 h-5"/></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
