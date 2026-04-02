import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // GSAP Text Reveal Animation
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    gsap.set([title1Ref.current, title2Ref.current, subtitleRef.current, metricsRef.current, buttonContainerRef.current], { 
      y: 50, 
      opacity: 0
    });

    tl.to([title1Ref.current, title2Ref.current], {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      delay: 0.1
    })
    .to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1
    }, "-=0.8")
    .to(metricsRef.current, {
      y: 0,
      opacity: 1,
      duration: 1
    }, "-=0.8")
    .to(buttonContainerRef.current, {
      y: 0,
      opacity: 1,
      duration: 1
    }, "-=1.0");

    // Magnetic Button Effect setup
    const magneticButton = buttonRef.current;
    if (!magneticButton) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = magneticButton.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
      
      gsap.to(magneticButton, {
        x: x,
        y: y,
        duration: 0.6,
        ease: 'power3.out'
      });
      // Gently move the text inside too for a parallax feel
      gsap.to(magneticButton.querySelector('.magnetic-text') as HTMLElement, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.6,
        ease: 'power3.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(magneticButton, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
      gsap.to(magneticButton.querySelector('.magnetic-text') as HTMLElement, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
    };

    // The wrapper needs to handle the event to increase the active area
    const container = buttonContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  const handleOpenModal = () => {
    window.dispatchEvent(new CustomEvent('open-quote-modal'));
  };

  return (
    <section 
      ref={containerRef}
      id="hero"
      className="relative min-h-[90vh] py-24 px-6 xl:px-12 flex items-center bg-[#050608] overflow-hidden"
    >
      {/* Dynamic Background Image - Using a premium Unsplash tow truck carrying a car as requested */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.10] mix-blend-luminosity will-change-transform"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-[var(--color-accent-blue)] mix-blend-overlay opacity-10"></div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#050608] via-[#050608]/90 to-[#050608]/30 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent z-0 pointer-events-none"></div>

      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10 items-center">
        
        {/* Left Column - Typography & Metrics */}
        <div className="lg:col-span-8 flex flex-col justify-center pt-12 lg:pt-0">
          
          <div className="mb-8">
            <span className="inline-block border border-[var(--color-accent-blue)]/30 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-blue)] backdrop-blur-md bg-[var(--color-accent-blue)]/5">
              Precision Liquidation Platform
            </span>
          </div>

          <div className="overflow-hidden pb-1">
            <h1 ref={title1Ref} className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-heading font-black uppercase tracking-[-0.04em] text-white">
              Cash for Your
            </h1>
          </div>
          <div className="overflow-hidden pb-4">
            <h1 ref={title2Ref} className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-heading font-black uppercase tracking-[-0.04em] text-[var(--color-accent-blue)] flex items-center gap-4">
              Car Today<span className="text-[var(--color-accent-blue)]">.</span>
            </h1>
          </div>
          
          <div className="overflow-hidden mt-6 mb-12">
            <p ref={subtitleRef} className="text-base md:text-xl text-gray-400 max-w-3xl font-body font-normal leading-relaxed">
              No Questions, No Stress. We buy cars in any condition. Get an offer in 90 seconds. Precision engineering meets seamless liquidation.
            </p>
          </div>

          {/* Metrics Row */}
          <div ref={metricsRef} className="flex flex-wrap gap-10 md:gap-16 pt-8 border-t border-white/10">
            <div>
              <p className="text-3xl font-heading font-black text-[var(--color-accent-blue)] uppercase tracking-tight">90s</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Fastest Valuation</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-black text-white uppercase tracking-tight">24h</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Payout Window</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-black text-white uppercase tracking-tight">100%</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Towing Covered</p>
            </div>
          </div>
        </div>

        {/* Right Column - Massive Magnetic Button (Normalized Pill Size) */}
        <div className="lg:col-span-4 flex items-center justify-center lg:justify-end pb-20 lg:pb-0" ref={buttonContainerRef}>
           <div className="p-10 cursor-pointer group">
              <button 
                ref={buttonRef}
                onClick={handleOpenModal}
                className="relative px-10 py-5 bg-[var(--color-accent-blue)] rounded-full flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.2)] group-hover:shadow-[0_0_80px_rgba(0,240,255,0.4)] transition-shadow duration-500 min-w-[240px]"
              >
                {/* Background pulse inside button */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-black/5 mix-blend-overlay"></div>
                
                <span className="magnetic-text relative z-10 text-[#050608] font-heading font-black uppercase text-xl md:text-2xl tracking-tight leading-none text-center flex items-center gap-3">
                  Get Quote
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </button>
           </div>
        </div>

      </div>
    </section>
  );
};
