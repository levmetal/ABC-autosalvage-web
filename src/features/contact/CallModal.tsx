import React, { useEffect, useState, useRef } from 'react';
import { X, Phone, Copy, Check, MessageSquare } from 'lucide-react';

export const CallModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const phoneNumber = "(919) 437-8198";
  const rawNumber = "19194378198";

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };
    
    const handleClose = () => {
      setIsOpen(false);
      document.body.style.overflow = '';
      setCopied(false);
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('open-call-modal', handleOpen);
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('open-call-modal', handleOpen);
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop with intense blur */}
      <div 
        className="absolute inset-0 bg-[#050608]/80 backdrop-blur-2xl animate-in fade-in duration-500" 
        onClick={handleClose}
      />
      
      {/* Background glow for immersion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-[var(--color-primary)] rounded-full blur-[120px] opacity-20 pointer-events-none animate-pulse"></div>

      {/* Modal Container */}
      <div 
        ref={modalRef} 
        className="w-full max-w-sm mx-auto relative z-10 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500"
      >
        <div className="bg-[var(--color-base-surface)] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="relative p-6 pb-0 flex justify-between items-start">
             <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center border border-[var(--color-primary)]/20">
                <Phone className="w-5 h-5 text-[var(--color-primary)]" />
             </div>
             <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 text-center pt-4">
            <h3 className="text-sm font-heading font-black uppercase tracking-[0.2em] text-[var(--color-primary)] mb-2">Our Hotline is Open</h3>
            <p className="text-gray-400 text-xs mb-8 leading-relaxed px-4">
              Speak directly with our team for an instant offer and free towing consultation.
            </p>

            {/* The Number Display */}
            <div className="relative group mb-8">
              <a 
                href={`tel:${rawNumber}`}
                className="block text-2xl sm:text-3xl font-heading font-black tracking-tight text-white hover:text-[var(--color-primary)] transition-colors mb-2"
              >
                {phoneNumber}
              </a>
              <div className="h-0.5 w-12 bg-[var(--color-primary)] mx-auto rounded-full group-hover:w-24 transition-all duration-500"></div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleCopy}
                className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl border transition-all duration-300 font-heading font-bold uppercase tracking-widest text-[10px] ${
                  copied 
                    ? 'bg-green-500/10 border-green-500 text-green-500' 
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Number Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Phone Number
                  </>
                )}
              </button>

              <a 
                href={`https://wa.me/${rawNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[var(--color-primary)] text-black font-heading font-bold uppercase tracking-widest text-[10px] hover:shadow-[0_0_20px_rgba(255,95,0,0.3)] hover:scale-[1.02] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Message on WhatsApp
              </a>
            </div>

            <p className="mt-8 text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">
              Available 24/7 for Car Recoveries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
