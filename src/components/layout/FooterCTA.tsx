import React from 'react';
import { ArrowRight } from 'lucide-react';
import logo from '../../assets/images/branding/Logo.png';

export const FooterCTA: React.FC = () => {
  return (
    <section className="bg-black py-24 px-6 relative overflow-hidden flex flex-col items-center text-center justify-center min-h-[60vh]">

      {/* Immersive glowing background behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-gradient-radial from-[var(--color-accent-emerald)]/20 to-transparent blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto mb-12">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-[-0.03em] text-white leading-[1.1] mb-8">
          READY TO FREE UP SPACE<br className="md:hidden" /> AND FILL YOUR WALLET?
        </h2>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-quote-modal'))}
          className="group relative overflow-hidden bg-[var(--color-base-surface)] border-2 border-[var(--color-accent-emerald)] px-8 py-4 md:px-10 md:py-5 rounded-full inline-flex items-center gap-4 transition-all duration-300 transform hover:scale-105"
        >
          {/* Fill Animation from center */}
          <span className="absolute inset-0 bg-[var(--color-accent-emerald)] scale-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-[2]"></span>

          <span className="relative z-10 font-heading font-black uppercase tracking-[-0.02em] text-lg md:text-xl text-[var(--color-accent-emerald)] group-hover:text-black transition-colors duration-300">
            GET PAID TODAY
          </span>
          <ArrowRight className="relative z-10 w-5 h-5 md:w-6 md:h-6 text-[var(--color-accent-emerald)] group-hover:text-black group-hover:translate-x-2 transition-all duration-300" />
        </button>

        <p className="mt-6 text-gray-400 font-medium tracking-wide uppercase text-[10px] md:text-sm">
          Guaranteed Offer · Free Towing · Same Day Payment
        </p>
      </div>

      {/* Footer Branding & Social - Refined for Elegance & Distinction */}
      <footer className="w-full mt-16 px-6 lg:px-12 z-10 bg-[var(--color-base-surface)] border-t border-white/5 relative overflow-hidden">
        
        {/* Subtle accent line on top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-emerald)]/20 to-transparent" />

        <div className="max-w-4xl mx-auto flex flex-col items-center pt-16 pb-12">
          
          {/* Logo - Central focus */}
          <a href="/" className="mb-10 transition-transform duration-500 hover:scale-105">
            <img
              src={logo.src}
              alt="ABC Autosalvage Logo"
              className="h-9 md:h-12 w-auto object-contain opacity-90"
            />
          </a>

          {/* Navigation Links - Clean horizontal list */}
          <nav className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 mb-10">
            <a href="/privacy-policy" className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[var(--color-accent-emerald)] transition-all duration-300">Privacy Policy</a>
            <a href="/terms-of-service" className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[var(--color-accent-emerald)] transition-all duration-300">Terms of Service</a>
            <a href="#location" className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[var(--color-accent-emerald)] transition-all duration-300">Contact</a>
          </nav>

          {/* Copyright - Subtle footer signature */}
          <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.3em] text-center">
            © {new Date().getFullYear()} ABC Autosalvage Virginia. <span className="hidden sm:inline">All Rights Reserved.</span>
          </p>

        </div>
      </footer>
    </section>
  );
};
