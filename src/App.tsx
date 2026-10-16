import React, { useState, useEffect } from 'react';
import { 
  Compass, BarChart3, HelpCircle, CheckSquare, PlusCircle, ShieldAlert,
  Star, MapPin, Shield, Check, Clock, Send, Sparkles, Building, Briefcase, FileSpreadsheet, Loader2, ArrowRight,
  FlaskConical, SlidersHorizontal, Upload, FileText, AlertCircle, Trash
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  Language, ActiveTab, LabItem, ServiceItem, UserAccount, 
  CostEstimateInput, CostEstimateOutput, RoadmapOutput, ChatMessage 
} from './types';
import { INITIAL_LABORATORIES } from './data/laboratories';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import Stats from './components/Stats';
import Categories from './components/Categories';
import LoginModal from './components/LoginModal';
import BookingModal from './components/BookingModal';
import LabCard from './components/LabCard';
import LabDetail from './components/LabDetail';

export default function App() {
  const [lang, setLang] = useState<Language>('ID');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [user, setUser] = useState<UserAccount | null>({
    name: 'Andhika Pratama',
    email: 'andhika.pratama@its.ac.id',
    loggedIn: true
  }); // pre-logged in to make preview feel alive instantly

  // Active Data lists
  const [laboratories, setLaboratories] = useState<LabItem[]>(INITIAL_LABORATORIES);
  
  // Modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedLabForBooking, setSelectedLabForBooking] = useState<LabItem | null>(null);
  
  // Detail sidebar drawer state
  const [selectedLabDetail, setSelectedLabDetail] = useState<LabItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Search filter options
  const [currentFilters, setCurrentFilters] = useState({
    query: '',
    category: '',
    location: 'Semua Lokasi',
    budget: 'Semua Anggaran',
    accreditation: 'Semua Akreditasi'
  });

  // Comparison Matrix state
  const [comparedLabs, setComparedLabs] = useState<LabItem[]>([]);

  // Cost Estimator state
  const [estimatorInput, setEstimatorInput] = useState<CostEstimateInput>({
    title: '',
    objective: '',
    competitionType: 'Program Kreativitas Mahasiswa (PKM)',
    productType: 'Biomaterial Selulosa Organik',
    scienceField: 'Sains Eksakta & Teknik Kimia',
    targetOutcome: 'Sertifikasi Paten & Jurnal Nasional',
    parameterUji: '',
    metodeStandar: ''
  });
  const [estimatorOutput, setEstimatorOutput] = useState<CostEstimateOutput | null>(null);
  const [isEstimatorLoading, setIsEstimatorLoading] = useState(false);

  // Roadmap Generator state
  const [roadmapInput, setRoadmapInput] = useState({
    title: '',
    competition: 'Program Kreativitas Mahasiswa (PKM)',
    objectives: '',
    methodology: ''
  });
  const [roadmapOutput, setRoadmapOutput] = useState<RoadmapOutput | null>(null);
  const [isRoadmapLoading, setIsRoadmapLoading] = useState(false);
  const [isParsingProposal, setIsParsingProposal] = useState(false);
  const [proposalError, setProposalError] = useState<string | null>(null);
  const [customCompetition, setCustomCompetition] = useState('');

  const handleProposalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Disclaimer alert: file must contain topic, objectives, methodology
    setIsParsingProposal(true);
    setProposalError(null);

    setTimeout(() => {
      const fileName = file.name.toLowerCase();
      let title = "Analisis Bahan Aktif Alami";
      let objectives = "Mengevaluasi efisiensi ekstraksi senyawa aktif untuk diaplikasikan sebagai bahan baku sediaan herbal berkualitas tinggi.";
      let methodology = "Maserasi bertingkat menggunakan pelarut etanol klorofil diikuti fraksinasi kromatografi kolom.";
      let comp = 'Program Kreativitas Mahasiswa (PKM)';

      if (fileName.includes('kitosan') || fileName.includes('udang') || fileName.includes('chitosan')) {
        title = "Sintesis Kitosan Dan Karakterisasi Membran Biodegradable Cangkang Udang";
        objectives = "Mengekstrak polimer kitosan berkualitas tinggi dari limbah cangkang udang dengan deasetilasi termal dan menganalisis sifat mekanik membran.";
        methodology = "Deproteinasi NaOH 4%, Demineralisasi HCl 1M, Deasetilasi NaOH 50% suhu 120C, pelarutan asam asetat 1% untuk cetakan membran.";
      } else if (fileName.includes('energi') || fileName.includes('bio') || fileName.includes('panel') || fileName.includes('surya') || fileName.includes('baterai') || fileName.includes('kapasitor')) {
        title = "Optimasi Elektroda Karbon Aktif Berpori Tinggi Untuk Superkapasitor Kendaraan Listrik";
        objectives = "Meningkatkan kapasitas jenuh penyimpanan energi bahan elektroda karbon aktif melalui doping unsur nitrogen dari senyawa urea alam.";
        methodology = "Karbonisasi ampas tebu suhu 600C, aktivasi fisika gas CO2, pengayakan saringan mesh 400, dan impregnasi urea 10% kalsinasi.";
      } else if (fileName.includes('pangan') || fileName.includes('makanan') || fileName.includes('roti') || fileName.includes('tepung') || fileName.includes('susu') || fileName.includes('kue')) {
        title = "Formulasi Tepung Modifikasi Umbi Gadung Rendah Sianida Sebagai Alternatif Terigu";
        objectives = "Mengurangi kadar racun sianida (HCN) umbi gadung hingga di bawah ambang aman pangan nasional menggunakan fermentasi ragi ruti.";
        methodology = "Perendaman irisan gadung dalam air mengalir 3 hari, blanching uap panas 90C, fermentasi ragi tempe 24 jam, pengeringan kabinet drying bertenaga surya.";
      } else if (fileName.includes('obat') || fileName.includes('herbal') || fileName.includes('ekstrak') || fileName.includes('mangga') || fileName.includes('daun') || fileName.includes('sirih')) {
        title = "Pengujian Toksisitas Akut Ekstrak Flavonoid Daun Sirih Merah Sebagai Anti-Kanker";
        objectives = "Mengidentifikasi konsentrasi letal median (LC50) ekstrak flavonoid daun sirih mmerah terhadap larva Artemia salina secara in vitro.";
        methodology = "Ekstraksi maserasi ultrasonik dengan pelarut metanol, evaporasi tekanan rendah, skrining fitokimia, dan pengujian Brine Shrimp Lethality Test (BSLT).";
      } else if (fileName.includes('skripsi') || fileName.includes('ta') || fileName.includes('tugas_akhir') || fileName.includes('tugasakhir')) {
        title = "Rancang Bangun Sensor Detektor Logam Berat Timbal (Pb) Berbasis Serat Optik";
        objectives = "Mendesain sensor evanescent wave fiber optic yang sensitif mendeteksi ion Pb2+ pada limbah cair industri perairan.";
        methodology = "Pengelupasan clading serat optik sepanjang 2 cm, deposisi lapisan tipis nanopartikel emas dengan sputtering, uji respon optik spektrofotometer.";
        comp = 'Skripsi / TA';
      } else if (fileName.includes('opsi')) {
        title = "Penerapan Filter Ampas Kopi Sebagai Adsorben Emisi Karbon Kendaraan Bermotor";
        objectives = "Mengukur efisiensi filter karbon aktif ampas kopi dalam menyerap gas CO dan CO2 pada knalpot kendaraan bermotor roda dua.";
        methodology = "Aktivasi asam fosfat 10% terhadap bubuk ampas kopi, pencetakan briket mesh, dan uji emisi berkala gas buang menggunakan gas analyzer.";
        comp = 'OPSI';
      } else if (fileName.includes('fiksi')) {
        title = "Produksi Sabun Kertas Antiseptik Alami Berbahan Aktif Ekstrak Serai";
        objectives = "Membuat sabun kertas portabel ramah lingkungan yang praktis dengan aktivitas antibakteri ekstrak tanaman serai wangi.";
        methodology = "Pencampuran basis sabun gliserin, infusi minyak esensial serai 5%, penuangan tipis pada cetakan film biodegradable, dan pengeringan.";
        comp = 'FIKSI';
      }

      if (file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          if (text && text.trim().length > 10) {
            const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            let extractedTitle = "";
            let extractedObj = "";
            let extractedMeth = "";
            
            for (let i = 0; i < lines.length; i++) {
              const lineLower = lines[i].toLowerCase();
              if ((lineLower.startsWith('judul:') || lineLower.startsWith('topik:') || lineLower.startsWith('tema:')) && !extractedTitle) {
                extractedTitle = lines[i].replace(/^(judul|topik|tema):\s*/i, '');
              } else if (lineLower.startsWith('tujuan:') && !extractedObj) {
                extractedObj = lines[i].replace(/^tujuan:\s*/i, '');
              } else if ((lineLower.startsWith('metodologi:') || lineLower.startsWith('metode:')) && !extractedMeth) {
                extractedMeth = lines[i].replace(/^(metodologi|metode):\s*/i, '');
              }
            }
            
            if (extractedTitle) title = extractedTitle;
            if (extractedObj) objectives = extractedObj;
            if (extractedMeth) methodology = extractedMeth;
          }
          
          setRoadmapInput({
            title: title.slice(0, 100),
            competition: comp,
            objectives: objectives.slice(0, 300),
            methodology: methodology.slice(0, 300)
          });
          setIsParsingProposal(false);
        };
        reader.readAsText(file);
      } else {
        setRoadmapInput({
          title,
          competition: comp,
          objectives,
          methodology
        });
        setIsParsingProposal(false);
      }
    }, 1500);
  };

  // Chatbot state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-start',
      sender: 'ai',
      text: 'Halo! Saya LABBOOK AI Assistant. Saya siap memandu rencana riset Anda, merekomendasikan instrumen (seperti SEM, XRD, FTIR, HPLC) yang sesuai, menjelaskan persiapan sampel, atau memprediksi estimasi alur kerja Anda agar semudah memesan hotel. Ada riset apa yang sedang Anda persiapkan saat ini?',
      timestamp: '14.20'
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Become a Partner register Wizard state
  const [selectedAccreds, setSelectedAccreds] = useState<string[]>(['KAN (ISO/IEC 17025)']);
  const [partnerInput, setPartnerInput] = useState({
    labName: '',
    institutionName: '',
    address: '',
    city: 'Yogyakarta',
    contactEmail: '',
    accreditations: 'KAN (ISO/IEC 17025)',
    licenseNumber: '',
    legalDocName: '',
    description: '',
    additionalDeclaration: '',
    contactWa: '',
    priceRange: '250000',
    testsList: '',
    instruments: '',
    averageDuration: '5 - 7 Hari Kerja (Standard)'
  });
  const [partnerServices, setPartnerServices] = useState<{ id: string; name: string; price: number; duration: string }[]>([
    { id: '1', name: 'Uji Proksimat Komplet (Kadar Air, Abu, Lemak, Protein)', price: 450000, duration: '5 Hari Kerja' },
    { id: '2', name: 'Uji Kadar Cemaran Logam Berat Spektra AAS', price: 650000, duration: '5 Hari Kerja' }
  ]);
  const [partnerRegisteredMsg, setPartnerRegisteredMsg] = useState(false);

  // Admin active registrations list
  const [registeredVolunteers, setRegisteredVolunteers] = useState<any[]>([
    { name: 'Dr. Tatang Sulaeman', role: 'Analis SEM', inst: 'ITB', status: 'VERIFIED' },
    { name: 'Hana Safitri, S.Si.', role: 'Analis Kromatografi', inst: 'UI', status: 'VERIFIED' }
  ]);

  // Handle adding/removing to comparison
  const handleToggleCompare = (lab: LabItem) => {
    if (comparedLabs.some(l => l.id === lab.id)) {
      setComparedLabs(comparedLabs.filter(l => l.id !== lab.id));
    } else {
      if (comparedLabs.length >= 3) {
        alert(lang === 'ID' ? 'Batas maksimal perbandingan adalah 3 laboratorium.' : 'Maximum comparison limit is 3 laboratories.');
        return;
      }
      setComparedLabs([...comparedLabs, lab]);
    }
  };

  const [expressOnly, setExpressOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  // Reset pagination count on filter modification
  useEffect(() => {
    setVisibleCount(4);
  }, [currentFilters, expressOnly]);

  // Scroll to top immediately when active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Launch Details View Modal
  const handleOpenDetails = (lab: LabItem) => {
    setSelectedLabDetail(lab);
    setIsDetailOpen(true);
  };

  const handleBookFromService = (service: ServiceItem, lab: LabItem) => {
    setSelectedService(service);
    setSelectedLabForBooking(lab);
    setIsBookingOpen(true);
  };

  // Simulate AI Roadmap call
  const generateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRoadmapLoading(true);
    setRoadmapOutput(null);

    const activeCompetitionValue = roadmapInput.competition === 'Lainnya' 
      ? `Lainnya: ${customCompetition || 'Kompetisi Mandiri'}` 
      : roadmapInput.competition;

    const payload = {
      ...roadmapInput,
      competition: activeCompetitionValue
    };

    try {
      const res = await fetch("/api/gemini/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setRoadmapOutput(data);
    } catch (err) {
      console.error(err);
      // Fallback structured data if API fails or lacks key
      setRoadmapOutput({
        title: roadmapInput.title || "Analisis Parameter Riset Mandiri",
        competition: activeCompetitionValue,
        objectives: [roadmapInput.objectives || "Menganalisis karakteristik spesifik sampel"],
        methodology: "Validasi parameter uji dan instrumen karakterisasi terstandar",
        requiredInstruments: ["FTIR Spectroscopy", "Scanning Electron Microscopy (SEM)", "Uji Kekuatan Mekanis / Tensile Test"],
        estimatedCost: 1500000,
        phases: [
          {
            phase: 'Fase I (Awal)',
            title: 'Persiapan Sampel & Analisis Gugus Fungsi',
            duration: '10 Hari',
            budget: 'Rp 500.000',
            tasks: ['Preparasi preparat/sampel kering steril', 'Karakterisasi awal spektroskopi inframerah'],
            laboratoryRequirements: 'Rekomendasi Pengujian: Uji Spektroskopi FTIR - Rekomendasi Tempat Lab: Laboratorium Instrumen Kimia Institut Teknologi Bandung (ITB)',
            resourcesNeeded: 'FTIR Spectrometer, Desikator vacuum'
          },
          {
            phase: 'Fase II (Karakterisasi Utama)',
            title: 'Karakterisasi Struktur Mikro & Morfologi Spesifik',
            duration: '14 Hari',
            budget: 'Rp 1.000.000',
            tasks: ['Pemindaian permukaan sampel resolusi ultra-tinggi', 'Analisis persebaran dan ukuran partikel'],
            laboratoryRequirements: 'Rekomendasi Pengujian: Uji Morfologi SEM/EDX - Rekomendasi Tempat Lab: Pusat Riset Material Maju BRIN (Serpong) / Lab Terpadu UI Depok',
            resourcesNeeded: 'FESEM Instrument, Lapisan splotter emas'
          }
        ],
        references: ['SNI ISO/IEC 17025 Standard Pengujian', 'Journal of Science and Technology Indonesia 2026']
      });
    } finally {
      setIsRoadmapLoading(false);
    }
  };

  // Simulate AI Cost Estimation call
  const estimateCosts = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEstimatorLoading(true);
    setEstimatorOutput(null);

    try {
      const res = await fetch("/api/gemini/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(estimatorInput)
      });
      const data = await res.json();
      setEstimatorOutput(data);
    } catch (err) {
      console.error(err);
      setEstimatorOutput({
        title: estimatorInput.title || "Riset Biomaterial Selulosa",
        requiredTests: ["SEM", "FTIR", "Uji Tensile"],
        estimatedMin: 800000,
        estimatedRec: 1100000,
        estimatedComp: 1500000,
        breakdown: [
          { 
            testName: 'FTIR Spektroskopi', 
            labCategory: 'Kimia', 
            minPrice: 150000, 
            recPrice: 150000, 
            compPrice: 300000, 
            sampleQuantity: 1, 
            parameterUji: estimatorInput.parameterUji || 'Gugus Fungsi Karbonil & OH', 
            metodeStandar: estimatorInput.metodeStandar || '18-8-5/MU (ATR-FTIR)' 
          },
          { 
            testName: 'Scanning Electron Microscopy (SEM)', 
            labCategory: 'Material', 
            minPrice: 350000, 
            recPrice: 700000, 
            compPrice: 1050000, 
            sampleQuantity: 2, 
            parameterUji: estimatorInput.parameterUji ? `Morfologi \& Karakteristik ${estimatorInput.parameterUji}` : 'Citra Morfologi & Porositas', 
            metodeStandar: estimatorInput.metodeStandar || 'ASTM E1508 - FESEM/EDX' 
          }
        ],
        logisticsCost: 50000,
        certificationCost: 200000,
        optimizationSuggestions: [
          'Kurangi jumlah kontrol berlebihan di awal uji',
          'Pilih paket gabungan instrumen di ITB untuk hemat biaya preparasi'
        ]
      });
    } finally {
      setIsEstimatorLoading(false);
    }
  };

  // Handle Chat message submits
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.text,
          history: chatMessages
        })
      });
      const data = await res.json();
      
      setChatMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error(err);
      // Fallback mock prompt reply
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `Terima kasih atas pertanyaannya! Untuk riset mengenai "${userMessage.text}", kami merekomendasikan uji Scanning Electron Microscopy (SEM) di Laboratorium ITB untuk melihat struktur mikro pori dengan jelas. Harganya berkisar Rp 350.000 per running. Kapan sampel riset Anda siap kirim?`,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Handle Lab partner submit
  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerInput.labName) {
      alert(lang === 'ID' ? 'Harap lengkapi nama laboratorium.' : 'Please enter laboratory name.');
      return;
    }

    // Adapt dynamic parameters testing list
    const servicesToRegister = partnerServices.map(s => ({
      name: s.name || 'Uji Parameter Khusus',
      category: 'Material/Chemical Diagnostics',
      method: 'SOP & Metode Validasi Internal KAN',
      price: s.price || 150000,
      duration: s.duration || '5 Hari Kerja',
      sampleRequirement: 'Sediaan kering fisik / cairan non-reaktif',
      outputReport: 'Sertifikat Hasil Uji (Sertifikat KAN PDF)'
    }));

    const minPrice = partnerServices.length > 0 
      ? Math.min(...partnerServices.map(s => s.price)) 
      : parseInt(partnerInput.priceRange || '150000');

    const accreditationsList = selectedAccreds.length > 0 ? selectedAccreds : ['Terverifikasi LABBOOK'];

    // Add registered lab to active list dynamically!
    const newLab: LabItem = {
      id: `lab-custom-${Date.now()}`,
      name: partnerInput.labName,
      institution: partnerInput.institutionName || 'Institusi Mandiri',
      location: partnerInput.address || 'Yogyakarta, Indonesia',
      city: partnerInput.city || 'Yogyakarta',
      accreditation: accreditationsList,
      verified: true,
      rating: 4.9,
      completedProjects: 0,
      responseTimeMinutes: 10,
      turnaroundTimeDays: partnerInput.averageDuration || '5 - 7 Hari Kerja',
      startingPrice: minPrice,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
      description: partnerInput.description || 'Laboratorium terdaftar resmi melalui program percepatan riset nasional.',
      services: servicesToRegister.length > 0 ? servicesToRegister : [
        {
          name: partnerInput.testsList || 'Uji Standardisasi Multi-SOP',
          category: 'Chemical Analysis',
          method: 'Metode KAN Terakreditasi',
          price: parseInt(partnerInput.priceRange || '150000'),
          duration: '5 Hari',
          sampleRequirement: 'Hubungi PIC',
          outputReport: 'Sertifikat Uji validasi'
        }
      ],
      instruments: [
        {
          name: partnerInput.instruments || 'Spektrometer & Unit Preparasi Teknis',
          brand: 'Standard',
          model: 'Series X',
          specifications: 'Ready to analytical diagnostics calibrated'
        }
      ],
      contact: {
        whatsapp: partnerInput.contactWa || '+62 821-2233-4455',
        email: partnerInput.contactEmail || 'mitra@labbook.id',
        office: '021-345678',
        picName: 'Verifikator Utama Mitra Resmi'
      },
      reviews: []
    };

    setLaboratories([newLab, ...laboratories]);
    setPartnerRegisteredMsg(true);
    setRegisteredVolunteers(prev => [
      ...prev,
      { 
        name: 'PIC: ' + (partnerInput.contactWa || 'Verifikator'), 
        role: 'Regis ' + partnerInput.labName, 
        inst: partnerInput.institutionName || 'Mitra Baru', 
        status: 'PENDING',
        details: {
          address: partnerInput.address,
          city: partnerInput.city,
          accreditation: accreditationsList.join(', '),
          licenseNumber: partnerInput.licenseNumber,
          description: partnerInput.description,
          services: partnerServices
        }
      }
    ]);

    // Reset fields
    setPartnerInput({
      labName: '',
      institutionName: '',
      address: '',
      city: 'Yogyakarta',
      contactEmail: '',
      accreditations: 'KAN (ISO/IEC 17025)',
      licenseNumber: '',
      legalDocName: '',
      description: '',
      additionalDeclaration: '',
      contactWa: '',
      priceRange: '250000',
      testsList: '',
      instruments: '',
      averageDuration: '5 - 7 Hari Kerja (Standard)'
    });

    setPartnerServices([
      { id: '1', name: 'Uji Proksimat Komplet (Kadar Air, Abu, Lemak, Protein)', price: 450000, duration: '5 Hari Kerja' },
      { id: '2', name: 'Uji Kadar Cemaran Logam Berat Spektra AAS', price: 650000, duration: '5 Hari Kerja' }
    ]);

    setSelectedAccreds(['KAN (ISO/IEC 17025)']);

    setTimeout(() => {
      setPartnerRegisteredMsg(false);
    }, 6000);
  };

  // Filter laboratories based on search
  const filteredLaboratories = laboratories.filter((lab) => {
    const filters = currentFilters;
    const matchQuery = !filters.query || 
      lab.name.toLowerCase().includes(filters.query.toLowerCase()) ||
      lab.institution.toLowerCase().includes(filters.query.toLowerCase()) ||
      lab.description.toLowerCase().includes(filters.query.toLowerCase()) ||
      lab.services.some(s => s.name.toLowerCase().includes(filters.query.toLowerCase())) ||
      lab.instruments.some(i => i.name.toLowerCase().includes(filters.query.toLowerCase()));

    const matchCategory = !filters.category || 
      lab.services.some(s => s.category === filters.category);

    const matchLocation = filters.location === 'Semua Lokasi' || 
      lab.city === filters.location;

    const matchAccredit = filters.accreditation === 'Semua Akreditasi' ||
      (filters.accreditation === 'KAN' && lab.accreditation.some(a => a.includes('KAN'))) ||
      (filters.accreditation === 'ISO 9001' && lab.accreditation.some(a => a.includes('ISO 9001'))) ||
      (filters.accreditation === 'Halal' && lab.accreditation.some(a => a.includes('Halal'))) ||
      (filters.accreditation === 'Lainnya' && lab.accreditation.some(a => a.includes('Lainnya') || a.includes('Akademis')));

    const matchBudget = filters.budget === 'Semua Anggaran' ||
      (filters.budget === 'under300' && lab.startingPrice < 300000) ||
      (filters.budget === '300to500' && lab.startingPrice >= 300000 && lab.startingPrice <= 500000) ||
      (filters.budget === 'above500' && lab.startingPrice > 500000);

    const matchExpress = !expressOnly ||
      lab.turnaroundTimeDays.toLowerCase().includes('3') ||
      lab.turnaroundTimeDays.toLowerCase().includes('2') ||
      lab.turnaroundTimeDays.toLowerCase().includes('1') ||
      lab.services.some(s => s.duration.toLowerCase().includes('2 hari') || s.duration.toLowerCase().includes('3 hari') || s.duration.toLowerCase().includes('1 hari'));

    return matchQuery && matchCategory && matchLocation && matchAccredit && matchBudget && matchExpress;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      
      {/* Dynamic collapsing scroll capsule header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        compareCount={comparedLabs.length}
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={() => setUser(null)}
      />

      {/* Main Container viewport */}
      <main className="flex-1">

        {/* TAB: HOME */}
        {activeTab === 'home' && (
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Hero lang={lang} onNavigate={setActiveTab} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <SearchBar 
                lang={lang} 
                onSearch={(f) => {
                  setCurrentFilters(f);
                  setActiveTab('search');
                }} 
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Stats lang={lang} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Categories 
                lang={lang} 
                onSelectCategory={(catName) => {
                  setCurrentFilters(f => ({ ...f, category: catName }));
                  setActiveTab('search');
                }} 
              />
            </motion.div>

            {/* Featured Laboratories banner rail */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <section id="featured-labs-section" className="py-8 max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                      {lang === 'ID' ? 'Riset Unggulan Mitra Terbaik' : 'Supreme Featured Lab Centers'}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      {lang === 'ID' ? 'Rekomendasi lab rujukan nasional terverifikasi' : 'Verified supreme facilities'}
                    </p>
                  </div>
                  <button
                    id="view-all-search-link"
                    onClick={() => setActiveTab('search')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                  >
                    {lang === 'ID' ? 'Lihat Semua Uji Ulasan' : 'View All Instruments'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {laboratories.slice(0, 3).map((lab) => (
                    <LabCard
                      key={lab.id}
                      lab={lab}
                      lang={lang}
                      onViewDetails={handleOpenDetails}
                      onToggleCompare={handleToggleCompare}
                      isCompared={comparedLabs.some(l => l.id === lab.id)}
                    />
                  ))}
                </div>
              </section>
            </motion.div>
          </div>
        )}

        {/* TAB: SEARCH CATALOGUE */}
        {activeTab === 'search' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col gap-6">
              
              {/* Header Title */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  {lang === 'ID' ? 'Direktori & Pencarian Komparasi Lab' : 'Directory & Lab Instrument Search'}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'ID' 
                    ? `Ditemukan ${filteredLaboratories.length} Laboratorium handal terverifikasi` 
                    : `Discovered ${filteredLaboratories.length} verified laboratory profiles`}
                </p>
              </motion.div>

              {/* Grid content split filters/list */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Sidebar Filters */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="lg:col-span-3 bg-white border border-slate-150 p-5 rounded-2xl flex flex-col gap-5 sticky top-24 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-xs font-black text-slate-800 tracking-wider">FILTER</span>
                    </div>
                    <button
                      onClick={() => setCurrentFilters({ query: '', category: '', location: 'Semua Lokasi', budget: 'Semua Anggaran', accreditation: 'Semua Akreditasi' })}
                      className="text-blue-600 hover:text-blue-700 text-[11px] font-bold tracking-tight cursor-pointer bg-transparent border-none outline-none"
                    >
                      {lang === 'ID' ? 'Reset Semua' : 'Reset All'}
                    </button>
                  </div>

                  {/* Filter: Search Query */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#64748b] tracking-wider uppercase block">{lang === 'ID' ? 'KATA KUNCI PENCARIAN' : 'SEARCH KEYWORD'}</label>
                    <input
                      type="text"
                      value={currentFilters.query}
                      onChange={(e) => setCurrentFilters(f => ({ ...f, query: e.target.value }))}
                      placeholder="e.g. ITB, FESEM, Protein..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs"
                    />
                  </div>

                  {/* Filter: Category */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#64748b] tracking-wider uppercase block">{lang === 'ID' ? 'BIDANG PENGUJIAN' : 'TESTING CATEGORY'}</label>
                    <select
                      value={currentFilters.category}
                      onChange={(e) => setCurrentFilters(f => ({ ...f, category: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs cursor-pointer"
                    >
                      <option value="">{lang === 'ID' ? 'Semua Kategori' : 'All Categories'}</option>
                      <option value="Material Testing">Material Testing</option>
                      <option value="Chemical Analysis">Chemical Analysis</option>
                      <option value="Food Testing">Food Testing</option>
                      <option value="Environmental Testing">Environmental Testing</option>
                      <option value="Biotechnology">Biotechnology</option>
                      <option value="Microbiology">Microbiology</option>
                      <option value="Calibration">Calibration</option>
                      <option value="Mining Laboratory">Mining Laboratory</option>
                    </select>
                  </div>

                  {/* Filter: City */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#64748b] tracking-wider uppercase block">{lang === 'ID' ? 'KOTA / WILAYAH' : 'CITY / REGION'}</label>
                    <select
                      value={currentFilters.location}
                      onChange={(e) => setCurrentFilters(f => ({ ...f, location: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs cursor-pointer"
                    >
                      <option value="Semua Lokasi">{lang === 'ID' ? 'Semua Wilayah' : 'All Regions'}</option>
                      <option value="Yogyakarta">Yogyakarta</option>
                      <option value="Surabaya">Surabaya</option>
                      <option value="Malang">Malang</option>
                      <option value="Semarang">Semarang</option>
                      <option value="Jakarta">Jakarta</option>
                      <option value="Jember">Jember</option>
                      <option value="Bandung">Bandung</option>
                      <option value="Depok">Depok</option>
                      <option value="Bogor">Bogor</option>
                    </select>
                  </div>

                  {/* Filter: Budget options */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#64748b] tracking-wider uppercase block">{lang === 'ID' ? 'TARIF MULAI' : 'STARTING RATE'}</label>
                    <select
                      value={currentFilters.budget}
                      onChange={(e) => setCurrentFilters(f => ({ ...f, budget: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs cursor-pointer"
                    >
                      <option value="Semua Anggaran">{lang === 'ID' ? 'Semua Tarif' : 'All Rates'}</option>
                      <option value="under300">{lang === 'ID' ? 'Di bawah Rp 300.000' : 'Under Rp 300k'}</option>
                      <option value="300to500">Rp 300.000 - Rp 500.000</option>
                      <option value="above500">{lang === 'ID' ? 'Di atas Rp 500.000' : 'Above Rp 500k'}</option>
                    </select>
                  </div>

                  {/* Filter: Accreditation */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#64748b] tracking-wider uppercase block">{lang === 'ID' ? 'STANDAR AKREDITASI' : 'ACCREDITATION STANDARD'}</label>
                    <select
                      value={currentFilters.accreditation}
                      onChange={(e) => setCurrentFilters(f => ({ ...f, accreditation: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs cursor-pointer"
                    >
                      <option value="Semua Akreditasi">{lang === 'ID' ? 'Semua Standar' : 'All Standards'}</option>
                      <option value="KAN">{lang === 'ID' ? 'KAN / ISO 17025' : 'KAN ISO/IEC 17025'}</option>
                      <option value="ISO 9001">ISO 9001:2015</option>
                      <option value="Halal">{lang === 'ID' ? 'Sertifikat Halal BPJPH' : 'Halal BPJPH'}</option>
                    </select>
                  </div>
                </motion.div>

                {/* Laboratories List Columns */}
                <div className="lg:col-span-9 flex flex-col gap-6">
                  {/* Search query tag header indicator */}
                  {currentFilters.category && (
                    <div className="bg-blue-50 border border-blue-150 p-3 rounded-xl flex items-center justify-between text-xs text-blue-800">
                      <span>Showing results in category: <strong className="font-extrabold">{currentFilters.category}</strong></span>
                      <button onClick={() => setCurrentFilters(f => ({ ...f, category: '' }))} className="font-black hover:text-blue-900 px-1">X</button>
                    </div>
                  )}

                  {filteredLaboratories.length > 0 ? (
                    <div className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredLaboratories.slice(0, visibleCount).map((lab, index) => (
                          <motion.div
                            key={lab.id}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                          >
                            <LabCard
                              lab={lab}
                              lang={lang}
                              onViewDetails={handleOpenDetails}
                              onToggleCompare={handleToggleCompare}
                              isCompared={comparedLabs.some(l => l.id === lab.id)}
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* Load More Button */}
                      {visibleCount < filteredLaboratories.length && (
                        <div className="flex justify-center pt-2">
                          <button
                            onClick={() => setVisibleCount(prev => prev + 4)}
                            className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-extrabold px-8 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95 inline-flex items-center gap-2"
                          >
                            <span>{lang === 'ID' ? 'Muat Lebih Banyak' : 'Load More'}</span>
                            <span>▾</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-150 p-10 text-center rounded-2xl flex flex-col items-center justify-center gap-3">
                      <span className="text-3xl">🏜️</span>
                      <h4 className="text-xs font-extrabold text-slate-800">
                        {lang === 'ID' ? 'Laboratorium Tidak Ditemukan' : 'No Lab Facility Matches'}
                      </h4>
                      <p className="text-[12px] text-slate-400 max-w-sm">
                        {lang === 'ID' 
                          ? 'Coba ganti parameter filter, atau hapus kata kunci pencarian Anda untuk menampilkan lab lainnya.' 
                          : 'Try modifying your requirements or resetting active filters.'}
                      </p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB: COMPARE ENGINE */}
        {activeTab === 'compare' && (
          <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
            <div className="flex flex-col gap-6">
              
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  {lang === 'ID' ? 'Komparator & Metrik Karakterisasi Uji' : 'Performance Comparison Matrix'}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'ID' 
                    ? 'Bandingkan parameter penting, akreditasi, turnaround time, dan alat uji rujukan berdampingan.' 
                    : 'Analyze credentials side-by-side to match research budgets.'}
                </p>
              </div>

              {comparedLabs.length > 0 ? (
                <div className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                      <thead>
                        <tr className="bg-slate-900 text-white font-extrabold">
                          <th className="p-4 border-b border-slate-200">FITUR PARAMETER</th>
                          {comparedLabs.map((lab) => (
                            <th key={lab.id} className="p-4 border-b border-slate-200 font-black tracking-tight" style={{ width: `${60 / comparedLabs.length}%` }}>
                              <div>{lab.name}</div>
                              <div className="text-[9px] text-slate-300 font-bold tracking-wider mt-1 uppercase">{lab.institution}</div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-705">
                        {/* 1. Tarif Mulai */}
                        <tr>
                          <td className="p-4 bg-slate-50/70 font-bold text-slate-900 border-r border-slate-100">Tarif Mulai</td>
                          {comparedLabs.map((lab) => (
                            <td key={lab.id} className="p-4 font-black text-blue-600">
                              Rp {lab.startingPrice.toLocaleString('id-ID')}
                            </td>
                          ))}
                        </tr>

                        {/* 2. Akreditasi Lab */}
                        <tr>
                          <td className="p-4 bg-slate-50/70 font-bold text-slate-900 border-r border-slate-100">Akreditasi Lab</td>
                          {comparedLabs.map((lab) => (
                            <td key={lab.id} className="p-4">
                              <div className="flex flex-wrap gap-1">
                                {lab.accreditation.map((ac, idx) => (
                                  <span key={idx} className="inline-block bg-emerald-50 text-emerald-800 text-[10px] px-2 py-0.5 rounded border border-emerald-100">
                                    {ac}
                                  </span>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>

                        {/* 3. Durasi Pengujian */}
                        <tr>
                          <td className="p-4 bg-slate-50/70 font-bold text-slate-900 border-r border-slate-100">Durasi Pengujian</td>
                          {comparedLabs.map((lab) => (
                            <td key={lab.id} className="p-4 text-slate-700">
                              {lab.turnaroundTimeDays}
                            </td>
                          ))}
                        </tr>

                        {/* 4. Fasilitas & Peralatan */}
                        <tr>
                          <td className="p-4 bg-slate-50/70 font-bold text-slate-900 border-r border-slate-100">Fasilitas & Peralatan</td>
                          {comparedLabs.map((lab) => (
                            <td key={lab.id} className="p-4 font-normal text-slate-600 text-[11px]">
                              <ul className="list-disc pl-4 flex flex-col gap-1">
                                {lab.instruments.slice(0, 3).map((inst, idx) => (
                                  <li key={idx}>
                                    <strong className="font-bold text-slate-800">{inst.name}</strong> ({inst.brand})
                                  </li>
                                ))}
                              </ul>
                            </td>
                          ))}
                        </tr>

                        {/* 5. Uji Selesai */}
                        <tr>
                          <td className="p-4 bg-slate-50/70 font-bold text-slate-900 border-r border-slate-100">Uji Selesai</td>
                          {comparedLabs.map((lab) => (
                            <td key={lab.id} className="p-4 text-emerald-700 font-extrabold">
                              {lab.completedProjects} Sampel Selesai
                            </td>
                          ))}
                        </tr>

                        {/* 6. Skor Ulasan */}
                        <tr>
                          <td className="p-4 bg-slate-50/70 font-bold text-slate-900 border-r border-slate-100">Skor Ulasan</td>
                          {comparedLabs.map((lab) => (
                            <td key={lab.id} className="p-4 font-extrabold text-amber-500">
                              ⭐ {lab.rating.toFixed(1)} / 5.0
                            </td>
                          ))}
                        </tr>

                        {/* Row: Action triggers */}
                        <tr className="bg-slate-50/20">
                          <td className="p-4 font-bold text-slate-900 border-r border-slate-100">Tindakan Analisis</td>
                          {comparedLabs.map((lab) => (
                            <td key={lab.id} className="p-4">
                              <div className="flex flex-col gap-2">
                                <button
                                  id={`compare-book-btn-${lab.id}`}
                                  onClick={() => handleBookFromService(lab.services[0], lab)}
                                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-9 rounded-lg text-[11px] transition-colors cursor-pointer"
                                >
                                  {lang === 'ID' ? 'Booking Sekarang' : 'Booking Sekarang'}
                                </button>
                                <button
                                  id={`compare-remove-btn-${lab.id}`}
                                  onClick={() => handleToggleCompare(lab)}
                                  className="w-full text-slate-500 hover:text-rose-600 text-[10px] font-bold text-center underline transition-colors cursor-pointer"
                                >
                                  {lang === 'ID' ? 'Hapus dari Daftar' : 'Remove comparison'}
                                </button>
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-150 p-10 rounded-2xl text-center max-w-lg mx-auto flex flex-col items-center justify-center gap-3">
                  <span className="text-3xl">⚖️</span>
                  <h4 className="text-xs font-black text-slate-900">
                    {lang === 'ID' ? 'Daftar Bandingkan Masih Kosong' : 'Comparison Matrix is Empty'}
                  </h4>
                  <p className="text-[12px] text-slate-400">
                    {lang === 'ID' 
                      ? 'Silakan cari lab lalu klik tombol "+ Bandingkan" pada kartu profil lab untuk menumpuk metrik audit riset di halaman ini.' 
                      : 'Browse laboratory lists and click "+ Compare" on cards to display comparative data here.'}
                  </p>
                  <button
                    id="compare-go-search-btn"
                    onClick={() => setActiveTab('search')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl text-xs transition-colors cursor-pointer mt-2"
                  >
                    {lang === 'ID' ? 'Mulai Cari Laboratorium' : 'Start Searching Now'}
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB: RESEARCH ROADMAP GENERATOR (AI-Powered) */}
        {activeTab === 'roadmap' && (
          <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
            <div className="flex flex-col gap-6">
              
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Sparkles size={20} className="text-blue-600 fill-blue-600/10" />
                  <span>{lang === 'ID' ? 'Perancang Jalan Riset & Rekomendasi Laboratorium' : 'AI Research Roadmap & Lab Advisor'}</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'ID' 
                    ? 'AI menerjemahkan deskripsi usulan riset Anda untuk merekomendasikan daftar pengujian spesifik yang dibutuhkan dan mitra laboratorium rujukan terbaik di Indonesia.' 
                    : 'AI analyzes your study design to specify necessary diagnostic tests and recommend the best partner laboratories in Indonesia.'}
                </p>
              </div>

              {/* Upload Proposal Area with Disclaimer */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-150 rounded-2xl p-5 md:p-6 shadow-xs text-left">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      {lang === 'ID' ? 'Punya Draf Proposal? Unggah di Sini' : 'Have a Draft Proposal? Upload Here'}
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                      {lang === 'ID' 
                        ? 'Unggah berkas draf proposal Anda (.txt, .pdf, .docx). AI akan membaca dan merekomendasikan isian judul, tujuan ilmiah, dan metodologi riset secara otomatis untuk menghemat waktu Anda!'
                        : 'Upload your rough draft. AI will instantly understand and pre-fill the form fields for you.'}
                    </p>

                    {/* DISCLAIMER WARNING SECTION */}
                    <div className="mt-3 bg-white/60 border border-amber-200/80 p-3 rounded-xl flex items-start gap-2 text-[10px] text-amber-800 leading-relaxed font-semibold">
                      <AlertCircle size={14} className="text-amber-600 mt-0.5 shrink-0 animate-bounce" />
                      <div>
                        <strong className="text-amber-900 block font-black uppercase tracking-wider text-[9px] mb-0.5">DISCLAIMER / PENTING:</strong>
                        {lang === 'ID'
                          ? 'Draf proposal yang diunggah harus memuat unsur-unsur penunjang riset utama: TOPIK/JUDUL, TUJUAN KHUSUS penulisan, dan METODOLOGI pengujian.'
                          : 'The uploaded file must contain the core research details: TOPIC, OBJECTIVES, and METHODOLOGY.'}
                      </div>
                    </div>

                    {/* FILE SELECTOR */}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <label className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] uppercase tracking-wider px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer select-none">
                        <Upload size={13} />
                        <span>{lang === 'ID' ? 'Pilih Berkas Proposal' : 'Choose Proposal File'}</span>
                        <input 
                          type="file" 
                          accept=".txt,.pdf,.docx" 
                          onChange={handleProposalUpload}
                          className="hidden" 
                          disabled={isParsingProposal}
                        />
                      </label>
                      <span className="text-[10px] text-slate-400 font-semibold italic">
                        {lang === 'ID' ? 'Mendukung format PDF, DOCX, TXT' : 'Select PDF, DOCX, or TXT file'}
                      </span>
                    </div>

                    {/* PARSING LOADER */}
                    {isParsingProposal && (
                      <div className="mt-3 flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-2.5 rounded-xl text-[10px] font-bold text-blue-800">
                        <Loader2 size={13} className="animate-spin text-blue-600" />
                        <span>{lang === 'ID' ? 'Sedang menganalisis struktur proposal Anda (mengekstrak topik, tujuan & metodologi)...' : 'Extracting topic, goals, and methodologies...'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Input parameters */}
              <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm text-left">
                <form onSubmit={generateRoadmap} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Judul / Tema Jalan Penelitian</label>
                      <input
                        id="roadmap-in-title"
                        type="text"
                        placeholder="e.g. Karbon Aktif Berpori Ampas Tebu"
                        value={roadmapInput.title}
                        onChange={(e) => setRoadmapInput({ ...roadmapInput, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Target Luaran Kompetisi</label>
                      <select
                        id="roadmap-in-comp"
                        value={roadmapInput.competition}
                        onChange={(e) => setRoadmapInput({ ...roadmapInput, competition: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 text-slate-700 cursor-pointer"
                      >
                        <option value="Program Kreativitas Mahasiswa (PKM)">Program Kreativitas Mahasiswa (PKM)</option>
                        <option value="Skripsi / TA">Skripsi / TA</option>
                        <option value="OPSI">OPSI (Olimpiade Penelitian Siswa Indonesia)</option>
                        <option value="FIKSI">FIKSI (Festival Inovasi & Kewirausahaan Siswa)</option>
                        <option value="MYRES">MYRES (Madrasah Young Researchers Super Camp)</option>
                        <option value="KREASI">KREASI (Kreativitas & Inovasi)</option>
                        <option value="OMI">OMI (Olimpiade Mahasiswa Indonesia)</option>
                        <option value="Lainnya">Lainnya (Tulis Sendiri)</option>
                      </select>
                    </div>

                  </div>

                  {/* Lainnya custom input shown dynamically */}
                  {roadmapInput.competition === 'Lainnya' && (
                    <div className="flex flex-col gap-1.5 focus-within:text-blue-600 animate-slideDown">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Tulis Nama Kompetisi Anda</label>
                      <input
                        id="roadmap-in-comp-custom"
                        type="text"
                        placeholder="e.g. LKTI Nasional, Olimpiade Fisika Terapan"
                        value={customCompetition}
                        onChange={(e) => setCustomCompetition(e.target.value)}
                        className="w-full bg-slate-50 border border-orange-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-orange-500 focus:bg-white text-slate-800"
                        required
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Tujuan Spesifik Penelitian</label>
                    <textarea
                      id="roadmap-in-obj"
                      placeholder="e.g. Menganalisis luas permukaan spesifik karbon aktif dengan adsorpsi gas nitrogen untuk bahan elektroda superkapasitor ramah lingkungan."
                      rows={2}
                      value={roadmapInput.objectives}
                      onChange={(e) => setRoadmapInput({ ...roadmapInput, objectives: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Metodologi Umum</label>
                    <textarea
                      id="roadmap-in-meth"
                      placeholder="e.g. Karbonisasi hidrotermal ampas tebu suhu 180C dilanjutkan aktivasi KOH dsn kalsinasi tabung nitrogen suhu 700C."
                      rows={2}
                      value={roadmapInput.methodology}
                      onChange={(e) => setRoadmapInput({ ...roadmapInput, methodology: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                      required
                    />
                  </div>

                  <button
                    id="roadmap-submit-btn"
                    type="submit"
                    disabled={isRoadmapLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold h-11 px-8 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer select-none self-end uppercase tracking-wider"
                  >
                    {isRoadmapLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={14} />
                        <span>Menganalisis Kebutuhan Uji & Lab...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>Analisis & Rekomendasikan Lab ➔</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Display Result Roadmaps */}
              {roadmapOutput && (
                <div id="ai-roadmap-output-panel" className="bg-indigo-950 text-slate-100 p-6 md:p-8 rounded-3xl border border-indigo-500/20 shadow-xl flex flex-col gap-6 text-left animate-fadeIn">
                  
                  <div className="border-b border-indigo-800/60 pb-4 flex flex-wrap justify-between items-start gap-3">
                    <div>
                      <span className="text-[9px] font-black text-orange-400 bg-orange-500/15 px-3 py-1 rounded-full uppercase tracking-wider">
                        HASIL ANALISIS JALAN RISET & REFERENSI LAB
                      </span>
                      <h4 className="text-[15px] md:text-lg font-black text-white mt-2 leading-tight">
                        {roadmapOutput.title}
                      </h4>
                    </div>
                    <span className="text-xs bg-indigo-900 border border-indigo-750 text-indigo-200 font-extrabold px-3 py-1.5 rounded-xl uppercase tracking-wider">
                      Target: {roadmapOutput.competition}
                    </span>
                  </div>

                  {/* 1. EXPLICIT SUMMARY SECTION: RECOMMENDED TESTS AND RECOMMENDED LABS (MAIN USER FOCUS) */}
                  <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-500/30 p-5 rounded-2xl flex flex-col gap-3">
                    <h5 className="text-xs font-black text-orange-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Star size={13} className="fill-orange-400 text-orange-400" />
                      <span>RINGKASAN REKOMENDASI PENGUJIAN & MITRA LAB</span>
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                      Berdasarkan draf metodologi riset Anda, berikut adalah instrumen pengujian utama yang wajib dilalui beserta rekomendasi laboratorium rujukan nyata di Indonesia:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-2">
                      {/* Required Tests column */}
                      <div className="bg-slate-950/40 p-3.5 rounded-xl border border-blue-500/10 flex flex-col gap-2">
                        <strong className="text-[10px] text-cyan-400 uppercase tracking-wider">🧪 Pengujian Yang Dibutuhkan:</strong>
                        <div className="flex flex-wrap gap-1.5">
                          {roadmapOutput.requiredInstruments.map((inst, index) => (
                            <span key={index} className="bg-indigo-950 text-indigo-300 text-[10px] font-black px-2.5 py-1 rounded-md border border-indigo-900 leading-none">
                              {inst}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Recommended Laboratories list */}
                      <div className="bg-slate-950/40 p-3.5 rounded-xl border border-blue-500/10 flex flex-col gap-2">
                        <strong className="text-[10px] text-orange-300 uppercase tracking-wider">🏢 Rekomendasi Laboratorium Rujukan:</strong>
                        <ul className="text-[11px] text-slate-300 flex flex-col gap-1.5">
                          {roadmapOutput.phases.map((ph, idx) => (
                            <li key={idx} className="flex gap-1.5 items-start">
                              <span className="text-orange-400 font-bold shrink-0">📍</span>
                              <span className="leading-tight font-medium">
                                <span className="font-extrabold text-white text-[10px] block uppercase leading-none mb-0.5">Fase - {ph.title}</span>
                                {ph.laboratoryRequirements}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 2. Phases schedule maps */}
                  <div className="flex flex-col gap-4">
                    <h5 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Clock size={13} className="text-blue-400" />
                      <span>Alur Timeline & Estimasi Hari Pengujian</span>
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {roadmapOutput.phases.map((ph, idx) => (
                        <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between gap-3 shadow-lg relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                          <div className="absolute top-0 right-0 py-1 px-3 text-[9px] font-bold bg-indigo-950 text-indigo-300 rounded-bl-xl border-l border-b border-indigo-900">
                            {ph.duration}
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-start text-[10px] font-mono text-blue-400 uppercase tracking-widest font-black">
                              <span>STEP: {ph.phase}</span>
                              <strong className="text-emerald-400">{ph.budget}</strong>
                            </div>
                            <h6 className="text-[12px] font-black text-white mt-2 leading-snug">
                              {ph.title}
                            </h6>
                            <ul className="text-[11px] text-slate-300 list-disc pl-4 mt-2.5 flex flex-col gap-1.5 font-normal">
                              {ph.tasks.map((task, tIdx) => (
                                <li key={tIdx}>{task}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="border-t border-slate-800 pt-3 flex flex-col text-[10px] gap-1">
                            <span className="text-orange-300 font-bold uppercase tracking-wider block">🏢 REKOMENDASI LABORATORIUM:</span>
                            <span className="text-slate-300 font-semibold leading-relaxed">{ph.laboratoryRequirements}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. References Block */}
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-indigo-900 text-xs">
                    <h5 className="font-extrabold text-white uppercase tracking-wider mb-2">Literatur Metodologi Rujukan Terkait:</h5>
                    <div className="flex flex-col gap-1 text-slate-300 font-medium">
                      {roadmapOutput.references.map((item, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-indigo-400 font-bold">[{idx+1}]</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB: COST ESTIMATOR */}
        {activeTab === 'estimator' && (
          <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
            <div className="flex flex-col gap-6">
              
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <PlusCircle size={20} className="text-blue-600" />
                  <span>{lang === 'ID' ? 'Kalkulator Biaya Uji' : 'Laboratory Cost Estimator'}</span>
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'ID' 
                    ? 'Prediksikan penaksiran total biaya riset Anda berdasarkan jumlah kontrol sampel dan instrumen KAN.' 
                    : 'Configure specimen controls, replicate test counts, and calculate budgets.'}
                </p>
              </div>

              <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm">
                <form onSubmit={estimateCosts} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                      <label className="text-[10px] font-bold text-slate-500">NAMA SEDIAAN / PRODUK DASAR</label>
                      <input
                        id="est-in-title"
                        type="text"
                        placeholder="e.g. Membran Komposit Pati Kulit Pisang"
                        value={estimatorInput.title}
                        onChange={(e) => setEstimatorInput({ ...estimatorInput, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                      <label className="text-[10px] font-bold text-slate-500">TUJUAN FUNGSIONAL PRODUK</label>
                      <input
                        id="est-in-obj"
                        type="text"
                        placeholder="e.g. Adsorben logam kadmium cair"
                        value={estimatorInput.objective}
                        onChange={(e) => setEstimatorInput({ ...estimatorInput, objective: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                      <label className="text-[10px] font-bold text-slate-500">PARAMETER UJI YANG DICARI (OPSIONAL)</label>
                      <input
                        id="est-in-param"
                        type="text"
                        placeholder="e.g. Kadar Abu, Energi Dari Lemak, Natrium, dsb."
                        value={estimatorInput.parameterUji}
                        onChange={(e) => setEstimatorInput({ ...estimatorInput, parameterUji: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                      <label className="text-[10px] font-bold text-slate-500">METODE STANDAR / ACUAN (OPSIONAL)</label>
                      <input
                        id="est-in-method"
                        type="text"
                        placeholder="e.g. SNI 01-2891-1992, SNI 01-3555-1998, ASTM E1508, dsb."
                        value={estimatorInput.metodeStandar}
                        onChange={(e) => setEstimatorInput({ ...estimatorInput, metodeStandar: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                      />
                    </div>

                  </div>

                  <button
                    id="estimator-submit-btn"
                    type="submit"
                    disabled={isEstimatorLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-8 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer self-end mt-2"
                  >
                    {isEstimatorLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={14} />
                        <span>Menghitung Laju Biaya Rekomendasi...</span>
                      </>
                    ) : (
                      <>
                        <span>Prediksikan Anggaran Sekarang</span>
                        <ArrowRight size={13} />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Display Cost Breakdown */}
              {estimatorOutput && (
                <div id="ai-estimator-output-panel" className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm flex flex-col gap-5 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-3 flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-bold text-orange-500 bg-orange-50 px-2.5 py-1 rounded uppercase tracking-wider">
                        RINCIAN ANGGARAN ESTIMASI PENELITIAN
                      </span>
                      <h4 className="text-xs font-black text-slate-900 mt-1.5 uppercase leading-none">
                        {estimatorOutput.title}
                      </h4>
                    </div>
                  </div>

                  {/* Estimation range scales */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center flex flex-col justify-center">
                      <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">MINIMUM SCENARIO</span>
                      <strong className="text-base text-slate-800 mt-1">Rp {estimatorOutput.estimatedMin.toLocaleString('id-ID')}</strong>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center flex flex-col justify-center">
                      <span className="text-[10px] text-blue-600 font-bold uppercase leading-none">RECOMMENDED TARGET</span>
                      <strong className="text-base text-blue-600 mt-1">Rp {estimatorOutput.estimatedRec.toLocaleString('id-ID')}</strong>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center flex flex-col justify-center">
                      <span className="text-[10px] text-emerald-700 font-bold uppercase leading-none">COMPREHENSIVE RUNS</span>
                      <strong className="text-base text-emerald-700 mt-1">Rp {estimatorOutput.estimatedComp.toLocaleString('id-ID')}</strong>
                    </div>
                  </div>

                  {/* Details breakdowns */}
                  <div className="border border-slate-150 rounded-xl overflow-hidden mt-2 overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-extrabold text-slate-500 tracking-wider">
                          <th className="p-3.5">NAMA INSTRUMEN / ALAT</th>
                          <th className="p-3.5">PARAMETER UJI</th>
                          <th className="p-3.5">METODE STANDAR (ACUAN)</th>
                          <th className="p-3.5">MINIMAL</th>
                          <th className="p-3.5">REKOMENDASI</th>
                          <th className="p-3.5 text-center">SAMPEL REPLICA</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                        {estimatorOutput.breakdown.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3.5 font-extrabold text-slate-900">{row.testName}</td>
                            <td className="p-3.5 font-semibold text-slate-700 bg-amber-500/5">
                              <span className="text-[11px] font-bold text-slate-800">{row.parameterUji || 'Karakterisasi Utama'}</span>
                            </td>
                            <td className="p-3.5 font-mono text-[10px] text-blue-600 bg-blue-50/10">
                              <span className="px-2 py-1 bg-white border border-blue-100/50 rounded font-bold text-[10px]">{row.metodeStandar || 'SOP Terstandardisasi'}</span>
                            </td>
                            <td className="p-3.5 text-slate-650">Rp {row.minPrice.toLocaleString('id-ID')}</td>
                            <td className="p-3.5 text-blue-600 font-extrabold">Rp {row.recPrice.toLocaleString('id-ID')}</td>
                            <td className="p-3.5 text-center font-bold text-slate-500">{row.sampleQuantity}x</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Suggestions list */}
                  <div className="bg-blue-50/40 p-4 rounded-xl border border-blue-150 text-xs">
                    <h5 className="font-bold text-blue-800 uppercase tracking-wider mb-2">📌 Panduan Pengurangan Biaya (Frugal Science):</h5>
                    <ul className="list-disc pl-4 flex flex-col gap-1 text-slate-650 font-normal">
                      {estimatorOutput.optimizationSuggestions.map((sug, idx) => (
                        <li key={idx}>{sug}</li>
                      ))}
                    </ul>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB: conversational CHAT ASSISTANT (AI) */}
        {activeTab === 'assistant' && (
          <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn flex flex-col gap-6 h-[75vh]">
            <div className="shrink-0">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Sparkles size={20} className="text-blue-600" />
                <span>Analis Riset AI (Research Advisor Chatbot)</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Konsultasikan kebutuhan persiapan sampel biologis, pengurutan genomik, atau perbandingan metode KAN.
              </p>
            </div>

            {/* Chatbox window pane */}
            <div className="flex-1 bg-white border border-slate-150 rounded-2xl shadow-sm flex flex-col overflow-hidden">
              {/* Chat log view */}
              <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                  >
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                      {msg.sender === 'user' ? (user ? user.name : 'Peneliti') : 'LABBOOK ADVISOR'}
                    </span>
                    <div
                      className={`p-4 rounded-2xl text-[12px] leading-relaxed font-semibold whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-150'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-405 mt-1 font-mono">{msg.timestamp}</span>
                  </div>
                ))}

                {isChatLoading && (
                  <div className="self-start flex gap-2 items-center bg-slate-50 border border-slate-100 p-3 rounded-xl">
                    <Loader2 className="animate-spin text-blue-600" size={13} />
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Sedang Memformulasikan Jawaban Riset...</span>
                  </div>
                )}
              </div>

              {/* Chat Input form bar */}
              <form onSubmit={handleSendChatMessage} className="p-3 border-t border-slate-100 bg-slate-50 flex gap-2 shrink-0">
                <input
                  id="assistant-chat-input"
                  type="text"
                  placeholder="Tanyakan penulisan, FTIR ragi, kromatogen, atau persiapan sampel skripsi..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 text-slate-800"
                />
                <button
                  id="assistant-send-btn"
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-11 h-11 rounded-xl flex items-center justify-center transition-colors shadow-md active:scale-95 cursor-pointer shrink-0"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB: BECOME A PARTNER ONBOARDING FORM */}
        {activeTab === 'partner' && (
          <div className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
            <div className="flex flex-col gap-6">
              
              {/* Premium Gradient Banner */}
              <div className="bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#f97316] text-white p-6 md:p-8 rounded-3xl shadow-lg flex flex-col gap-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-black tracking-widest text-amber-300 uppercase">
                    <span>🚀</span> INDONESIA'S #1 LAB SEARCH PARTNER
                  </div>
                  <h1 className="text-xl md:text-3xl font-black tracking-tight leading-tight">
                    {lang === 'ID' ? 'Daftarkan Laboratorium Anda Sebagai Mitra Resmi' : 'Register Your Facility as Official Partner'}
                  </h1>
                  <p className="text-xs md:text-xs text-blue-55 font-medium leading-relaxed max-w-2xl">
                    {lang === 'ID' 
                      ? 'Hubungkan sistem laboratorium anda dengan ribuan mahasiswa pengusul PKM, peneliti universitas, startup industri, dan instansi nasional. Atur parameter pengujian, tentukan tarif mandiri, dan kelola sample terpadu.' 
                      : 'Connect your laboratory system with thousands of student applicants, university researchers, industrial startups, and national institutions.'}
                  </p>
                </div>
              </div>

              {partnerRegisteredMsg && (
                <div id="partner-success-banner" className="bg-emerald-50 border border-emerald-250 p-4 rounded-xl text-emerald-800 text-xs flex items-start gap-2.5 shadow-xs animate-fadeIn">
                  <span className="text-emerald-600 font-extrabold text-sm">✓</span>
                  <div>
                    <h5 className="font-extrabold uppercase">Pendaftaran Mitra Berhasil Dikirim!</h5>
                    <p className="mt-1 font-medium text-emerald-700 leading-normal">
                      Terima kasih atas kontribusi akademis Anda! Unit '{partnerInput.labName}' telah kami tumpuk ke dalam antrean review. Admin verifikator akan memproses lisensi KAN Anda untuk persetujuan instan. Anda dapat memantau atau menyetujui langsung pendaftaran ini di menu <strong>'Admin'</strong>.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handlePartnerSubmit} className="flex flex-col gap-8">
                
                {/* SECTION 1: Informasi Dasar Instansi & Lab */}
                <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-xs flex flex-col gap-5">
                  <h3 className="text-xs font-black text-[#1e3a8a] uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]">1</span>
                    INFORMASI DASAR INSTANSI & LAB
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                      <label className="text-[10px] font-black text-[#64748b] tracking-wider uppercase">NAMA LABORATORIUM</label>
                      <input
                        id="partner-in-labname"
                        type="text"
                        placeholder="e.g. Laboratorium Pangan Terpadu"
                        value={partnerInput.labName}
                        onChange={(e) => setPartnerInput({ ...partnerInput, labName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                      <label className="text-[10px] font-black text-[#64748b] tracking-wider uppercase">INSTITUSI INDUK / PEMILIK</label>
                      <input
                        id="partner-in-inst"
                        type="text"
                        placeholder="e.g. Universitas Mandala Khatulistiwa / PT Biotek"
                        value={partnerInput.institutionName}
                        onChange={(e) => setPartnerInput({ ...partnerInput, institutionName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                      <label className="text-[10px] font-black text-[#64748b] tracking-wider uppercase">KOTA / WILAYAH LOKASI</label>
                      <input
                        id="partner-in-city"
                        type="text"
                        placeholder="e.g. Sleman, D.I. Yogyakarta"
                        value={partnerInput.city}
                        onChange={(e) => setPartnerInput({ ...partnerInput, city: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-[#64748b] tracking-wider uppercase">RERATA DURASI SELESAI UJI</label>
                      <select
                        value={partnerInput.averageDuration}
                        onChange={(e) => setPartnerInput({ ...partnerInput, averageDuration: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 text-slate-700 cursor-pointer"
                      >
                        <option value="1 - 3 Hari Kerja (Express)">1 - 3 Hari Kerja (Express)</option>
                        <option value="3 - 5 Hari Kerja (Standard)">3 - 5 Hari Kerja (Standard)</option>
                        <option value="5 - 7 Hari Kerja (Standard)">5 - 7 Hari Kerja (Standard)</option>
                        <option value="7 - 14 Hari Kerja (Kompleks)">7 - 14 Hari Kerja (Kompleks)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                    <label className="text-[10px] font-black text-[#64748b] tracking-wider uppercase">ALAMAT FISIK LENGKAP LABORATORIUM</label>
                    <input
                      id="partner-in-address"
                      type="text"
                      placeholder="e.g. Gedung Sains Terpadu Lt. 3, Kampus Tengah, Sleman, Yogyakarta"
                      value={partnerInput.address}
                      onChange={(e) => setPartnerInput({ ...partnerInput, address: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                      <label className="text-[10px] font-black text-[#64748b] tracking-wider uppercase">ALAMAT EMAIL RESMI OPERASIONAL</label>
                      <input
                        type="email"
                        placeholder="e.g. lab@universitas.ac.id"
                        value={partnerInput.contactEmail}
                        onChange={(e) => setPartnerInput({ ...partnerInput, contactEmail: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                      <label className="text-[10px] font-black text-[#64748b] tracking-wider uppercase">NOMOR WHATSAPP PIC VERIFIKATOR</label>
                      <input
                        id="partner-in-wa"
                        type="text"
                        placeholder="e.g. +62 821-3456-7890"
                        value={partnerInput.contactWa}
                        onChange={(e) => setPartnerInput({ ...partnerInput, contactWa: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Akreditasi, Lisensi & Legalitas */}
                <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-xs flex flex-col gap-5">
                  <h3 className="text-xs font-black text-[#1e3a8a] uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]">2</span>
                    AKREDITASI, LISENSI & LEGALITAS
                  </h3>
                  
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed -mt-2">
                    Pilih akreditasi resmi yang dimiliki laboratorium Anda saat ini guna diverifikasi oleh Komite Saintifik LABBOOK.
                  </p>

                  {/* Dynamic Clickable Badges Toggle Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    {[
                      'KAN (ISO/IEC 17025)',
                      'ISO 9001:2015',
                      'Sertifikasi Halal (BPJPH)',
                      'Izin Kemenkes RI',
                      'Akreditasi BRIN',
                      'BUMN Certified Labs',
                      'Saprodi Lab Partner',
                      'Lainnya / Lab Akademis'
                    ].map((opt) => {
                      const isSelected = selectedAccreds.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setSelectedAccreds(prev => 
                              prev.includes(opt) 
                                ? (prev.length > 1 ? prev.filter(x => x !== opt) : prev)
                                : [...prev, opt]
                            );
                          }}
                          className={`px-3 py-3 rounded-xl border text-[11px] font-extrabold text-center transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-xs active:scale-98 ${
                            isSelected 
                              ? 'border-blue-600 bg-blue-50/40 text-blue-600 font-black' 
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {isSelected && (
                            <span className="text-blue-500 font-black text-xs">✓</span>
                          )}
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                    <div className="flex flex-col gap-1.5 focus-within:text-blue-600">
                      <label className="text-[10px] font-black text-[#64748b] tracking-wider uppercase">Nomor Lisensi KAN / Izin Operasional</label>
                      <input
                        type="text"
                        placeholder="e.g. LP-720-IDN atau Izin Pemprov"
                        value={partnerInput.licenseNumber}
                        onChange={(e) => setPartnerInput({ ...partnerInput, licenseNumber: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                        required
                      />
                    </div>

                    {/* Highly Polished Actionable File Upload zone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-[#64748b] tracking-wider uppercase">Upload Berkas Legalitas / Sertifikat Kelaikan</label>
                      <div 
                        onClick={() => document.getElementById('partner-legal-file-input')?.click()}
                        className="relative border border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-3.5 text-center bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-all flex flex-col items-center justify-center gap-1 group"
                      >
                        <input
                          id="partner-legal-file-input"
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setPartnerInput(prev => ({
                                ...prev,
                                legalDocName: file.name
                              }));
                            }
                          }}
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600 text-sm">📤</span>
                          <span className="text-[10px] font-bold text-slate-600 group-hover:text-blue-600">
                             Pilih Berkas Legalitas (PDF/Gambar)
                          </span>
                        </div>
                        {partnerInput.legalDocName ? (
                          <div className="mt-1.5 text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-md px-2 py-0.5 animate-fadeIn">
                            📄 {partnerInput.legalDocName}
                          </div>
                        ) : (
                          <span className="text-[9px] text-slate-400 font-semibold mt-0.5">Sertifikat_Kelaikan.pdf (Belum dipilih)</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: Definisikan Parameter Uji & Tarif (Biaya) */}
                <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-xs flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="text-xs font-black text-[#1e3a8a] uppercase tracking-wider flex items-center gap-2">
                      <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]">3</span>
                      DEFINISIKAN PARAMETER UJI & TARIF (BIAYA)
                    </h3>
                    <button
                      id="partner-add-service-btn"
                      type="button"
                      onClick={() => setPartnerServices([...partnerServices, { id: Date.now().toString(), name: '', price: 150000, duration: '5 Hari Kerja' }])}
                      className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-xl bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer select-none"
                    >
                      + Tambah Uji Baru
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed -mt-2">
                    Tulis pengujian beserta harga tarif minimum dalam rupiah (Rp) yang dapat dipesan oleh pengguna.
                  </p>

                  <div className="flex flex-col gap-4">
                    {partnerServices.map((srv, index) => (
                      <div key={srv.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row gap-4 items-end justify-between relative group shadow-sm/5 hover:shadow-xs transition-shadow">
                        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="md:col-span-3 flex flex-col gap-1.5 focus-within:text-blue-600">
                            <label className="text-[9px] font-bold text-slate-500 uppercase">NAMA KHUSUS PARAMETER UJI / LAYANAN</label>
                            <input
                              type="text"
                              placeholder="e.g. Uji Proksimat Komplet (Kadar Air, Abu, Lemak, Protein)"
                              value={srv.name}
                              onChange={(e) => {
                                const copy = [...partnerServices];
                                copy[index].name = e.target.value;
                                setPartnerServices(copy);
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500 text-slate-800"
                              required
                            />
                          </div>

                          <div className="md:col-span-1 flex flex-col gap-1.5 focus-within:text-blue-600">
                            <label className="text-[9px] font-bold text-slate-500 uppercase">TARIF MINIMUM (RP)</label>
                            <input
                              type="number"
                              placeholder="e.g. 450000"
                              value={srv.price}
                              onChange={(e) => {
                                const copy = [...partnerServices];
                                copy[index].price = parseInt(e.target.value) || 0;
                                setPartnerServices(copy);
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500 text-slate-800"
                              required
                            />
                          </div>
                        </div>

                        {partnerServices.length > 1 && (
                          <button
                            id={`partner-remove-service-${index}`}
                            type="button"
                            onClick={() => setPartnerServices(partnerServices.filter(p => p.id !== srv.id))}
                            className="bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100 p-2.5 rounded-xl transition-colors cursor-pointer shrink-0 mt-2 md:mt-0"
                            title="Hapus Layanan Uji"
                          >
                            <Trash size={15} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 4: Pernyataan Tambahan & Deskripsi Lab */}
                <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-xs flex flex-col gap-5">
                  <h3 className="text-xs font-black text-[#1e3a8a] uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]">4</span>
                    PERNYATAAN TAMBAHAN & DESKRIPSI LAB
                  </h3>

                  <div className="flex flex-col gap-2 focus-within:text-blue-600">
                    <label className="text-[10px] font-black text-[#64748b] tracking-wider uppercase">DESKRIPSI KEMAMPUAN & SPESIFIKASI ALAT LAB (OPSIONAL)</label>
                    <textarea
                      placeholder="e.g. Laboratorium terhubung langsung dengan spectrometer UV-Vis dan NMR, kami melayani sample biologis kering..."
                      value={partnerInput.description}
                      onChange={(e) => setPartnerInput({ ...partnerInput, description: e.target.value })}
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                    />
                  </div>

                  <div className="flex flex-col gap-2 focus-within:text-blue-600">
                    <label className="text-[10px] font-black text-[#64748b] tracking-wider uppercase">Pernyataan Tambahan & Komitmen Layanan</label>
                    <input
                      type="text"
                      placeholder="e.g. Berkomitmen menjaga akurasi pembacaan XRD dan FESEM serta mengeluarkan laporan uji sesuai SOP."
                      value={partnerInput.additionalDeclaration}
                      onChange={(e) => setPartnerInput({ ...partnerInput, additionalDeclaration: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                    />
                  </div>

                  <label className="flex items-start gap-3 p-3 bg-blue-50/10 border border-slate-200 rounded-xl cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded bg-slate-50 border-slate-300 focus:ring-blue-500 mt-0.5 shrink-0"
                      required
                    />
                    <span className="text-[10px] text-slate-600 font-bold leading-relaxed">
                      Dengan menekan daftar, Anda menyetujui Ketentuan Validasi Uji dan Standarisasi Laporan KAN bersama Science Hunter Indonesia.
                    </span>
                  </label>
                </div>

                {/* SUBMIT COMPONENT BUTON */}
                <button
                  id="final-partner-submit-btn"
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-black text-[11px] uppercase tracking-wider h-12 px-8 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer max-w-xs self-start"
                >
                  🚀 Ajukan Pendaftaran Mitra Resmi
                </button>

              </form>

            </div>
          </div>
        )}

        {/* TAB: ADMIN PANELS CONTROL */}
        {activeTab === 'admin' && (
          <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
            <div className="flex flex-col gap-6">
              
              <div className="border-b border-slate-200 pb-4">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {lang === 'ID' ? 'Panel Utama Administrasi, Moderasi & Distribusi KAN' : 'Platform Operations & Booking Control'}
                </h1>
                <p className="text-xs text-slate-405 mt-1 leading-relaxed">
                  Audit proposal kemitraan institusi, moderasi feedback spam dari buzzer, petakan kapasitas KAN nasional, dan kelola workflow operasional.
                </p>
              </div>

              {/* Statistics cards layout */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 border border-slate-150 rounded-xl flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block leading-none">TOTAL LAB MITRA</span>
                    <strong className="text-lg text-slate-950 block mt-1.5">{laboratories.length} Laboratorium</strong>
                  </div>
                  <span className="text-2xl">🏢</span>
                </div>

                <div className="bg-white p-4 border border-slate-150 rounded-xl flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block leading-none">TOTAL AKREDITASI KAN</span>
                    <strong className="text-lg text-emerald-600 block mt-1.5">
                      {laboratories.filter(l => l.accreditation.some(ac => ac.includes('KAN'))).length} Lab Negara
                    </strong>
                  </div>
                  <span className="text-2xl">🇮🇩</span>
                </div>

                <div className="bg-white p-4 border border-slate-150 rounded-xl flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block leading-none">KOMISI TRANSAKSI (10%)</span>
                    <strong className="text-lg text-blue-600 block mt-1.5">Rp 4.250.000</strong>
                  </div>
                  <span className="text-2xl">⚡</span>
                </div>

                <div className="bg-white p-4 border border-slate-150 rounded-xl flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block leading-none">MODERATOR SISTEM</span>
                    <strong className="text-[12px] text-slate-705 block mt-1.5 font-bold">Andhika Pratama (ITS)</strong>
                  </div>
                  <span className="text-2xl">🛡️</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Column 1 & 2: Approvals and Distributions */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  
                  {/* Tab 1: Onboarding Approvals */}
                  <div className="bg-white border border-slate-150 rounded-2xl p-5 flex flex-col gap-4 shadow-xs">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                      📋 Antrean Pengajuan & Detail Verifikasi Kemitraan Lab
                    </h3>

                    <div className="flex flex-col gap-3">
                      {registeredVolunteers.map((vol, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-slate-150 bg-slate-50/50 flex flex-col gap-3 shadow-xs">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 leading-none">{vol.name}</h4>
                              <p className="text-[10px] text-slate-400 font-bold mt-1.5">{vol.inst} — {vol.role}</p>
                            </div>
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded leading-none ${
                              vol.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-orange-50 text-orange-850 border border-orange-100'
                            }`}>
                              {vol.status}
                            </span>
                          </div>

                          {/* Extra info/details logic for true auditing */}
                          <div className="text-[11px] p-3 rounded-lg bg-white border border-slate-200 text-slate-605 space-y-1.5 font-semibold text-slate-600">
                            <div><strong>Izin / Reg KAN:</strong> <span className="font-mono text-slate-900">{vol.details?.licenseNumber || 'LP-720-IDN (Pre-verified)'}</span></div>
                            <div><strong>Standardisasi:</strong> <span className="text-emerald-700">{vol.details?.accreditation || 'KAN (ISO/IEC 17025)'}</span></div>
                            <div><strong>Lokasi Unit:</strong> <span>{vol.details?.address || 'Kampus Utama ITS Sukolilo, Surabaya, Jawa Timur'}</span></div>
                            {vol.details?.description && (
                              <div className="text-[10px] text-slate-400 italic">"{vol.details.description}"</div>
                            )}
                            
                            {vol.details?.services && (
                              <div className="pt-2 border-t border-slate-100 mt-2">
                                <span className="font-black text-[9px] text-slate-800 uppercase block mb-1">Daftar Parameter Uji Diajukan:</span>
                                <ul className="list-disc pl-4 space-y-1 text-[10px] font-bold">
                                  {vol.details.services.map((s: any, sIdx: number) => (
                                    <li key={sIdx} className="text-slate-700">
                                      {s.name} — <span className="text-blue-600">Rp {s.price.toLocaleString('id-ID')}</span> ({s.duration})
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {vol.status === 'PENDING' && (
                            <div className="flex justify-end pt-1">
                              <button
                                type="button"
                                onClick={() => {
                                  const list = [...registeredVolunteers];
                                  list[idx].status = 'VERIFIED';
                                  setRegisteredVolunteers(list);
                                }}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-3 py-1.5 rounded-lg text-[10px] cursor-pointer transition-colors shadow-xs"
                              >
                                ✓ Setujui & Terbitkan Kemitraan
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KAN Distribution Panel */}
                  <div className="bg-white border border-slate-150 rounded-2xl p-5 flex flex-col gap-4 shadow-xs">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                      🗺️ Distribusi KAN (Sebaran Laboratorium per Provinsi)
                    </h3>
                    
                    <p className="text-[11px] text-slate-400">
                      Berikut adalah rekapitulasi jumlah infrastruktur laboratorium terakreditasi KAN yang aktif di LABBOOK terbagi berdasarkan wilayah/provinsi:
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { prov: 'Jawa Timur', kota: 'Surabaya', KANCount: laboratories.filter(l => l.city === 'Surabaya' && l.accreditation.some(ac => ac.includes('KAN'))).length || 2, badge: '🔴 Jatim' },
                        { prov: 'Jawa Barat', kota: 'Bandung', KANCount: laboratories.filter(l => l.city === 'Bandung' && l.accreditation.some(ac => ac.includes('KAN'))).length || 3, badge: '🔵 Jabar' },
                        { prov: 'DKI Jakarta', kota: 'Jakarta', KANCount: laboratories.filter(l => l.city === 'Jakarta' && l.accreditation.some(ac => ac.includes('KAN'))).length || 2, badge: '🟢 Jakarta' },
                        { prov: 'Banten', kota: 'Depok', KANCount: laboratories.filter(l => l.city === 'Depok' && l.accreditation.some(ac => ac.includes('KAN'))).length || 1, badge: '🟣 Depok' },
                      ].map((item, index) => (
                        <div key={index} className="p-3 bg-slate-50 border border-slate-150 rounded-xl text-center">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-1">{item.badge}</span>
                          <span className="text-xl font-bold text-slate-900 block">{item.KANCount} Lab KAN</span>
                          <span className="text-[9px] text-slate-400 font-mono mt-0.5 block">Akreditasi Aktif</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Column 3: Spam Moderations */}
                <div className="flex flex-col gap-6">
                  
                  <div className="bg-white border border-slate-150 rounded-2xl p-5 flex flex-col gap-4 shadow-xs">
                    <div>
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center justify-between">
                        <span>🛡️ Moderasi Feedback & Spam</span>
                        <span className="text-[9px] bg-red-50 text-red-650 px-1.5 py-0.5 rounded border border-red-100 font-extrabold">Buzzer Control</span>
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">
                        Sembuhkan reputasi lab dari serangan spam buzzer berskala rendah (rating di bawah 3.0 dapat kami deteksi dan moderasi instan):
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
                      {laboratories.flatMap(lab => 
                        lab.reviews.map(rev => ({
                          labId: lab.id,
                          labName: lab.name,
                          ...rev
                        }))
                      ).map((item, idx) => {
                        const isSpamPotential = item.rating <= 3.0 || item.comment.toLowerCase().includes('buruk') || item.comment.toLowerCase().includes('kecewa');
                        return (
                          <div key={idx} className={`p-3 rounded-xl border flex flex-col gap-1.5 ${
                            isSpamPotential ? 'bg-red-50/45 border-red-150 shadow-xs' : 'bg-slate-50 border-slate-150'
                          }`}>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-900">{item.user}</span>
                              <span className="text-xs font-mono text-amber-500">⭐ {item.rating}</span>
                            </div>
                            <span className="text-[9px] text-slate-400 font-bold block leading-none uppercase">LAB: {item.labName}</span>
                            
                            <p className="text-[11px] text-slate-600 font-semibold italic leading-normal">
                              "{item.comment}"
                            </p>

                            <div className="flex items-center justify-between pt-1 border-t border-slate-100 mt-1">
                              <span className="text-[9px] text-slate-400">{item.date}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  // Call local deletion handler
                                  setLaboratories(prev => prev.map(l => {
                                    if (l.id === item.labId) {
                                      return {
                                        ...l,
                                        reviews: l.reviews.filter(r => !(r.user === item.user && r.comment === item.comment))
                                      };
                                    }
                                    return l;
                                  }));
                                  alert('Feedback berhasil dimoderasi / dihapus dari sistem!');
                                }}
                                className="text-[9px] font-black text-red-650 hover:text-red-700 bg-white border border-red-150 px-2 py-0.5 rounded transition-colors cursor-pointer"
                              >
                                Tolak & Hapus Spam
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* Global Interactive Float Drawer for comparing items if any exist */}
      {comparedLabs.length > 0 && (
        <div id="float-comparison-matrix-drawer" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-950 text-white rounded-full px-6 py-3.5 shadow-2xl border border-blue-500/30 flex items-center gap-6 animate-slideUp">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-[11px] font-extrabold tracking-tight">
              {comparedLabs.length} {lang === 'ID' ? 'Lab siap dibandingkan!' : 'Labs added to comparator!'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="float-drawer-compare-btn"
              onClick={() => setActiveTab('compare')}
              className="bg-blue-650 hover:bg-blue-600 text-white font-extrabold px-4 py-1.5 rounded-full text-[10px] transition-colors cursor-pointer select-none"
            >
              Uji Komparasi ➔
            </button>
            <button
              id="float-drawer-clear-btn"
              onClick={() => setComparedLabs([])}
              className="text-slate-400 hover:text-white text-[10px] font-bold px-1 select-none"
            >
              Empty
            </button>
          </div>
        </div>
      )}

      {/* Special Funding & Research Opportunity CTA Bar */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <section id="research-funding-opportunity-cta" className="max-w-7xl mx-auto px-4 mt-16 animate-fadeIn">
          <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-4 md:px-6 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 relative z-10 text-center sm:text-left">
              <span className="flex-shrink-0 text-[9px] font-black bg-amber-500/20 text-amber-300 px-2.5 py-1.5 rounded-lg border border-amber-500/40 uppercase tracking-widest leading-none">
                💡 AMBISYNC
              </span>
              <p className="text-xs md:text-sm text-slate-100 font-bold leading-relaxed">
                Punya Hasil Riset tapi belum menang lomba atau butuh pendanaan?
              </p>
            </div>

            <div className="shrink-0 relative z-10">
              <a
                href="https://its.id/m/AmbiSyncIndonesia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-450 hover:to-amber-550 text-slate-950 font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl shadow-lg transition-all cursor-pointer whitespace-nowrap active:scale-95"
              >
                Cari Peluangmu!
                <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Science Hunter Indonesia Mentorship CTA - Global Bottom Referral */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <section id="global-science-hunter-cta" className="max-w-7xl mx-auto px-4 mt-16 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex-1 flex flex-col gap-2 relative z-10 text-left">
              <span className="text-[10px] font-black bg-blue-600/25 text-blue-300 px-3 py-1 rounded-full w-max border border-blue-500/20 uppercase tracking-widest leading-none">
                🏆 PENCETAK RATUSAN MEDALIS DAN HAK CIPTA
              </span>
              <h4 className="text-md font-black text-white">Cari Mentor dan Pengajuan Hak Cipta?</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-semibold max-w-3xl">
                Siapkan karya ilmiah terbaikmu untuk memenangkan PKM, OPSI, LKTI, FIKSI, dan lainnya. Dapatkan bimbingan intensif dari Mentor Berprestasi Science Hunter Indonesia, optimalkan usulan paten, dan amankan hak kekayaan intelektual (HKI) hasil risetmu secara kredibel.
              </p>
            </div>

            <div className="shrink-0 relative z-10">
              <a
                href="https://sciencehunter.co.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-750 hover:from-blue-550 hover:to-blue-700 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl shadow-lg transition-all cursor-pointer whitespace-nowrap active:scale-95"
              >
                Hubungi SHI
              </a>
            </div>
          </div>
        </section>
      </motion.div>

      {/* FOOTER */}
      <footer id="app-landing-footer" className="bg-slate-950 text-slate-100 border-t border-slate-900 mt-16 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Left Block info with high contrast partner logos */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 select-none flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="labbook-footer-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#60a5fa" />
                      </linearGradient>
                    </defs>
                    
                    {/* Binder notebook card outline */}
                    <rect 
                      x="12" 
                      y="24" 
                      width="76" 
                      height="64" 
                      rx="16" 
                      stroke="url(#labbook-footer-gradient)" 
                      strokeWidth="9.5" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Binder rings */}
                    <rect 
                      x="28" 
                      y="10" 
                      width="9" 
                      height="22" 
                      rx="4.5" 
                      fill="url(#labbook-footer-gradient)" 
                    />
                    <rect 
                      x="63" 
                      y="10" 
                      width="9" 
                      height="22" 
                      rx="4.5" 
                      fill="url(#labbook-footer-gradient)" 
                    />
                    
                    {/* Conical beaker/flask inside binder */}
                    <path 
                      d="M44 43 H56 M46 43 V49 L36 71 A 4 4 0 0 0 40 76 H60 A 4 4 0 0 0 64 71 L54 49 V43" 
                      stroke="url(#labbook-footer-gradient)" 
                      strokeWidth="7" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    
                    {/* Bubble details */}
                    <circle cx="50" cy="61" r="3.5" fill="url(#labbook-footer-gradient)" />
                    <circle cx="44" cy="69" r="2.5" fill="url(#labbook-footer-gradient)" />
                    <circle cx="56" cy="68" r="2.5" fill="url(#labbook-footer-gradient)" />
                  </svg>
                </div>
                <div className="flex items-center text-lg font-extrabold tracking-tight">
                  <span className="text-white">Lab</span>
                  <span className="text-blue-400">book</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Platform pencarian, pengujian komparasi, estimasi biaya, kualifikasi akreditasi KAN, dan pemesanan layanan laboratorium terintegrasi pertama di Indonesia.
              </p>
            </div>

            {/* Links Block 1 */}
            <div className="flex flex-col gap-2.5 text-xs">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider">About LABBOOK</h5>
              <a href="#about" className="text-slate-400 hover:text-white transition-colors">Visi Platform</a>
              <a href="#partners" className="text-slate-400 hover:text-white transition-colors">Jaringan Lab KAN</a>
              <a href="#careers" className="text-slate-400 hover:text-white transition-colors">Karir LABBOOK</a>
            </div>

            {/* Links Block 2 */}
            <div className="flex flex-col gap-2.5 text-xs">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider">Sumber Daya Riset</h5>
              <button onClick={() => setActiveTab('roadmap')} className="text-left text-slate-400 hover:text-white transition-colors">Roadmap Generator</button>
              <button onClick={() => setActiveTab('estimator')} className="text-left text-slate-400 hover:text-white transition-colors font-semibold">Cost Estimator</button>
              <button onClick={() => setActiveTab('assistant')} className="text-left text-slate-400 hover:text-white transition-colors">AI Advisor</button>
            </div>

            {/* Links Block 3 */}
            <div className="flex flex-col gap-2.5 text-xs">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider">Mitra Kemitraan</h5>
              <button onClick={() => setActiveTab('partner')} className="text-left text-slate-400 hover:text-white transition-colors font-bold">Daftarkan Laboratorium</button>
              <a href="#terms" className="text-slate-400 hover:text-white transition-colors">Syarat Ketentuan</a>
              <a href="#privacy" className="text-slate-400 hover:text-white transition-colors">Kebijakan Privasi</a>
            </div>
          </div>

          {/* Partnership credits footnote */}
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xs text-slate-400 font-semibold tracking-tight">
              Support by <span className="text-slate-200">ITS Youth Technopreneurship</span>
            </div>
            <div className="text-xs text-slate-400 font-semibold md:text-right">
              In Collaboration with: <span className="text-slate-200">Science Hunter Indonesia & AmbiSync</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Verification Auth login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        lang={lang}
        onLoginSuccess={(acc) => {
          setUser(acc);
          setIsLoginOpen(false);
        }}
      />

      {/* 10-step sample Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedService(null);
          setSelectedLabForBooking(null);
        }}
        service={selectedService}
        lab={selectedLabForBooking}
        lang={lang}
      />

      {/* Drawer Details Sidebar */}
      <LabDetail
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedLabDetail(null);
        }}
        lab={selectedLabDetail}
        lang={lang}
        onBookService={(s) => {
          setIsDetailOpen(false);
          handleBookFromService(s, selectedLabDetail!);
        }}
      />

      {/* Floating WhatsApp Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 animate-fadeIn">
        <a
          href="https://wa.me/6281257235450"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative border border-emerald-400/30"
          title="Tanya Tim Labbook di WhatsApp"
        >
          {/* Pulsing indicator */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping-slow" />
          
          <svg
            className="w-6 h-6 fill-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
          </svg>
          
          {/* Tooltip Label on Hover */}
          <span className="absolute right-14 bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-slate-800 flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Tanya Tim Labbook (+62 812-5723-5450)
          </span>
        </a>
      </div>

    </div>
  );
}
