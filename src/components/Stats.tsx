import React from 'react';
import { Language } from '../types';

interface StatsProps {
  lang: Language;
}

export default function Stats({ lang }: StatsProps) {
  const stats = [
    {
      value: '500+',
      label: lang === 'ID' ? 'Laboratorium' : 'Laboratories',
      sub: lang === 'ID' ? 'Fasilitas se-Indonesia' : 'National facilities'
    },
    {
      value: '15.000+',
      label: lang === 'ID' ? 'Layanan Pengujian' : 'Testing Services',
      sub: lang === 'ID' ? 'Jenis pengujian khusus' : 'Accredited test catalog'
    },
    {
      value: '100.000+',
      label: lang === 'ID' ? 'Peneliti Terbantu' : 'Researchers Assisted',
      sub: lang === 'ID' ? 'Mahasiswa & ilmuwan terbantu' : 'Students & scientists helped'
    },
    {
      value: '250+',
      label: lang === 'ID' ? 'Mitra Institusi' : 'Institutional Partners',
      sub: lang === 'ID' ? 'Lembaga riset & industri' : 'Corporates & industries'
    },
    {
      value: '100+',
      label: lang === 'ID' ? 'Universitas' : 'Universities',
      sub: lang === 'ID' ? 'Rujukan kampus terpadu' : 'Campus networks'
    },
    {
      value: '50+',
      label: lang === 'ID' ? 'Balai Pemerintah' : 'Government Labs',
      sub: lang === 'ID' ? 'Milik Kemenperin, KESDM, BRIN' : 'BRIN, Ministries, KAN'
    }
  ];

  return (
    <section id="trust-statistics-rail" className="py-10 max-w-7xl mx-auto px-4 mt-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, idx) => (
          <div
            id={`stat-box-${idx}`}
            key={idx}
            className="bg-white hover:bg-blue-50/20 p-5 rounded-2xl border border-slate-100 hover:border-blue-100 transition-all text-center shadow-xs flex flex-col justify-center gap-1.5 hover:shadow-md active:scale-98"
          >
            <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-orange-500 leading-tight">
              {stat.value}
            </div>
            <div className="text-xs font-bold text-slate-800 tracking-tight leading-none">
              {stat.label}
            </div>
            <div className="text-[10px] text-slate-400 font-medium leading-normal">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
