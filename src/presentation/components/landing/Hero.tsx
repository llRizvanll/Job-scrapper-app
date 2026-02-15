import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{
             backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
             backgroundSize: '24px 24px'
           }}
      />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Order 2 on mobile, Order 1 on desktop if we want text left, image right. 
              The screenshot shows centered text and image in a column or side-by-side. 
              Actually screenshot 1 shows small image left-centerish and text right-centerish? 
              Wait, screenshot 1 shows:
              Left: Illustration of guy in chair
              Right: "Live anywhere, work everywhere." + Button
          */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
             <img 
               src="/hero-illustration.png" 
               className="w-full max-w-[400px] h-auto object-contain"
             />
          </div>
          
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] font-bold text-gray-900 mb-8 tracking-tight">
              Live anywhere, <br className="hidden lg:block"/>
              work everywhere.
            </h1>
            <Button className="h-12 px-8 text-[17px] font-semibold bg-[#0055FF] hover:bg-[#0044CC] text-white rounded-full shadow-lg shadow-blue-500/20 transition-all duration-200">
              Sign up for free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
