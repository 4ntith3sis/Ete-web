import { progressiveTax } from "./progressive";
import { getTerBulananRate, getTerHarian, getTerKategoriFromPtkp, pphPasal17 } from "./pph21-rules";

export type Pph21Input = {
  brutoFields: number[];
  biayaJabatan: number;
  iuranPensiun: number;
  zakat: number;
  ptkp: number;
  pphTelahDipotong: number;
};

export type Pph21Result = {
  bruto: number;
  pengurang: number;
  neto: number;
  ptkp: number;
  pkp: number;
  pphAtasPkp: number;
  pphTelahDipotong: number;
  pphTerutang: number;
};

export function calculatePph21(input: Pph21Input): Pph21Result {
  const bruto = input.brutoFields.reduce((sum, v) => sum + Math.max(0, v), 0);
  const pengurang = Math.max(0, input.biayaJabatan) + Math.max(0, input.iuranPensiun) + Math.max(0, input.zakat);
  const neto = Math.max(0, bruto - pengurang);
  const pkp = Math.max(0, neto - input.ptkp);
  const pphAtasPkp = progressiveTax(pkp);
  const pphTerutang = Math.max(0, pphAtasPkp - Math.max(0, input.pphTelahDipotong));
  return {
    bruto,
    pengurang,
    neto,
    ptkp: input.ptkp,
    pkp,
    pphAtasPkp,
    pphTelahDipotong: Math.max(0, input.pphTelahDipotong),
    pphTerutang,
  };
}

export type PphBadanInput = {
  jenisTarif: "pasal17b" | "pasal17b2" | "pasal31e";
  omzet: number;
  pkp: number;
};

export type PphBadanResult = {
  omzet: number;
  pkp: number;
  fasilitas: number;
  tanpaFasilitas: number;
  pphBadan: number;
  ratePercent: number | null;
};

const NORMAL_RATE = 0.22;

export function calculatePphBadan(input: PphBadanInput): PphBadanResult {
  const omzet = Math.max(0, input.omzet);
  const pkp = Math.max(0, input.pkp);
  const pphBadanJenis = input.jenisTarif === "pasal17b2" ? 0.19 : NORMAL_RATE;

  if (input.jenisTarif !== "pasal31e") {
    const pph = pkp * pphBadanJenis;
    return { omzet, pkp, fasilitas: 0, tanpaFasilitas: pph, pphBadan: pph, ratePercent: pphBadanJenis * 100 };
  }

  if (omzet <= 4_800_000_000) {
    const pph = pkp * NORMAL_RATE * 0.5;
    return { omzet, pkp, fasilitas: pph, tanpaFasilitas: 0, pphBadan: pph, ratePercent: null };
  }

  if (omzet <= 50_000_000_000) {
    const pkpFasilitas = pkp * (4_800_000_000 / omzet);
    const fasilitas = pkpFasilitas * NORMAL_RATE * 0.5;
    const tanpaFasilitas = (pkp - pkpFasilitas) * NORMAL_RATE;
    return { omzet, pkp, fasilitas, tanpaFasilitas, pphBadan: fasilitas + tanpaFasilitas, ratePercent: null };
  }

  const pph = pkp * NORMAL_RATE;
  return { omzet, pkp, fasilitas: 0, tanpaFasilitas: pph, pphBadan: pph, ratePercent: NORMAL_RATE * 100 };
}

export function calculateRateBased(dpp: number, ratePercent: number): { dpp: number; rate: number; tax: number } {
  const safeDpp = Math.max(0, dpp);
  const safeRate = Math.min(100, Math.max(0, ratePercent));
  return { dpp: safeDpp, rate: safeRate, tax: safeDpp * (safeRate / 100) };
}

export function calculatePpn(dpp: number, ratePercent: number): { dpp: number; ppn: number; hargaSetelahPpn: number; rate: number } {
  const safeDpp = Math.max(0, dpp);
  const safeRate = Math.min(100, Math.max(0, ratePercent));
  const ppn = safeDpp * (safeRate / 100);
  return { dpp: safeDpp, ppn, hargaSetelahPpn: safeDpp + ppn, rate: safeRate };
}

export function calculatePpnbm(dpp: number, ratePercent: number): { dpp: number; ppnbm: number; rate: number } {
  const safeDpp = Math.max(0, dpp);
  const safeRate = Math.min(100, Math.max(0, ratePercent));
  return { dpp: safeDpp, ppnbm: safeDpp * (safeRate / 100), rate: safeRate };
}

export type Pph21FinalInput = {
  akumulasiSebelumnya: number;
  penghasilanBruto: number;
  dalam2Tahun: boolean;
};

