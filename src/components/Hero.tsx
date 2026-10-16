import React from 'react';
import { Compass, FileText, DollarSign, PlusCircle } from 'lucide-react';
import { Language, ActiveTab } from '../types';

interface HeroProps {
  lang: Language;
  onNavigate: (tab: ActiveTab) => void;
}

export default function Hero({ lang, onNavigate }: HeroProps) {
  return (
    <div id="landing-hero-section" className="relative overflow-hidden bg-slate-900 text-white rounded-3xl mx-4 my-6 py-12 md:py-20 px-6 md:px-12 shadow-2xl border border-slate-800">
      
      {/* Background cover image of researchers on the right side on desktop, fading into solid slate-900 towards the left */}
      <div 
        className="absolute inset-y-0 right-0 w-full lg:w-[48%] opacity-20 lg:opacity-65 bg-cover bg-center bg-no-repeat pointer-events-none z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200')" 
        }}
      />
      {/* Smooth left-to-right color fusion gradient to make left text perfectly readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/40 pointer-events-none z-10" />

      {/* Another ambient soft glowing circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-4xl flex flex-col items-start text-left gap-6 relative z-20">
        
        {/* Tagline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider">
          <span>✨ {lang === 'ID' ? 'Lab book Indonesia' : 'Lab book Indonesia'}</span>
        </div>

        {/* Main Title - Centered focus on requested text */}
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.15]">
          {lang === 'ID' ? (
            <>
              Temukan, Bandingkan,
              <br />
              Rencanakan, & Pesan
              <br />
              Layanan Laboratorium se-Indonesia
            </>
          ) : (
            <>
              Find, Compare, Plan,
              <br />
              and Book Laboratory
              <br />
              Services Across Indonesia
            </>
          )}
        </h1>

        {/* Subtitle with high contrast readable content */}
        <p className="text-slate-300 text-sm md:text-md leading-relaxed max-w-3xl font-medium">
          {lang === 'ID' 
            ? 'Booking ratusan laboratorium terakreditasi KAN, laboratorium riset universitas, uji BUMN, dan balai nasional terverifikasi. Bandingkan harga uji, hitung estimasi anggaran riset, rancang alur kerja, dan amankan analisis dalam satu portal ilmiah terpadu.' 
            : 'Book hundreds of KAN accredited, university, state-owned, and national research laboratories. Compare instrument fees, calculate total research budgets, design roadmaps, and instantly book laboratory analyses.'}
        </p>

        {/* Main Quick CTAs - Sejajar horizontal kesamping on screen sizes sm and above */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 mt-4 w-full">
          <button
            id="cta-search-lab"
            onClick={() => onNavigate('search')}
            className="bg-gradient-to-r from-blue-900 via-blue-700 to-sky-400 hover:from-blue-800 hover:to-sky-500 text-white font-extrabold h-11 px-6 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Compass size={14} />
            <span>{lang === 'ID' ? 'Cari Laboratorium' : 'Find Laboratory'}</span>
          </button>
          
          <button
            id="cta-roadmap-generator"
            onClick={() => onNavigate('roadmap')}
            className="bg-slate-800/80 hover:bg-slate-750 text-slate-100 hover:text-white border border-slate-705/80 font-bold h-11 px-5 rounded-xl text-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <FileText size={14} className="text-orange-400" />
            <span>{lang === 'ID' ? 'Buat Laporan Roadmap' : 'Generate Roadmap'}</span>
          </button>

          <button
            id="cta-cost-estimator"
            onClick={() => onNavigate('estimator')}
            className="bg-slate-800/80 hover:bg-slate-750 text-slate-100 hover:text-white border border-slate-705/80 font-bold h-11 px-5 rounded-xl text-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <DollarSign size={14} className="text-emerald-400" />
            <span>{lang === 'ID' ? 'Estimasi Biaya Riset' : 'Estimate Cost & Budget'}</span>
          </button>

          <button
            id="cta-partner-form"
            onClick={() => onNavigate('partner')}
            className="bg-slate-800/80 hover:bg-slate-750 text-slate-100 hover:text-white border border-slate-705/80 font-bold h-11 px-5 rounded-xl text-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer whitespace-nowrap animate-pulse"
          >
            <PlusCircle size={14} className="text-amber-400" />
            <span>{lang === 'ID' ? 'Menjadi Mitra Lab' : 'Become Lab Partner'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
