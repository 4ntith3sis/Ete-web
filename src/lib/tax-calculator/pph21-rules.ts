export type TerKategori = "A" | "B" | "C";

export type TerRow = { max: number | null; ratePercent: number };

export const TER_BULANAN: Record<TerKategori, TerRow[]> = {
  A: [
    { max: 5400000, ratePercent: 0 },
    { max: 5650000, ratePercent: 0.25 },
    { max: 5950000, ratePercent: 0.5 },
    { max: 6300000, ratePercent: 0.75 },
    { max: 6750000, ratePercent: 1 },
    { max: 7500000, ratePercent: 1.25 },
    { max: 8550000, ratePercent: 1.5 },
    { max: 9650000, ratePercent: 1.75 },
    { max: 10050000, ratePercent: 2 },
    { max: 10350000, ratePercent: 2.25 },
    { max: 10700000, ratePercent: 2.5 },
    { max: 11050000, ratePercent: 3 },
    { max: 11600000, ratePercent: 3.5 },
    { max: 12500000, ratePercent: 4 },
    { max: 13750000, ratePercent: 5 },
    { max: 15100000, ratePercent: 6 },
    { max: 16950000, ratePercent: 7 },
    { max: 19750000, ratePercent: 8 },
    { max: 24100000, ratePercent: 9 },
    { max: 26450000, ratePercent: 10 },
    { max: 28000000, ratePercent: 11 },
    { max: 30050000, ratePercent: 12 },
    { max: 32400000, ratePercent: 13 },
    { max: 35400000, ratePercent: 14 },
    { max: 39100000, ratePercent: 15 },
    { max: 43850000, ratePercent: 16 },
    { max: 47800000, ratePercent: 17 },
    { max: 51400000, ratePercent: 18 },
    { max: 56300000, ratePercent: 19 },
    { max: 62200000, ratePercent: 20 },
    { max: 68600000, ratePercent: 21 },
    { max: 77500000, ratePercent: 22 },
    { max: 89000000, ratePercent: 23 },
    { max: 103000000, ratePercent: 24 },
    { max: 125000000, ratePercent: 25 },
    { max: 157000000, ratePercent: 26 },
    { max: 206000000, ratePercent: 27 },
    { max: 337000000, ratePercent: 28 },
    { max: 454000000, ratePercent: 29 },
    { max: 550000000, ratePercent: 30 },
    { max: 695000000, ratePercent: 31 },
    { max: 910000000, ratePercent: 32 },
    { max: 1400000000, ratePercent: 33 },
    { max: null, ratePercent: 34 },
  ],
  B: [
    { max: 6200000, ratePercent: 0 },
    { max: 6500000, ratePercent: 0.25 },
    { max: 6850000, ratePercent: 0.5 },
    { max: 7300000, ratePercent: 0.75 },
    { max: 9200000, ratePercent: 1 },
    { max: 10750000, ratePercent: 1.5 },
    { max: 11250000, ratePercent: 2 },
    { max: 11600000, ratePercent: 2.5 },
    { max: 12600000, ratePercent: 3 },
    { max: 13600000, ratePercent: 4 },
    { max: 14950000, ratePercent: 5 },
    { max: 16400000, ratePercent: 6 },
    { max: 18450000, ratePercent: 7 },
    { max: 21850000, ratePercent: 8 },
    { max: 26000000, ratePercent: 9 },
    { max: 27700000, ratePercent: 10 },
    { max: 29350000, ratePercent: 11 },
    { max: 31450000, ratePercent: 12 },
    { max: 33950000, ratePercent: 13 },
    { max: 37100000, ratePercent: 14 },
    { max: 41100000, ratePercent: 15 },
    { max: 45800000, ratePercent: 16 },
    { max: 49500000, ratePercent: 17 },
    { max: 53800000, ratePercent: 18 },
    { max: 58500000, ratePercent: 19 },
    { max: 64000000, ratePercent: 20 },
    { max: 71000000, ratePercent: 21 },
    { max: 80000000, ratePercent: 22 },
    { max: 93000000, ratePercent: 23 },
    { max: 109000000, ratePercent: 24 },
    { max: 129000000, ratePercent: 25 },
    { max: 163000000, ratePercent: 26 },
    { max: 211000000, ratePercent: 27 },
    { max: 374000000, ratePercent: 28 },
    { max: 459000000, ratePercent: 29 },
    { max: 555000000, ratePercent: 30 },
    { max: 704000000, ratePercent: 31 },
    { max: 957000000, ratePercent: 32 },
    { max: 1405000000, ratePercent: 33 },
    { max: null, ratePercent: 34 },
  ],
  C: [
    { max: 6600000, ratePercent: 0 },
    { max: 6950000, ratePercent: 0.25 },
    { max: 7350000, ratePercent: 0.5 },
    { max: 7800000, ratePercent: 0.75 },
    { max: 8850000, ratePercent: 1 },
    { max: 9800000, ratePercent: 1.25 },
    { max: 10950000, ratePercent: 1.5 },
    { max: 11200000, ratePercent: 1.75 },
    { max: 12050000, ratePercent: 2 },
    { max: 12950000, ratePercent: 3 },
    { max: 14150000, ratePercent: 4 },
    { max: 15550000, ratePercent: 5 },
    { max: 17050000, ratePercent: 6 },
    { max: 19500000, ratePercent: 7 },
    { max: 22700000, ratePercent: 8 },
    { max: 26600000, ratePercent: 9 },
    { max: 28100000, ratePercent: 10 },
    { max: 30100000, ratePercent: 11 },
    { max: 32600000, ratePercent: 12 },
    { max: 35400000, ratePercent: 13 },
    { max: 38900000, ratePercent: 14 },
    { max: 43000000, ratePercent: 15 },
    { max: 47400000, ratePercent: 16 },
    { max: 51200000, ratePercent: 17 },
    { max: 55800000, ratePercent: 18 },
    { max: 60400000, ratePercent: 19 },
    { max: 66700000, ratePercent: 20 },
    { max: 74500000, ratePercent: 21 },
    { max: 83200000, ratePercent: 22 },
    { max: 95600000, ratePercent: 23 },
    { max: 110000000, ratePercent: 24 },
    { max: 134000000, ratePercent: 25 },
    { max: 169500000, ratePercent: 26 },
    { max: 221000000, ratePercent: 27 },
    { max: 390000000, ratePercent: 28 },
    { max: 463000000, ratePercent: 29 },
    { max: 561000000, ratePercent: 30 },
    { max: 709000000, ratePercent: 31 },
    { max: 965000000, ratePercent: 32 },
    { max: 1419000000, ratePercent: 33 },
    { max: null, ratePercent: 34 },
  ],
};

