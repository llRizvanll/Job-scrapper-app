import { Button } from '@/components/ui/button';
import { useAuth } from '@/core/contexts/AuthContext';

export function Hero() {
  const { user } = useAuth();

  return (
    <div 
      className="relative overflow-hidden text-white"
      style={{
        background: 'linear-gradient(90deg, #671437, #843342, #B0605B, #D48975, #E8B68F)'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:32px_32px]" />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-12 lg:pt-48 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {!user && (
            <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
              <img 
                src="/portal_banner_new.png" 
                className="w-full max-w-[500px] h-[400px] object-cover object-center rounded-2xl shadow-2xl"
                alt="Portal Banner"
              />
            </div>
          )}
          
          <div className={`order-1 lg:order-2 text-center lg:text-left ${user ? 'lg:col-span-2' : ''}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] font-bold text-white mb-8 tracking-tight">
              Live anywhere, <br className="hidden lg:block"/>
              work everywhere.
            </h1>
            {!user && (
              <Button className="h-12 px-8 text-[17px] font-semibold bg-primary-500 hover:bg-primary-400 text-white rounded-full shadow-lg shadow-primary-500/20 transition-all duration-200">
                Sign up for free
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
