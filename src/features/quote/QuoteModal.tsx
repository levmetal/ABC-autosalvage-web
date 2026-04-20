import React, { useEffect, useState, useRef } from 'react';
import { X, Search, ChevronRight, CheckCircle } from 'lucide-react';

type SearchMethod = 'vin' | 'ymm';
type Step = 'initial' | 'details-vehicle' | 'details-contact' | 'success' | 'error';

export const QuoteModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('initial');
  const [method, setMethod] = useState<SearchMethod>('ymm');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [vin, setVin] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [mileage, setMileage] = useState('');
  const [condition, setCondition] = useState('');
  const [notes, setNotes] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };
    
    const handleClose = () => {
      setIsOpen(false);
      document.body.style.overflow = '';
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

  const resetForm = () => {
    setStep('initial');
    setMethod('ymm');
    setVin('');
    setYear('');
    setMake('');
    setModel('');
    setZipCode('');
    setMileage('');
    setCondition('');
    setNotes('');
    setFullName('');
    setPhone('');
    setEmail('');
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');



    try {
      const targetEmail = import.meta.env.PUBLIC_FORMSUBMIT_EMAIL || 'miguel@abc-autosalvage.com';
      const endpoint = `https://formsubmit.co/ajax/${targetEmail}`;

      const formBody = new FormData();
      formBody.append('_subject', `New Vehicle Quote - ${fullName}`);
      formBody.append('_captcha', 'true');
      formBody.append('_template', 'box');
      formBody.append('Identification Method', method === 'vin' ? 'VIN Lookup' : 'Year/Make/Model');
      formBody.append('VIN', method === 'vin' ? vin : 'N/A');
      formBody.append('Year', method === 'ymm' ? year : 'N/A');
      formBody.append('Make', method === 'ymm' ? make : 'N/A');
      formBody.append('Model', method === 'ymm' ? model : 'N/A');
      formBody.append('Zip Code', zipCode);
      formBody.append('Mileage', mileage);
      formBody.append('Condition', condition);
      formBody.append('Notes', notes || 'None provided');
      formBody.append('Full Name', fullName);
      formBody.append('Phone', phone);
      formBody.append('Email', email || 'Not provided');

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formBody,
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setStep('success');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = method === 'ymm'
    ? (year.trim() !== '' && make.trim() !== '' && model.trim() !== '' && zipCode.trim() !== '')
    : (vin.trim().length >= 17 && zipCode.trim() !== '');

  const isStep2Valid = mileage.trim() !== '' && condition !== '';

  const isStep3Valid = fullName.trim() !== '' && phone.trim() !== '';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#050608]/95 backdrop-blur-2xl">
      
      {/* Background glow for immersion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[var(--color-primary)] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <button 
        onClick={() => { handleClose(); }}
        className="absolute top-4 right-4 lg:top-8 lg:right-8 text-gray-400 hover:text-white transition-colors z-50 p-1.5 rounded-full hover:bg-white/10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* The Typeform-style elegant container */}
      <div ref={modalRef} className="w-full max-w-xl mx-auto relative z-10 animate-in zoom-in-95 duration-500">
        
        <div className="mb-6 text-center lg:text-left">
          <h2 className="text-base lg:text-lg font-heading font-black uppercase tracking-tight text-white mb-2">
            {step === 'initial' && 'Identify Vehicle'}
            {step === 'details-vehicle' && 'Vehicle Condition'}
            {step === 'details-contact' && 'Your Contact Info'}
            {step === 'success' && 'Request Received'}
          </h2>
          <div className="w-10 h-[2px] bg-[var(--color-primary)] mx-auto lg:mx-0"></div>
          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-4 justify-center lg:justify-start">
            <span className={`w-2 h-2 rounded-full transition-all duration-300 ${step === 'initial' ? 'bg-[var(--color-primary)] w-6' : 'bg-white/20'}`} />
            <span className={`w-2 h-2 rounded-full transition-all duration-300 ${step === 'details-vehicle' ? 'bg-[var(--color-primary)] w-6' : 'bg-white/20'}`} />
            <span className={`w-2 h-2 rounded-full transition-all duration-300 ${step === 'details-contact' ? 'bg-[var(--color-primary)] w-6' : 'bg-white/20'}`} />
            <span className={`w-2 h-2 rounded-full transition-all duration-300 ${step === 'success' ? 'bg-[var(--color-primary)] w-6' : 'bg-white/20'}`} />
          </div>
        </div>

        {step === 'initial' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            
            {/* Method Toggle */}
            <div className="flex gap-1.5 mb-6 bg-black/60 p-1 rounded-lg border border-white/10 max-w-[280px] mx-auto lg:mx-0">
              <button 
                onClick={() => setMethod('ymm')}
                className={`flex-1 py-2 text-[10px] font-bold tracking-wider uppercase transition-all rounded-md ${method === 'ymm' ? 'bg-[var(--color-base-surface)] text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
              >
                By Vehicle
              </button>
              <button 
                onClick={() => setMethod('vin')}
                className={`flex-1 py-2 text-[10px] font-bold tracking-wider uppercase transition-all rounded-md ${method === 'vin' ? 'bg-[var(--color-base-surface)] text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
              >
                By VIN
              </button>
            </div>

            <div className="flex flex-col gap-5">
              {method === 'ymm' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2 relative group">
                    <label htmlFor="year" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-focus-within:text-[var(--color-primary)] transition-colors">Year</label>
                    <input 
                      id="year"
                      type="text" 
                      placeholder="e.g. 2015" 
                      value={year}
                      onChange={(e) => setYear(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm lg:text-base font-heading font-bold text-gray-900 placeholder-gray-500 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all autofill:bg-white"
                      style={{ colorScheme: 'light' }}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2 relative group">
                    <label htmlFor="make" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-focus-within:text-[var(--color-primary)] transition-colors">Make</label>
                    <input 
                      id="make"
                      type="text" 
                      placeholder="e.g. Toyota" 
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm lg:text-base font-heading font-bold text-gray-900 placeholder-gray-500 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                      style={{ colorScheme: 'light' }}
                    />
                  </div>

                  <div className="flex flex-col gap-2 relative group sm:col-span-2">
                    <label htmlFor="model" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-focus-within:text-[var(--color-primary)] transition-colors">Model</label>
                    <input 
                      id="model"
                      type="text" 
                      placeholder="e.g. Camry, F-150, Civic..." 
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm lg:text-base font-heading font-bold text-gray-900 placeholder-gray-500 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                      style={{ colorScheme: 'light' }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="vin" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-focus-within:text-[var(--color-primary)] transition-colors">Vehicle Identification Number (VIN)</label>
                  <div className="relative">
                    <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
                    <input 
                      id="vin"
                      type="text" 
                      placeholder="Enter 17-character VIN" 
                      value={vin}
                      onChange={(e) => setVin(e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '').slice(0, 17))}
                      maxLength={17}
                      className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm lg:text-base font-heading font-bold text-gray-900 placeholder-gray-500 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all tracking-widest uppercase"
                      style={{ colorScheme: 'light' }}
                    />
                  </div>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                    {vin.length}/17 characters {vin.length > 0 && vin.length < 17 && `(${17 - vin.length} remaining)`}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="zip" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-focus-within:text-[var(--color-primary)] transition-colors">Zip Code</label>
                <input 
                  id="zip"
                  type="text" 
                  placeholder="e.g. 23882" 
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 5))}
                  maxLength={5}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm lg:text-base font-heading font-bold text-gray-900 placeholder-gray-500 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                  style={{ colorScheme: 'light' }}
                />
              </div>

              <div className="mt-4">
                <button 
                  onClick={() => setStep('details-vehicle')}
                  disabled={!isStep1Valid}
                  className="group relative overflow-hidden bg-[var(--color-primary)] w-full px-6 py-3 rounded-full inline-flex justify-center items-center gap-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(255,95,0,0.2)] hover:shadow-[0_0_40px_rgba(255,95,0,0.4)]"
                >
                  <span className="relative z-10 font-heading font-black uppercase tracking-tight text-sm text-black">
                    Continue to Details
                  </span>
                  <ChevronRight className="relative z-10 w-4 h-4 text-black group-hover:translate-x-1 transition-all duration-300" />
                </button>
                <p className="text-[10px] font-bold text-gray-500 text-center leading-relaxed mt-3 uppercase tracking-wider">
                  Tell us about your vehicle to get a free offer.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 'details-vehicle' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="mileage" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-focus-within:text-[var(--color-primary)] transition-colors">Mileage (approximate)</label>
                <input 
                  id="mileage"
                  type="text" 
                  placeholder="e.g. 120000" 
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-base lg:text-lg font-heading font-black text-gray-900 placeholder-gray-500 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                  style={{ colorScheme: 'light' }}
                />
              </div>

              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="condition" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-focus-within:text-[var(--color-primary)] transition-colors">Does it run?</label>
                <div className="relative">
                  <select 
                    id="condition"
                    value={condition} 
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm lg:text-base font-heading font-bold text-gray-900 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all appearance-none pr-10"
                    style={{ colorScheme: 'light' }}
                  >
                    <option value="" disabled className="bg-white text-gray-500">Select condition</option>
                    <option value="runs-drives" className="bg-white text-gray-900">Runs and drives fine</option>
                    <option value="starts-not-drive" className="bg-white text-gray-900">Starts but cannot be driven</option>
                    <option value="no-start" className="bg-white text-gray-900">Does not start / Engine issues</option>
                    <option value="wrecked" className="bg-white text-gray-900">Wrecked / Total loss / Damaged</option>
                    <option value="parts-only" className="bg-white text-gray-900">For parts only / Non-repairable</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="notes" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-focus-within:text-[var(--color-primary)] transition-colors">Describe the issue or damage (optional)</label>
                <textarea 
                  id="notes"
                  rows={2}
                  placeholder="e.g. Front end damage, transmission slips..." 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-body text-gray-900 placeholder-gray-500 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all resize-none"
                  style={{ colorScheme: 'light' }}
                />
              </div>

              <div className="mt-2 flex flex-col sm:flex-row gap-3 items-center">
                <button 
                  onClick={() => setStep('initial')}
                  className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all font-heading font-bold uppercase tracking-wider text-[10px]"
                >
                  Go Back
                </button>
                <button 
                  onClick={() => setStep('details-contact')}
                  disabled={!isStep2Valid}
                  className="group relative overflow-hidden bg-[var(--color-primary)] w-full sm:flex-1 px-6 py-3 rounded-full inline-flex justify-center items-center gap-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(255,95,0,0.2)] hover:shadow-[0_0_40px_rgba(255,95,0,0.4)]"
                >
                  <span className="relative z-10 font-heading font-black uppercase tracking-tight text-sm text-black">
                    Continue to Contact Info
                  </span>
                  <ChevronRight className="relative z-10 w-4 h-4 text-black group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'details-contact' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="fullName" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-focus-within:text-[var(--color-primary)] transition-colors">Full Name</label>
                <input 
                  id="fullName"
                  type="text" 
                  placeholder="Your name" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm lg:text-base font-heading font-bold text-gray-900 placeholder-gray-500 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                  style={{ colorScheme: 'light' }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="phone" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-focus-within:text-[var(--color-primary)] transition-colors">Phone Number</label>
                  <input 
                    id="phone"
                    type="tel" 
                    placeholder="(757) 000-0000" 
                    value={phone}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/[^0-9]/g, '');
                      let formatted = cleaned;
                      if (cleaned.length > 3 && cleaned.length <= 6) {
                        formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
                      } else if (cleaned.length > 6) {
                        formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
                      }
                      setPhone(formatted);
                    }}
                    maxLength={14}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm lg:text-base font-heading font-bold text-gray-900 placeholder-gray-500 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                    style={{ colorScheme: 'light' }}
                  />
                </div>

                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="email" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-focus-within:text-[var(--color-primary)] transition-colors">Email (optional)</label>
                  <input 
                    id="email"
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm lg:text-base font-heading font-bold text-gray-900 placeholder-gray-500 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                    style={{ colorScheme: 'light' }}
                  />
                </div>
              </div>

              <div className="mt-2 flex flex-col sm:flex-row gap-3 items-center">
                <button 
                  onClick={() => setStep('details-vehicle')}
                  className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all font-heading font-bold uppercase tracking-wider text-[10px]"
                >
                  Go Back
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={!isStep3Valid || isSubmitting}
                  className="group relative overflow-hidden bg-[var(--color-primary)] w-full sm:flex-1 px-6 py-3 rounded-full inline-flex justify-center items-center transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(255,95,0,0.2)] hover:shadow-[0_0_40px_rgba(255,95,0,0.4)]"
                >
                  {isSubmitting ? (
                    <span className="relative z-10 font-heading font-black uppercase tracking-tight text-sm text-black flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10 font-heading font-black uppercase tracking-tight text-sm text-black">
                        Get My Free Offer
                      </span>
                      <CheckCircle className="relative z-10 w-4 h-4 ml-2 text-black opacity-80" />
                    </>
                  )}
                </button>
              </div>

              {submitError && (
                <div className="mt-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-xs font-bold text-red-400 uppercase tracking-wider">
                    Failed to send. Call us at (919) 437-8198.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="py-12 animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-8 border border-[var(--color-primary)]/50">
                 <CheckCircle className="w-10 h-10 lg:w-12 lg:h-12 text-[var(--color-primary)] shadow-[0_0_30px_rgba(255,95,0,0.5)] rounded-full animate-pulse" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-heading font-black uppercase tracking-tight text-white mb-4">Request Received</h3>
              <p className="text-base lg:text-lg font-body text-gray-400 leading-relaxed max-w-md">
                Thank you, <span className="text-white font-bold">{fullName}</span>. We'll contact you at <span className="text-white font-bold">{phone}</span> with your free offer.
              </p>
              <button 
                onClick={() => { resetForm(); handleClose(); }}
                className="mt-10 text-[var(--color-primary)] hover:text-white transition-colors font-heading font-bold uppercase tracking-widest text-sm border-b-2 border-[var(--color-primary)] hover:border-white pb-1"
              >
                Close
              </button>
          </div>
        )}

      </div>
    </div>
  );
};
