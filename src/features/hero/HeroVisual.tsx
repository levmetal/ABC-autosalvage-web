import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import heroBg from '../../assets/images/hero/hero-background.jpeg';

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

    // 3D Tilt Effect setup for the Glass Card
    const card = buttonContainerRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(card, {
        rotationY: x * 0.05,
        rotationX: -y * 0.05,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.5
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
      
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleOpenModal = () => {
    window.dispatchEvent(new CustomEvent('open-quote-modal'));
  };

  return (
    <section 
      ref={containerRef}
      id="hero"
      className="relative min-h-[85vh] pt-28 pb-16 lg:pt-40 px-6 xl:px-12 flex items-center bg-[#050608] overflow-hidden"
    >
      {/* Dynamic Background Image - Using the project's official branded background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat grayscale mix-blend-luminosity opacity-[0.12] will-change-transform"
        style={{ backgroundImage: `url(${heroBg.src})` }}
      >
        <div className="absolute inset-0 bg-[var(--color-accent-emerald)] mix-blend-overlay opacity-5"></div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#050608] via-[#050608]/90 to-[#050608]/30 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent z-0 pointer-events-none"></div>

      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 items-center">
        
        {/* Left Column - Typography & Metrics */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          
          <div className="mb-10">
            <span className="inline-block border border-[var(--color-accent-emerald)]/40 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-emerald)] backdrop-blur-md bg-[var(--color-accent-emerald)]/10">
              Precision Liquidation Platform
            </span>
          </div>

          <div className="overflow-hidden pb-1">
            <h1 ref={title1Ref} className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-heading font-black uppercase tracking-tight text-white italic">
              Cash for Your
            </h1>
          </div>
          <div className="overflow-hidden pb-4">
            <h1 ref={title2Ref} className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-heading font-black uppercase tracking-tight text-[var(--color-accent-emerald)] flex items-center gap-4">
              Car Today<span className="text-[var(--color-accent-emerald)]">.</span>
            </h1>
          </div>
          
          <div className="overflow-hidden mt-4 mb-8">
            <p ref={subtitleRef} className="text-sm md:text-lg text-gray-400 max-w-2xl font-body font-normal leading-relaxed">
              No Questions, No Stress. We buy cars in any condition. Get an offer in 90 seconds. Precision engineering meets seamless liquidation.
            </p>
          </div>

          {/* Metrics Row */}
          <div ref={metricsRef} className="flex flex-wrap gap-10 md:gap-16 pt-8 border-t border-white/10">
            <div>
              <p className="text-2xl font-heading font-black text-[var(--color-accent-emerald)] uppercase tracking-tight">90s</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Fastest Valuation</p>
            </div>
            <div>
              <p className="text-2xl font-heading font-black text-white uppercase tracking-tight">24h</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Payout Window</p>
            </div>
            <div>
              <p className="text-2xl font-heading font-black text-white uppercase tracking-tight">100%</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Towing Covered</p>
            </div>
          </div>
        </div>

        {/* Right Column - Glassmorphism AutoCash Simulator */}
          <div className="lg:col-span-4 flex items-center justify-center lg:justify-end pb-12 lg:pb-0 perspective-[1000px]">
           <div 
             ref={buttonContainerRef}
             className="relative w-full max-w-[340px] rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group transform-style-3d cursor-default lg:-rotate-y-12 lg:rotate-x-12 transition-all duration-700 hover:rotate-0"
           >
             
             {/* Emerald Flare inside card */}
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-accent-emerald)] rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"></div>

             <div className="relative z-10 flex flex-col gap-6 transform-translate-z-10">
                
                {/* Proof of Value Component */}
                 <div className="flex items-center gap-3 bg-black/40 rounded-xl p-4 border border-white/5 shadow-inner">
                   <div className="w-12 h-12 rounded-full bg-[var(--color-accent-emerald)]/20 flex items-center justify-center relative shadow-[0_0_20px_rgba(0,230,118,0.2)] shrink-0">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-emerald)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                   </div>
                   <div>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Average Offer</p>
                     <p className="text-2xl font-heading font-black text-white leading-none">$4,500 <span className="text-xs text-gray-400">USD</span></p>
                   </div>
                 </div>

                {/* Input Simulator */}
                <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Quick Identification</label>
                   <div className="relative flex items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                     <input 
                       readOnly
                       type="text"
                       placeholder="Year, Make or Model..."
                       onClick={handleOpenModal}
                       className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[var(--color-accent-emerald)] transition-colors cursor-pointer hover:bg-white/10"
                     />
                   </div>
                </div>

                {/* CTA Engine */}
                 <button 
                   ref={buttonRef}
                   onClick={handleOpenModal}
                   className="w-full relative px-6 py-3 bg-[var(--color-accent-emerald)] border border-[#00E676]/50 rounded-lg flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,230,118,0.2)] hover:shadow-[0_0_40px_rgba(0,230,118,0.4)] transition-all duration-300 hover:-translate-y-1"
                 >
                   <span className="relative z-10 text-[#050608] font-heading font-black uppercase text-sm tracking-widest flex items-center gap-3">
                     Get Quote Now
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                   </span>
                 </button>

             </div>

           </div>
        </div>

      </div>
    </section>
  );
};