export const TER_HARIAN = [
  { max: 450000, ratePercent: 0 },
  { max: 2500000, ratePercent: 0.5 },
  { max: null, method: "pph17_50pct" },
] as Array<{ max: number | null; ratePercent: number } | { max: number | null; method: "pph17_50pct" }>;

export function getTerKategoriFromPtkp(ptkpValue: string): TerKategori {
  switch (ptkpValue) {
    case "TK/0":
    case "TK/1":
    case "K/0":
      return "A";
    case "TK/2":
    case "TK/3":
    case "K/1":
    case "K/2":
      return "B";
    case "K/3":
      return "C";
    default:
      return "A";
  }
}

export function getTerBulananRate(kategori: TerKategori, bruto: number): number {
  const rows = TER_BULANAN[kategori];
  const row = rows.find((r) => r.max === null || bruto <= r.max) ?? rows[rows.length - 1];
  return row.ratePercent;
}

export function getTerHarian(upahHarian: number): { ratePercent: number; method?: "pph17_50pct" } {
  if (upahHarian <= 450000) return { ratePercent: 0 };
  if (upahHarian <= 2500000) return { ratePercent: 0.5 };
  return { ratePercent: 0, method: "pph17_50pct" };
}

export function pphPasal17(dpp: number): number {
  const x = Math.max(0, dpp);
  const l1 = Math.min(x, 60000000) * 0.05;
  const l2 = Math.max(Math.min(x - 60000000, 190000000), 0) * 0.15;
  const l3 = Math.max(Math.min(x - 250000000, 250000000), 0) * 0.25;
  const l4 = Math.max(Math.min(x - 500000000, 4500000000), 0) * 0.3;
  const l5 = Math.max(x - 5000000000, 0) * 0.35;
  return Math.floor(l1 + l2 + l3 + l4 + l5);
}
