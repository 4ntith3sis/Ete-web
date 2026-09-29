import { TrustSection } from "../shared/TrustSection";

const advantages = [
  ["fa-shield-halved", "Kepatuhan Hukum & Bebas Denda", "Membantu memastikan kewajiban perpajakan dipenuhi tepat waktu sesuai regulasi."],
  ["fa-chart-line", "Keputusan Bisnis yang Presisi", "Laporan yang rapi membantu Anda memahami kondisi dan kebutuhan bisnis."],
  ["fa-building-columns", "Kredibilitas Perbankan & Investor", "Dokumen akuntansi yang teratur mendukung kebutuhan administrasi bisnis."],
  ["fa-piggy-bank", "Efisiensi & Perencanaan Tax Saving", "Pendampingan konsultan membantu menemukan solusi pajak yang legal dan tepat."],
];

export function ServiceAdvantages() {
  return (
    <TrustSection
      sectionClassName="benefits-spt-section service-advantages"
      badge="KEUNGGULAN KAMI"
      heading="Mengapa Pilih EasyTax ?"
      description="Solusi profesional untuk mendukung kepatuhan dan kebutuhan perpajakan bisnis Anda."
      cards={advantages.map(([icon, title, description]) => ({ icon, title, description }))}
    />
  );
}