export type Pph21FinalResult = {
  akumulasi: number;
  bruto: number;
  kumulatif: number;
  pph21Final: number;
  dpp: number;
};

export function calculatePph21Final(input: Pph21FinalInput): Pph21FinalResult {
  const bruto = Math.max(0, input.penghasilanBruto);
  const akumulasi = input.dalam2Tahun ? Math.max(0, input.akumulasiSebelumnya) : 0;
  const kumulatif = bruto + akumulasi;
  const pph = Math.max(0, pesangonPersoalan(kumulatif) - pesangonPersoalan(akumulasi));
  return { akumulasi, bruto, kumulatif, pph21Final: pph, dpp: bruto };
}

export type Pph21TahunanInput = {
  penghasilanBrutoItems: number[];
  biayaJabatan: number;
  iuranPensiun: number;
  zakat: number;
  netoMasaSebelumnya: number;
  ptkp: number;
  pphDipotongSeb: number;
  dtpDipotongSeb: number;
  pphDipotongLain: number;
  dtpDipotongLain: number;
};

export type Pph21TahunanResult = {
  bruto: number;
  pengurang: number;
  neto: number;
  netoDisetahunkan: number;
  ptkp: number;
  pkp: number;
  pphAtasPkp: number;
  pphTerutang: number;
  kurangBayar: number;
};

export function calculatePph21Tahunan(input: Pph21TahunanInput): Pph21TahunanResult {
  const bruto = input.penghasilanBrutoItems.reduce((s, v) => s + Math.max(0, v), 0);
  const pengurang = Math.max(0, input.biayaJabatan) + Math.max(0, input.iuranPensiun) + Math.max(0, input.zakat);
  const neto = Math.max(0, bruto - pengurang);
  const netoDisetahunkan = neto + Math.max(0, input.netoMasaSebelumnya);
  const pkp = Math.max(0, netoDisetahunkan - Math.max(0, input.ptkp));
  const pphAtasPkp = progressiveTax(pkp);
  const pphTerutang = Math.max(0, pphAtasPkp - Math.max(0, input.pphDipotongSeb) - Math.max(0, input.dtpDipotongSeb));
  const kurangBayar = pphTerutang - Math.max(0, input.pphDipotongLain) - Math.max(0, input.dtpDipotongLain);
  return { bruto, pengurang, neto, netoDisetahunkan, ptkp: Math.max(0, input.ptkp), pkp, pphAtasPkp, pphTerutang, kurangBayar };
}

export function calculatePph21Apbn(bruto: number, ratePercent: number): { bruto: number; rate: number; pph: number; dpp: number } {
  const b = Math.max(0, bruto);
  const r = Math.min(100, Math.max(0, ratePercent));
  return { bruto: b, rate: r, pph: b * (r / 100), dpp: b };
}

export type Pph21ManfaatInput = {
  penghasilanBruto: number;
  akumulasiSebelumnya: number;
  dalam2Tahun: boolean;
};

export function calculatePph21ManfaatFinal(input: Pph21ManfaatInput): { bruto: number; akumulasi: number; kumulatif: number; pph: number; dpp: number } {
  const bruto = Math.max(0, input.penghasilanBruto);
  const akumulasi = input.dalam2Tahun ? Math.max(0, input.akumulasiSebelumnya) : 0;
  const kumulatif = bruto + akumulasi;
  const pph = manfaatTotal(kumulatif) - manfaatTotal(akumulasi);
  return { bruto, akumulasi, kumulatif, pph, dpp: bruto };
}

function persenPPhPasal17(dpp: number): number {
  const x = Math.max(0, dpp);
  const l1 = Math.min(x, 60_000_000) * 0.05;
  const l2 = Math.max(Math.min(x - 60_000_000, 190_000_000), 0) * 0.15;
  const l3 = Math.max(Math.min(x - 250_000_000, 250_000_000), 0) * 0.25;
  const l4 = Math.max(Math.min(x - 500_000_000, 4_500_000_000), 0) * 0.30;
  const l5 = Math.max(x - 5_000_000_000, 0) * 0.35;
  return l1 + l2 + l3 + l4 + l5;
}

function pesangonPersoalan(total: number): number {
  const x = Math.max(0, total);
  let t = 0;
  if (x > 500_000_000) t += (x - 500_000_000) * 0.25;
  if (x > 100_000_000) t += (Math.min(x, 500_000_000) - 100_000_000) * 0.15;
  if (x > 50_000_000) t += (Math.min(x, 100_000_000) - 50_000_000) * 0.05;
  return t;
}

function manfaatTotal(total: number): number {
  const x = Math.max(0, total);
  return x <= 50_000_000 ? 0 : (x - 50_000_000) * 0.05;
}

