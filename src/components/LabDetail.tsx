import React, { useState } from 'react';
import { X, MapPin, Globe, CheckCircle, Phone, Mail, FolderDown, ArrowRight, ShieldCheck, Star, Search, Clock, Shield, Award, Layers } from 'lucide-react';
import { LabItem, Language, ServiceItem } from '../types';

interface LabDetailProps {
  lab: LabItem | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onBookService: (service: ServiceItem) => void;
}

export default function LabDetail({ lab, isOpen, onClose, lang, onBookService }: LabDetailProps) {
  const [serviceSearch, setServiceSearch] = useState('');

  if (!isOpen || !lab) return null;

  const filteredServices = lab.services.filter(s =>
    s.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
    s.category.toLowerCase().includes(serviceSearch.toLowerCase()) ||
    s.method.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  return (
    <div id="lab-details-drawer" className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex justify-end p-0 md:p-3">
      {/* Drawer content panel */}
      <div className="w-full max-w-5xl bg-white h-full md:h-[96vh] md:my-auto rounded-none md:rounded-2xl shadow-2xl flex flex-col overflow-hidden relative border-l border-slate-150 animate-slideLeft">
        
        {/* TOP LEVEL HEADER BANNER WITH GRADIENT */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex justify-between items-start shrink-0 relative border-b border-indigo-500/20">
          <div className="flex-1 min-w-0 pr-8">
            {/* 1. Mitra Resmi Terverifikasi Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider mb-2">
              <ShieldCheck size={12} className="fill-emerald-500/10" />
              <span>{lang === 'ID' ? 'Mitra Resmi Terverifikasi LabBook' : 'Verified LabBook Partner'}</span>
            </div>

            {/* 2. Laboratorium namanya apa & 3. Instansi nya apa */}
            <h2 className="text-xl md:text-2xl font-black text-white mt-1 leading-snug tracking-tight">
              {lab.name}
            </h2>
            <p className="text-xs text-orange-400 font-extrabold uppercase mt-1 tracking-wider">
              {lab.institution}
            </p>

            {/* 6. Bintang (review) & Quick Stats */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-300">
              <span className="flex items-center gap-1 text-amber-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 font-bold">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span>{lab.rating.toFixed(1)} / 5.0 ({lab.reviews.length} {lang === 'ID' ? 'Review Peneliti' : 'Reviews'})</span>
              </span>
              <span className="text-[11px] text-slate-400">
                {lang === 'ID' ? `Sudah memproses ${lab.completedProjects} uji` : `Processed ${lab.completedProjects} test samples`}
              </span>
            </div>
          </div>

          <button
            id="close-details-drawer-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors absolute top-6 right-6 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* INNER SCROLL BODY CONTAINER */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 bg-slate-50/50">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT SIDE COLUMN (8 Cols) - CORE SPECIFICATIONS */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* SECTION A: PROFILE, ALAMAT, HARI & JAM BUKA */}
              <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-2xs">
                {/* 7. Profil Laboratorium */}
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-3">
                  🏢 {lang === 'ID' ? 'PROFIL LABORATORIUM' : 'LABORATORY PROFILE'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {lab.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-100">
                  {/* 4. Alamat */}
                  <div className="flex gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                      <MapPin size={15} />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{lang === 'ID' ? 'ALAMAT LENGKAP' : 'ADDRESS LOCATION'}</span>
                      <p className="text-xs text-slate-700 font-semibold mt-0.5 leading-snug">{lab.location}</p>
                    </div>
                  </div>

                  {/* 5. Hari dan Jam Buka */}
                  <div className="flex gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                      <Clock size={15} />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{lang === 'ID' ? 'HARI & JAM OPERASIONAL' : 'OPENING HOURS'}</span>
                      <p className="text-xs text-slate-700 font-extrabold mt-0.5 leading-snug">
                        {lang === 'ID' ? 'Senin - Jumat (08:30 - 16:30 WIB)' : 'Monday - Friday (08:30 - 16:30)'}
                      </p>
                      <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">● {lang === 'ID' ? 'Terima Layanan Sampel' : 'Accepting Samples Now'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: 10. AKREDITASI DAN STANDAR MUTU */}
              <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-2xs">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-3">
                  🛡️ {lang === 'ID' ? 'AKREDITASI & STANDAR MUTU' : 'ACCREDITATIONS & MUTU STANDARDS'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {lang === 'ID' 
                    ? 'Fasilitas laboratorium ini mematuhi jaminan kendali mutu internasional dari KAN RI dan lembaga standardisasi resmi nasional:' 
                    : 'The testing parameters aligned in this unit strictly follow global standards specified by KAN RI and national authorities:'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {lab.accreditation.map((ac, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold text-xs">
                        ✓
                      </div>
                      <div>
                        <strong className="text-xs text-slate-800 block font-bold leading-none">{ac}</strong>
                        <span className="text-[9px] text-slate-400 font-semibold block mt-1 uppercase tracking-wider">{lang === 'ID' ? 'TERKOMITMEN PENUH' : 'FULLY ACCREDITED'}</span>
                      </div>
                    </div>
                  ))}
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <strong className="text-xs text-slate-800 block font-bold leading-none">Standar SNI / ASTM</strong>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-1 uppercase tracking-wider">{lang === 'ID' ? 'METODE VALIDASI' : 'VALIDATED METHODS'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION C: 11. ALUR PENGIRIMAN ATAU ALUR UJI SAMPEL */}
              <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-2xs">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">
                  🔄 {lang === 'ID' ? 'ALUR PENGIRIMAN & PENGERJAAN SAMPEL' : 'SAMPLE HAND-OFF & FLOW'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  {[
                    { step: '1', title: lang === 'ID' ? 'Booking Portal' : 'Book Testing', desc: lang === 'ID' ? 'Pilih parameter uji, isi manifest, isi detail bahaya.' : 'Configure parameters.' },
                    { step: '2', title: lang === 'ID' ? 'Terima Invoice' : 'Receive Manifest', desc: lang === 'ID' ? 'Unduh draf manifest pengantar & SOP kirim.' : 'Invoice download.' },
                    { step: '3', title: lang === 'ID' ? 'Kirim Sampel' : 'Ship Sample', desc: lang === 'ID' ? 'Kirim sampel fisik via kurir ekspedisi / drop instansi.' : 'Send specimens' },
                    { step: '4', title: lang === 'ID' ? 'Sertifikat Hasil' : 'Report Issued', desc: lang === 'ID' ? 'Hasil KAN keluar online dalam bentuk file PDF.' : 'PDF Reports.' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-2 relative bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 shadow-2xs">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                        {item.step}
                      </div>
                      <p className="text-xs font-black text-slate-800 tracking-tight leading-snug">{item.title}</p>
                      <p className="text-[10px] text-slate-500 leading-normal font-medium mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION D: 12. DAFTAR PENGUJIAN / MENU PARAMETER */}
              <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-2xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                    🧬 {lang === 'ID' ? 'DAFTAR LAYANAN PENGUJIAN & PARAMETER' : 'TESTING PARAMETERS CATALOG'}
                  </h3>
                  
                  {/* Internal parameter search */}
                  <div className="relative w-full md:w-64">
                    <input
                      id="parameter-search-bar"
                      type="text"
                      placeholder={lang === 'ID' ? 'Saring parameter...' : 'Search parameters...'}
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-[11px] font-bold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                    />
                    <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                {filteredServices.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {filteredServices.map((s, idx) => (
                      <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-all rounded-lg px-2">
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-slate-900 hover:text-blue-600 transition-colors leading-tight">{s.name}</span>
                            <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100 text-[8px] font-black uppercase tracking-wide">{s.category}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wide leading-none">{lang === 'ID' ? 'METODE ACUAN' : 'STANDARDS'}: {s.method}</p>
                          <p className="text-[10px] text-slate-500 font-medium mt-1 leading-normal text-slate-400">{lang === 'ID' ? 'Syarat sampel' : 'Requirements'}: {s.sampleRequirement}</p>
                        </div>

                        <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                          <div className="text-left sm:text-right">
                            <div className="text-xs font-black text-slate-950">
                              Rp {s.price.toLocaleString('id-ID')}
                            </div>
                            <span className="text-[9px] text-slate-400 block mt-0.5 font-bold uppercase">{lang === 'ID' ? 'DURASI' : 'DUR'}: {s.duration}</span>
                          </div>

                          <button
                            id={`book-service-catalog-btn-${idx}`}
                            onClick={() => onBookService(s)}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-black px-4 py-2 rounded-full text-[10px] shadow-sm uppercase tracking-wider hover:shadow-md transition-all cursor-pointer active:scale-95 inline-flex"
                          >
                            {lang === 'ID' ? 'Booking Sekarang' : 'Book Now'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    {lang === 'ID' ? 'Tidak ada parameter uji yang cocok dengan pencarian.' : 'No parameters match the search filter.'}
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT SIDE COLUMN (4 Cols) - 8. DOCUMENTS, 9. CONTACT PIC, 13. INSTRUMENTS, 14. LAB REVIEWS */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* SECTION E: 9. KONTAK PIC & KONSULTASI */}
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-2xl border border-indigo-500/20 shadow-md">
                <span className="text-[9px] font-bold text-amber-300 tracking-wider uppercase block">
                  📞 {lang === 'ID' ? 'PIC LABORATORIUM & KONSULTASI' : 'ASSIGNED PIC CONTACT'}
                </span>
                
                <h4 className="text-sm font-black mt-2.5 text-white block">
                  {lab.contact.picName}
                </h4>
                <p className="text-[10px] text-indigo-200 mt-0.5 uppercase tracking-wide font-bold">
                  {lang === 'ID' ? 'Kepala / Verifikator Lab Utama' : 'Technical Analyst Coordinator'}
                </p>

                <div className="mt-5 flex flex-col gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-205">
                    <Phone size={13} className="text-orange-400 shrink-0" />
                    <span className="font-mono text-slate-200 font-bold">{lab.contact.whatsapp}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-205">
                    <Mail size={13} className="text-orange-400 shrink-0" />
                    <span className="text-slate-200 font-medium truncate" title={lab.contact.email}>{lab.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-205">
                    <Globe size={13} className="text-orange-400 shrink-0" />
                    <a href="https://sciencehunter.co.id" target="_blank" rel="noreferrer" className="text-slate-200 hover:text-white underline font-bold truncate">
                      sciencehunter.co.id ({lang === 'ID' ? 'Website Mitra' : 'Official Web'})
                    </a>
                  </div>
                </div>

                {/* Direct Action Link to WhatsApp */}
                <a
                  id="whatsapp-direct-link"
                  href={`https://wa.me/${lab.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black h-10 rounded-xl text-xs flex items-center justify-center gap-2 mt-5 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>{lang === 'ID' ? 'Chat ke WA PIC' : 'Chat to WA PIC'}</span>
                  <ArrowRight size={13} />
                </a>
              </div>

              {/* SECTION F: 8. DOKUMEN & SOP DOWNLOADS */}
              <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-2xs">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-3">
                  📂 {lang === 'ID' ? 'DOKUMEN & SOP RESMI' : 'OFFICIAL FILES & SOP'}
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal mb-3.5">
                  {lang === 'ID' ? 'Unduh lampiran kelengkapan spesimen sebelum mengirim paket uji:' : 'Download requirements manifest checklists before dispatch:'}
                </p>

                <div className="flex flex-col gap-2">
                  {[
                    { file: 'SOP_Penerimaan_Sample.pdf', size: '1.2 MB' },
                    { file: 'Form_Manifest_Pengujian_Laboratorium.docx', size: '320 KB' },
                    { file: 'Sertifikat_Standardisasi_KAN_ITB_ITSSHI.pdf', size: '4.1 MB' }
                  ].map((fItem, fIdx) => (
                    <a
                      id={`sop-download-btn-${fIdx}`}
                      key={fIdx}
                      href="#download"
                      onClick={(e) => { e.preventDefault(); alert(`Mengunduh berkas ${fItem.file} dari server LABBOOK...`); }}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-blue-50/20 hover:border-blue-400 flex items-center justify-between group transition-all"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="text-[11px] font-black text-slate-700 block truncate group-hover:text-blue-600 transition-colors" title={fItem.file}>
                          {fItem.file}
                        </span>
                        <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{fItem.size}</span>
                      </div>
                      <FolderDown size={14} className="text-slate-400 group-hover:text-blue-650 shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* SECTION G: 13. MESIN & PERALATAN */}
              <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-2xs">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-3">
                  🛠️ {lang === 'ID' ? 'MESIN & PERALATAN UTAMA' : 'KEY INSTRUMENTATIONS'}
                </h3>

                <div className="flex flex-col gap-3">
                  {lab.instruments.map((inst, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex flex-col gap-1 shadow-2xs">
                      <div className="flex items-center justify-between gap-1">
                        <span className="px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[8px] font-extrabold text-blue-600 block shrink-0">{inst.brand}</span>
                        <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5 shrink-0">
                          <span className="h-1 w-1 rounded-full bg-emerald-500" />
                          {lang === 'ID' ? 'Siap Uji' : 'Calibrated'}
                        </span>
                      </div>
                      <h5 className="text-[11px] font-extrabold text-slate-800 leading-snug mt-1">{inst.name}</h5>
                      <p className="text-[10px] text-slate-400 leading-normal line-clamp-2 mt-0.5">{inst.specifications}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION H: 14. ULASAN PENELITI (LAB REVIEW) */}
              <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-2xs">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-3">
                  🌟 {lang === 'ID' ? 'LAB REVIEW PENELITI' : 'LAB REVIEW'}
                </h3>

                {lab.reviews.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {lab.reviews.map((rev, rIdx) => (
                      <div key={rIdx} className="bg-slate-50/60 p-3 rounded-lg border border-slate-200/50 flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[10px]">
                          <div>
                            <span className="font-extrabold text-slate-850 block">{rev.user}</span>
                            <span className="text-slate-400 font-bold block mt-0.5">({rev.date})</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-amber-500 font-bold font-mono">
                            <Star size={10} className="fill-amber-500 text-amber-500" />
                            <span>{rev.rating.toFixed(1)}</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-600 italic leading-relaxed leading-normal mt-1">
                          "{rev.comment}"
                        </p>

                        {rev.tag && (
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-black bg-blue-50 text-blue-600 border border-blue-100 self-start mt-1">
                            #{rev.tag}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-slate-400 text-[11px] font-medium">
                    {lang === 'ID' ? 'Belum ada ulasan untuk unit lab ini.' : 'No reviews posted yet.'}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
