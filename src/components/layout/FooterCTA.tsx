import React from 'react';
import { ArrowRight } from 'lucide-react';
import logo from '../../assets/images/branding/Logo.png';

export const FooterCTA: React.FC = () => {
  return (
    <section className="bg-black py-24 px-6 relative overflow-hidden flex flex-col items-center text-center justify-center min-h-[60vh]">

      {/* Immersive glowing background behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-gradient-radial from-[var(--color-accent-emerald)]/20 to-transparent blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-[-0.03em] text-white leading-[1.1] mb-12">
          READY TO FREE UP SPACE AND FILL YOUR WALLET?
        </h2>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-quote-modal'))}
          className="group relative overflow-hidden bg-[var(--color-base-surface)] border-2 border-[var(--color-accent-emerald)] px-10 py-5 rounded-full inline-flex items-center gap-4 transition-all duration-300 transform hover:scale-105"
        >
          {/* Fill Animation from center */}
          <span className="absolute inset-0 bg-[var(--color-accent-emerald)] scale-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-[2]"></span>

          <span className="relative z-10 font-heading font-black uppercase tracking-[-0.02em] text-xl text-[var(--color-accent-emerald)] group-hover:text-black transition-colors duration-300">
            GET PAID TODAY
          </span>
          <ArrowRight className="relative z-10 w-6 h-6 text-[var(--color-accent-emerald)] group-hover:text-black group-hover:translate-x-2 transition-all duration-300" />
        </button>

        <p className="mt-8 text-gray-400 font-medium tracking-wide uppercase text-sm">
          Guaranteed Offer · Free Towing · Same Day Payment
        </p>
      </div>

      {/* Footer Branding & Social */}
      <footer className="absolute bottom-8 left-0 right-0 px-12 flex flex-col items-center gap-4 z-10">
        <div className="flex flex-col items-center gap-4">
          <img
            src={logo.src}
            alt="ABC Autosalvage Logo"
            className="h-8 w-auto object-contain opacity-70"
          />
          <div className="flex justify-between w-full max-w-5xl text-gray-400 text-sm font-medium">
            <span>© {new Date().getFullYear()} ABC Autosalvage.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};
