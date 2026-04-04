import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import logo from '../../assets/images/branding/Logo.png';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // General glassmorphism state
      setIsScrolled(window.scrollY > 50);
      
      // Show CTA only when scrolled past Hero (roughly 600px)
      setShowCTA(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenModal = () => {
    window.dispatchEvent(new CustomEvent('open-quote-modal'));
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0B0E14]/80 backdrop-blur-md border-b border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-full">
        
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src={logo.src} 
            alt="ABC Autosalvage Logo" 
            className="h-8 md:h-12 w-auto object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <a href="#inventory" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-[var(--color-accent-emerald)] pb-1">Inventory</a>
          <a href="#process" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-[var(--color-accent-emerald)] pb-1">Process</a>
          <a href="#hero" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-[var(--color-accent-emerald)] pb-1">Valuation</a>
          <a href="#location" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-[var(--color-accent-emerald)] pb-1">Location</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <a 
            href="tel:17576331779"
            aria-label="Call ABC Autosalvage directly"
            className="group flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full hover:border-[var(--color-accent-emerald)]/50 transition-colors"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-accent-emerald)]/10">
              <div className="absolute w-full h-full rounded-full bg-[var(--color-accent-emerald)] opacity-20 group-hover:animate-ping"></div>
              <Phone className="w-4 h-4 text-[var(--color-accent-emerald)] relative z-10" />
            </div>
            <span className="font-heading font-bold uppercase tracking-wide text-sm text-gray-300 group-hover:text-white transition-colors relative z-10 hidden sm:block">
              Call Now
            </span>
          </a>

          {/* Dynamic Scroll CTA */}
          <button 
            onClick={handleOpenModal}
            className={`hidden sm:block overflow-hidden transition-all duration-500 ease-out bg-[var(--color-accent-emerald)] text-black font-heading font-black uppercase tracking-wider text-sm rounded-full px-6 whitespace-nowrap hover:shadow-[0_0_20px_rgba(0,230,118,0.4)] hover:scale-105 ${
              showCTA ? 'max-w-[200px] opacity-100 py-3 ml-2' : 'max-w-0 opacity-0 py-0 ml-0 border-0 p-0'
            }`}
          >
            Get Offer
          </button>
        </div>

      </div>
    </header>
  );
};
