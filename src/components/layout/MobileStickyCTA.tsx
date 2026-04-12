import React, { useEffect, useState } from 'react';
import { BadgeDollarSign } from 'lucide-react';

export const MobileStickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after 400px of scroll
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenModal = () => {
    window.dispatchEvent(new CustomEvent('open-quote-modal'));
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-[60] md:hidden transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={handleOpenModal}
        className="relative group flex items-center justify-center w-14 h-14 bg-[var(--color-primary)] text-black rounded-full shadow-[0_10px_30px_rgba(255,95,0,0.4)] active:scale-90 transition-transform"
        aria-label="Get Instant Offer"
      >
        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-[var(--color-primary)] animate-ping opacity-20"></span>
        
        <BadgeDollarSign className="w-7 h-7 relative z-10" />
        
        {/* Tooltip-like label */}
        <span className="absolute right-full mr-3 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Get Cash Offer
        </span>
      </button>
    </div>
  );
};
