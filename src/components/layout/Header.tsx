import React, { useEffect, useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import logo from '../../assets/images/branding/Logo.svg';

const navLinks = [
  { label: 'What We Buy', href: '/#inventory' },
  { label: 'How It Works', href: '/#process' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Find Us', href: '/#location' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowCTA(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleOpenModal = () => {
    window.dispatchEvent(new CustomEvent('open-quote-modal'));
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const [path, hash] = href.split('#');
    if (path && path !== window.location.pathname) {
      window.location.href = href;
    } else {
      const el = document.querySelector(`#${hash}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCallClick = (e: React.MouseEvent) => {
    // Detect if the device is likely a mobile phone with calling capabilities
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    
    if (!isMobile) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-call-modal'));
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0B0E14]/80 backdrop-blur-md border-b border-white/5 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-full">
          
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img 
              src={logo.src} 
              alt="ABC Autosalvage Logo" 
              width="200"
              height="48"
              className="h-8 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-[var(--color-primary)] pb-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-6">
            <a 
              href="tel:19194378198"
              onClick={handleCallClick}
              aria-label="Call ABC Autosalvage directly"
              className="group flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 border border-white/10 rounded-full hover:border-[var(--color-primary)]/50 transition-colors"
            >
              <div className="relative flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-[var(--color-primary)]/10">
                <div className="absolute w-full h-full rounded-full bg-[var(--color-primary)] opacity-20 group-hover:animate-ping"></div>
                <Phone className="w-3 h-3 md:w-4 md:h-4 text-[var(--color-primary)] relative z-10" />
              </div>
              <span className="font-heading font-bold uppercase tracking-wide text-[10px] md:text-sm text-gray-300 group-hover:text-white transition-colors relative z-10 hidden sm:block">
                Call Now
              </span>
            </a>

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Dynamic Scroll CTA */}
            <button 
              onClick={handleOpenModal}
              className={`hidden sm:block overflow-hidden transition-all duration-500 ease-out bg-[var(--color-primary)] text-black font-heading font-black uppercase tracking-wider text-sm rounded-full px-6 whitespace-nowrap hover:shadow-[0_0_20px_rgba(255,95,0,0.4)] hover:scale-105 ${
                showCTA ? 'max-w-[200px] opacity-100 py-3 ml-2' : 'max-w-0 opacity-0 py-0 ml-0 border-0 p-0'
              }`}
            >
              Get Offer
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#050608]/95 backdrop-blur-xl"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
            {/* Close Button */}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Logo */}
            <img 
              src={logo.src} 
              alt="ABC Autosalvage Logo"
              width="160"
              height="40" 
              className="h-10 w-auto object-contain mb-12 opacity-80"
            />

            {/* Nav Links */}
            <nav className="flex flex-col items-center gap-8 mb-12">
              {navLinks.map((link, i) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-lg font-heading font-black uppercase tracking-[0.15em] text-white hover:text-[var(--color-primary)] transition-colors"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <button 
              onClick={() => { setMobileMenuOpen(false); handleOpenModal(); }}
              className="bg-[var(--color-primary)] text-black font-heading font-black uppercase tracking-wider text-sm rounded-full px-10 py-4 hover:shadow-[0_0_30px_rgba(255,95,0,0.4)] transition-all"
            >
              Get Free Offer
            </button>

            {/* Phone */}
            <a 
              href="tel:19194378198"
              onClick={handleCallClick}
              className="mt-6 flex items-center gap-2 text-gray-400 hover:text-[var(--color-primary)] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-heading font-bold uppercase tracking-wider">(919) 437-8198</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

