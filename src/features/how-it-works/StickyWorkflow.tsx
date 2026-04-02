import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: "REQUEST A QUOTE",
    description: "Provide your basic car details (VIN or Year/Make/Model) along with a quick description of the condition. It takes less than 2 minutes.",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "ACCEPT UNBEATABLE OFFER",
    description: "Our local network of buyers competes to give you the highest cash offer. No haggling, no lowballing, just a fair price instantly.",
    image: "https://images.unsplash.com/photo-1560250056-07f7c4db9ce3?q=80&w=2070&auto=format&fit=crop" // Calculator/Money
  },
  {
    id: 3,
    title: "GET PAID ON THE SPOT",
    description: "Accept the offer, and we'll schedule a 100% free nationwide pick-up. Our driver hands you the payment right as we load the car.",
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
    
    // We pin the entire container or just the visual side
    // With grid layout, it's easier to pin the left side container
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftVisualRef.current,
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
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[var(--color-base)] min-h-screen">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 relative h-full">
        
        {/* Left Side (Pinned) */}
        <div 
          ref={leftVisualRef}
          className="hidden lg:flex h-screen sticky top-0 bg-black items-center justify-center p-12 relative overflow-hidden"
        >
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[var(--color-base)] to-transparent z-10 pointer-events-none" />
          
          {/* Images representing the process */}
          <div className="relative w-full h-[70vh] max-h-[800px] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center ${
                  activeIndex === index ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[1.05] blur-md'
                }`}
              >
                 <img src={step.image} alt={step.title} className="max-w-none w-full h-full object-cover origin-center transform transition-transform duration-[10s] hover:scale-110 object-center mix-blend-luminosity opacity-60" />
                 {/* Color tint overlay */}
                 <div className="absolute inset-0 bg-[var(--color-accent-blue)] mix-blend-overlay opacity-20"></div>
                 {/* Vignette */}
                 <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side (Scrolling content) */}
        <div ref={rightTextRef} className="py-[10vh] px-8 lg:py-[20vh] lg:px-24">
          <div className="mb-24 lg:mb-32">
            <h2 className="text-sm font-bold tracking-widest text-[var(--color-accent-blue)] uppercase mb-4 font-heading">How it works</h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black uppercase tracking-[-0.03em] leading-tight text-white">
              A frictionless process built for <span className="text-white bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent-blue)] to-white">speed.</span>
            </h3>
          </div>

          <div className="space-y-[30vh]">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className="step-block transition-opacity duration-500"
                style={{ opacity: activeIndex === index ? 1 : 0.3 }}
              >
                <div className="text-5xl lg:text-6xl font-heading font-black text-[var(--color-accent-blue)] opacity-40 mb-6">
                  0{step.id}
                </div>
                <h4 className="text-2xl lg:text-3xl font-heading font-black uppercase tracking-[-0.02em] mb-6 text-white">{step.title}</h4>
                <p className="text-lg text-gray-400 font-body leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Spacer to allow scrolling past the last item */}
          <div className="h-[30vh]"></div>
        </div>

      </div>
    </section>
  );
};
