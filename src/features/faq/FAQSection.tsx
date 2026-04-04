import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Do I need the title to sell my car?",
    answer: "In most cases, no. We can work with you even if you've lost the title. We'll help you through the process with a simple affidavit or duplicate title application depending on your state. Contact us and we'll figure it out together."
  },
  {
    question: "Is the tow truck really free?",
    answer: "100% free. We never charge for pick-up, no matter where you are in the continental US. Our driver comes to you, loads the vehicle, and hands you cash — zero hidden fees, zero surprises."
  },
  {
    question: "What if my car doesn't run or has no keys?",
    answer: "No problem at all. We buy vehicles in any condition — no keys, flat tires, dead battery, engine seized, flood damage, you name it. If it has a VIN, we'll make you an offer."
  },
  {
    question: "How fast can I get paid?",
    answer: "Most customers get paid within 24–48 hours of accepting our offer. In many cases, we can schedule same-day pick-up and payment. Cash in hand, car out of sight."
  },
  {
    question: "How is my offer calculated?",
    answer: "We evaluate your vehicle based on its year, make, model, condition, mileage, and current scrap metal market rates. Our local network of buyers competes for your car, ensuring you get the highest possible price."
  },
  {
    question: "Do you buy cars that have been in a major accident?",
    answer: "Absolutely. Wrecked, totaled, collision damage, frame damage — we buy it all. These vehicles still have significant value in parts and materials, and we'll give you a fair cash offer regardless."
  }
];

export const FAQSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative bg-[var(--color-base)] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[var(--color-accent-emerald)] rounded-full blur-[200px] opacity-[0.03] pointer-events-none" />

      <div ref={contentRef} className="max-w-[900px] mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-accent-emerald)] uppercase mb-3 font-heading">
            FAQ
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-black uppercase tracking-tight leading-tight text-white italic">
            Questions?{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent-emerald)] to-white">
              We've Got Answers.
            </span>
          </h3>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl transition-all duration-300 relative overflow-hidden ${
                openIndex === index
                  ? 'border-[var(--color-accent-emerald)]/60 bg-[var(--color-base-surface)] shadow-[0_0_20px_rgba(0,230,118,0.1)]'
                  : 'border-white/10 hover:border-[var(--color-accent-emerald)]/50 bg-white/[0.02] hover:bg-white/[0.05]'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer group z-10 relative"
                aria-expanded={openIndex === index}
              >
                <span 
                  className="text-sm sm:text-base font-heading font-black uppercase tracking-tight pr-4 transition-colors duration-300"
                  style={{ color: openIndex === index ? 'var(--color-accent-emerald)' : '#FFFFFF' }}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`shrink-0 w-5 h-5 transition-all duration-300 ${
                    openIndex === index
                      ? 'text-[var(--color-accent-emerald)] rotate-180'
                      : 'text-white/40 group-hover:text-[var(--color-accent-emerald)]'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 sm:px-6 pb-6 border-t border-white/5 pt-4">
                  <p className="text-sm font-body leading-relaxed" style={{ color: '#E5E7EB' }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
