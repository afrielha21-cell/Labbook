import React, { useState } from 'react';
import { Search, MapPin, Tag, ShieldCheck, DollarSign, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { INDONESIA_CITIES } from '../data/laboratories';

interface SearchBarProps {
  lang: Language;
  onSearch: (filters: {
    query: string;
    category: string;
    location: string;
    budget: string;
    accreditation: string;
  }) => void;
}

export default function SearchBar({ lang, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('Semua Lokasi');
  const [budget, setBudget] = useState('Semua Anggaran');
  const [accreditation, setAccreditation] = useState('Semua Akreditasi');

  const popularTags = ['XRD', 'FTIR', 'SEM', 'HPLC', 'GC-MS', 'AAS', 'TPC', 'Coal'];

  const categories = [
    { value: '', label: lang === 'ID' ? 'Semua Kategori' : 'All Categories' },
    { value: 'Material Testing', label: 'Material Testing' },
    { value: 'Chemical Analysis', label: 'Chemical Analysis' },
    { value: 'Food Testing', label: 'Food Testing' },
    { value: 'Environmental Testing', label: 'Environmental Testing' },
    { value: 'Biotechnology', label: 'Biotechnology' },
    { value: 'Microbiology', label: 'Microbiology' },
    { value: 'Calibration', label: 'Calibration' },
    { value: 'Mining Laboratory', label: 'Mining Laboratory' }
  ];

  const budgets = [
    { value: 'Semua Anggaran', label: lang === 'ID' ? 'Semua Anggaran' : 'Any Budget' },
    { value: 'under300', label: lang === 'ID' ? 'Di bawah Rp 300.000' : 'Under Rp 300K' },
    { value: '300to500', label: 'Rp 300.000 - Rp 500.000' },
    { value: 'above500', label: lang === 'ID' ? 'Di atas Rp 500.000' : 'Above Rp 500K' }
  ];

  const accreditations = [
    { value: 'Semua Akreditasi', label: lang === 'ID' ? 'Semua Akreditasi / Mitra' : 'All Accreditations' },
    { value: 'KAN', label: lang === 'ID' ? 'Terakreditasi KAN' : 'KAN Accredited' },
    { value: 'ISO 9001', label: 'ISO 9001:2015' },
    { value: 'Halal', label: lang === 'ID' ? 'Sertifikat Halal BPJPH' : 'Halal Certified' },
    { value: 'Lainnya', label: lang === 'ID' ? 'Mitra Akademis/ BRIN / Lainnya' : 'Academic / BRIN Partners' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, category, location, budget, accreditation });
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    onSearch({ query: tag, category, location, budget, accreditation });
  };

  return (
    <div id="advanced-search-block" className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 max-w-6xl mx-auto -mt-10 relative z-30">
      <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4">
        
        {/* Main Grid Multi-Fields (Traveloka/Airbnb Horizontal Grid layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
          
          {/* Query: What to test? */}
          <div className="lg:col-span-4 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 tracking-wider flex items-center gap-1">
              <Search size={12} className="text-blue-500" />
              <span>{lang === 'ID' ? 'APA SAMPEL YANG INGIN DIUJI?' : 'WHAT SAMPLES TO TEST?'}</span>
            </label>
            <input
              id="search-query-field"
              type="text"
              placeholder={lang === 'ID' ? 'Cari analisis SEM, FTIR, XRD, HPLC, Mikroba...' : 'Search SEM, FTIR, XRD, HPLC, microbal assays...'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 focus:bg-white focus:border-blue-500 px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none transition-all text-slate-800"
            />
          </div>

          {/* Category */}
          <div className="lg:col-span-2 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 tracking-wider flex items-center gap-1">
              <Tag size={12} className="text-orange-500" />
              <span>{lang === 'ID' ? 'KATEGORI' : 'CATEGORY'}</span>
            </label>
            <select
              id="search-category-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 focus:bg-white focus:border-blue-500 px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none transition-all text-slate-700 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="lg:col-span-2 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 tracking-wider flex items-center gap-1">
              <MapPin size={12} className="text-rose-500" />
              <span>{lang === 'ID' ? 'KOTA / LOKASI' : 'CITY / LOCATION'}</span>
            </label>
            <select
              id="search-location-field"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 focus:bg-white focus:border-blue-500 px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none transition-all text-slate-700 cursor-pointer"
            >
              {INDONESIA_CITIES.map((city) => (
                <option key={city} value={city}>{lang === 'ID' || city !== 'Semua Lokasi' ? city : 'All Locations'}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="lg:col-span-2 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 tracking-wider flex items-center gap-1">
              <DollarSign size={12} className="text-emerald-500" />
              <span>{lang === 'ID' ? 'ANGGARAN' : 'BUDGET'}</span>
            </label>
            <select
              id="search-budget-field"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 focus:bg-white focus:border-blue-500 px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none transition-all text-slate-700 cursor-pointer"
            >
              {budgets.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>

          {/* Accreditation selection per revision demands */}
          <div className="lg:col-span-2 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 tracking-wider flex items-center gap-1">
              <ShieldCheck size={12} className="text-indigo-500" />
              <span>{lang === 'ID' ? 'AKREDITASI' : 'ACCREDITATION'}</span>
            </label>
            <select
              id="search-accredit-field"
              value={accreditation}
              onChange={(e) => setAccreditation(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 focus:bg-white focus:border-blue-500 px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none transition-all text-slate-700 cursor-pointer"
            >
              {ac标记Data.map((a) => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Popular Tags and Direct Button row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2 border-t border-slate-100">
          
          {/* Tag pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {popularTags.map((tag) => (
              <button
                id={`popular-tag-${tag}`}
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="px-2.5 py-1 text-[10px] font-bold text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50/40 rounded-lg transition-colors border border-slate-100 hover:border-blue-200 cursor-pointer"
              >
                +{tag}
              </button>
            ))}
          </div>

          {/* Large orange Search Actions button */}
          <button
            id="searchbar-submit-btn"
            type="submit"
            className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs h-10 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-orange-500/15 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <span>{lang === 'ID' ? 'Cari Sekarang' : 'Search Now'}</span>
            <ArrowRight size={13} />
          </button>

        </div>

      </form>
    </div>
  );
}

// Inline constant translation mapper to avoid compiling lookup states
const ac标记Data = [
  { value: 'Semua Akreditasi', label: 'Semua Akreditasi' },
  { value: 'KAN', label: 'KAN / ISO 17025' },
  { value: 'ISO 9001', label: 'ISO 9001:2015' },
  { value: 'Halal', label: 'Sertifikat Halal' },
  { value: 'Lainnya', label: 'Mitra Kampus / Lainnya' }
];
