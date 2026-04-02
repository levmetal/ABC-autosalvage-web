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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[var(--color-accent-blue)] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <button 
        onClick={() => { setIsOpen(false); document.body.style.overflow = ''; }}
        className="absolute top-6 right-6 lg:top-12 lg:right-12 text-gray-500 hover:text-white transition-colors z-50 p-2 rounded-full hover:bg-white/10"
      >
        <X className="w-8 h-8" />
      </button>

      {/* The Typeform-style elegant container */}
      <div ref={modalRef} className="w-full max-w-2xl mx-auto relative z-10 animate-in zoom-in-95 duration-500">
        
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-2xl lg:text-3xl font-heading font-black uppercase tracking-tight text-white mb-4">
            {step === 'initial' && 'Identify Vehicle'}
            {step === 'details' && 'Condition Report'}
            {step === 'success' && 'Valuation Complete'}
          </h2>
          <div className="w-16 h-1 bg-[var(--color-accent-blue)] mx-auto lg:mx-0"></div>
        </div>

        {step === 'initial' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            
            <div className="flex gap-2 mb-10 bg-black/50 p-1.5 rounded-xl border border-white/5 max-w-sm mx-auto lg:mx-0">
              <button 
                onClick={() => setMethod('ymm')}
                className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase transition-all rounded-lg ${method === 'ymm' ? 'bg-[var(--color-base-surface)] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                By Model
              </button>
              <button 
                onClick={() => setMethod('vin')}
                className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase transition-all rounded-lg ${method === 'vin' ? 'bg-[var(--color-base-surface)] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                By VIN
              </button>
            </div>

            <div className="flex flex-col gap-8 lg:gap-10">
              {method === 'ymm' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                  <div className="flex flex-col gap-3 relative group">
                    <label htmlFor="year" className="text-sm font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-[var(--color-accent-blue)] transition-colors">Production Year</label>
                    <select 
                      id="year"
                      value={year} onChange={(e) => setYear(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-xl lg:text-2xl font-heading font-bold text-white hover:border-white/50 focus:border-[var(--color-accent-blue)] focus:outline-none appearance-none transition-colors"
                    >
                      <option value="" disabled className="bg-[#0a0c10] text-lg lg:text-xl">Select Year</option>
                      {years.map(y => <option key={y} value={y} className="bg-[#0a0c10] text-lg lg:text-xl">{y}</option>)}
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-3 relative group">
                    <label htmlFor="make" className="text-sm font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-[var(--color-accent-blue)] transition-colors">Manufacturer</label>
                    <select 
                      id="make"
                      value={make} onChange={(e) => setMake(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-xl lg:text-2xl font-heading font-bold text-white hover:border-white/50 focus:border-[var(--color-accent-blue)] focus:outline-none appearance-none transition-colors"
                    >
                      <option value="" disabled className="bg-[#0a0c10] text-lg lg:text-xl">Select Make</option>
                      <option value="toyota" className="bg-[#0a0c10] text-lg lg:text-xl">Toyota</option>
                      <option value="honda" className="bg-[#0a0c10] text-lg lg:text-xl">Honda</option>
                      <option value="ford" className="bg-[#0a0c10] text-lg lg:text-xl">Ford</option>
                      <option value="chevrolet" className="bg-[#0a0c10] text-lg lg:text-xl">Chevrolet</option>
                      <option value="other" className="bg-[#0a0c10] text-lg lg:text-xl">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-3 relative group sm:col-span-2">
                    <label htmlFor="model" className="text-sm font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-[var(--color-accent-blue)] transition-colors">Model Designation</label>
                    <select 
                      id="model"
                      value={model} onChange={(e) => setModel(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-xl lg:text-2xl font-heading font-bold text-white hover:border-white/50 focus:border-[var(--color-accent-blue)] focus:outline-none appearance-none transition-colors cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#0a0c10] text-lg lg:text-xl">Select Model</option>
                      <option value="camry" className="bg-[#0a0c10] text-lg lg:text-xl">Camry</option>
                      <option value="civic" className="bg-[#0a0c10] text-lg lg:text-xl">Civic</option>
                      <option value="f150" className="bg-[#0a0c10] text-lg lg:text-xl">F-150</option>
                      <option value="other" className="bg-[#0a0c10] text-lg lg:text-xl">Other</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3 relative group">
                  <label htmlFor="vin" className="text-sm font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-[var(--color-accent-blue)] transition-colors">Vehicle ID Number (VIN)</label>
                  <div className="relative">
                    <Search aria-hidden="true" className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 lg:w-8 lg:h-8 text-gray-500 group-focus-within:text-[var(--color-accent-blue)] transition-colors" />
                    <input 
                      id="vin"
                      type="text" 
                      placeholder="Enter 17-digit code" 
                      value={vin}
                      onChange={(e) => setVin(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-white/20 pl-10 lg:pl-14 pb-3 text-xl lg:text-3xl font-heading font-bold text-white placeholder-gray-500 focus:border-[var(--color-accent-blue)] focus:outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 relative group max-w-[200px]">
                <label htmlFor="zip" className="text-sm font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-[var(--color-accent-blue)] transition-colors">Postal Code</label>
                <input 
                  id="zip"
                  type="text" 
                  placeholder="e.g. 10001" 
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-2xl font-heading font-bold text-white placeholder-gray-500 focus:border-[var(--color-accent-blue)] focus:outline-none transition-all"
                />
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => setStep('details')}
                  disabled={method === 'ymm' ? (!year || !make || !model || !zipCode) : (!vin || !zipCode)}
                  className="group relative overflow-hidden bg-[var(--color-base-surface)] border-2 border-[var(--color-accent-blue)] w-full sm:w-auto px-12 py-5 rounded-full inline-flex justify-center items-center gap-4 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="absolute inset-0 bg-[var(--color-accent-blue)] scale-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-[2]"></span>
                  <span className="relative z-10 font-heading font-black uppercase tracking-tight text-xl text-[var(--color-accent-blue)] group-hover:text-black transition-colors duration-300">
                    Continue to Condition
                  </span>
                  <ChevronRight className="relative z-10 w-6 h-6 text-[var(--color-accent-blue)] group-hover:text-black group-hover:translate-x-2 transition-all duration-300" />
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
              <div className="flex flex-col gap-3 relative group">
                <label htmlFor="mileage" className="text-sm font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-[var(--color-accent-blue)] transition-colors">Odometer Reading</label>
                <input 
                  id="mileage"
                  type="number" 
                  placeholder="0" 
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-3xl lg:text-4xl font-heading font-black text-white placeholder-gray-500 focus:border-[var(--color-accent-blue)] focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-3 relative group">
                <label htmlFor="condition" className="text-sm font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-[var(--color-accent-blue)] transition-colors">Vehicle Condition Status</label>
                <select 
                  id="condition"
                  value={condition} 
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-white/20 pb-4 text-xl lg:text-2xl font-heading font-bold text-white focus:border-[var(--color-accent-blue)] focus:outline-none appearance-none transition-colors"
                >
                  <option value="" disabled className="bg-[#0a0c10] text-lg lg:text-xl">Select operational status</option>
                  <option value="runs" className="bg-[#0a0c10] text-lg lg:text-xl">Runs and Drives Perfectly</option>
                  <option value="starts" className="bg-[#0a0c10] text-lg lg:text-xl">Starts but cannot be driven</option>
                  <option value="dead" className="bg-[#0a0c10] text-lg lg:text-xl">Severe Mechanical Failure / Doesn't Start</option>
                  <option value="wrecked" className="bg-[#0a0c10] text-lg lg:text-xl">Wrecked / Total Loss</option>
                </select>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
                <button 
                  onClick={() => setStep('initial')}
                  className="w-full sm:w-auto px-8 py-5 rounded-full border border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all font-heading font-bold uppercase tracking-wider text-sm"
                >
                  Go Back
                </button>
                <button 
                  onClick={() => setStep('success')}
                  disabled={!mileage || !condition}
                  className="group relative overflow-hidden bg-[var(--color-accent-blue)] w-full sm:flex-1 px-8 py-5 rounded-full inline-flex justify-center items-center transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:shadow-[0_0_50px_rgba(0,240,255,0.4)]"
                >
                  <span className="relative z-10 font-heading font-black uppercase tracking-tight text-xl text-black">
                    Submit Valuation Engine
                  </span>
                  <CheckCircle className="relative z-10 w-6 h-6 ml-3 text-black opacity-80" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="py-16 animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-[var(--color-accent-blue)]/10 rounded-full flex items-center justify-center mb-10 border border-[var(--color-accent-blue)]/50">
                 <CheckCircle className="w-12 h-12 lg:w-16 lg:h-16 text-[var(--color-accent-blue)] shadow-[0_0_30px_rgba(0,240,255,0.5)] rounded-full animate-pulse" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-heading font-black uppercase tracking-tight text-white mb-6">Valuation Triggered</h3>
              <p className="text-lg lg:text-xl font-body text-gray-400 leading-relaxed max-w-lg">
                Our algorithmic engine has compiled your data. A senior specialist will call you in exactly <span className="text-white font-bold">90 seconds</span> to finalize logistics.
              </p>
              <button 
                onClick={() => { setIsOpen(false); setStep('initial'); document.body.style.overflow = ''; }}
                className="mt-12 text-[var(--color-accent-blue)] hover:text-white transition-colors font-heading font-bold uppercase tracking-widest text-lg border-b-2 border-[var(--color-accent-blue)] hover:border-white pb-2"
              >
                Close Engine Dashboard
              </button>
          </div>
        )}

      </div>
    </div>
  );
};
