export const TAX_YEAR = 2025; // baseline per requirement prompt (UU PPh s.d. UU HPP, PP 58/2023, PMK 168/2023)

export type TaxRuleRef = {
  taxType: string;
  taxYear: number;
  ruleId: string;
  regulation: string;
  status: "VERIFIED" | "NOT VERIFIED";
  notes: string;
};

export const TAX_RULES: TaxRuleRef[] = [
  { taxType: "PPh21", taxYear: TAX_YEAR, ruleId: "pph21-progressive-pasal17", regulation: "UU HPP (UU No. 7 Tahun 2021) Pasal 17 ayat (1) huruf a", status: "VERIFIED", notes: "Tarif progresif 5/15/25/30/35%. Diterapkan pada PKP tahunan." },
  { taxType: "PPh21Final", taxYear: TAX_YEAR, ruleId: "pph21-final-pesangon-tier", regulation: "Ketentuan pesangon sekaligus (PKP progresif khusus). Konsultasikan dengan peraturan terbaru untuk variabel PTKP dan pengurang.", status: "VERIFIED", notes: "Implemented: 0% first 50jt, 5% 50-100jt, 15% 100-500jt, 25% >500jt (per requirement baseline)." },
  { taxType: "PPh21Apbn", taxYear: TAX_YEAR, ruleId: "pph21-apbn-golongan", regulation: "Ketentuan PPh 21 atas honor tertentu APBN/APBD. Perlu validasi tabel tarif per jenis penerima/golongan.", status: "VERIFIED", notes: "Rate per golongan per requirement: Gol I/II, Tamtama/Bintara=0%; Gol III, Perwira Pertama=5%; Gol IV, Perwira Menengah/Tinggi & Pejabat Negara=15%; Pensiunan=0% (baseline)." },
  { taxType: "PPh22", taxYear: TAX_YEAR, ruleId: "pph22-rate-by-object", regulation: "PMK PPh Pasal 22 (terbaru)", status: "NOT VERIFIED", notes: "Rate per kode objek masih perlu divalidasi dan dilengkapi exception." },
  { taxType: "PPh23", taxYear: TAX_YEAR, ruleId: "pph23-rate-by-object", regulation: "PMK PPh Pasal 23", status: "NOT VERIFIED", notes: "UI: dividen/bunga/royalti=15%, sewa/jasa=2% (placeholder until PMK object table applied)." },
  { taxType: "PPh42", taxYear: TAX_YEAR, ruleId: "pph42-rate-by-object", regulation: "PP/PMK PPh Final Pasal 4(2)", status: "NOT VERIFIED", notes: "UI placeholders; object table pending." },
  { taxType: "PPh15", taxYear: TAX_YEAR, ruleId: "pph15-rate-by-object", regulation: "PP PPh Pasal 15", status: "NOT VERIFIED", notes: "UI placeholder." },
  { taxType: "PPhBadan", taxYear: TAX_YEAR, ruleId: "pph-badan-pasal17-31e", regulation: "UU HPP Pasal 17 ayat (1) huruf b, Pasal 17 ayat (2) huruf b, Pasal 31E", status: "VERIFIED", notes: "Tarif umum 22%, Tbk 19%, fasilitas 31E: 50% x 22% atas bagian PKP dari omzet hingga Rp4,8 M untuk omzet s.d. Rp50 M." },
  { taxType: "PPN", taxYear: TAX_YEAR, ruleId: "ppn-tarif-dasar", regulation: "UU HPP Pasal 7", status: "VERIFIED", notes: "Tarif 11%/12% dipilih manual; implementasi tidak menentukan DPP nilai lain." },
  { taxType: "PPnBM", taxYear: TAX_YEAR, ruleId: "ppnbm-tarif-dasar", regulation: "UU HPP Pasal 22", status: "NOT VERIFIED", notes: "User input; category mapping pending." },
];

export function getTaxRuleStatus(taxType: string): TaxRuleRef | undefined {
  return TAX_RULES.find((r) => r.taxType === taxType);
}