export function getTerKategori(ptkpValue: string) {
  return getTerKategoriFromPtkp(ptkpValue);
}

export function calculatePph21Bulanan(bruto: number, ptkpValue: string): { dpp: number; rate: number; taxAmount: number; kategori: string } {
  const kategori = getTerKategoriFromPtkp(ptkpValue);
  const rate = getTerBulananRate(kategori, bruto);
  const taxAmount = Math.floor((bruto * rate) / 100);
  return { dpp: bruto, rate, taxAmount, kategori };
}

export function calculatePph21TidakFinalByObj(opts: { kode: string; jenis?: string; bruto: number; ptkpValue: string }): { dpp: number; rate: number; taxAmount: number } {
  const { kode, jenis, bruto, ptkpValue } = opts;
  if (kode === "21-100-03") {
    if (jenis === "upah-pegawai-tetap-non-bulanan") {
      const kategori = getTerKategoriFromPtkp(ptkpValue);
      const rate = getTerBulananRate(kategori, bruto);
      return { dpp: bruto, rate, taxAmount: Math.floor((bruto * rate) / 100) };
    }
    const harian = getTerHarian(bruto);
    if (harian.method === "pph17_50pct") {
      const dpp = bruto * 0.5;
      const tax = pphPasal17(dpp);
      return { dpp, rate: dpp > 0 ? (tax / dpp) * 100 : 0, taxAmount: tax };
    }
    return { dpp: bruto, rate: harian.ratePercent, taxAmount: Math.floor((bruto * harian.ratePercent) / 100) };
  }
  if (kode === "21-100-10") {
    const kategori = getTerKategoriFromPtkp(ptkpValue);
    const rate = getTerBulananRate(kategori, bruto);
    return { dpp: bruto, rate, taxAmount: Math.floor((bruto * rate) / 100) };
  }
  const nonfinalBruto50 = ["21-100-04", "21-100-06", "21-100-07", "21-100-08", "21-100-09"];
  if (nonfinalBruto50.includes(kode)) {
    const dpp = bruto * 0.5;
    const tax = pphPasal17(dpp);
    return { dpp, rate: dpp > 0 ? (tax / dpp) * 100 : 0, taxAmount: tax };
  }
  const dpp = bruto;
  const tax = pphPasal17(dpp);
  return { dpp, rate: dpp > 0 ? (tax / dpp) * 100 : 0, taxAmount: tax };
}

export type Pph21Skema = "gross" | "grossup";

export type Pph21BulananLogicInput = {
  ptkpValue: string;
  bruto: number;
  skema: Pph21Skema;
  brutoSebelumnya?: number | null;
  pphSebelumnya?: number | null;
};

export type Pph21BulananLogicResult = {
  dpp: number;
  rate: number;
  taxAmount: number;
  takeHomePay: number;
  kategori: string;
  tunjanganPph?: number;
  brutoTotal?: number;
  dppTotalLangsung?: number;
};

export function calculatePph21BulananLogic(input: Pph21BulananLogicInput): Pph21BulananLogicResult {
  const bruto = Math.max(0, input.bruto);
  const brutoSebelum = Math.max(0, input.brutoSebelumnya ?? 0);
  const pphSebelum = Math.max(0, input.pphSebelumnya ?? 0);
  const kategori = getTerKategoriFromPtkp(input.ptkpValue);
  if (brutoSebelum > 0 || pphSebelum > 0) {
    const total = brutoSebelum + bruto;
    const rate = getTerBulananRate(kategori, total);
    const totalTax = Math.floor((total * rate) / 100);
    const taxAmount = Math.max(0, totalTax - pphSebelum);
    return { dpp: bruto, rate, taxAmount, takeHomePay: bruto - taxAmount, kategori, brutoTotal: total };
  }
  if (input.skema === "grossup") {
    let rate = getTerBulananRate(kategori, bruto);
    let dppFinal = bruto;

    for (let i = 0; i < 5; i++) {
      const divisor = 1 - rate / 100;
      dppFinal = divisor > 0 ? bruto / divisor : bruto;
      const nextRate = getTerBulananRate(kategori, dppFinal);
      if (nextRate === rate) break;
      rate = nextRate;
    }

    const roundedDpp = Math.floor(dppFinal);
    const totalTax = Math.floor((roundedDpp * rate) / 100);

    return {
      dpp: roundedDpp,
      rate,
      taxAmount: totalTax,
      takeHomePay: bruto,
      kategori,
      tunjanganPph: roundedDpp - bruto,
    };
  }
  const rate = getTerBulananRate(kategori, bruto);
  const taxAmount = Math.floor((bruto * rate) / 100);
  return { dpp: bruto, rate, taxAmount, takeHomePay: bruto - taxAmount, kategori };
}
