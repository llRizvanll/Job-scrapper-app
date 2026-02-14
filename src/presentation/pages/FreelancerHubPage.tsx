import { Link } from 'react-router-dom';
import { Header } from '@/presentation/components/landing/Header';
import { Footer } from '@/presentation/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Wallet, Shield, FileText, Globe } from 'lucide-react';

export function FreelancerHubPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-[#F9FAFB]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
              The home for your <br className="hidden md:block"/>
              <span className="text-[#0055FF]">freelance business</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
               Manage contracts, invoicing, and global payments in one place. 
               Spend less time on admin and more time doing the work you love.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to="/sign-up">
                 <Button className="h-14 px-8 rounded-full bg-[#0055FF] hover:bg-[#0044CC] text-white text-lg font-semibold shadow-xl shadow-blue-500/20 w-full sm:w-auto">
                   Get started for free
                 </Button>
               </Link>
               <Link to="/contact">
                 <Button variant="outline" className="h-14 px-8 rounded-full border-slate-200 text-slate-700 hover:bg-white hover:text-slate-900 text-lg font-medium w-full sm:w-auto bg-white">
                   Contact sales
                 </Button>
               </Link>
            </div>
            
            <div className="mt-16 relative mx-auto max-w-4xl">
               <div className="rounded-2xl border border-slate-200/60 shadow-2xl shadow-slate-200/50 bg-white p-2">
                 <div className="aspect-[16/9] rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                    <span className="font-medium flex items-center gap-2">
                       <Globe className="w-5 h-5" />
                       Dashboard Preview Placeholder
                    </span>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none">
             <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-50/50 blur-3xl opacity-60" />
             <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-50/50 blur-3xl opacity-60" />
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white">
           <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to run your business</h2>
                 <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    A complete toolkit designed for modern freelancers and independent contractors.
                 </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {/* Feature 1 */}
                 <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                       <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Invoicing</h3>
                    <p className="text-slate-600 leading-relaxed">
                       Create professional invoices in seconds. Track payments and send automated reminders to clients.
                    </p>
                 </div>
                 
                 {/* Feature 2 */}
                 <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6">
                       <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Bulletproof Contracts</h3>
                    <p className="text-slate-600 leading-relaxed">
                       Protect your work with compliant contract templates tailored for over 100+ countries.
                    </p>
                 </div>

                 {/* Feature 3 */}
                 <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 mb-6">
                       <Wallet className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Multi-currency Wallet</h3>
                    <p className="text-slate-600 leading-relaxed">
                       Receive payments in USD, EUR, GBP, and more. Withdraw to your local bank with low fees.
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* Value Prop / Split Section */}
        <section className="py-24 bg-[#0A0F29] text-white">
           <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                 <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                       Freedom to work from anywhere, <br/> compliance everywhere.
                    </h2>
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                       Stop worrying about tax laws and compliance. We handle the boring stuff so you can focus on delivering great work to your clients.
                    </p>
                    <ul className="space-y-4 mb-10">
                       {[
                         'Tax form generation (W-8BEN, etc.)',
                         'Insurance coverage options',
                         'Expense tracking & reimbursement',
                         'Proof of income letters'
                       ].map(item => (
                         <li key={item} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                               <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-slate-200">{item}</span>
                         </li>
                       ))}
                    </ul>
                    <Button className="h-12 px-6 bg-white text-slate-900 hover:bg-slate-100 font-medium rounded-full">
                       Learn about compliance
                    </Button>
                 </div>
                 <div className="flex-1 w-full max-w-lg">
                    <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-white/10 p-8 relative overflow-hidden">
                       <div className="absolute inset-0 bg-[url('https://remote.com/images/freelancer-hub-hero.png')] opacity-10 bg-cover bg-center" />
                       <div className="relative z-10 flex flex-col h-full justify-between">
                          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6">
                             <Globe className="w-8 h-8" />
                          </div>
                          <div>
                             <div className="text-4xl font-bold mb-2">150+</div>
                             <div className="text-slate-400">Countries supported</div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white text-center">
           <div className="max-w-3xl mx-auto px-4">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                 Ready to upgrade your workflow?
              </h2>
              <p className="text-xl text-slate-600 mb-10">
                 Join thousands of freelancers who trust LoadMore to manage their business.
              </p>
              <Link to="/sign-up">
                 <Button className="h-14 px-10 rounded-full bg-[#0055FF] hover:bg-[#0044CC] text-white text-lg font-semibold shadow-xl shadow-blue-500/20">
                   Create free account
                   <ArrowRight className="w-5 h-5 ml-2" />
                 </Button>
              </Link>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
