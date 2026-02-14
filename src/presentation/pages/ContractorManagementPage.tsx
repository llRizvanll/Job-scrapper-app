import { Link } from 'react-router-dom';
import { Header } from '@/presentation/components/landing/Header';
import { Footer } from '@/presentation/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, ShieldCheck, Globe2, Zap, CreditCard, Users } from 'lucide-react';

export function ContractorManagementPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-purple-100">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-[#FDF8F6]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
              Pay and manage contractors <br className="hidden md:block"/>
              <span className="text-[#E63757]">in 150+ countries</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
               Onboard international contractors in minutes with localized contracts, 
               tax compliance, and instant payments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to="/sign-up">
                 <Button className="h-14 px-8 rounded-full bg-[#E63757] hover:bg-[#D42B49] text-white text-lg font-semibold shadow-xl shadow-rose-500/20 w-full sm:w-auto">
                   Start now for free
                 </Button>
               </Link>
               <Link to="/contact">
                 <Button variant="outline" className="h-14 px-8 rounded-full border-slate-200 text-slate-700 hover:bg-white hover:text-slate-900 text-lg font-medium w-full sm:w-auto bg-white">
                   Talk to an expert
                 </Button>
               </Link>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none">
             <div className="absolute -top-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-orange-100/50 blur-3xl opacity-60" />
             <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-rose-50/50 blur-3xl opacity-60" />
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-24 bg-white">
           <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The easiest way to work with global talent</h2>
                 <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Mitigate risk and reduce admin while giving your contractors a first-class experience.
                 </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {/* Feature 1 */}
                 <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 mb-6">
                       <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Total Compliance</h3>
                    <p className="text-slate-600 leading-relaxed">
                       We automatically generate locally compliant contracts that protect your IP and define the working relationship.
                    </p>
                 </div>
                 
                 {/* Feature 2 */}
                 <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mb-6">
                       <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Onboarding</h3>
                    <p className="text-slate-600 leading-relaxed">
                       Invite contractors with a single click. They can sign contracts and upload documents in minutes.
                    </p>
                 </div>

                 {/* Feature 3 */}
                 <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                       <CreditCard className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">One-Click Payments</h3>
                    <p className="text-slate-600 leading-relaxed">
                       Pay all your contractors in their local currency with a single invoice. We handle the FX and transfer.
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* Feature Split Section */}
        <section className="py-24 bg-slate-50">
           <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                 <div className="flex-1 w-full max-w-lg order-2 lg:order-1">
                    <div className="aspect-[4/3] rounded-2xl bg-white shadow-xl border border-slate-100 p-8 flex flex-col justify-center">
                       {/* Mock UI for Contractor Dashboard */}
                       <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><Users className="w-5 h-5 text-slate-500"/></div>
                             <div>
                                <div className="font-semibold text-slate-900">Active Contractors</div>
                                <div className="text-sm text-slate-500">Global Team</div>
                             </div>
                          </div>
                          <div className="text-2xl font-bold text-slate-900">12</div>
                       </div>
                       <div className="space-y-4">
                          {[
                             { name: "Sarah J.", role: "Product Designer", country: "United Kingdom", status: "Active" },
                             { name: "Miguel R.", role: "Frontend Dev", country: "Spain", status: "Active" },
                             { name: "Yuki T.", role: "Content Writer", country: "Japan", status: "Sign pending" }
                          ].map((c, i) => (
                             <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                   <div className={`w-2 h-2 rounded-full ${c.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                   <div>
                                      <div className="text-sm font-medium text-slate-900">{c.name}</div>
                                      <div className="text-xs text-slate-500">{c.role} • {c.country}</div>
                                   </div>
                                </div>
                                <div className={`text-xs px-2 py-1 rounded-full ${c.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                   {c.status}
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
                 
                 <div className="flex-1 order-1 lg:order-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-medium mb-6">
                       <Globe2 className="w-4 h-4" />
                       <span>Global Coverage</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                       Hire anywhere without opening an entity
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                       Don't let borders limit your talent pool. With LoadMore Contractor Management, you can compliantly work with individuals in over 150 countries.
                    </p>
                    <ul className="space-y-4 mb-10">
                       {[
                         'Localized contract templates',
                         'Tax form collection (W-8, W-9)',
                         'Identity verification',
                         'Automatic invoice generation'
                       ].map(item => (
                         <li key={item} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600">
                               <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-slate-700">{item}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#1E1E2E] text-center text-white">
           <div className="max-w-3xl mx-auto px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                 Start managing contractors today
              </h2>
              <p className="text-xl text-slate-300 mb-10">
                 No setup fees. No hidden costs. Pay only for active contractors.
              </p>
              <Link to="/sign-up">
                 <Button className="h-14 px-10 rounded-full bg-[#E63757] hover:bg-[#D42B49] text-white text-lg font-semibold shadow-xl shadow-rose-900/20">
                   Create account
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
