import { LabItem } from '../types';

export const INITIAL_LABORATORIES: LabItem[] = [
  {
    id: 'lab-itb',
    name: 'Laboratorium Sains dan Teknologi Terpadu',
    institution: 'Institut Teknologi Bandung (ITB)',
    location: 'Gedung CRCS, Lt. 5, Jl. Ganesha No. 10, Bandung',
    city: 'Bandung',
    accreditation: ['KAN (ISO/IEC 17025)', 'ISO 9001:2015', 'Ristekdikti Certified'],
    verified: true,
    rating: 4.8,
    completedProjects: 1420,
    responseTimeMinutes: 10,
    turnaroundTimeDays: '3 - 5 Hari Kerja (Standard)',
    startingPrice: 350000,
    image: 'https://images.unsplash.com/photo-1579154261294-a101a242f831?auto=format&fit=crop&q=80&w=600',
    description: 'Laboratorium Sentral ITB menyediakan layanan pengujian karakterisasi material tingkat lanjut, analisis kimia, fisika benda padat, dan rekayasa nano berkualitas tinggi untuk riset mahasiswa, skripsi akademis, PKM, dan kebutuhan industri nasional.',
    services: [
      {
        name: 'Analisis SEM (Scanning Electron Microscopy)',
        category: 'Material Testing',
        method: 'ASTM E1508 / Energy Dispersive Spectroscopy',
        price: 350000,
        duration: '3 Hari',
        sampleRequirement: 'Serbuk kering min. 10mg, padatan ukuran max 1x1x0.5 cm',
        outputReport: 'Citra morfologi permukaan 5k-100k pembesaran & grafik elemental EDS'
      },
      {
        name: 'Analisis XRD (X-Ray Diffraction)',
        category: 'Material Testing',
        method: 'Rigaku Powder Method',
        price: 300000,
        duration: '3 Hari',
        sampleRequirement: 'Serbuk halus min. 1 gram, kering, lolos mesh 200',
        outputReport: 'Grafik raw data (.raw / .txt) & kristalinitas dengan index PDF2'
      },
      {
        name: 'FTIR (Fourier Transform Infrared Spectroscopy)',
        category: 'Chemical Analysis',
        method: 'KBr Pellet method / ATR mode',
        price: 150000,
        duration: '2 Hari',
        sampleRequirement: 'Sampel cairan 2mL atau padatan kering bebas kelembaban',
        outputReport: 'Grafik spektrogram transmisi & identifikasi gugus fungsi kimia'
      },
      {
        name: 'Uji Kadar Logam dengan AAS (Atomic Absorption Spectroscopy)',
        category: 'Chemical Analysis',
        method: 'SNI 06-6989.4-2009',
        price: 250000,
        duration: '4 Hari',
        sampleRequirement: 'Sampel cairan min. 100 mL, diasamkan HNO3 pH < 2',
        outputReport: 'Sertifikat Kalibrasi Konsentrasi unsur logam Pb, Cd, Cu, Cr (ppm)'
      }
    ],
    instruments: [
      {
        name: 'Field Emission Scanning Electron Microscope (FESEM)',
        brand: 'JEOL',
        model: 'JSM-7610FPlus',
        specifications: 'Resolution 1.0 nm at 15 kV, Magnification 25x to 1,000,000x, equipped with Oxford EDS.'
      },
      {
        name: 'X-Ray Diffractometer',
        brand: 'Rigaku',
        model: 'SmartLab 9kW',
        specifications: 'High-resolution theta-theta goniometer, Cu revolving anode, 2D HyPix-3000 detector.'
      },
      {
        name: 'FTIR Spectrophotometer',
        brand: 'Shimadzu',
        model: 'IRTracer-100',
        specifications: 'Resolution 0.25 cm-1, Signal-to-noise ratio 60,000:1, Mid-IR range 7,800 to 350 cm-1.'
      }
    ],
    contact: {
      whatsapp: '+62 812-3456-7890',
      email: 'labsentral@itb.ac.id',
      office: '022-2500123',
      picName: 'Dr. Tatang Sulaeman, M.T.'
    },
    reviews: [
      {
        user: 'Andi Saputra',
        rating: 5,
        date: '2026-05-18',
        comment: 'Sangat terbantu untuk uji SEM riset PKM-RE saya. Hasil citra sangat tajam dan dipandu detail oleh analisnya.',
        tag: 'PKM-RE'
      },
      {
        user: 'Hana Aliyah',
        rating: 4.6,
        date: '2026-04-02',
        comment: 'Turnaround time cepat. FTIR keluar hasil dalam 2 hari sehingga skripsi saya bisa selesai tepat waktu.',
        tag: 'Skripsi'
      }
    ]
  },
  {
    id: 'lab-ui',
    name: 'Laboratorium Riset Terpadu UI',
    institution: 'Universitas Indonesia (UI)',
    location: 'Gedung ILRC Lt. 2-3, Kampus UI Depok, Jawa Barat',
    city: 'Depok',
    accreditation: ['KAN (ISO/IEC 17025)', 'ISO 9001:2015', 'BPOM Registered Partner'],
    verified: true,
    rating: 4.7,
    completedProjects: 1890,
    responseTimeMinutes: 12,
    turnaroundTimeDays: '4 - 7 Hari Kerja (Standard)',
    startingPrice: 200000,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600',
    description: 'Pusat Analisis Instrumental Kimia, Biomedis, dan Lingkungan Universitas Indonesia. Melayani instrumen kromatografi cair tingkat tinggi, deteksi unsur organik, toksisitas, serta uji kosmetik formal berkualitas tinggi.',
    services: [
      {
        name: 'Analisis HPLC (High Performance Liquid Chromatography)',
        category: 'Chemical Analysis',
        method: 'In-house HPLC-UV Method Validation',
        price: 450000,
        duration: '5 Hari',
        sampleRequirement: 'Cairan jernih 5mL, disaring membran 0.45 micron, sebutkan analit sasaran',
        outputReport: 'Kromatogram retensi, luas area puncak, dan konsentrasi kuantitatif'
      },
      {
        name: 'Analisis GC-MS (Gas Chromatography-Mass Spectrometry)',
        category: 'Chemical Analysis',
        method: 'AOAC 2007.01 Organochlorine',
        price: 650000,
        duration: '7 Hari',
        sampleRequirement: 'Sampel organik larut n-heksan / metanol bebas air min 5 gram',
        outputReport: 'Kromatogram gas, spektrum massa, dan hasil pencarian database pustaka NIST'
      },
      {
        name: 'Uji Protein Terlarut (Metode Lowry / BCA)',
        category: 'Food Testing',
        method: 'Spectrophotometric A562/A750',
        price: 200000,
        duration: '4 Hari',
        sampleRequirement: 'Suspensi protein atau ekstrak pangan segar basah min 50 gram',
        outputReport: 'Kurva kalibrasi standar BSA & konsentrasi total protein sampel'
      },
      {
        name: 'Uji Mikrobiologi TPC (Total Plate Count)',
        category: 'Microbiology',
        method: 'SNI ISO 4833-1:2015',
        price: 180000,
        duration: '5 Hari',
        sampleRequirement: 'Sampel steril dalam wadah rapat, berat min 20 gram',
        outputReport: 'Lembar hasil jumlah koloni bakteri per gram sampel (colony-forming unit CFU/g)'
      }
    ],
    instruments: [
      {
        name: 'High-Performance Liquid Chromatograph',
        brand: 'Waters',
        model: 'Alliance e2695 with 2998 PDA',
        specifications: 'Quaternary solvent manager, 0.01 to 10.0 mL/min flow range, multi-wavelength PDA detection.'
      },
      {
        name: 'Gas Chromatography-Mass Spectrometer (GC-MS)',
        brand: 'Agilent Technologies',
        model: '7890B GC / 5977B MSD',
        specifications: 'Single quadrupole mass spectrometer, electron ionization source, capillary column inlet, autoinjector.'
      }
    ],
    contact: {
      whatsapp: '+62 878-9012-3456',
      email: 'labterpadu@ui.ac.id',
      office: '021-7888123',
      picName: 'Prof. Marina Irianti, Ph.D.'
    },
    reviews: [
      {
        user: 'Budi Santoso',
        rating: 4.5,
        date: '2026-03-24',
        comment: 'Sangat puas dengan rincian data kromatogram dari pengujian GC-MS minyak atsiri untuk PKM-Kewirausahaan kami.',
        tag: 'PKM-K'
      }
    ]
  },
  {
    id: 'lab-brin',
    name: 'Pusat Riset Bioteknologi & Genomik',
    institution: 'Badan Riset dan Inovasi Nasional (BRIN)',
    location: 'Kawasan Sains dan Teknologi Soekarno, Cibinong, Bogor',
    city: 'Bogor',
    accreditation: ['KAN (ISO/IEC 17025)', 'KAN (LP-110-IDN)', 'Biosafety Level 2 (BSL-2) Certified'],
    verified: true,
    rating: 4.9,
    completedProjects: 4120,
    responseTimeMinutes: 15,
    turnaroundTimeDays: '7 - 14 Hari Kerja',
    startingPrice: 450000,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600',
    description: 'Pusat pengujian biologi molekuler nasional BRIN, memiliki fasilitas pengurutan DNA (Sequencing DNA), RT-PCR kuantitatif, isolasi kultur bersertifikat, dan bioinformatika tingkat tinggi untuk riset mutakhir.',
    services: [
      {
        name: 'Sanger DNA Sequencing (1 Output Run)',
        category: 'Biotechnology',
        method: 'Capillary Electrophoresis BigDye v3.1',
        price: 450000,
        duration: '7 Hari',
        sampleRequirement: 'Katalis PCR kuantum terpurifikasi min. 15uL dengan primer spesifik 10uM',
        outputReport: 'File kromatogram mentah (.ab1) & urutan asam nukleat FASTA (.seq)'
      },
      {
        name: 'Real-Time Quantitative PCR (qPCR)',
        category: 'Biotechnology',
        method: 'SYBR Green qPCR Assay',
        price: 550000,
        duration: '5 Hari',
        sampleRequirement: 'Isolat RNA murni dengan rasio kemurnian A260/A280 sekitar 1.8-2.0',
        outputReport: 'Grafik siklus ambang batas (Ct values) & normalisasi rasio lipat ekspresi gen'
      }
    ],
    instruments: [
      {
        name: 'Genetic Analyzer Capillary Sequencer',
        brand: 'Applied Biosystems',
        model: 'ABI 3500xl',
        specifications: '24-capillary platform for Sanger Sequencing and Fragment Analysis, fully automated polymer delivery.'
      },
      {
        name: 'Real-Time PCR Thermal Cycler',
        brand: 'Bio-Rad',
        model: 'CFX96 Touch',
        specifications: '6-channel detection system, high thermal uniformity, advanced analysis of relative gene expression.'
      }
    ],
    contact: {
      whatsapp: '+62 821-4433-2211',
      email: 'lab.biotech@brin.go.id',
      office: '021-8754567',
      picName: 'Dr. Irwan Siregar, M.Si.'
    },
    reviews: [
      {
        user: 'Niken Safitri',
        rating: 5,
        date: '2026-06-05',
        comment: 'Luar biasa! Pengurutan gen DNA mikroba ragi untuk proposal tesis bioenergi saya selesai sangat valid dan akurat.',
        tag: 'Tesis'
      }
    ]
  },
  {
    id: 'lab-syiah-kuala',
    name: 'UPT Lab Terpadu Universitas Syiah Kuala',
    institution: 'Universitas Syiah Kuala',
    location: 'Kawasan Darussalam, Banda Aceh, Aceh',
    city: 'Banda Aceh',
    accreditation: ['Sertifikasi Halal (BPJPH)', 'Akreditasi BRIN', 'Lainnya / Lab Akademis'],
    verified: false,
    rating: 4.4,
    completedProjects: 450,
    responseTimeMinutes: 20,
    turnaroundTimeDays: '5 - 10 Hari Kerja',
    startingPrice: 150000,
    image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=600',
    description: 'Laboratorium sentral yang ramah mahasiswa di Aceh, melayani pengujian gizi bahan alam, proksimat pangan olahan, minyak atsiri lokal, dan karakterisasi sediaan serbuk nano obat tradisional.',
    services: [
      {
        name: 'Analisis Proksimat Lengkap (Abu, Protein, Lemak, Air)',
        category: 'Food Testing',
        method: 'SNI Organik AOAC',
        price: 450000,
        duration: '7 Hari',
        sampleRequirement: 'Sampel pangan minimal 250 gram, dikemas plastik kedap udara',
        outputReport: 'Laporan komprehensif persentase kadar abu, kadar air, protein kasar, dan lemak kasar'
      }
    ],
    instruments: [
      {
        name: 'Bomb Calorimeter',
        brand: 'Parr Instrument',
        model: 'Model 6200',
        specifications: 'Microprocessor-controlled oxygen bomb calorimeter for measuring calorific value in solid/liquid fuels.'
      }
    ],
    contact: {
      whatsapp: '+62 852-6009-4441',
      email: 'lab.terpadu@usk.ac.id',
      office: '0651-755123',
      picName: 'Ir. Syarifuddin, M.P.'
    },
    reviews: [
      {
        user: 'Teuku Reza',
        rating: 4.3,
        date: '2026-02-12',
        comment: 'Harga sangat bersahabat untuk kantong mahasiswa akhir. Analisnya ramah-ramah dalam mengarahkan penyusunan sampel.',
        tag: 'Skripsi'
      }
    ]
  },
  {
    id: 'lab-mulawarman',
    name: 'Laboratorium Sentral Universitas Mulawarman',
    institution: 'Universitas Mulawarman',
    location: 'Jl. Kuaro, Kampus Gunung Kelua, Samarinda, Kalimantan Timur',
    city: 'Samarinda',
    accreditation: ['Izin Kemenkes RI', 'Sertifikasi Halal (BPJPH)', 'Lainnya / Lab Akademis'],
    verified: false,
    rating: 4.5,
    completedProjects: 580,
    responseTimeMinutes: 18,
    turnaroundTimeDays: '5 - 9 Hari Kerja',
    startingPrice: 180000,
    image: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?auto=format&fit=crop&q=80&w=600',
    description: 'Laboratorium sentral dengan spesialisasi ekologi hutan hujan tropis basah dan studi komparasi bahan alam obat hutan Kalimantan Timur. Solusi uji fitokimia dan logam berat ramah lokal.',
    services: [
      {
        name: 'Skrining Fitokimia Ekstrak Tumbuhan (Alkaloid, Flavonoid, dkk)',
        category: 'Biotechnology',
        method: 'Metode Kromatografi Lapis Tipis (KLT) & Pereaksi Tabung',
        price: 180000,
        duration: '4 Hari',
        sampleRequirement: 'Ekstrak kental tumbuhan asli min 2 gram, kering dingin',
        outputReport: 'Laporan kualitatif keberadaan senyawa aktif metabolit sekunder (+ / -)'
      }
    ],
    instruments: [
      {
        name: 'Rotary Evaporator Digital',
        brand: 'Heidolph',
        model: 'Hei-VAP Expert',
        specifications: 'Motor lift system, speed range 10-280 rpm, integrated vacuum controller, heating bath temperature up to 180C.'
      }
    ],
    contact: {
      whatsapp: '+62 813-4700-8812',
      email: 'labsentral@unmul.ac.id',
      office: '0541-749123',
      picName: 'Dra. Endang Lestari, M.Si.'
    },
    reviews: [
      {
        user: 'Agus Prabowo',
        rating: 4.6,
        date: '2026-05-22',
        comment: 'Sangat cocok untuk riset fitokimia tanaman obat Kalimantan. Biaya terjangkau.',
        tag: 'PKM-RE'
      }
    ]
  },
  {
    id: 'lab-bbia',
    name: 'Balai Besar Industri Agro (BBIA) Kemenperin',
    institution: 'Kementerian Perindustrian RI',
    location: 'Jl. Juanda No. 11, Bogor Tengah, Bogor, Jawa Barat',
    city: 'Bogor',
    accreditation: ['KAN (ISO/IEC 17025)', 'KAN (LP-110-IDN)', 'BUMN Certified Labs'],
    verified: true,
    rating: 4.6,
    completedProjects: 3100,
    responseTimeMinutes: 12,
    turnaroundTimeDays: '5 - 7 Hari Kerja (Standard)',
    startingPrice: 150000,
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff2726fd?auto=format&fit=crop&q=80&w=600',
    description: 'Balai Besar Industri Agro (BBIA) adalah laboratorium pengujian pangan dan agroindustri rujukan tertua & terlengkap di Indonesia milik Kementerian Perindustrian. Melayani penentuan tabel nutrisi resmi SNI, uji halal, kontaminan, logam berat, kemasan pangan, serta uji umur simpan produk.',
    services: [
      {
        name: 'Uji Protein total pangan (Kjeldahl Digestion)',
        category: 'Food Testing',
        method: 'SNI 01-2891-1992 butir 7.1',
        price: 150000,
        duration: '5 Hari',
        sampleRequirement: 'Sampel pangan homogen kering/basah min. 50 gram dalam plastik bersegel',
        outputReport: 'Sertifikat Hasil Uji kadar protein kasar pangan (%) dengan penandatanganan KAN'
      },
      {
        name: 'Uji Lemak Kasar (Soxhlet Solvent Extraction)',
        category: 'Food Testing',
        method: 'SNI 01-2891-1992 butir 7.2',
        price: 180000,
        duration: '5 Hari',
        sampleRequirement: 'Sampel pangan kering min. 100 gram',
        outputReport: 'Sertifikat kadar lemak pangan (%) KAN'
      },
      {
        name: 'Uji Umur Simpan Pangan (Accelerated Shelf Life Testing)',
        category: 'Food Testing',
        method: 'ASLT Arrhenius approach',
        price: 1200000,
        duration: '14 Hari',
        sampleRequirement: 'Kemasan asli produk minimal 12 kemasan siap jual',
        outputReport: 'Grafik model regresi linear Arrhenius dan prediksi ketahanan umur simpan produk pada 3 varian suhu berbeda'
      }
    ],
    instruments: [
      {
        name: 'Kjeldahl Digestion & Distillation Unit',
        brand: 'FOSS',
        model: 'Kjeltec 8400',
        specifications: 'Fully automated distillation system, colorimetric titration, automatic emptying of tubes.'
      },
      {
        name: 'Soxhlet Solvent Extraction System',
        brand: 'Gerhardt',
        model: 'Soxtherm 6-Place',
        specifications: 'Rapid extraction system, complete process control, solvent recovery rate up to 90%.'
      }
    ],
    contact: {
      whatsapp: '+62 811-2233-4455',
      email: 'pelayanan.bbia@kemenperin.go.id',
      office: '0251-831234',
      picName: 'Yeti Herawati, S.TP., M.Sc.'
    },
    reviews: [
      {
        user: 'Lina Marlina',
        rating: 4.7,
        date: '2026-05-30',
        comment: 'Sangat profesional untuk sertifikasi nutrisi industri UMKM kami. Laporan bersertifikat KAN sangat valid di mata investor.',
        tag: 'UMKM'
      }
    ]
  },
  {
    id: 'lab-ugm',
    name: 'Laboratorium Penelitian dan Pengujian Terpadu (LPPT)',
    institution: 'Universitas Gadjah Mada (UGM)',
    location: 'Sekip Utara, jl. Kaliurang Km. 4, Yogyakarta',
    city: 'Yogyakarta',
    accreditation: ['KAN (ISO/IEC 17025)', 'ISO 9001:2015', 'Kemenkes Certified'],
    verified: true,
    rating: 4.9,
    completedProjects: 3450,
    responseTimeMinutes: 8,
    turnaroundTimeDays: '3 - 5 Hari Kerja',
    startingPrice: 250000,
    image: 'https://images.unsplash.com/photo-1514373030904-8440909a5274?auto=format&fit=crop&q=80&w=600',
    description: 'Laboratorium rujukan nasional milik Universitas Gadjah Mada (UGM). Terkenal dengan uji bioaktivitas, skrining toksisitas, karakterisasi SEM-EDX, XRD kristalografi, kromatografi gas serta uji halal genetik.',
    services: [
      {
        name: 'Analisis SEM-EDX (Morfologi & Komparasi Atom)',
        category: 'Material Testing',
        method: 'ASTM E1508 / Energy Dispersive Spectroscopy',
        price: 350000,
        duration: '3 Hari',
        sampleRequirement: 'Sampel kering tahan vacuum (serbuk / padatan tipis)',
        outputReport: 'Citra mikro struktur & hasil persentase sebaran atom organik/anorganik'
      },
      {
        name: 'Uji Toksisitas Seluler (MTT Assay Sel Kanker)',
        category: 'Biotechnology',
        method: 'Bioassay Spektrofotometri',
        price: 450000,
        duration: '5 Hari',
        sampleRequirement: 'Ekstrak murni steril min 50mg larut air/DMSO',
        outputReport: 'Kurva viabilitas sel, nilai hambatan dosis IC50'
      }
    ],
    instruments: [
      {
        name: 'Scanning Electron Microscope (SEM/EDX)',
        brand: 'JEOL',
        model: 'JSM-IT500HR',
        specifications: 'High brightness Schottky electron gun, resolution 1.5nm, integrated dry silicon drift detector.'
      }
    ],
    contact: {
      whatsapp: '+62 811-2821-2233',
      email: 'lppt@ugm.ac.id',
      office: '0274-548348',
      picName: 'Yusuf Arifin, S.Si., M.Sc.'
    },
    reviews: [
      {
        user: 'Anisa Retno',
        rating: 5,
        date: '2026-05-12',
        comment: 'Sangat profesional! Analis LPPT UGM memandu uji XRD sampel nanokomposit saya dengan ramah dan mendalam.',
        tag: 'Tesis'
      }
    ]
  },
  {
    id: 'lab-its',
    name: 'Laboratorium Sentral dan Karakterisasi Material',
    institution: 'Institut Teknologi Sepuluh Nopember (ITS)',
    location: 'Kampus ITS Sukolilo, Surabaya, Jawa Timur',
    city: 'Surabaya',
    accreditation: ['KAN (ISO/IEC 17025)', 'Ristekdikti Certified'],
    verified: true,
    rating: 4.8,
    completedProjects: 2120,
    responseTimeMinutes: 10,
    turnaroundTimeDays: '4 - 7 Hari Kerja',
    startingPrice: 300000,
    image: 'https://images.unsplash.com/photo-1544216717-3bbf52512659?auto=format&fit=crop&q=80&w=600',
    description: 'Pusat karakterisasi material padatan logam, komposit polimer, semen geopolimer, serta nanopartikel karbon di Jawa Timur. Dilengkapi penganalisa luas permukaan Brunauer-Emmett-Teller (BET) dan spektroskopi Raman.',
    services: [
      {
        name: 'Pengukuran Luas Permukaan Spesifik (BET N2)',
        category: 'Material Testing',
        method: 'Gas Adsorption Nitrogen Multi-Point',
        price: 450000,
        duration: '4 Hari',
        sampleRequirement: 'Serbuk kering dehidrasi total minimal 200mg',
        outputReport: 'Grafik isotherm adsorpsi-desorpsi, ukuran pori fisis rata-rata'
      }
    ],
    instruments: [
      {
        name: 'Surface Area Analyzer (BET)',
        brand: 'Quantachrome',
        model: 'NovaTouch LX4',
        specifications: 'High-speed gas sorption, four analysis ports, integrated vacuum degassing.'
      }
    ],
    contact: {
      whatsapp: '+62 821-3944-5511',
      email: 'labsentral@its.ac.id',
      office: '031-5942354',
      picName: 'Dr. Eng. Hendra Wijaya'
    },
    reviews: [
      {
        user: 'Romi Hartono',
        rating: 4.8,
        date: '2026-06-03',
        comment: 'Uji BET superkapasitor dari serbuk eceng gondok untuk PKM-RE sukses besar, data porinya sangat lengkap!',
        tag: 'PKM-RE'
      }
    ]
  },
  {
    id: 'lab-ub',
    name: 'Laboratorium Sentral Ilmu Hayati (LSIH)',
    institution: 'Universitas Brawijaya (UB)',
    location: 'Jl. Veteran, Lowokwaru, Malang, Jawa Timur',
    city: 'Malang',
    accreditation: ['KAN (ISO/IEC 17025)', 'ISO 14001:2015', 'Kemenkes Certified'],
    verified: true,
    rating: 4.9,
    completedProjects: 2680,
    responseTimeMinutes: 9,
    turnaroundTimeDays: '3 - 6 Hari Kerja',
    startingPrice: 220000,
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600',
    description: 'Fasilitas penelitian hayati dan biologi terintegrasi terbesar di Malang. Dipercaya dalam analisis instrumen kimia pangan, identifikasi spesifik DNA/Gen, farmakologi ekstrak tanaman, dan visualisasi fluoresensi confocal.',
    services: [
      {
        name: 'Analisis HPLC (Kuantifikasi Kafein / Senyawa Flavanoid)',
        category: 'Chemical Analysis',
        method: 'In-house HPLC-UV Validated Standard',
        price: 380000,
        duration: '5 Hari',
        sampleRequirement: 'Larutan ekstrak cair 5mL disaring membran filter 0.22 um',
        outputReport: 'Laporan kromatogram, waktu retensi (RT), dan estimasi konsentrasi analit kuantitatif (ppm)'
      }
    ],
    instruments: [
      {
        name: 'HPLC Chromatograph',
        brand: 'Shimadzu',
        model: 'Prominence LC-20AD',
        specifications: 'Binary pump solvent delivery, autosampler, diode array detector (DAD).'
      }
    ],
    contact: {
      whatsapp: '+62 812-5259-8890',
      email: 'lsih@ub.ac.id',
      office: '0341-575843',
      picName: 'Sofia Maulida, S.Si., M.Biomed.'
    },
    reviews: [
      {
        user: 'Gani Maulana',
        rating: 5,
        date: '2026-05-25',
        comment: 'Hasil uji HPLC untuk ekstrak madu hutan teruji sah dan pengerjaannya sangat teliti.',
        tag: 'Skripsi'
      }
    ]
  },
  {
    id: 'lab-undip',
    name: 'UPT Laboratorium Terpadu',
    institution: 'Universitas Diponegoro (UNDIP)',
    location: 'Kampus Tembalang, Jl. Prof. Sudarto, Semarang, Jawa Tengah',
    city: 'Semarang',
    accreditation: ['KAN (ISO/IEC 17025)', 'ISO 9001:2015'],
    verified: true,
    rating: 4.7,
    completedProjects: 1490,
    responseTimeMinutes: 12,
    turnaroundTimeDays: '4 - 7 Hari Kerja',
    startingPrice: 180000,
    image: 'https://images.unsplash.com/photo-1513224502586-d1e602410265?auto=format&fit=crop&q=80&w=600',
    description: 'Laboratorium riset multiguna di Kota Semarang. Memberikan pelayanan uji material padat, karakterisasi termal, serta pengujian klinis hayati air laut terintegrasi dengan ISO/IEC 17025 terdaftar.',
    services: [
      {
        name: 'Karakterisasi Gugus Fungsi FTIR (ATR Mode)',
        category: 'Chemical Analysis',
        method: 'KBr Pellet Method (Mid-IR range)',
        price: 150000,
        duration: '3 Hari',
        sampleRequirement: 'Sampel padat kering / cairan organik non-korosif 2mL',
        outputReport: 'Lembar grafik transmitansi persen vs bilangan gelombang (cm-1) disertai penafsiran puncak utama'
      }
    ],
    instruments: [
      {
        name: 'FTIR Spectrometer',
        brand: 'Thermo Scientific',
        model: 'Nicolet iS10',
        specifications: 'Integrated diamond ATR system, mid-infrared spectrum 4000 to 400 cm-1.'
      }
    ],
    contact: {
      whatsapp: '+62 813-9092-1245',
      email: 'labterpadu@live.undip.ac.id',
      office: '024-7691811',
      picName: 'Widodo Prasetyo, M.T.'
    },
    reviews: [
      {
        user: 'Ardi Bagas',
        rating: 4.7,
        date: '2026-04-18',
        comment: 'Sangat terbantu untuk pengujian membran selulosa PKM saya. Pelayanannya cepat dan sistem booking-nya transparan.',
        tag: 'PKM'
      }
    ]
  },
  {
    id: 'lab-uny',
    name: 'Laboratorium Terpadu & Layanan Sains',
    institution: 'Universitas Negeri Yogyakarta (UNY)',
    location: 'Kampus Karangmalang, Sleman, Yogyakarta',
    city: 'Yogyakarta',
    accreditation: ['Lainnya / Lab Akademis'],
    verified: true,
    rating: 4.6,
    completedProjects: 890,
    responseTimeMinutes: 15,
    turnaroundTimeDays: '4 - 8 Hari Kerja',
    startingPrice: 130000,
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600',
    description: 'Laboratorium pendidikan dan riset terpadu di UNY Karangmalang. Menyediakan uji mekanis tarik material film, kimia volumetrik terstandar, dan mikrobiologi terapan untuk mahasiswa.',
    services: [
      {
        name: 'Uji Tarik Mekanik Film (Tensile Strength)',
        category: 'Material Testing',
        method: 'ASTM D882 / Tensile Test Film polymer',
        price: 180000,
        duration: '4 Hari',
        sampleRequirement: 'Lembaran film biodegradable ukuran minimal 10x2 cm tebal seragam',
        outputReport: 'Data tegangan patah (MPa), regangan maksimum (%), modul Young'
      }
    ],
    instruments: [
      {
        name: 'Universal Testing Machine (UTM)',
        brand: 'Llyod Instruments',
        model: 'LRX Plus 5kN',
        specifications: 'Load accuracy 0.5%, speed range 0.01 to 1000 mm/min, extensometer equipped.'
      }
    ],
    contact: {
      whatsapp: '+62 877-3801-4477',
      email: 'lab.sains@uny.ac.id',
      office: '0274-586168',
      picName: 'Retno Wulandari, S.Pd., M.Si.'
    },
    reviews: [
      {
        user: 'Putri Salsabila',
        rating: 4.6,
        date: '2026-06-01',
        comment: 'Tarifnya bersahabat bagi kantong mahasiswa UNY yang sedang menyelesaikan tugas akhir.',
        tag: 'Skripsi'
      }
    ]
  },
  {
    id: 'lab-unair',
    name: 'Laboratorium Kemandirian Kesehatan LPT',
    institution: 'Universitas Airlangga (UNAIR)',
    location: 'Kampus C UNAIR, Mulyorejo, Surabaya, Jawa Timur',
    city: 'Surabaya',
    accreditation: ['KAN (ISO/IEC 17025)', 'BPOM Registered Partner'],
    verified: true,
    rating: 4.9,
    completedProjects: 1890,
    responseTimeMinutes: 10,
    turnaroundTimeDays: '5 - 9 Hari Kerja',
    startingPrice: 220000,
    image: 'https://images.unsplash.com/photo-1579154261294-a101a242f831?auto=format&fit=crop&q=80&w=600',
    description: 'Laboratorium biomedis dan biofarmasi rujukan di Jawa Timur milik Universitas Airlangga. Sangat kental dengan pengujian toksisitas pakan, virologi sel, biomolekuler PCR, profiling tanaman herbal menggunakan kromatografi, dan kultur sel kanker primer.',
    services: [
      {
        name: 'Analisis GC-MS (Profiling Senyawa Aromatik Atsiri)',
        category: 'Chemical Analysis',
        method: 'AOAC 930.15 Gas Chromatographic profiling',
        price: 600000,
        duration: '6 Hari',
        sampleRequirement: 'Fraksi minyak atsiri murni min 2mL bebas air',
        outputReport: 'Kromatogram retensi, tabel persentase kelimpahan senyawa area, pustaka Library NIST matches'
      }
    ],
    instruments: [
      {
        name: 'GC-MS Spectrometer System',
        brand: 'Agilent Technologies',
        model: '7890B GC / 5977B MS',
        specifications: 'High sensitivity EI source, mass resolution 0.1 amu, auto injector, NIST 20 library integrated.'
      }
    ],
    contact: {
      whatsapp: '+62 811-3004-941',
      email: 'pelayanan_lpt@unair.ac.id',
      office: '031-5992445',
      picName: 'Ahmad Syukri, Ph.D.'
    },
    reviews: [
      {
        user: 'Luthfi Hakim',
        rating: 4.9,
        date: '2026-05-30',
        comment: 'Layanan profiling GC-MS sangat memuaskan, pustaka NIST-nya sangat akurat mendeteksi senyawa target ekstrak herba.',
        tag: 'Tesis'
      }
    ]
  },
  {
    id: 'lab-unj',
    name: 'Laboratorium Kimia Analit Terpadu',
    institution: 'Universitas Negeri Jakarta (UNJ)',
    location: 'Gedung K, Kampus A UNJ, Rawamangun, Jakarta Timur',
    city: 'Jakarta',
    accreditation: ['Lainnya / Lab Akademis', 'Ristekdikti Certified'],
    verified: true,
    rating: 4.5,
    completedProjects: 620,
    responseTimeMinutes: 16,
    turnaroundTimeDays: '4 - 7 Hari Kerja',
    startingPrice: 140000,
    image: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&q=80&w=600',
    description: 'Menyediakan fasilitas riset sains kimia yang mumpuni dengan harga ramah mahasiswa di Jakarta Timur. Melayani analisis logam berat pencemar air, uji absorban spektrofotometer UV-Vis, uji kualitas sabun, dan proksimat dasar pangan.',
    services: [
      {
        name: 'Pengukuran Absorban Spektrofotometri UV-Vis',
        category: 'Chemical Analysis',
        method: 'Quantitative UV-Vis spectrophotometry',
        price: 150000,
        duration: '3 Hari',
        sampleRequirement: 'Larutan jernih tersaring min 10mL berikan keterangan rujukan panjang gelombang',
        outputReport: 'Data absorbansi numerik, grafik spektrum run penuh'
      }
    ],
    instruments: [
      {
        name: 'UV-Vis Spectrophotometer',
        brand: 'Genesis',
        model: 'Genesys 150',
        specifications: 'Dual beam optical geometry, wavelength range 190 to 1100 nm, spectral bandwidth 2.0 nm.'
      }
    ],
    contact: {
      whatsapp: '+62 856-9121-5050',
      email: 'labkimia.analit@unj.ac.id',
      office: '021-4750930',
      picName: 'Drs. Suparno, M.Si.'
    },
    reviews: [
      {
        user: 'Dewi Safitri',
        rating: 4.5,
        date: '2026-04-10',
        comment: 'Sangat diringankan oleh paket biaya mahasiswa pengerjaan absorbsi kloroform untuk tugas akhir saya.',
        tag: 'Skripsi'
      }
    ]
  },
  {
    id: 'lab-um',
    name: 'Laboratorium Penelitian Bersama (LPB)',
    institution: 'Universitas Negeri Malang (UM)',
    location: 'Jl. Semarang No. 5, Lowokwaru, Malang, Jawa Timur',
    city: 'Malang',
    accreditation: ['Sertifikasi BRIN', 'Lainnya / Lab Akademis'],
    verified: true,
    rating: 4.6,
    completedProjects: 780,
    responseTimeMinutes: 14,
    turnaroundTimeDays: '4 - 7 Hari Kerja',
    startingPrice: 150000,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
    description: 'Pusat uji riset terintegrasi Universitas Negeri Malang. Melayani kopolimerisasi material ramah lingkungan, pengukuran elektrokimia konduktivitas baterai kering, preparasi mikroskopi anatomi tanaman, dan FTIR fungsional.',
    services: [
      {
        name: 'Uji Tegangan Sel Elektrokimia / Konduktivitas Baterai',
        category: 'Material Testing',
        method: 'Cyclic Voltammetry / Impedance Spectroscopy',
        price: 250000,
        duration: '4 Hari',
        sampleRequirement: 'Bahan elektroda sel kering siap uji diameter 1.5 cm',
        outputReport: 'Grafik voltammogram, arus puncak fisis anodes-katodes'
      }
    ],
    instruments: [
      {
        name: 'Potentiostat Galvanostat',
        brand: 'Metrohm Autolab',
        model: 'PGSTAT204',
        specifications: 'Maximum current 400 mA, potential range -10 V to 10 V, impedance spectroscopy frequency 10 uHz to 1 MHz.'
      }
    ],
    contact: {
      whatsapp: '+62 895-3422-1100',
      email: 'lpb.riset@um.ac.id',
      office: '0341-551312',
      picName: 'Dr. Nunung Herminah'
    },
    reviews: [
      {
        user: 'Yudhistira',
        rating: 4.6,
        date: '2026-05-18',
        comment: 'Pengukuran elektrokimia ampas tebu untuk anoda baterai litium sangat rapi dibantu oleh teknisinya.',
        tag: 'PKM'
      }
    ]
  },
  {
    id: 'lab-undip-unnes',
    name: 'Laboratorium Karakterisasi Energi dan Material',
    institution: 'Universitas Negeri Semarang (UNNES)',
    location: 'Kampus Sekaran, Gunungpati, Semarang, Jawa Tengah',
    city: 'Semarang',
    accreditation: ['Lainnya / Lab Akademis'],
    verified: false,
    rating: 4.4,
    completedProjects: 510,
    responseTimeMinutes: 18,
    turnaroundTimeDays: '5 - 9 Hari Kerja',
    startingPrice: 130000,
    image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=600',
    description: 'Fokus melayani mahasiswa riset dalam pengujian fisis material termo elektrik, absorbsi karbon aktif ampas pertanian, preparasi polimer padat biodegradable, serta FTIR standar.',
    services: [
      {
        name: 'FTIR Fungsional Polimer',
        category: 'Chemical Analysis',
        method: 'ATR FTIR Spectra mapping',
        price: 130000,
        duration: '4 Hari',
        sampleRequirement: 'Sampel padatan tipis/lembaran murni kering',
        outputReport: 'Grafik hubungan bilangan gelombang transpor energi persen'
      }
    ],
    instruments: [
      {
        name: 'FTIR Spectrophotometer',
        brand: 'Bruker',
        model: 'Alpha II',
        specifications: 'Compact FTIR spectrometer, rocksolid interferometer, integrated ATR crystal.'
      }
    ],
    contact: {
      whatsapp: '+62 838-4050-9900',
      email: 'labmaterial@unnes.ac.id',
      office: '024-8508112',
      picName: 'Kurniawan Prasetyo, M.Sc.'
    },
    reviews: [
      {
        user: 'Lia Astuti',
        rating: 4.4,
        date: '2026-05-02',
        comment: 'Sangat bersahabat tarifnya untuk kami dari UNNES yang mau karakterisasi plastik jagung.',
        tag: 'PKM'
      }
    ]
  },
  {
    id: 'lab-unej',
    name: 'Laboratorium Pengujian dan Kalibrasi Terpadu',
    institution: 'Universitas Jember (UNEJ)',
    location: 'Kampus Tegalboto, Jl. Kalimantan No. 37, Jember, Jawa Timur',
    city: 'Jember',
    accreditation: ['KAN (ISO/IEC 17025)', 'Sertifikasi BRIN'],
    verified: true,
    rating: 4.7,
    completedProjects: 930,
    responseTimeMinutes: 11,
    turnaroundTimeDays: '4 - 7 Hari Kerja',
    startingPrice: 170000,
    image: 'https://images.unsplash.com/photo-148682536232b-2d523232bb2b?auto=format&fit=crop&q=80&w=600',
    description: 'Pusat pengujian dan kalibrasi terakreditasi KAN tunggal terlengkap di timur Jawa Timur (Kawasan Tapal Kuda). Sangat kuat melayani pengujian residu pestisida kopi pangan, kualitas serat daun tembakau cerutu, logam berat hara tanah perkebunan, dan kalibrasi timbangan digital analitis.',
    services: [
      {
        name: 'Uji Residu Pestisida Pangan Kopi / Tembakau',
        category: 'Food Testing',
        method: 'SNI 7313:2008 / GC-FID Pesticide Screening',
        price: 350000,
        duration: '5 Hari',
        sampleRequirement: 'Biji kopi kering atau daun tembakau kering kemas plastik steril min 150 gram',
        outputReport: 'Kadar residu organofosfat dsb dalam batas ambang aman pangan (ppm/ppb) KAN terakreditasi'
      }
    ],
    instruments: [
      {
        name: 'Gas Chromatograph dengan Flame Ionization Detector (GC-FID)',
        brand: 'Shimadzu',
        model: 'GC-2010 Plus',
        specifications: 'High-temperature FID detector, automatic flow controller, capillary column system.'
      }
    ],
    contact: {
      whatsapp: '+62 822-4411-9009',
      email: 'lab_pengujian@unej.ac.id',
      office: '0331-330222',
      picName: 'Dwi Nurcahyo, S.TP., M.P.'
    },
    reviews: [
      {
        user: 'Eko Sulistyo',
        rating: 4.8,
        date: '2026-05-11',
        comment: 'Analisis logam berat tanah andosol untuk riset pupuk kopi saya selesai sangat tepat waktu, berstempel KAN resmi.',
        tag: 'Skripsi'
      }
    ]
  },
  {
    id: 'lab-polije',
    name: 'Laboratorium Analisis Pangan & Agroindustri Terapan',
    institution: 'Politeknik Negeri Jember (Polije)',
    location: 'Jl. Mastrip, Po Box 164, Jember, Jawa Timur',
    city: 'Jember',
    accreditation: ['Sertifikasi Halal (BPJPH)', 'Lainnya / Lab Akademis'],
    verified: false,
    rating: 4.5,
    completedProjects: 420,
    responseTimeMinutes: 18,
    turnaroundTimeDays: '5 - 8 Hari Kerja',
    startingPrice: 100000,
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=600',
    description: 'Laboratorium pengujian hilirisasi produk pertanian, pangan olahan, perkebunan dan plastik pati komposit di Politeknik Negeri Jember. Melayani uji organoleptik rasa mutu kopi, keasaman margarin/minyak goreng kelapa, dan kadar glukosa air nira.',
    services: [
      {
        name: 'Uji Asam Lemak Bebas (FFA - Free Fatty Acid)',
        category: 'Food Testing',
        method: 'SNI 01-3555-1998 Alometri',
        price: 100000,
        duration: '4 Hari',
        sampleRequirement: 'Bahan minyak goreng / lemak nabati olahan cair min 100mL',
        outputReport: 'Lembar persentase asam lemak bebas dihitung sebagai asam laurat/oleat (%)'
      }
    ],
    instruments: [
      {
        name: 'Metode Titrator Otomatis',
        brand: 'Mettler Toledo',
        model: 'Easy pH Titrator',
        specifications: 'Integrated glass pH electrode, resolution 0.01 pH, automatic calculation calculations.'
      }
    ],
    contact: {
      whatsapp: '+62 823-3344-0102',
      email: 'labterpadu@polije.ac.id',
      office: '0331-333532',
      picName: 'Ir. Maria Ulfa, M.P.'
    },
    reviews: [
      {
        user: 'Danang Prasojo',
        rating: 4.5,
        date: '2026-04-20',
        comment: 'Hasil uji FFA minyak bekatul padi sangat akurat dan dibimbing perhitungan titrasinya oleh teknisi polije.',
        tag: 'Skripsi'
      }
    ]
  }
];

