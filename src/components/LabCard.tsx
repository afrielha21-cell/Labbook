import React from 'react';
import { Star, MapPin, Shield, Check, Plus, Clock, TrendingUp } from 'lucide-react';
import { LabItem, Language } from '../types';

interface LabCardProps {
  key?: string;
  lab: LabItem;
  lang: Language;
  onViewDetails: (lab: LabItem) => void;
  onToggleCompare: (lab: LabItem) => void;
  isCompared: boolean;
}

export default function LabCard({ lab, lang, onViewDetails, onToggleCompare, isCompared }: LabCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 hover:border-blue-150 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col relative group h-full">
      {/* Top Banner with Image and verification labels */}
      <div className="h-44 w-full bg-slate-100 relative overflow-hidden shrink-0">
        <img
          src={lab.image}
          alt={lab.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
        
        {/* Verification Status */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className="flex items-center gap-1 bg-slate-900/90 text-white font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs select-none">
            <Shield size={10} className="text-emerald-400 fill-emerald-400" />
            <span>{lab.verified ? (lang === 'ID' ? 'Mitra Terverifikasi' : 'Verified Partner') : (lang === 'ID' ? 'Mitra Akademis' : 'Academic Lab')}</span>
          </span>
        </div>

        {/* Rating and Reviews badges */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/90 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded-md backdrop-blur-xs">
          <Star size={10} className="fill-amber-400 text-amber-400" />
          <span>{lab.rating.toFixed(1)}</span>
        </div>

        {/* Location subtitle overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-white font-bold">
          <MapPin size={11} className="text-rose-400" />
          <span className="truncate max-w-[200px]">{lab.city}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Institution label */}
          <span className="text-[10px] font-bold text-blue-600 tracking-wide uppercase leading-none">
            {lab.institution}
          </span>
          {/* Lab Name */}
          <h3 className="text-xs font-black text-slate-900 mt-1.5 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
            {lab.name}
          </h3>

          {/* Accreditations Row */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {lab.accreditation.map((ac, idx) => (
              <span
                key={idx}
                className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-0.5"
              >
                <Check size={8} />
                <span>{ac}</span>
              </span>
            ))}
          </div>

          {/* Popular Services badges */}
          <div className="mt-3.5">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              {lang === 'ID' ? 'ALAT UJI UTAMA' : 'KEY TEST INSTRUMENTS'}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {lab.instruments.slice(0, 2).map((inst, idx) => (
                <span
                  key={idx}
                  className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-100 max-w-[120px] truncate"
                  title={inst.name}
                >
                  {inst.name.split(' (')[0]}
                </span>
              ))}
              {lab.services.slice(0, 1).map((serv, idx) => (
                <span
                  key={idx + 2}
                  className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-100 max-w-[120px] truncate"
                  title={serv.name}
                >
                  {serv.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats segment side-by-side */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between gap-4 mt-auto">
          {/* Starting rates */}
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 font-bold uppercase leading-none">
              {lang === 'ID' ? 'Tarif Mulai' : 'Starting Rate'}
            </span>
            <span className="text-xs font-extrabold text-slate-900 mt-1">
              Rp {lab.startingPrice.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex flex-col items-end text-right">
            <span className="text-[9px] text-slate-400 font-bold uppercase leading-none">
              {lang === 'ID' ? 'Waktu Respon' : 'Response Time'}
            </span>
            <span className="text-xs font-extrabold text-emerald-600 mt-1 flex items-center gap-0.5">
              <Clock size={10} />
              <span>{lab.responseTimeMinutes} Mins</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-5 pb-5 pt-1.5 flex gap-2 w-full">
        {/* Toggle Comparison button */}
        <button
          id={`compare-toggle-${lab.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(lab);
          }}
          className={`flex-1 font-bold text-[10px] h-9 rounded-lg flex items-center justify-center gap-1.5 transition-colors border active:scale-95 cursor-pointer ${
            isCompared
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {isCompared ? (
            <>
              <Check size={11} />
              <span>{lang === 'ID' ? 'Bandingkan ✓' : 'Compare ✓'}</span>
            </>
          ) : (
            <>
              <Plus size={11} />
              <span>+ {lang === 'ID' ? 'Bandingkan' : 'Compare'}</span>
            </>
          )}
        </button>

        {/* View Detail button */}
        <button
          id={`view-detail-${lab.id}`}
          onClick={() => onViewDetails(lab)}
          className="flex-1 bg-slate-950 hover:bg-slate-900 text-white font-bold text-[10px] h-11 rounded-lg flex items-center justify-center gap-1 shadow-sm hover:shadow-md transition-colors active:scale-95 cursor-pointer shrink-0"
        >
          <span>{lang === 'ID' ? 'Detil Uji' : 'View Details'}</span>
          <span className="text-[9px]">➔</span>
        </button>
      </div>
    </div>
  );
}
