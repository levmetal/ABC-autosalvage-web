import React, { useRef } from 'react';
import gsap from 'gsap';

interface CardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
  delay?: number;
}

const MagneticCard: React.FC<CardProps> = ({ title, description, icon, className = "", delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    // Get dimensions and center
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation limits (max 10 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div 
      className={`relative rounded-3xl overflow-hidden bg-[var(--color-base-surface)] border border-white/5 cursor-pointer flex flex-col justify-between p-8 group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-blue)]/0 to-[var(--color-accent-blue)]/0 group-hover:from-[var(--color-accent-blue)]/10 group-hover:to-transparent transition-colors duration-500 pointer-events-none"></div>
      
      <div className="text-6xl mb-12 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500 origin-bottom-left">
        {icon}
      </div>
      <div>
        <h4 className="text-2xl font-heading font-black uppercase tracking-tight text-white mb-2">{title}</h4>
        <p className="text-gray-400 font-body leading-relaxed max-w-[90%]">
          {description}
        </p>
      </div>
    </div>
  );
};

export const ReverseCatalogGrid: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#0B0E14] relative overflow-hidden">
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-[var(--color-accent-blue)] uppercase mb-4">What We Buy</h2>
          <h3 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tight text-white mb-6 leading-[1.1]">
            If it has an engine, <br className="hidden md:block" />
            <span className="text-gray-500 line-through decoration-[var(--color-accent-blue)] decoration-4">we want it.</span> we'll buy it.
          </h3>
          <p className="text-xl text-gray-400">
            From vintage classics gathering dust to total losses from serious collisions, we see the absolute maximum value in every chassis.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 auto-rows-[300px]">
          
          <MagneticCard 
            title="Total Loss / Wrecked"
            description="Major collision damage? Framework bent? We'll safely tow it away for free and hand you cash."
            icon="💥"
            className="md:col-span-2 md:row-span-1 border-t-[3px] border-t-[var(--color-accent-blue)]"
          />
          
          <MagneticCard 
            title="Mechanical Failure"
            description="Blown engine? Broken transmission? Don't pay for ridiculous repairs. Sell it as-is."
            icon="⚙️"
            className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-[#141822] to-black"
          />
          
          <MagneticCard 
            title="Classic & Projects"
            description="That restoration project you never finished is still worth top dollar to our network."
            icon="⚡"
            className="md:col-span-1 md:row-span-1"
          />

          <MagneticCard 
            title="High Mileage"
            description="If the odometer is maxed out but it still runs (or barely does), we're buying."
            icon="🛣️"
            className="md:col-span-1 md:row-span-1"
          />

        </div>
      </div>
    </section>
  );
};
