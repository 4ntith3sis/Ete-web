# Tax Rules — Baseline Tahun Pajak

Baseline: `TAX_YEAR` (lihat `src/lib/tax-calculator/taxConfig.ts`).

Setiap rule wajib mencantumkan: taxType, taxYear, ruleId, regulation,
article, effectiveDate, source, formula, notes, exception.

Jika suatu rule belum tervalidasi terhadap sumber resmi DJP/UU/PP/PMK,
status-nya `NOT VERIFIED` dan TIDAK boleh dinyatakan pass pada
completion report.

## Status per rule

| Calculator | Rule | Status |
|---|---|---|
| PPh 21 (progressive Pasal 17) | `pph21-progressive-pasal17` | VERIFIED (UU HPP Pasal 17) |
| PPh 21 Final (tier pesangon) | `pph21-final-pesangon-tier` | NOT VERIFIED |
| PPh 21 APBN/APBD per golongan | `pph21-apbn-golongan` | NOT VERIFIED |
| PPh 22 | `pph22-rate-by-object` | NOT VERIFIED |
| PPh 23 | `pph23-rate-by-object` | NOT VERIFIED |
| PPh 4(2) | `pph42-rate-by-object` | NOT VERIFIED |
| PPh 15 | `pph15-rate-by-object` | NOT VERIFIED |
| PPh Badan | `pph-badan-pasal17-31e` | VERIFIED (UU HPP) |
| PPN | `ppn-tarif-dasar` | VERIFIED (UU HPP) |
| PPnBM | `ppnbm-tarif-dasar` | NOT VERIFIED |

## TODO validasi (wajib sebelum dinyatakan PASS)

1. PPh 21 Bulanan: verifikasi terhadap tabel TER resmi DJP. Engine
   saat ini menggunakan progressive tahunan aproksimasi — perlu
   diganti tabel TER per kategori (A/B/C) berdasarkan status PTKP.
2. PPh 21 Final pesangon: verifikasi tier dan DPP terhadap contoh
   resmi DJP, serta aturan PTKP yang berlaku.
3. PPh 21 APBN/APBD: verifikasi rate per jenis penerima/golongan.
4. PPh 22/23/4(2)/15: validasi rate per kode objek terhadap PMK
   terbaru + kode objek terbaru DJP.
5. Semua: test case dengan expected result dari contoh resmi.
