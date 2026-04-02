import React, { useEffect, useState } from 'react';

// Custom WhatsApp Icon SVG since it's not in standard lucide-react default exports
const WhatsAppIcon = ({ className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M11.996 0A12.001 12.001 0 0 0 0 12.005c0 2.115.549 4.152 1.593 5.96L0 24l6.19-1.625c1.767.962 3.754 1.474 5.806 1.474s12.004-5.378 12.004-12.005A12.002 12.002 0 0 0 11.996 0Zm6.568 17.15c-.297.838-1.576 1.564-2.181 1.636-.576.068-1.325.26-4.008-1.025-3.328-1.597-5.592-5.462-5.764-5.694-.17-.232-1.378-1.834-1.378-3.498 0-1.664.869-2.5 1.181-2.836.313-.336.792-.471 1.139-.471.348 0 .695.006 1.008.016.326.01.762-.128 1.189.907.435 1.05 1.066 2.601 1.157 2.783.091.182.162.434.02.664-.141.229-.22.364-.436.6-.214.234-.447.518-.636.702-.206.2-.422.418-.184.823.238.406 1.056 1.745 2.264 2.825 1.565 1.398 2.887 1.833 3.297 2.016.41.183.652.148.895-.133.243-.28 1.041-1.217 1.317-1.633.277-.417.554-.347.93-.211.376.136 2.378 1.121 2.786 1.325.408.204.68.307.78.472.099.166.099.961-.198 1.798Z"/>
  </svg>
);

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after scrolling down 200px
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}
    >
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat with us instantly on WhatsApp"
        className="group relative flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-[#25D366]/50 focus:outline-none"
      >
        <span className="absolute w-full h-full bg-[#25D366] rounded-full opacity-40 group-hover:animate-ping origin-center"></span>
        <WhatsAppIcon className="w-8 h-8 text-white relative z-10" />
        
        {/* Tooltip */}
        <div className="absolute right-[calc(100%+12px)] px-4 py-2 bg-[var(--color-base-surface)] border border-white/10 text-white text-sm font-medium rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
          Chat with us
        </div>
      </a>
    </div>
  );
};
