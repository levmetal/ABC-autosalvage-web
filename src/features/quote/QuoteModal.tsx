import React, { useEffect, useState, useRef } from 'react';
import { X, Search, ChevronRight, CheckCircle } from 'lucide-react';

type SearchMethod = 'vin' | 'ymm';
type Step = 'initial' | 'details' | 'success';

export const QuoteModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('initial');
  const [method, setMethod] = useState<SearchMethod>('ymm');

  const [vin, setVin] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [mileage, setMileage] = useState('');
  const [condition, setCondition] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };
    
    const handleClose = () => {
      setIsOpen(false);
      document.body.style.overflow = '';
      // Optional: reset state on close
      // setStep('initial'); 
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('open-quote-modal', handleOpen);
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('open-quote-modal', handleOpen);
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#050608]/90 backdrop-blur-2xl animate-in fade-in duration-300">
      
      {/* Background glow for immersion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[var(--color-accent-emerald)] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <button 
        onClick={() => { setIsOpen(false); document.body.style.overflow = ''; }}
        className="absolute top-4 right-4 lg:top-8 lg:right-8 text-gray-500 hover:text-white transition-colors z-50 p-1.5 rounded-full hover:bg-white/10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* The Typeform-style elegant container */}
      <div ref={modalRef} className="w-full max-w-2xl mx-auto relative z-10 animate-in zoom-in-95 duration-500">
        
        <div className="mb-8 text-center lg:text-left">
          <h2 className="text-lg lg:text-xl font-heading font-black uppercase tracking-tight text-white mb-3">
            {step === 'initial' && 'Identify Vehicle'}
            {step === 'details' && 'Condition Report'}
            {step === 'success' && 'Valuation Complete'}
          </h2>
          <div className="w-12 h-1 bg-[var(--color-accent-emerald)] mx-auto lg:mx-0"></div>
        </div>

        {step === 'initial' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            
            <div className="flex gap-1.5 mb-8 bg-black/50 p-1 rounded-xl border border-white/5 max-w-[320px] mx-auto lg:mx-0">
              <button 
                onClick={() => setMethod('ymm')}
                className={`flex-1 py-2 text-[10px] font-bold tracking-wider uppercase transition-all rounded-lg ${method === 'ymm' ? 'bg-[var(--color-base-surface)] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                By Model
              </button>
              <button 
                onClick={() => setMethod('vin')}
                className={`flex-1 py-2 text-[10px] font-bold tracking-wider uppercase transition-all rounded-lg ${method === 'vin' ? 'bg-[var(--color-base-surface)] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                By VIN
              </button>
            </div>

            <div className="flex flex-col gap-6 lg:gap-8">
              {method === 'ymm' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
                  <div className="flex flex-col gap-2.5 relative group">
                    <label htmlFor="year" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[var(--color-accent-emerald)] transition-colors">Production Year</label>
                    <select 
                      id="year"
                      value={year} onChange={(e) => setYear(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-base lg:text-lg font-heading font-bold text-white hover:border-white/40 focus:border-[var(--color-accent-emerald)] focus:outline-none appearance-none transition-colors"
                    >
                      <option value="" disabled className="bg-[#0a0c10] text-sm lg:text-base">Select Year</option>
                      {years.map(y => <option key={y} value={y} className="bg-[#0a0c10] text-sm lg:text-base">{y}</option>)}
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-2.5 relative group">
                    <label htmlFor="make" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[var(--color-accent-emerald)] transition-colors">Manufacturer</label>
                    <select 
                      id="make"
                      value={make} onChange={(e) => setMake(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-base lg:text-lg font-heading font-bold text-white hover:border-white/40 focus:border-[var(--color-accent-emerald)] focus:outline-none appearance-none transition-colors"
                    >
                      <option value="" disabled className="bg-[#0a0c10] text-sm lg:text-base">Select Make</option>
                      <option value="toyota" className="bg-[#0a0c10] text-sm lg:text-base">Toyota</option>
                      <option value="honda" className="bg-[#0a0c10] text-sm lg:text-base">Honda</option>
                      <option value="ford" className="bg-[#0a0c10] text-sm lg:text-base">Ford</option>
                      <option value="chevrolet" className="bg-[#0a0c10] text-sm lg:text-base">Chevrolet</option>
                      <option value="other" className="bg-[#0a0c10] text-sm lg:text-base">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2.5 relative group sm:col-span-2">
                    <label htmlFor="model" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[var(--color-accent-emerald)] transition-colors">Model Designation</label>
                    <select 
                      id="model"
                      value={model} onChange={(e) => setModel(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-base lg:text-lg font-heading font-bold text-white hover:border-white/40 focus:border-[var(--color-accent-emerald)] focus:outline-none appearance-none transition-colors cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#0a0c10] text-sm lg:text-base">Select Model</option>
                      <option value="camry" className="bg-[#0a0c10] text-sm lg:text-base">Camry</option>
                      <option value="civic" className="bg-[#0a0c10] text-sm lg:text-base">Civic</option>
                      <option value="f150" className="bg-[#0a0c10] text-sm lg:text-base">F-150</option>
                      <option value="other" className="bg-[#0a0c10] text-sm lg:text-base">Other</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 relative group">
                  <label htmlFor="vin" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[var(--color-accent-emerald)] transition-colors">Vehicle ID Number (VIN)</label>
                  <div className="relative">
                    <Search aria-hidden="true" className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[var(--color-accent-emerald)] transition-colors" />
                    <input 
                      id="vin"
                      type="text" 
                      placeholder="Enter 17-digit code" 
                      value={vin}
                      onChange={(e) => setVin(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 pl-8 lg:pl-10 pb-2 text-base lg:text-lg font-heading font-bold text-white placeholder-gray-600 focus:border-[var(--color-accent-emerald)] focus:outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 relative group max-w-[200px]">
                <label htmlFor="zip" className="text-sm font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-[var(--color-accent-emerald)] transition-colors">Postal Code</label>
                <input 
                  id="zip"
                  type="text" 
                  placeholder="e.g. 10001" 
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-lg lg:text-xl font-heading font-bold text-white placeholder-gray-500 focus:border-[var(--color-accent-emerald)] focus:outline-none transition-all"
                />
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => setStep('details')}
                  disabled={method === 'ymm' ? (!year || !make || !model || !zipCode) : (!vin || !zipCode)}
                  className="group relative overflow-hidden bg-[var(--color-base-surface)] border border-[var(--color-accent-emerald)] w-full sm:w-auto px-8 py-3.5 rounded-full inline-flex justify-center items-center gap-3 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="absolute inset-0 bg-[var(--color-accent-emerald)] scale-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-[2.5]"></span>
                  <span className="relative z-10 font-heading font-black uppercase tracking-tight text-base text-[var(--color-accent-emerald)] group-hover:text-black transition-colors duration-300">
                    Continue to Condition
                  </span>
                  <ChevronRight className="relative z-10 w-5 h-5 text-[var(--color-accent-emerald)] group-hover:text-black group-hover:translate-x-1.5 transition-all duration-300" />
                </button>
                <p className="text-xs font-bold text-gray-400 lg:text-left text-center leading-relaxed mt-4 uppercase tracking-wider">
                  Pressing continue secures your algorithmic valuation framework.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-2.5 relative group">
                <label htmlFor="mileage" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[var(--color-accent-emerald)] transition-colors">Odometer Reading</label>
                <input 
                  id="mileage"
                  type="number" 
                  placeholder="0" 
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-xl lg:text-2xl font-heading font-black text-white placeholder-gray-600 focus:border-[var(--color-accent-emerald)] focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2.5 relative group">
                <label htmlFor="condition" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[var(--color-accent-emerald)] transition-colors">Vehicle Condition Status</label>
                <select 
                  id="condition"
                  value={condition} 
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-sm lg:text-base font-heading font-bold text-white focus:border-[var(--color-accent-emerald)] focus:outline-none appearance-none transition-colors"
                >
                  <option value="" disabled className="bg-[#0a0c10] text-[11px] lg:text-xs">Select operational status</option>
                  <option value="runs" className="bg-[#0a0c10] text-[11px] lg:text-xs">Runs and Drives Perfectly</option>
                  <option value="starts" className="bg-[#0a0c10] text-[11px] lg:text-xs">Starts but cannot be driven</option>
                  <option value="dead" className="bg-[#0a0c10] text-[11px] lg:text-xs">Severe Mechanical Failure / Doesn't Start</option>
                  <option value="wrecked" className="bg-[#0a0c10] text-[11px] lg:text-xs">Wrecked / Total Loss</option>
                </select>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center">
                <button 
                  onClick={() => setStep('initial')}
                  className="w-full sm:w-auto px-6 py-4 rounded-full border border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all font-heading font-bold uppercase tracking-wider text-xs"
                >
                  Go Back
                </button>
                <button 
                  onClick={() => setStep('success')}
                  disabled={!mileage || !condition}
                  className="group relative overflow-hidden bg-[var(--color-accent-emerald)] w-full sm:flex-1 px-8 py-4 rounded-full inline-flex justify-center items-center transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(0,230,118,0.2)] hover:shadow-[0_0_40px_rgba(0,230,118,0.4)]"
                >
                  <span className="relative z-10 font-heading font-black uppercase tracking-tight text-base text-black">
                    Submit Valuation Engine
                  </span>
                  <CheckCircle className="relative z-10 w-5 h-5 ml-2.5 text-black opacity-80" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="py-16 animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-[var(--color-accent-emerald)]/10 rounded-full flex items-center justify-center mb-10 border border-[var(--color-accent-emerald)]/50">
                 <CheckCircle className="w-12 h-12 lg:w-16 lg:h-16 text-[var(--color-accent-emerald)] shadow-[0_0_30px_rgba(0,230,118,0.5)] rounded-full animate-pulse" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-heading font-black uppercase tracking-tight text-white mb-6">Valuation Triggered</h3>
              <p className="text-lg lg:text-xl font-body text-gray-400 leading-relaxed max-w-lg">
                Our algorithmic engine has compiled your data. A senior specialist will call you in exactly <span className="text-white font-bold">90 seconds</span> to finalize logistics.
              </p>
              <button 
                onClick={() => { setIsOpen(false); setStep('initial'); document.body.style.overflow = ''; }}
                className="mt-12 text-[var(--color-accent-emerald)] hover:text-white transition-colors font-heading font-bold uppercase tracking-widest text-lg border-b-2 border-[var(--color-accent-emerald)] hover:border-white pb-2"
              >
                Close Engine Dashboard
              </button>
          </div>
        )}

      </div>
    </div>
  );
};
