import { useEffect, useState, useRef } from 'react';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Show splash at most once per day per browser
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const today = new Date().toISOString().split('T')[0];
    const lastSeen = window.localStorage.getItem('adune_splash_last_seen');
    if (lastSeen === today) {
      setIsVisible(false);
      return;
    }
    window.localStorage.setItem('adune_splash_last_seen', today);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    // If video fails to play or doesn't exist, hide splash after a safety timeout
    const safetyTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 8000); // 8 seconds max

    return () => clearTimeout(safetyTimeout);
  }, [isVisible]);

  const handleVideoEnded = () => {
    setIsVisible(false);
  };

  const handleVideoError = () => {
    console.warn("Splash video failed to load or play");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500">
      <div className="relative rounded-2xl overflow-hidden shadow-[0_0_50px_-12px_rgba(232,65,67,0.25)] border-4 border-primary-500 max-w-4xl w-[90%] md:w-[800px] aspect-video bg-black">
        <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-contain"
            onEnded={handleVideoEnded}
            onError={handleVideoError}
        >
            <source src="/adune_raw_loader_video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
