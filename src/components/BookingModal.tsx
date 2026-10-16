import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, ShieldCheck, Mail, Phone, Building, FileSpreadsheet, MapIcon, UploadCloud, AlertTriangle } from 'lucide-react';
import { ServiceItem, LabItem, Language } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem | null;
  lab: LabItem | null;
  lang: Language;
}

export default function BookingModal({ isOpen, onClose, service, lab, lang }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 10;

  // Form states
  const [scientificField, setScientificField] = useState('Skripsi akademis');
  const [sampleName, setSampleName] = useState('');
  const [sampleForm, setSampleForm] = useState('Serbuk kering');
  const [sampleQuantity, setSampleQuantity] = useState(1);
  const [hazardCorrosive, setHazardCorrosive] = useState(false);
  const [hazardFlade, setHazardFlade] = useState(false);
  const [hazardToxic, setHazardToxic] = useState(false);
  const [hazardSafe, setHazardSafe] = useState(true);
  const [testDate, setTestDate] = useState('2026-06-25');
  const [deliveryMethod, setDeliveryMethod] = useState('Kirim via Paket Kurir (JNE/J&T/SiCepat)');
  const [researcherName, setResearcherName] = useState('');
  const [researcherPhone, setResearcherPhone] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !service || !lab) return null;

  const samplePrice = service.price * sampleQuantity;
  const adminFee = 15000;
  const courierEstimate = deliveryMethod.includes('Kurir') ? 25000 : 0;
  const totalPrice = samplePrice + adminFee + courierEstimate;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Final Submit action
      setIsSuccess(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const currentStepName = () => {
    switch (step) {
      case 1: return lang === 'ID' ? 'Pilih Deskripsi Uji' : 'Test Choice';
      case 2: return lang === 'ID' ? 'Detail Laboratorium' : 'Laboratory';
      case 3: return lang === 'ID' ? 'Kategori Keilmuan' : 'Research Field';
      case 4: return lang === 'ID' ? 'Manifest Sampel' : 'Sample Manifest';
      case 5: return lang === 'ID' ? 'Daftar Bahaya Sampel' : 'Safety Hazard';
      case 6: return lang === 'ID' ? 'Tanggal Pengujian' : 'Preferred Date';
      case 7: return lang === 'ID' ? 'Sistem Logistik Kirim' : 'Logistics Delivery';
      case 8: return lang === 'ID' ? 'Profil Pemohon' : 'Applicant Info';
      case 9: return lang === 'ID' ? 'Dokumen Lampiran' : 'Form Attachments';
      case 10: return lang === 'ID' ? 'Review & Pembayaran' : 'Overview & Submit';
      default: return '';
    }
  };

  return (
    <div id="ten-step-booking-modal" className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Banner header with progress bar */}
        <div className="bg-slate-900 text-white p-5 shrink-0 relative">
          <button
            id="close-booking-modal-top"
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full transition-colors"
          >
            <X size={15} />
          </button>

          <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest leading-none">
            {lang === 'ID' ? 'Layanan Booking Portofolio Uji' : 'PORTFOLIO TEST BOOKING PROCESS'}
          </span>
          <h3 className="text-sm font-black text-white mt-1 leading-none">
            {currentStepName()}
          </h3>

          {/* Micro Progress Bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden relative">
            <div 
              className="bg-gradient-to-r from-blue-500 to-orange-500 h-full transition-all duration-355" 
              style={{ width: `${(step / totalSteps) * 100}%` }} 
            />
          </div>
          <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1.5 uppercase tracking-wide">
            <span>STEP {step} OF {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}% COMPLETED</span>
          </div>
        </div>

        {/* Success Screen Overlay inside Modal */}
        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center gap-5 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl shadow-md">
              ✓
            </div>
            
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                {lang === 'ID' ? 'Pemesanan Berhasil Dikirim!' : 'Order Dispatched Successfully!'}
              </h2>
              <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                {lang === 'ID' 
                  ? 'Invoice pemesanan dan manifest sampel Anda telah kami proses. Mohon unduh draf invoice dan lakukan pengiriman sampel fisik Anda.' 
                  : 'We have registered your sample diagnostics request. Send physical specimens to the lab center to initiate testing.'}
              </p>
            </div>

            {/* Simulated Booking code panel */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 w-full text-left font-mono">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                RECEIPT & INVOICE DETAILS
              </div>
              <div className="flex flex-col gap-1.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>RESY CODE:</span>
                  <strong className="text-blue-600">LBBK-2026-X82F</strong>
                </div>
                <div className="flex justify-between">
                  <span>TEST:</span>
                  <span className="truncate max-w-[200px]">{service.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>LAB:</span>
                  <span className="truncate max-w-[200px]">{lab.name}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200/60 pt-1.5 mt-1 font-bold text-slate-900">
                  <span>TOTAL BILL:</span>
                  <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            <div className="border border-emerald-100 bg-emerald-50/50 p-3 rounded-xl text-[11px] text-emerald-800 max-w-sm flex items-start gap-2 text-left">
              <span>💡</span>
              <span>
                {lang === 'ID' 
                  ? 'Kami telah mengirim salinan kode manifest draf ke sistem WhatsApp PIC Anda.' 
                  : 'A copy of physical handling steps has been dispatched to your advisor.'}
              </span>
            </div>

            <button
              id="success-close-booking-btn"
              onClick={onClose}
              className="bg-slate-950 hover:bg-slate-900 text-white font-bold h-11 px-8 rounded-xl text-xs transition-colors shadow-md active:scale-95 cursor-pointer mt-2"
            >
              {lang === 'ID' ? 'Selesai & Dashboard' : 'Finish & Dashboard'}
            </button>
          </div>
        ) : (
          /* Multi-Step Forms body */
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
            
            {/* STEP 1: Choose info */}
            {step === 1 && (
              <div className="flex flex-col gap-3 animate-fadeIn">
                <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Langkah 1: Review Item Uji</span>
                <div className="bg-blue-50/50 border border-blue-150 p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-slate-800">{service.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wide font-medium">{service.category}</p>
                  
                  <div className="flex justify-between mt-3 text-xs leading-none">
                    <span className="text-slate-400 font-bold">TARIF BASE UJI SPECIMEN:</span>
                    <strong className="text-slate-900">Rp {service.price.toLocaleString('id-ID')}</strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  {lang === 'ID' 
                    ? 'Tarif ini bersifat acuan dasar sesuai formulasi metode standar KAN atau SOP institusi. Estimasi final bergantung pada kuantitas sampel.' 
                    : 'This price corresponds to baseline analysis parameters based on institutional standard operation lists.'}
                </p>
              </div>
            )}

            {/* STEP 2: Detail Lab confirmatory */}
            {step === 2 && (
              <div className="flex flex-col gap-3 animate-fadeIn">
                <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Langkah 2: Konfirmasi Tempat Laboratorium</span>
                <div className="border border-slate-150 p-4 rounded-xl flex items-start gap-3 bg-slate-50">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <img src={lab.image} alt={lab.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">{lab.name}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1 uppercase tracking-wider">{lab.institution}</p>
                    <p className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1">
                      <span>📍</span>
                      <span>{lab.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Kategori Riset */}
            {step === 3 && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Langkah 3: Pilih Jenis Kebutuhan Riset</span>
                <div className="flex flex-col gap-2.5">
                  {[
                    { val: 'Skripsi / TA', desc: 'Skripsi Sarjana / Tugas Akhir (S1/D4) Kampus Indonesia' },
                    { val: 'PKM / Program Kreativitas Mahasiswa', desc: 'Hibah PKM Belmawa Kemdikbudristek' },
                    { val: 'Tesis pascasarjana', desc: 'Riset Magister (S2/S3) & Publikasi Jurnal Q1' },
                    { val: 'Komersial / UMKM', desc: 'Sertifikasi uji industri, gizi, halal, industri' },
                    { val: 'Mandiri / Kompetisi', desc: 'Persiapan lomba karya tulis nasional' }
                  ].map((it) => (
                    <label 
                      key={it.val}
                      className={`flex justify-between items-center p-3 border rounded-xl cursor-pointer transition-all ${
                        scientificField === it.val 
                          ? 'border-blue-500 bg-blue-50/30' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800">{it.val}</span>
                        <span className="text-[10px] text-slate-400 font-medium mt-0.5">{it.desc}</span>
                      </div>
                      <input
                        type="radio"
                        name="field"
                        checked={scientificField === it.val}
                        onChange={() => setScientificField(it.val)}
                        className="h-4 w-4 text-blue-600"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Sample manifest */}
            {step === 4 && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Langkah 4: Deskripsikan Manifest Sampel</span>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500">NAMA / IDENTITAS SAMPEL</label>
                  <input
                    id="book-samp-name"
                    type="text"
                    placeholder="e.g. Bioplastik Pati Singkong-Kitosan"
                    value={sampleName}
                    onChange={(e) => setSampleName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500">BENTUK SEDIAAN FISIK</label>
                  <select
                    id="book-samp-form"
                    value={sampleForm}
                    onChange={(e) => setSampleForm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 text-slate-700"
                  >
                    <option value="Serbuk kering">Serbuk kering kering</option>
                    <option value="Cairan / Larutan suspensi">Cairan / Larutan suspensi</option>
                    <option value="Kepingan padat tipis">Kepingan padat padat</option>
                    <option value="Gel / Karakteristik pasta">Gel / Semisolid</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500">JUMLAH REPLIKASI / BULK REGISTER (SAMPEL)</label>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button" 
                      onClick={() => setSampleQuantity(Math.max(1, sampleQuantity - 1))}
                      className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold flex items-center justify-center cursor-pointer select-none"
                    >
                      -
                    </button>
                    <span className="font-extrabold text-sm w-8 text-center text-slate-900">{sampleQuantity}</span>
                    <button 
                      type="button" 
                      onClick={() => setSampleQuantity(sampleQuantity + 1)}
                      className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold flex items-center justify-center cursor-pointer select-none"
                    >
                      +
                    </button>
                    <span className="text-[10px] text-slate-400 font-bold uppercase ml-2">Total Harga Uji dikalikan {sampleQuantity}x</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Hazards warning & MSDS checklist */}
            {step === 5 && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Langkah 5: Deklarasi Risiko Keamanan (MSDS)</span>
                
                <div className="bg-amber-50 border border-amber-250 p-3.5 rounded-xl flex items-start gap-2 text-amber-900">
                  <AlertTriangle className="shrink-0 mt-0.5 text-amber-500" size={16} />
                  <div>
                    <h5 className="text-[11px] font-bold leading-none">PEMBERITAHUAN BAHAYA KIMIA DAN INSTRUMEN</h5>
                    <p className="text-[9px] text-amber-850 mt-1 leading-normal">
                      Apakah sampel uji mengandung asam pekat, logam radioaktif, reaktan gas mudah terbakar, atau mudah meledak? Centang jika berisiko.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center gap-3 p-2.5 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={hazardCorrosive} 
                      onChange={(e) => { setHazardCorrosive(e.target.checked); if (e.target.checked) setHazardSafe(false); }}
                      className="h-4 w-4 text-orange-500"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-tight">KOROSIF / ASAM KUAT</span>
                      <span className="text-[9px] text-slate-400 leading-none mt-0.5">Dapat merusak pin instrumen</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-2.5 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={hazardToxic} 
                      onChange={(e) => { setHazardToxic(e.target.checked); if (e.target.checked) setHazardSafe(false); }}
                      className="h-4 w-4 text-orange-500"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-tight">BERACUN / TOKSISITAS TINGGI</span>
                      <span className="text-[9px] text-slate-400 leading-none mt-0.5">Memerlukan ekstra kstator uap</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-2.5 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={hazardSafe} 
                      onChange={(e) => {
                        setHazardSafe(e.target.checked);
                        if (e.target.checked) {
                          setHazardCorrosive(false);
                          setHazardToxic(false);
                        }
                      }}
                      className="h-4 w-4 text-orange-500"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-tight">AMAN / BAHAN ALAM ORGANIK NETRAL</span>
                      <span className="text-[9px] text-slate-400 leading-none mt-0.5">Tidak berbahaya (misal sediaan gizi, ekstrak jamur, pati)</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 6: Date picker preferred dates */}
            {step === 6 && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Langkah 6: Tanggal Pengiriman / Pengujian</span>
                <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                  <label className="text-[10px] font-bold text-slate-550">RENTANG PILIHAN TANGGAL PENYERAHAN DETAIL</label>
                  <input
                    type="date"
                    value={testDate}
                    onChange={(e) => setTestDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                    required
                  />
                  <span className="text-[10px] text-slate-400 mt-1 leading-normal">
                    * Pastikan sampel telah tiba di laboratorium sekurangnya 1 hari sebelum rentang tanggal yang dipilih di atas.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 7: Logistics System preference */}
            {step === 7 && (
              <div className="flex flex-col gap-3.5 animate-fadeIn">
                <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Langkah 7: Metode Penyerahan / Ekspedisi Sampel</span>
                
                <div className="flex flex-col gap-2.5">
                  {[
                    'Kirim via Paket Kurir (JNE/J&T/SiCepat)',
                    'Diantar Langsung ke Gedung Lokasi Laboratorium',
                    'Ojek Online Kargo (Gojek / Grab / Lalamove)'
                  ].map((med) => (
                    <label 
                      key={med}
                      className={`flex items-center gap-3.5 p-3.5 border rounded-xl cursor-pointer transition-all ${
                        deliveryMethod === med ? 'border-blue-500 bg-blue-50/20' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={deliveryMethod === med}
                        onChange={() => setDeliveryMethod(med)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-xs font-bold text-slate-750">{med}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 8: Applicant profile info */}
            {step === 8 && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Langkah 8: Nama & Kontak Peneliti Utama</span>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400">NAMA LENGKAP PENELITI</label>
                  <input
                    id="book-rec-name"
                    type="text"
                    placeholder="e.g. Fitra Eri"
                    value={researcherName}
                    onChange={(e) => setResearcherName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400">NOMOR WHATSAPP AKTIF (INFORMASI INVOICE)</label>
                  <input
                    id="book-rec-phone"
                    type="text"
                    placeholder="e.g. +62 822-1234-5678"
                    value={researcherPhone}
                    onChange={(e) => setResearcherPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                    required
                  />
                </div>
              </div>
            )}

            {/* STEP 9: Document briefs files upload */}
            {step === 9 && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Langkah 9: Lampiran Surat Pengantar / Proposal Riset</span>
                
                <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 text-center cursor-pointer hover:bg-blue-50/15 transition-all relative">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAttachedFile(e.target.files[0]);
                      }
                    }}
                  />
                  <UploadCloud size={24} className="mx-auto text-slate-400" />
                  <p className="text-xs font-bold text-slate-755 mt-2">
                    {attachedFile ? attachedFile.name : (lang === 'ID' ? 'Seret surat pengantar di sini' : 'Drag & drop research PDF briefing here')}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">
                    {lang === 'ID' ? 'Atau Klik untuk memilih file (Maks. 10MB)' : 'Or Click to select (Max 10MB)'}
                  </p>
                </div>
              </div>
            )}

            {/* STEP 10: Overview and Submit breakdown */}
            {step === 10 && (
              <div className="flex flex-col gap-4 animate-fadeIn">
                <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Langkah 10: Ringkasan Rincian Invoice Pemesanan</span>
                
                <div className="bg-slate-50 p-4 border border-slate-150 rounded-xl flex flex-col gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Uji Analisis ({service.name}):</span>
                    <span>Rp {service.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Jumlah Replikasi Kontrol:</span>
                    <span>{sampleQuantity} sampel ({sampleQuantity}x)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Fakultas / Jenis Kebutuhan:</span>
                    <span>{scientificField}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-slate-200 pb-2 mb-2">
                    <span className="text-slate-500">Prosedur Kurir Logistik:</span>
                    <span className="text-right truncate max-w-[150px]">{deliveryMethod}</span>
                  </div>

                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Subtotal Harga Uji Sampel:</span>
                    <span>Rp {samplePrice.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Biaya Administrasi Sistem:</span>
                    <span>Rp {adminFee.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Estimasi Ongkir ({deliveryMethod.includes('Logistik') ? 'Kurir' : 'Lokal'}):</span>
                    <span>Rp {courierEstimate.toLocaleString('id-ID')}</span>
                  </div>

                  {/* Net Billing Total */}
                  <div className="flex justify-between border-t border-slate-300 pt-3 mt-1 text-sm font-black text-slate-950">
                    <span>TOTAL TAGIHAN INVOICE:</span>
                    <span className="text-orange-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="border border-amber-100 bg-amber-50/40 p-3 rounded-lg text-[10px] text-amber-800 flex items-start gap-1.5 leading-normal">
                  <ShieldCheck size={14} className="shrink-0 mt-0.5 text-amber-600" />
                  <span>
                    Anda memesan layanan resmi LABBOOK. Invoice penagihan tagihan ini akan divalidasi oleh analis verifikator utama seteleh paket sampel diterima oleh lab yang bersangkutan.
                  </span>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Modal Stepper Buttons Footer */}
        {!isSuccess && (
          <div className="p-5 border-t border-slate-100/80 bg-slate-50 shrink-0 flex justify-between gap-3">
            <button
              id="stepper-btn-back"
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`font-semibold text-xs h-10 px-4 rounded-xl flex items-center gap-1.5 border transition-all ${
                step === 1 
                  ? 'border-slate-150 text-slate-300 cursor-not-allowed bg-slate-100' 
                  : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50 active:scale-95 cursor-pointer'
              }`}
            >
              <ArrowLeft size={13} />
              <span>{lang === 'ID' ? 'Kembali' : 'Back'}</span>
            </button>

            <button
              id="stepper-btn-next"
              type="button"
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 px-6 rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <span>{step === totalSteps ? (lang === 'ID' ? 'Konfirmasi Bayar' : 'Confirm & Submit') : (lang === 'ID' ? 'Lanjut' : 'Next')}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
