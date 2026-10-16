import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Google GenAI client securely server-side only
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "dummy-key",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Endpoint: AI Research Roadmap Generator (returns clean JSON matching RoadmapOutput structure)
app.post("/api/gemini/roadmap", async (req, res) => {
  try {
    const { title, competition, objectives, methodology } = req.body;
    
    const prompt = `
      Anda adalah pakar riset nasional Indonesia dan integrator sistem laboratorium LABBOOK.
      Hasilkan rencana jalan riset ilmiah terperinci untuk usulan penelitian berikut:
      Judul Riset: "${title || 'Peningkatan Nilai Tambah Bahan Bakar Nabati'}"
      Target Lomba / Fokus: "${competition || 'Program Kreativitas Mahasiswa (PKM)'}"
      Tujuan Utama: "${objectives || 'Mewujudkan bioenergi berkelanjutan'}"
      Gambaran Metodologi: "${methodology || 'Ekstraksi katalis organik homogen'}"

      Rencana riset harus dirancang sedemikian rupa sehingga SANGAT berfokus pada:
      1. REKOMENDASI JENIS PENGUJIAN APA SAJA YANG DIBUTUHKAN (e.g. Uji SEM, Uji FTIR, Uji Densitas, Uji Toksisitas, dsb).
      2. REKOMENDASI LABORATORIUM DI INDONESIA YANG DIREKOMENDASIKAN secara nyata (misalnya: Laboratorium Komparasi Terpadu Institut Teknologi Bandung (ITB), Laboratorium Karakterisasi BRIN Serpong, Lab Pengujian UI Depok, Lab Terpadu Universitas Diponegoro, dsb).

      Isi instrumen/uji yang dibutuhkan dalam kolom 'requiredInstruments'.
      Dalam setiap 'phases', pada kolom 'laboratoryRequirements', sebutkan dengan jelas:
      "Rekomendasi Pengujian: [Nama Pengujian yang spesifik] - Rekomendasi Tempat Lab: [Nama Lab Riil di Indonesia yang direkomendasikan untuk uji ini beserta institusinya]".
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Anda adalah asisten riset LABBOOK Indonesia. Jawab selalu secara informatif dan profesional dalam format JSON terstruktur lengkap sesuai dengan schema yang didefinisikan. Fokuskan pada rekomendasi uji dan laboratorium spesifik di Indonesia.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "competition", "objectives", "methodology", "requiredInstruments", "estimatedCost", "phases", "references"],
          properties: {
            title: { type: Type.STRING },
            competition: { type: Type.STRING },
            objectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            methodology: { type: Type.STRING },
            requiredInstruments: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            estimatedCost: { type: Type.INTEGER },
            phases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["phase", "title", "duration", "budget", "tasks", "laboratoryRequirements", "resourcesNeeded"],
                properties: {
                  phase: { type: Type.STRING },
                  title: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  budget: { type: Type.STRING },
                  tasks: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  laboratoryRequirements: { type: Type.STRING },
                  resourcesNeeded: { type: Type.STRING }
                }
              }
            },
            references: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Roadmap generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate roadmap" });
  }
});

// Endpoint: AI Budget Cost Estimator (returns clean JSON matching CostEstimateOutput structure)
app.post("/api/gemini/estimate", async (req, res) => {
  try {
    const { title, objective, competitionType, productType, scienceField, targetOutcome, parameterUji, metodeStandar } = req.body;

    const prompt = `
      Anda adalah penaksir anggaran riset laboratorium independen di Indonesia.
      Formulasikan estimasi rincian anggaran yang wajar untuk riset ini:
      Tema/Judul: "${title || 'Karbon Aktif Ampas Kopi'}"
      Tujuan: "${objective || 'Filter limbah cair industri'}"
      Target Luaran: "${targetOutcome || 'Sertifikasi Paten & Jurnal'}"
      Bidang Sains: "${scienceField || 'Teknik Kimia / Material'}"
      Bahan / Jenis Produk: "${productType || 'Biomaterial Selulosa'}"
      ${parameterUji ? `Parameter Uji Spesifik yang Diminta Pengguna: "${parameterUji}"` : ''}
      ${metodeStandar ? `Metode Standar Acuan yang Diminta Pengguna: "${metodeStandar}"` : ''}

      Berikan rincian uji material atau organik yang relevan dengan harga riil di Indonesia.
      SANGAT PENTING: Untuk setiap baris pengujian dalam 'breakdown', Anda wajib menyertakan 'parameterUji' (e.g. Kadar Abu, Kadar Air, Morfologi Permukaan SEM, Gugus Fungsi Karbonil, Densitas Larutan, atau sejenisnya) dan 'metodeStandar' acuan laboratorium riil yang spesifik (e.g. SNI 01-2891-1992 butir 6.1, ASTM E1508, ASTM D3174, AOAC 930.15, dsb seperti sertifikat analisis SIG Lab / Saraswanti). Jika pengguna mengisi parameter uji atau metode standar di atas, prioritaskan mencantumkan atau mengacu pada isian tersebut di dalam rincian breakdown yang paling cocok.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Anda adalah sistem estimasi anggaran finansial LABBOOK Indonesia. Rujuk tarif rupiah riil laboratorium universitas di Indonesia. Selalu berikan 'parameterUji' dan 'metodeStandar' pengujian yang akurat dalam hasil breakdown.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "requiredTests", "estimatedMin", "estimatedRec", "estimatedComp", "breakdown", "logisticsCost", "certificationCost", "optimizationSuggestions"],
          properties: {
            title: { type: Type.STRING },
            requiredTests: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            estimatedMin: { type: Type.INTEGER },
            estimatedRec: { type: Type.INTEGER },
            estimatedComp: { type: Type.INTEGER },
            breakdown: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["testName", "labCategory", "minPrice", "recPrice", "compPrice", "sampleQuantity", "parameterUji", "metodeStandar"],
                properties: {
                  testName: { type: Type.STRING },
                  labCategory: { type: Type.STRING },
                  minPrice: { type: Type.INTEGER },
                  recPrice: { type: Type.INTEGER },
                  compPrice: { type: Type.INTEGER },
                  sampleQuantity: { type: Type.INTEGER },
                  parameterUji: { type: Type.STRING },
                  metodeStandar: { type: Type.STRING }
                }
              }
            },
            logisticsCost: { type: Type.INTEGER },
            certificationCost: { type: Type.INTEGER },
            optimizationSuggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Cost Estimator error:", error);
    res.status(500).json({ error: error.message || "Failed to estimate costs" });
  }
});

// Endpoint: AI Conversational Chatbot Q&A
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `
          Anda adalah LABBOOK AI Assistant, konsultan ahli akses laboratorium dan riset nasional Indonesia.
          Tugas Anda:
          1. Menolak riset jahat, senjata kimia, racun berbahaya yang tidak etis, tetapi bantu penuh inovasi mahasiswa (PKM, Tesis, Skripsi, Riset Halal, Material, Kimia).
          2. Jawab ramah dalam bahasa Indonesia/Inggris (beradaptasi dengan bahasa input), gunakan visual bullet point terstruktur, dan selipkan rekomendasi uji seperti SEM, XRD, FTIR, HPLC jika relevan dengan material dan pangan.
          3. Bersikap solutif seolah Anda melayani peneliti agar riset mereka semudah memesan hotel.
        `
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Chatbot assistant error:", error);
    res.status(500).json({ error: error.message || "Failed to process chat" });
  }
});

// Set up server assets and index mapping
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[LABBOOK Fullstack Server] active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
