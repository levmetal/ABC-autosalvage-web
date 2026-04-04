import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    letter: "A",
    title: "Ask for a Quote",
    description: "Request in seconds. Provide your VIN or Year/Make/Model and a brief description. No paperwork, no headaches—just the facts to get you started.",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025&auto=format&fit=crop"
  },
  {
    id: 2,
    letter: "B",
    title: "Best Offer Guaranteed",
    description: "Beats the competition. Our local network competes to give you the highest cash offer instantly. No haggling, no lowballing, just the Best price on the table.",
    image: "https://images.unsplash.com/photo-1560250056-07f7c4db9ce3?q=80&w=2070&auto=format&fit=crop" // Calculator/Money
  },
  {
    id: 3,
    letter: "C",
    title: "Cash on the Spot",
    description: "Collect your payment. We schedule a 100% free nationwide pick-up. Our driver hands you the money right as we load the car. Cash in hand, car out of sight.",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop" // Keys driving Handshake
  }
];

export const StickyWorkflow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftVisualRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Create ScrollTriggers for each text block
    const textBlocks = gsap.utils.toArray<HTMLElement>('.step-block');
    
    // Pinning the visual side
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftVisualRef.current,
    });

    // Animate the progress line height seamlessly from first to last badge
    gsap.to('.progress-line-inner', {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.step-block:first-child',
        endTrigger: '.step-block:last-child',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      }
    });

    textBlocks.forEach((block, index) => {
      ScrollTrigger.create({
        trigger: block,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    return () => {
      // Revert GSAP animations and kill only the ScrollTriggers created in this component
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === containerRef.current || t.vars.trigger === rightTextRef.current || (t.vars.trigger as string)?.includes('step-block')) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[var(--color-base)] min-h-screen">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 relative h-full">
        
        {/* Left Side (Pinned) */}
        <div 
          ref={leftVisualRef}
          className="hidden lg:flex h-screen sticky top-0 bg-black items-center justify-center p-8 xl:p-12 relative overflow-hidden"
        >
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[var(--color-base)] to-transparent z-10 pointer-events-none" />
          
          {/* Images representing the process */}
          <div className="relative w-full h-[55vh] max-h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center ${
                  activeIndex === index ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[1.05] blur-lg'
                }`}
              >
                 <img src={step.image} alt={step.title} className="max-w-none w-full h-full object-cover origin-center transform transition-transform duration-[10s] hover:scale-110 object-center mix-blend-luminosity opacity-60" />
                 {/* Color tint overlay */}
                 <div className="absolute inset-0 bg-[var(--color-accent-emerald)] mix-blend-overlay opacity-20"></div>
                 {/* Vignette */}
                 <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side (Scrolling content) */}
        <div ref={rightTextRef} className="py-12 px-6 sm:px-12 lg:py-24 lg:px-16">
          <div className="mb-16 lg:mb-24">
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-accent-emerald)] uppercase mb-3 font-heading">How it works</h2>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-black uppercase tracking-tight leading-tight text-white italic mb-4">
              The ABC of <span className="text-white bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent-emerald)] to-white">Selling Your Car.</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-body uppercase tracking-widest font-bold">As simple as A-B-C.</p>
          </div>

          <div className="space-y-[12vh] sm:space-y-[15vh] relative">
            
            {/* Robust Vertical Progress Line Container - Simplified z-index & positioning */}
            <div className="absolute left-6 w-[2px] top-6 bottom-6 bg-white/5 z-0">
               <div className="progress-line-inner w-full h-0 bg-[var(--color-accent-emerald)] origin-top shadow-[0_0_15px_rgba(0,230,118,0.5)]" />
            </div>

            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className="step-block transition-all duration-700 relative z-10 flex gap-6 sm:gap-10 items-start"
                style={{ 
                  opacity: activeIndex === index ? 1 : 0.20
                }}
              >
                {/* Step Badge - Perfectly aligned, z-index 20 keeps it in front */}
                <div className="shrink-0 flex items-center justify-center w-12 h-12 relative z-20">
                  <div className={`relative shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-500 bg-[var(--color-base)] ${
                    activeIndex === index 
                      ? 'bg-[var(--color-accent-emerald)]/10 border-[var(--color-accent-emerald)] shadow-[0_0_20px_rgba(0,230,118,0.3)] scale-110' 
                      : 'border-white/10'
                  }`}>
                    <span className={`text-lg sm:text-xl font-heading font-black relative z-30 ${activeIndex === index ? 'text-[var(--color-accent-emerald)]' : 'text-white/20'}`}>
                      {step.letter}
                    </span>
                    
                    {/* Miniature index - Fixed relative to badge */}
                    <span className="absolute -bottom-1 -right-1 text-[7px] sm:text-[8px] font-black bg-black border border-white/10 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-white/40 z-30">
                      0{step.id}
                    </span>
                  </div>
                </div>

                <div className="pt-2 sm:pt-3 transition-transform duration-500" style={{ transform: activeIndex === index ? 'translateX(10px)' : 'translateX(0)' }}>
                  <h4 className="text-lg sm:text-xl lg:text-2xl font-heading font-black uppercase tracking-tight mb-3 text-white">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-body leading-relaxed max-w-[280px] sm:max-w-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Spacer to allow scrolling past the last item */}
          <div className="h-[25vh]"></div>
        </div>

      </div>
    </section>
  );
};
