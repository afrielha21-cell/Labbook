import React from 'react';
import { Apple, Layers, FlaskConical, Droplets, Activity, HeartPulse, Hammer, Settings, LucideIcon } from 'lucide-react';
import { Language } from '../types';
import { CATEGORIES_DATA } from '../data/laboratories';

interface CategoriesProps {
  lang: Language;
  onSelectCategory: (catName: string) => void;
}

// Icon mapper for lucide-react dynamically
const iconMap: { [key: string]: LucideIcon } = {
  Apple: Apple,
  Layers: Layers,
  FlaskConical: FlaskConical,
  Droplets: Droplets,
  Activity: Activity,
  HeartPulse: HeartPulse,
  Pick: Hammer,
  Settings: Settings
};

export default function Categories({ lang, onSelectCategory }: CategoriesProps) {
  return (
    <section id="laboratory-categories-section" className="py-8 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            {lang === 'ID' ? 'Kategori Bidang Laboratorium' : 'Laboratory Category Disciplines'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'ID' 
              ? 'Temukan lab riset khusus berdasarkan kebutuhan bidang keilmuan' 
              : 'Find specialized research labs based on scientific fields'}
          </p>
        </div>
        <button
          id="papan-direktori-btn"
          onClick={() => onSelectCategory('')}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 hover:underline"
        >
          <span>{lang === 'ID' ? 'Papan Direktori →' : 'Directory Board →'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES_DATA.map((cat, idx) => {
          const IconComp = iconMap[cat.icon] || FlaskConical;
          return (
            <div
              id={`category-card-${idx}`}
              key={idx}
              onClick={() => onSelectCategory(cat.name)}
              className="bg-white hover:bg-slate-50/50 p-5 rounded-2xl border border-slate-100 hover:border-blue-150 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between group active:scale-[0.98]"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <IconComp size={20} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full group-hover:bg-white transition-colors">
                  {cat.count} {lang === 'ID' ? 'layanan' : 'services'}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-xs font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 font-medium">
                  <span>{lang === 'ID' ? 'Mulai' : 'Starts'} <strong className="text-slate-700">{cat.price}</strong></span>
                  <span>{cat.duration}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
