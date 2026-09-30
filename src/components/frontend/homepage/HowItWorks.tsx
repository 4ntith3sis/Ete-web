"use client";
import { useState } from "react";
import { FloatingBadge } from "../shared/FloatingBadge";

type Step = {
  num: string;
  title: string;
  description: string;
  features: string[];
};

const stepsData: Step[] = [
  {
    num: "01",
    title: "Pilih Layanan",
    description:
      "Dapatkan 30+ jenis layanan perpajakan & akuntansi sesuai kebutuhan bisnis Anda.",
    features: [
      "Transparansi harga sejak awal tanpa biaya tersembunyi",
      "Biaya sudah termasuk pendaftaran & e-filing resmi DJP",
      "Gratis konsultasi awal tanpa syarat apapun",
    ],
  },
  {
    num: "02",
    title: "Konsultasi Gratis",
    description:
      "Hubungi tim konsultan pajak kami langsung untuk membahas kebutuhan spesifik bisnis Anda.",
    features: [
      "Respons cepat dalam 5 menit melalui WhatsApp atau telepon",
      "Analisis kewajiban perpajakan & pembukuan bisnis Anda",
      "Rekomendasi solusi pajak paling efisien & legal",
    ],
  },
  {
    num: "03",
    title: "Kirim Dokumen Online",
    description: "Upload data keuangan & berkas pendukung secara online dengan aman.",
    features: [
      "Formulir digital terpadu — pengisian cepat & praktis",
      "Enkripsi data kerahasiaan tingkat tinggi (Secure Vault)",
      "Notifikasi otomatis saat dokumen diverifikasi konsultan",
    ],
  },
  {
    num: "04",
    title: "Terima hasil layanan sesuai kebutuhan",
    description:
      "Unduh seluruh dokumen & Bukti Penerimaan Elektronik (BPE) resmi langsung dari dashboard Anda.",
    features: [
      "Bukti Penerimaan Elektronik (BPE) resmi dari DJP Online",
      "Laporan Keuangan & Fiskal rapi siap pakai",
      "Garansi tepat waktu & bebas denda keterlambatan",
    ],
  },
];

