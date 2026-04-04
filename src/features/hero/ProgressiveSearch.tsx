import React, { useState } from 'react';
import { Search, ChevronRight, CheckCircle, Car } from 'lucide-react';

type SearchMethod = 'vin' | 'ymm';
type Step = 'initial' | 'details' | 'success';

export const ProgressiveSearch: React.FC = () => {
  const [step, setStep] = useState<Step>('initial');
  const [method, setMethod] = useState<SearchMethod>('ymm');

  // Form State
  const [vin, setVin] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [mileage, setMileage] = useState('');
  const [condition, setCondition] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="w-full max-w-md mx-auto bg-[#0a0c10]/90 backdrop-blur-xl border border-white/5 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      <div className="mb-8">
        <h3 className="text-xl font-heading font-black uppercase text-white tracking-widest">
          Valuation Engine
        </h3>
        <div className="w-12 h-1 bg-[var(--color-accent-emerald)] mt-4"></div>
      </div>

      {step === 'initial' && (
        <div className="animate-in fade-in zoom-in-95 duration-300">
          
          <div className="flex gap-2 mb-8 bg-black/50 p-1 rounded-lg border border-white/5">
            <button 
              onClick={() => setMethod('ymm')}
              className={`flex-1 py-2 text-xs font-bold tracking-wider uppercase transition-all rounded-md ${method === 'ymm' ? 'bg-[var(--color-base-surface)] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              By Model
            </button>
            <button 
              onClick={() => setMethod('vin')}
              className={`flex-1 py-2 text-xs font-bold tracking-wider uppercase transition-all rounded-md ${method === 'vin' ? 'bg-[var(--color-base-surface)] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              By VIN
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {method === 'ymm' ? (
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 relative group">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[var(--color-accent-emerald)] transition-colors">Production Year</label>
                  <select 
                    value={year} onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 pb-2 text-white hover:border-white/30 focus:border-[var(--color-accent-emerald)] focus:outline-none appearance-none transition-colors"
                  >
                    <option value="" disabled className="bg-[#0a0c10]">e.g. 2024</option>
                    {years.map(y => <option key={y} value={y} className="bg-[#0a0c10]">{y}</option>)}
                  </select>
                </div>
                
                <div className="flex flex-col gap-2 relative group">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[var(--color-accent-emerald)] transition-colors">Manufacturer</label>
                  <select 
                    value={make} onChange={(e) => setMake(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 pb-2 text-white hover:border-white/30 focus:border-[var(--color-accent-emerald)] focus:outline-none appearance-none transition-colors"
                  >
                    <option value="" disabled className="bg-[#0a0c10]">e.g. BMW</option>
                    <option value="toyota" className="bg-[#0a0c10]">Toyota</option>
                    <option value="honda" className="bg-[#0a0c10]">Honda</option>
                    <option value="ford" className="bg-[#0a0c10]">Ford</option>
                    <option value="chevrolet" className="bg-[#0a0c10]">Chevrolet</option>
                    <option value="other" className="bg-[#0a0c10]">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 relative group col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[var(--color-accent-emerald)] transition-colors">Model Designation</label>
                  <select 
                    value={model} onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 pb-2 text-white hover:border-white/30 focus:border-[var(--color-accent-emerald)] focus:outline-none appearance-none transition-colors cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#0a0c10]">e.g. M3 Competition</option>
                    <option value="camry" className="bg-[#0a0c10]">Camry</option>
                    <option value="civic" className="bg-[#0a0c10]">Civic</option>
                    <option value="f150" className="bg-[#0a0c10]">F-150</option>
                    <option value="other" className="bg-[#0a0c10]">Other</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 relative group mb-6">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[var(--color-accent-emerald)] transition-colors">Vehicle ID Number (VIN)</label>
                <div className="relative">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[var(--color-accent-emerald)] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Enter 17-digit code" 
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 pl-8 pb-2 text-white placeholder-gray-600 focus:border-[var(--color-accent-emerald)] focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 relative group">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[var(--color-accent-emerald)] transition-colors">Postal / Zip Code</label>
              <input 
                type="text" 
                placeholder="10001" 
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 pb-2 text-white placeholder-gray-600 focus:border-[var(--color-accent-emerald)] focus:outline-none transition-all"
              />
            </div>

            <button 
              onClick={() => setStep('details')}
              disabled={method === 'ymm' ? (!year || !make || !model || !zipCode) : (!vin || !zipCode)}
              className="mt-6 w-full bg-gradient-to-r from-[var(--color-accent-emerald)] to-[#00E676]/80 text-[#0a0c10] font-black uppercase text-sm tracking-widest px-8 py-4 rounded hover:shadow-[0_0_20px_rgba(0,230,118,0.4)] transition-all flex justify-center items-center gap-2 group disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
            >
              Get Your Offer
            </button>

            <p className="text-[9px] text-gray-600 text-center leading-relaxed mt-2 uppercase tracking-wide">
              By clicking "Get Your Offer", you agree to our algorithmic pricing protocols and privacy architecture.
            </p>
          </div>
        </div>
      )}

      {step === 'details' && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 relative group">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[var(--color-accent-emerald)] transition-colors">Odometer Reading</label>
              <input 
                type="number" 
                placeholder="Approximate Mileage" 
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 pb-2 text-white placeholder-gray-600 focus:border-[var(--color-accent-emerald)] focus:outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2 relative group">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[var(--color-accent-emerald)] transition-colors">Vehicle Condition</label>
              <select 
                value={condition} 
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 pb-2 text-white focus:border-[var(--color-accent-emerald)] focus:outline-none appearance-none transition-colors"
              >
                <option value="" disabled className="bg-[#0a0c10]">Select status</option>
                <option value="runs" className="bg-[#0a0c10]">Runs and Drives</option>
                <option value="starts" className="bg-[#0a0c10]">Starts but doesn't drive</option>
                <option value="dead" className="bg-[#0a0c10]">Doesn't start / Mechanical Failure</option>
                <option value="wrecked" className="bg-[#0a0c10]">Wrecked / Total Loss</option>
              </select>
            </div>

            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => setStep('initial')}
                className="px-6 py-4 rounded border border-white/10 text-white hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-widest"
              >
                Back
              </button>
              <button 
                onClick={() => setStep('success')}
                disabled={!mileage || !condition}
                className="flex-1 bg-[var(--color-accent-emerald)] text-[#0a0c10] font-black uppercase text-xs tracking-widest px-4 py-4 rounded hover:shadow-[0_0_20px_rgba(0,230,118,0.4)] transition-all flex justify-center items-center group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Finalize Offer <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="py-8 animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[var(--color-accent-emerald)]/10 rounded-full flex items-center justify-center mb-6 border border-[var(--color-accent-emerald)]/50">
               <CheckCircle className="w-8 h-8 text-[var(--color-accent-emerald)] shadow-[0_0_15px_rgba(0,230,118,0.5)] rounded-full" />
            </div>
            <h3 className="text-xl font-heading font-black uppercase tracking-widest text-white mb-4">Pricing Generated</h3>
            <p className="text-sm font-body text-gray-400 leading-relaxed max-w-[250px]">
              Our system has compiled your valuation. A specialist will call you in 90 seconds to verify logistics.
            </p>
            <button 
              onClick={() => setStep('initial')}
              className="mt-8 text-[var(--color-accent-emerald)] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest border-b border-[var(--color-accent-emerald)] hover:border-white pb-1"
            >
              Start New Protocol
            </button>
        </div>
      )}

    </div>
  );
};