export const CATEGORIES_DATA = [
  { name: 'Food Testing', icon: 'Apple', count: 420, price: 'Rp 100K+', duration: '4-7 Days' },
  { name: 'Material Testing', icon: 'Layers', count: 680, price: 'Rp 180K+', duration: '3-5 Days' },
  { name: 'Chemical Analysis', icon: 'FlaskConical', count: 810, price: 'Rp 130K+', duration: '3-7 Days' },
  { name: 'Environmental Testing', icon: 'Droplets', count: 340, price: 'Rp 300K+', duration: '4-6 Days' },
  { name: 'Biotechnology', icon: 'Activity', count: 180, price: 'Rp 400K+', duration: '5-14 Days' },
  { name: 'Microbiology', icon: 'HeartPulse', count: 250, price: 'Rp 180K+', duration: '5 Days' },
  { name: 'Mining Laboratory', icon: 'Pick', count: 120, price: 'Rp 450K+', duration: '3-5 Days' },
  { name: 'Calibration', icon: 'Settings', count: 90, price: 'Rp 200K+', duration: '2-4 Days' }
];

export const INDONESIA_CITIES = [
  'Semua Lokasi',
  'Bandung',
  'Depok',
  'Bogor',
  'Banda Aceh',
  'Samarinda',
  'Jakarta',
  'Surabaya',
  'Yogyakarta',
  'Semarang',
  'Malang',
  'Jember'
];