const stepImages = [
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
];

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#16A34A"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="hiw-index-section" id="how-it-works">
      <style>{`
        .hiw-index-section { padding: 48px 0; margin: 32px 0; background: #fff; overflow: hidden; position: relative; width: 100%; }
        @media (min-width: 640px) { .hiw-index-section { padding-top: 80px; padding-bottom: 80px; } }
        .hiw-index-container { max-width: 1240px; margin: 0 auto; padding-left: 20px; padding-right: 20px; }
        @media (min-width: 640px) { .hiw-index-container { padding-left: 32px; padding-right: 32px; } }
        .hiw-index-grid { display: grid; grid-template-columns: 1fr; gap: 64px; align-items: center; }
        @media (min-width: 1024px) { .hiw-index-grid { grid-template-columns: repeat(12, minmax(0,1fr)); gap: 32px; } }
        .hiw-index-left { display: flex; flex-direction: column; justify-content: flex-start; }
        @media (min-width: 1024px) { .hiw-index-left { grid-column: span 5 / span 5; } }
        .hiw-index-eyebrow { font-size: 16px; font-weight: 800; color: #0c1736; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 6px; }
        @media (min-width: 640px) { .hiw-index-eyebrow { margin-bottom: 12px; } }
        .hiw-index-heading { font-size: 28px; font-weight: 900; color: #0c1736; line-height: 1.25; letter-spacing: -0.02em; margin: 0; }
        @media (min-width: 640px) { .hiw-index-heading { font-size: 38px; line-height: 1.12; } }
        @media (min-width: 1024px) { .hiw-index-heading { font-size: 42px; } }
        .hiw-index-desc { margin-top: 8px; font-size: 16px; color: #6B7280; line-height: 1.625; max-width: 460px; }
        @media (min-width: 640px) { .hiw-index-desc { margin-top: 16px; } }
        .hiw-index-accordion { margin-top: 32px; }
        .hiw-index-acc-row { border-bottom: 1px solid #f3f4f6; padding: 20px 0; }
        .hiw-index-acc-active-btn { display: flex; align-items: center; gap: 12px; text-align: left; width: 100%; min-height: 44px; }
        .hiw-index-acc-arrow { color: #0c1736; font-size: 16px; font-weight: 800; }
        .hiw-index-acc-active-title { font-size: 16px; font-weight: 900; color: #0c1736; }
        .hiw-index-acc-body { margin-top: 12px; padding-left: 28px; }
        .hiw-index-acc-body p { font-size: 14px; color: #6B7280; font-weight: 500; line-height: 1.625; margin: 0 0 16px 0; }
        .hiw-index-acc-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .hiw-index-acc-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: #374151; line-height: 1.4; }
        .hiw-index-check { width: 20px; height: 20px; border-radius: 9999px; background: #DCFCE7; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; border: 1px solid #bbf7d0; box-shadow: 0 1px 2px rgba(0,0,0,.05); }
        .hiw-index-acc-list span:last-child { font-weight: 500; color: #4b5563; }
        .hiw-index-acc-idle { display: flex; align-items: center; gap: 16px; width: 100%; text-align: left; padding: 8px 0; min-height: 44px; }
        .hiw-index-acc-num { color: #9CA3AF; font-size: 14px; font-weight: 800; letter-spacing: .05em; width: 24px; }
        .hiw-index-acc-idle-title { font-size: 15px; font-weight: 600; color: #6b7280; }
        .hiw-index-acc-idle:hover .hiw-index-acc-idle-title { color: #374151; }
        .hiw-index-visual { position: relative; width: 100%; height: 520px; display: none; align-items: center; justify-content: center; transform: scale(.9); transform-origin: center; transition: all .5s; }
        @media (min-width: 1024px) { .hiw-index-visual { display: flex; grid-column: span 7 / span 7; } }
        @media (min-width: 640px) { .hiw-index-visual { transform: scale(1); } }
        .hiw-step-visual { position: absolute; inset: 0; width: 100%; height: 100%; }
        .hiw-photo { position: absolute; top: 32px; left: 12%; width: 76%; height: 80%; border-radius: 2rem; overflow: hidden; background: #f8fafc; filter: drop-shadow(0 20px 13px rgba(0,0,0,.03)) drop-shadow(0 8px 5px rgba(0,0,0,.08)); }
        .hiw-photo img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
        .hiw-float { position: absolute; background: #fff; z-index: 40; box-shadow: 0 10px 25px rgba(0,0,0,.1); border: 1px solid rgba(0,0,0,.03); }
        .hiw-pill-top { top: 12%; right: 2%; border-radius: 9999px; padding: 8px 14px; display: flex; align-items: center; gap: 10px; }
        .hiw-green-dot { width: 20px; height: 20px; border-radius: 9999px; background: #E8F5E9; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .hiw-bottom-card { position: absolute; bottom: -80px; left: 50%; transform: translateX(-50%); width: 70%; background: rgba(255,255,255,.95); backdrop-filter: blur(4px); border-radius: 24px; padding: 16px; box-shadow: 0 25px 60px rgba(12,23,54,.15); z-index: 40; border: 1px solid #fff; }
        .hiw-bottom-head { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .hiw-bottom-num { width: 36px; height: 36px; border-radius: 10px; background: #0c1736; display: flex; align-items: center; justify-content: center; color: #ffc82c; font-weight: 900; font-size: 14px; box-shadow: 0 10px 15px rgba(12,23,54,.3); }
        .hiw-mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .hiw-mini { border-radius: 12px; padding: 10px; display: flex; align-items: center; gap: 8px; text-align: left; }
        .hiw-mini-icon { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        @keyframes hiw-step-in { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes hiw-bounce-slow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes hiw-float-medium { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes hiw-float-slow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes hiw-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes hiw-fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .hiw-anim-step { animation: hiw-step-in .5s cubic-bezier(.16,1,.3,1); }
        .hiw-anim-bounce { animation: hiw-bounce-slow 3s ease-in-out infinite; }
        .hiw-anim-float-m { animation: hiw-float-medium 4s ease-in-out infinite; }
        .hiw-anim-float-s { animation: hiw-float-slow 5s ease-in-out infinite; }
        .hiw-anim-fade { animation: hiw-fade-in .3s ease; }
        .hiw-anim-fade-up { animation: hiw-fade-in-up .35s ease; }
      `}</style>

      <div className="hiw-index-container">
        <div className="hiw-index-grid">
          {/* LEFT: Step-by-Step Accordion Flow */}
          <div className="hiw-index-left">
            <span className="hiw-index-eyebrow">Cara Kerja</span>
            <h2 className="hiw-index-heading">
              Empat Langkah Semua
              <br /> Beres Tanpa Pusing.
            </h2>
            <p className="hiw-index-desc">
              Proses transparan dari konsultasi sampai dokumen perpajakan &amp; BPE DJP di tangan
              Anda — semua terpantau jelas.
            </p>

            <div className="hiw-index-accordion" id="accordion-container">
              {stepsData.map((step, idx) => {
                const isActive = activeStep === idx;
                if (isActive) {
                  return (
                    <div className="hiw-index-acc-row" key={step.num}>
                      <div className="hiw-anim-fade" style={{ display: "flex", flexDirection: "column", textAlign: "left", width: "100%" }}>
                        <button
                          type="button"
                          onClick={() => setActiveStep(idx)}
                          className="hiw-index-acc-active-btn"
                        >
                          <span className="hiw-index-acc-arrow">→</span>
                          <span className="hiw-index-acc-active-title">{step.title}</span>
                        </button>
                        <div className="hiw-index-acc-body hiw-anim-fade-up">
                          <p>{step.description}</p>
                          <ul className="hiw-index-acc-list">
                            {step.features.map((feat) => (
                              <li key={feat}>
                                <div className="hiw-index-check">
                                  <CheckIcon />
                                </div>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="hiw-index-acc-row" key={step.num}>
                    <button
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      className="hiw-index-acc-idle"
                    >
                      <span className="hiw-index-acc-num">{step.num}</span>
                      <span className="hiw-index-acc-idle-title">{step.title}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Overlapping layered dashboard composition */}
          <div className="hiw-index-visual" id="visual-container">
            {/* STEP 0 VISUAL */}
            {activeStep === 0 && (
              <div className="hiw-step-visual hiw-anim-step">
                <div className="hiw-photo">
                  <img src={stepImages[0]} alt="Pilih Layanan Pajak" />
                </div>

                <FloatingBadge animation="float-medium" style={{ top: "44%", right: -8, borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 12, width: 200 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#0c1736", color: "#ffc82c" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  </div>
                  <div style={{ lineHeight: 1.2, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#1f2937" }}>Butuh Lapor Pajak?</div>
                    <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700, marginTop: 4 }}>SPT Tahunan &amp; Masa,</div>
                  </div>
                </FloatingBadge>

                <FloatingBadge animation="float-slow" style={{ top: "18%", left: "-2%", borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 12, width: 200 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#0c1736", color: "#ffc82c" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 21v-4h6v4" /><path d="M8 7h2M14 7h2M8 11h2M14 11h2" /></svg>
                  </div>
                  <div style={{ lineHeight: 1.2, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#1f2937" }}>Mau Jadi PKP?</div>
                    <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700, marginTop: 4 }}>Dibantu prosesnya,</div>
                  </div>
                </FloatingBadge>

                <FloatingBadge animation="float-medium" style={{ top: "58%", left: "-2%", borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 12, width: 200 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#0c1736", color: "#ffc82c" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>
                  </div>
                  <div style={{ lineHeight: 1.2, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#1f2937" }}>Laporan Belum Rapi?</div>
                    <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700, marginTop: 4 }}>Kami bantu susun.</div>
                  </div>
                </FloatingBadge>

                <div className="hiw-bottom-card">
                  <div className="hiw-bottom-head">
                    <div className="hiw-bottom-num">01</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 900, color: "#0c1736", lineHeight: 1.2 }}>Pilih Layanan</div>
                      <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, marginTop: 2 }}>Tentukan jasa perpajakan yang Anda butuhkan</div>
                    </div>
                  </div>
                  <div className="hiw-mini-grid" style={{ gridTemplateColumns: "1fr" }}>
                    <a href="/layanan" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Jelajahi Layanan <span aria-hidden="true">→</span></a>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1 VISUAL */}
            {activeStep === 1 && (
              <div className="hiw-step-visual hiw-anim-step">
                <div className="hiw-photo">
                  <img src={stepImages[1]} alt="Konsultasi Gratis" />
                </div>

                <FloatingBadge animation="bounce-slow" className="hiw-pill-top">
                  <div className="hiw-green-dot">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, paddingRight: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 900, color: "#1f2937" }}>Konsultasi Aktif</span>
                    <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 700 }}>Online</span>
                  </div>
                </FloatingBadge>

                <FloatingBadge animation="float-medium" style={{ top: "40%", right: -8, borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 12, width: 200 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #0c1736", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#0c1736", color: "#ffc82c" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>
                  </div>
                  <div style={{ lineHeight: 1.2, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#1f2937" }}>Konsultan Berizin</div>
                    <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700, marginTop: 4 }}>Ditangani profesional</div>
                  </div>
                </FloatingBadge>

                <FloatingBadge animation="float-slow" style={{ top: "22%", left: "-2%", borderRadius: 16, padding: 12, display: "flex", alignItems: "center", gap: 12, width: 230 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "#0c1736", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#ffc82c" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                  </div>
                  <div style={{ lineHeight: 1.2, paddingRight: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#1f2937" }}>Respon Cepat</div>
                    <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700, marginTop: 4 }}>Tidak perlu menunggu lama</div>
                  </div>
                </FloatingBadge>

                <FloatingBadge animation="float-slow" style={{ top: "48%", left: "-2%", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 8, width: 180 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ color: "#f59e0b", fontWeight: 800, fontSize: 14 }}>★ 5.0</span>
                    <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 900, letterSpacing: "0.05em" }}>RATING</span>
                  </div>
                  <div style={{ lineHeight: 1.2 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#1f2937" }}>Paham Pajak</div>
                    <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 700, marginTop: 4 }}>100% Solutif</div>
                  </div>
                </FloatingBadge>

                <div className="hiw-bottom-card">
                  <div className="hiw-bottom-head">
                    <div className="hiw-bottom-num">02</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 900, color: "#0c1736", lineHeight: 1.2 }}>Hubungi Konsultan</div>
                      <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, marginTop: 2 }}>Konsultasi pajak &amp; akuntansi gratis</div>
                    </div>
                  </div>
                  <div className="hiw-mini-grid">
                    <div className="hiw-mini" style={{ border: "1.5px solid #22c55e", background: "rgba(240,253,244,.5)" }}>
                      <div className="hiw-mini-icon" style={{ background: "#22c55e", color: "#fff" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 900, color: "#1f2937", lineHeight: 1.2 }}>WhatsApp</div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: "#16a34a", marginTop: 2, lineHeight: 1 }}>Online 24/7</div>
                      </div>
                    </div>
                    <div className="hiw-mini" style={{ border: "1px solid #f3f4f6", background: "#fff" }}>
                      <div className="hiw-mini-icon" style={{ background: "#a855f7", color: "#fff" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", lineHeight: 1.2 }}>Kantor Kami</div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", marginTop: 2, lineHeight: 1 }}>Kunjungan</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 VISUAL */}
            {activeStep === 2 && (
              <div className="hiw-step-visual hiw-anim-step">
                <div className="hiw-photo">
                  <img src={stepImages[2]} alt="Kirim Dokumen Online" />
                </div>

                <FloatingBadge animation="float-slow" style={{ top: "20%", left: "-2%", borderRadius: 16, padding: 12, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid #dbeafe", color: "#0c1736" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>
                  </div>
                  <div style={{ lineHeight: 1.2, paddingRight: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#1f2937" }}>Draft SPT Selesai!</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", marginTop: 4 }}>Siap Ditinjau</div>
                  </div>
                </FloatingBadge>

                <FloatingBadge animation="bounce-slow" style={{ top: "35%", right: 0, borderRadius: "9999px", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, color: "#0c1736" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  <span style={{ fontSize: 14, fontWeight: 900, color: "#1f2937" }}>Secure Vault SSL</span>
                </FloatingBadge>

                <FloatingBadge animation="float-medium" style={{ top: "55%", right: "-5%", borderRadius: 16, padding: 12, display: "flex", alignItems: "center", gap: 12, width: 190, zIndex: 30 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #0c1736", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#0c1736", flexShrink: 0, background: "#f0f4ff" }}>92%</div>
                  <div style={{ lineHeight: 1.2, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#1f2937" }}>Verifikasi Berkas</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", marginTop: 4 }}>Tim Expert EasyTax</div>
                  </div>
                </FloatingBadge>

                <div className="hiw-bottom-card">
                  <div className="hiw-bottom-head">
                    <div className="hiw-bottom-num">03</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 900, color: "#0c1736", lineHeight: 1.2 }}>Upload Dokumen</div>
                      <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, marginTop: 2 }}>Kirim berkas dengan mudah &amp; aman</div>
                    </div>
                  </div>
                  <div className="hiw-mini-grid">
                    <div className="hiw-mini" style={{ border: "1.5px solid #0c1736", background: "#f0f4ff" }}>
                      <div className="hiw-mini-icon" style={{ background: "#0c1736", color: "#ffc82c" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 900, color: "#0c1736", lineHeight: 1.2 }}>KTP &amp; NPWP</div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: "#1a2c5e", marginTop: 2, lineHeight: 1 }}>Verified</div>
                      </div>
                    </div>
                    <div className="hiw-mini" style={{ border: "1px solid #f3f4f6", background: "#FFF7ED" }}>
                      <div className="hiw-mini-icon" style={{ background: "#f97316", color: "#fff" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1f2937", lineHeight: 1.2 }}>Laporan Keuangan</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#ea580c", marginTop: 2, lineHeight: 1 }}>Verified</div>
                      </div>
                    </div>
                    <div className="hiw-mini" style={{ border: "1px solid #f3f4f6", background: "#F0FDF4" }}>
                      <div className="hiw-mini-icon" style={{ background: "#22c55e", color: "#fff" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1f2937", lineHeight: 1.2 }}>Omset &amp; Faktur</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", marginTop: 2, lineHeight: 1 }}>Verified</div>
                      </div>
                    </div>
                    <div className="hiw-mini" style={{ border: "1px solid #f3f4f6", background: "#fff" }}>
                      <div className="hiw-mini-icon" style={{ background: "#3b82f6", color: "#fff" }}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1f2937", lineHeight: 1.2 }}>Data Transaksi</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", marginTop: 2, lineHeight: 1 }}>Ready</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 VISUAL */}
            {activeStep === 3 && (
              <div className="hiw-step-visual hiw-anim-step">
                <div className="hiw-photo">
                  <img src={stepImages[3]} alt="Terima hasil layanan sesuai kebutuhan" />
                </div>

                <FloatingBadge animation="float-slow" style={{ top: "15%", left: "-2%", borderRadius: 16, padding: 12, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid #dbeafe", color: "#0c1736" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>
                  </div>
                  <div style={{ lineHeight: 1.2, paddingRight: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#1f2937" }}>Dokumen Pajak Ready!</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", marginTop: 4 }}>BPE DJP Online</div>
                  </div>
                </FloatingBadge>

                <FloatingBadge animation="float-medium" style={{ top: "32%", left: "-5%", borderRadius: 16, padding: 12, display: "flex", alignItems: "flex-start", gap: 12, width: 240, background: "rgba(255,255,255,.95)", borderColor: "#f3f4f6" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#0c1736", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffc82c", fontSize: 14, fontWeight: 900, flexShrink: 0 }}>ET</div>
                  <div style={{ lineHeight: 1.2, minWidth: 0, paddingTop: 2, width: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 900, color: "#1f2937" }}>EasyTax</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af" }}>10:24 AM</span>
                    </div>
                    <p style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.4, margin: 0 }}>Dokumen SPT &amp; BPE Anda telah selesai...</p>
                  </div>
                </FloatingBadge>

                <FloatingBadge animation="bounce-slow" style={{ top: "25%", right: "2%", borderRadius: "9999px", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", color: "#059669" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 900, color: "#1f2937" }}>BPE DJP Terbit</span>
                </FloatingBadge>

                <FloatingBadge animation="float-medium" style={{ top: "50%", right: -8, borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 12, width: 200 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #0c1736", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#0c1736", flexShrink: 0, background: "#f0f4ff" }}>100%</div>
                  <div style={{ lineHeight: 1.2, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#1f2937" }}>Selesai &amp; Legal</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", marginTop: 4 }}>Bebas Denda Pajak!</div>
                  </div>
                </FloatingBadge>

                <div className="hiw-bottom-card">
                  <div className="hiw-bottom-head">
                    <div className="hiw-bottom-num">04</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 900, color: "#0c1736", lineHeight: 1.2 }}>Terima Hasil</div>
                      <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, marginTop: 2 }}>Unduh berkas perpajakan resmi Anda</div>
                    </div>
                  </div>
                  <div className="hiw-mini-grid">
                    <div className="hiw-mini" style={{ border: "1.5px solid #0c1736", background: "#f0f4ff" }}>
                      <div className="hiw-mini-icon" style={{ background: "#0c1736", color: "#ffc82c" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 900, color: "#0c1736", lineHeight: 1.2 }}>SPT Tahunan</div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: "#1a2c5e", marginTop: 2, lineHeight: 1 }}>Unduh PDF</div>
                      </div>
                    </div>
                    <div className="hiw-mini" style={{ border: "1px solid #f3f4f6", background: "#F0FDF4" }}>
                      <div className="hiw-mini-icon" style={{ background: "#22c55e", color: "#fff" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1f2937", lineHeight: 1.2 }}>BPE DJP</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", marginTop: 2, lineHeight: 1 }}>Unduh PDF</div>
                      </div>
                    </div>
                    <div className="hiw-mini" style={{ border: "1px solid #f3f4f6", background: "#FFF7ED" }}>
                      <div className="hiw-mini-icon" style={{ background: "#f97316", color: "#fff" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1f2937", lineHeight: 1.2 }}>Laporan Keuangan</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#ea580c", marginTop: 2, lineHeight: 1 }}>Unduh PDF</div>
                      </div>
                    </div>
                    <div className="hiw-mini" style={{ border: "1px solid #f3f4f6", background: "#FFF7ED" }}>
                      <div className="hiw-mini-icon" style={{ background: "#f97316", color: "#fff" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1f2937", lineHeight: 1.2 }}>Lampiran Fiskal</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#ea580c", marginTop: 2, lineHeight: 1 }}>Unduh PDF</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
