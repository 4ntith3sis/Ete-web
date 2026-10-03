# Audit Referensi: kalkulator.pajak.go.id

Tanggal audit: 2 Oktober 2026.

## Daftar layanan kalkulator yang ditemukan

| Layanan | Tab/Section | Input utama | Output |
|---|---|---|---|
| PPh 21 | PPh 21 | Jenis Pemotongan (Bulanan/Final/Tidak Final/Tahunan), Kode Objek Pajak, Skema Penghitungan (Gross/Gross Up), PTKP, Penghasilan Bruto, Golongan, masa pajak, jenis PPh Tahunan (A1/A2, P3K-A1, P3K-A2), data penghasilan (gaji, tunjangan, honorarium, premi asuransi, natura, tantiem), pengurang (biaya jabatan, iuran pensiun, zakat) | DPP, Tarif, PPh 21, neto, PKP, PPh terutang |
| PPh 22 | PPh 22 | Kode Objek Pajak (22-100-xx, 22-4xx-xx), Penghasilan Bruto, Tarif | PPh 22 |
| PPh 23 | PPh 23 | Kode Objek Pajak (24-1xx-xx), Penghasilan Bruto, Tarif | PPh 23 |
| PPh 4(2) | PPh 4(2) | Kode Objek Pajak (28-4xx-xx), Penghasilan Bruto, Tarif | PPh 4(2) |
| PPh 15 | PPh 15 | Kode Objek Pajak (28-4xx, 29-1xx), Penghasilan Bruto, Tarif | PPh 15 |
| PPh Badan | PPh Badan | Jenis Tarif (Pasal 31E ayat (1), Pasal 17 ayat (1) huruf b, Pasal 17 ayat (2) huruf b), Peredaran Bruto, Penghasilan Kena Pajak, PKP dengan/tanpa fasilitas | PPh Badan |
| PPN | PPN | DPP, Tarif | PPN, Harga setelah PPN |
| PPnBM | PPnBM | DPP, Tarif | PPnBM |

## Keputusan implementasi

- Setiap layanan pada tabel di atas menjadi satu kartu kalkulator (`TaxCalculatorCard`).
- PPh 22, PPh 23, PPh 4(2), dan PPh 15 memakai form berbasis kode objek pajak → tarif → penghasilan bruto (pola `Penghasilan Bruto | Tarif | PPh` dari referensi), diimplementasikan pada `RateBasedForm`.
- PPh 21 diimplementasikan mengikuti alur "PPh 21 Tahunan (A1/A2)": data penghasilan bruto, pengurang (biaya jabatan/biaya pensiun, iuran pensiun/THT/JHT, zakat/sumbangan wajib), PTKP, dan PPh yang telah dipotong. Tarif progresif PPh menggunakan Pasal 17 UU HPP (5% s.d. Rp60 juta, 15% s.d. Rp250 juta, 25% s.d. Rp500 juta, 30% s.d. Rp5 miliar, 35% di atasnya).
- PPh Badan mengikuti referensi: Peredaran Bruto, Penghasilan Kena Pajak, dan skema tarif Pasal 17 ayat (1) huruf b (22%), Pasal 17 ayat (2) huruf b (19%), serta fasilitas Pasal 31E ayat (1) (peredaran bruto ≤ Rp4,8 M: 50% × tarif normal; Rp4,8 M–Rp50 M: tarif normal 50% hanya atas bagian PKP dari omzet s.d. Rp4,8 M).
- PPN: DPP × tarif (12%/11%/0%) → PPN + Harga setelah PPN.
- PPnBM: DPP × tarif input pengguna → PPnBM.
- Tarif pada kode objek PPh 22/23/4(2)/15 mengikuti kode yang ditampilkan pada referensi (mis. "tarif 10%", "tarif 7,5%") atau tarif standar yang lazim; pengguna dapat memverifikasi kode sebelum menghitung.
- CAPTCHA pada situs referensi tidak ditiru; EasyTax tidak memerlukan verifikasi captcha untuk menghitung.
