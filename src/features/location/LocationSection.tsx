import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactDetails = [
  {
    icon: MapPin,
    label: 'Address',
    value: '15346 Blue Star Hwy, Stony Creek, VA 23882',
    href: 'https://www.google.com/maps/search/?api=1&query=15346+Blue+Star+Hwy+Stony+Creek+VA+23882',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(757) 633-1779',
    href: 'tel:17576331779',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'Angel@abc-autosalvage.com',
    href: 'mailto:Angel@abc-autosalvage.com',
  },
];



// Fallback: use a simple search-based embed (no API key needed)
const MAPS_SEARCH_URL =
  'https://maps.google.com/maps?q=15346+Blue+Star+Hwy,+Stony+Creek,+VA+23882&t=&z=14&ie=UTF8&iwloc=&output=embed';

export const LocationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the contact card
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate the map container with slight delay
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="location"
      className="relative bg-[var(--color-base)] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 overflow-hidden"
    >
      {/* Ambient emerald glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[var(--color-accent-emerald)] rounded-full blur-[200px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center lg:text-left">
          <h2 className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-accent-emerald)] uppercase mb-3 font-heading">
            Find Us
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-black uppercase tracking-tight leading-tight text-white italic">
            Your Local Junkyard,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent-emerald)] to-white">
              Reinvented.
            </span>
          </h3>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info Card */}
          <div
            ref={cardRef}
            className="bg-[var(--color-base-surface)] border border-[var(--color-base-border)] rounded-2xl p-8 sm:p-10 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {contactDetails.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === 'Address' ? '_blank' : undefined}
                  rel={item.label === 'Address' ? 'noopener noreferrer' : undefined}
                  className="group flex items-start gap-5 p-4 rounded-xl border border-white/5 bg-white/[0.05] hover:border-[var(--color-accent-emerald)]/50 transition-all duration-300"
                >
                  {/* Icon Badge */}
                  <div className="shrink-0 w-11 h-11 rounded-full bg-[var(--color-accent-emerald)]/10 border border-[var(--color-accent-emerald)]/20 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,230,118,0.2)] transition-shadow duration-300">
                    <item.icon className="w-5 h-5 text-[var(--color-accent-emerald)]" />
                  </div>

                  {/* Text */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-200 block mb-1">
                      {item.label}
                    </span>
                    <span 
                      className="text-sm sm:text-base font-body font-black group-hover:text-[var(--color-accent-emerald)] transition-colors duration-300"
                      style={{ color: '#FFFFFF' }}
                    >
                      {item.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Get Directions CTA */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=15346+Blue+Star+Hwy+Stony+Creek+VA+23882"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center justify-center gap-3 px-8 py-4 border border-[var(--color-accent-emerald)]/30 rounded-full hover:bg-[var(--color-accent-emerald)]/10 hover:border-[var(--color-accent-emerald)] transition-all duration-300 self-start sm:self-center lg:self-start w-full sm:w-auto"
            >
              <span className="text-sm font-heading font-bold uppercase tracking-widest text-[var(--color-accent-emerald)]">
                Get Directions
              </span>
              <ExternalLink className="w-4 h-4 text-[var(--color-accent-emerald)] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>

          {/* Map Container */}
          <div
            ref={mapRef}
            className="relative group rounded-2xl overflow-hidden border border-white/5 hover:border-[var(--color-accent-emerald)]/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] min-h-[350px] sm:min-h-[400px] lg:min-h-0"
          >
            {/* Emerald tint overlay - restored for brand alignment */}
            <div className="absolute inset-0 bg-[var(--color-accent-emerald)] mix-blend-overlay opacity-10 pointer-events-none z-10 group-hover:opacity-15 transition-opacity duration-500" />

            {/* Top gradient fade */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[var(--color-base)] to-transparent z-10 pointer-events-none" />

            {/* Bottom gradient fade */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--color-base)] to-transparent z-10 pointer-events-none" />

            {/* Google Maps Embed */}
            <iframe
              src={MAPS_SEARCH_URL}
              width="100%"
              height="100%"
              style={{ 
                border: 0, 
                minHeight: '400px', 
                filter: 'grayscale(0.5) invert(0.9) hue-rotate(110deg) saturate(2) brightness(1.1) contrast(1.1)' 
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ABC Autosalvage Location - 15346 Blue Star Hwy, Stony Creek, VA 23882"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
