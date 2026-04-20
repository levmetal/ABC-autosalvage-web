import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const vehicles = [
  {
    id: 1,
    title: "Total Loss / Wrecked",
    description: "Major collision damage? Framework bent? We'll safely tow it away for free and hand you cash.",
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=400&auto=format&fit=crop", // Crashed car style
    badge: "Maximum Payout"
  },
  {
    id: 2,
    title: "Mechanical Failure",
    description: "Blown engine? Broken transmission? Don't pay for ridiculous repairs. Sell it as-is.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=400&auto=format&fit=crop", // Engine/mechanic
    badge: "As Is"
  },
  {
    id: 3,
    title: "High Mileage",
    description: "If the odometer is maxed out but it still runs (or barely does), we're buying.",
    image: "https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?q=80&w=400&auto=format&fit=crop", // Dashboard speedometer
    badge: "Any Mileage"
  },
  {
    id: 4,
    title: "Classic & Projects",
    description: "That restoration project you never finished is still worth top dollar to our network.",
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=400&auto=format&fit=crop", // Classic car
    badge: "Collector Value"
  },
  {
    id: 5,
    title: "Used / Good Condition",
    description: "Ready to upgrade? We pay a premium for running cars in good condition, faster than a dealership.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=400&auto=format&fit=crop", // Clean sports/sedan car
    badge: "Premium Offer"
  }
];

export const VehicleCarousel3D: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const totalCards = cards.length;
    
    // Set initial 3D transform style on container
    gsap.set(containerRef.current, { perspective: 1200, transformStyle: "preserve-3d" });

    // Function to calculate and apply transforms based on progress
    const updateCards = (progress: number) => {
      // Progress from 0 to 1 mapped to the center index
      const activeIndexVirtual = progress * (totalCards - 1);

      cards.forEach((card, index) => {
        // Distance from the currently active index
        const offset = index - activeIndexVirtual;
        
        // Mathematical calculations for 3D Cover Flow
        const scale = Math.max(0.6, 1 - Math.abs(offset) * 0.15);
        const rotateY = offset === 0 ? 0 : (offset > 0 ? -35 : 35); 
        const translateZ = -Math.abs(offset) * 200;
        
        // Ensure proper overlapping distance across devices
        // Base distance 220px, can be adjusted for mobile manually
        const mediaQueryFactor = window.innerWidth < 768 ? 140 : 180;
        const translateX = offset * mediaQueryFactor;

        const zIndex = 100 - Math.abs(Math.round(offset * 10));
        const opacity = Math.abs(offset) > 2.5 ? 0 : 1 - (Math.abs(offset) * 0.2); 

        gsap.to(card, {
          x: translateX,
          z: translateZ,
          rotationY: rotateY,
          scale: scale,
          opacity: opacity,
          zIndex: zIndex,
          duration: 0.5,
          ease: "power2.out",
          force3D: true,
        });

        // Dimmer the images when not active
        const overlay = card.querySelector('.card-overlay') as HTMLElement;
        if(overlay) {
             gsap.to(overlay, {
               opacity: Math.abs(offset) < 0.5 ? 0 : 0.6,
               duration: 0.5
             });
        }
      });
    };

    // Initial positioning
    updateCards(0);

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom", 
      pin: containerRef.current,
      scrub: 1, // Smooth scrub for Apple-like virtual scroll
      onUpdate: (self) => {
        updateCards(self.progress);
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="inventory" className="h-[200vh] md:h-[350vh] bg-[#050608] relative">
      <div 
        ref={containerRef} 
        className="h-screen w-full sticky top-0 flex flex-col items-center justify-start pt-28 md:pt-16 overflow-hidden"
      >
        {/* Background Ambient */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[var(--color-primary)] rounded-full blur-[200px] opacity-[0.05] pointer-events-none"></div>

        {/* Section Header */}
        <div className="relative z-50 text-center px-4 mb-4 md:mb-8 pointer-events-none">
           <h2 className="text-[10px] font-bold tracking-widest text-[var(--color-primary)] uppercase mb-2 font-heading">What We Buy</h2>
           <h3 className="text-xl md:text-3xl lg:text-4xl font-heading font-black uppercase tracking-tight text-white leading-tight">
             If it has an engine, <br className="hidden md:block" />
             <span className="text-gray-400 line-through decoration-[var(--color-primary)] decoration-4 mr-2">we want it.</span>
             <span className="text-white">we'll buy it.</span>
           </h3>
        </div>

        {/* 3D Carousel Stage - Heavily adjusted for miniaturization */}
        <div className="relative w-full max-w-[1200px] h-[450px] md:h-[500px] flex items-center justify-center mt-2 md:mt-2" style={{ perspective: '1200px' }}>
          {vehicles.map((vehicle, i) => (
            <div 
              key={vehicle.id}
              ref={el => { cardsRef.current[i] = el; }}
              onClick={() => window.dispatchEvent(new CustomEvent('open-quote-modal'))}
              className="absolute w-[240px] sm:w-[280px] aspect-[3/4.5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col bg-black will-change-transform cursor-pointer group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image */}
              <div className="absolute inset-0 z-0 bg-[#111]">
                {/* Adding a loading fallback color before image loads */}
                <img 
                  src={vehicle.image} 
                  alt={vehicle.title} 
                  width="400"
                  height="600"
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 opacity-70 group-hover:opacity-100 group-hover:scale-105" 
                  loading="lazy" 
                />
                {/* Emerald Overlay */}
                <div className="absolute inset-0 bg-[var(--color-primary)] mix-blend-overlay opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
                
                {/* Active/Inactive DimOverlay handled by GSAP */}
                <div className="absolute inset-0 bg-black/60 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              </div>

              {/* Badges */}
              <div className="relative z-10 flex justify-between p-6 transform-translate-z-10">
                 <span className="bg-[var(--color-primary)] text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full self-start shadow-[0_0_20px_rgba(255,95,0,0.3)]">
                    {vehicle.badge}
                 </span>
                 <span className="text-white/20 text-4xl font-heading font-black">0{vehicle.id}</span>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-auto p-5 md:p-6 transform-translate-z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
                <h4 className="text-lg md:text-xl lg:text-2xl font-heading font-black uppercase tracking-tight text-white mb-1.5 md:mb-2 drop-shadow-md">{vehicle.title}</h4>
                <p className="text-[11px] md:text-xs text-gray-400 font-body leading-relaxed md:max-w-[95%]">
                  {vehicle.description}
                </p>
                
                <div className="mt-4 md:mt-6 flex items-center gap-2 text-[var(--color-primary)] font-bold uppercase tracking-widest text-[#FF5F00] group-hover:text-white transition-colors duration-300">
                  <span className="text-[10px] md:text-xs">Get Value</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-2 transition-transform duration-300"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
           <span className="text-[9px] text-white font-bold uppercase tracking-[0.3em] mb-3">Scroll</span>
           <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>

      </div>
    </section>
  );
};
