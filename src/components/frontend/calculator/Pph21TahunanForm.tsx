"use client";

import { useMemo, useState } from "react";
import { calculatePph21Tahunan } from "@/lib/tax-calculator/calculate";
import { formatPercent, formatRupiah, parseAmount } from "@/lib/tax-calculator/format";
import type { ResultRow } from "@/lib/tax-calculator/result";
import { PTKP_OPTIONS } from "@/data/tax-calculators";
import { CalculatorField } from "./CalculatorField";
import { TaxInput } from "./TaxInput";
import { TaxSelect } from "./TaxSelect";

export const PENGHITUNGAN_OPTIONS = [
  { value: "setahun", label: "Setahun" },
  { value: "disetahunkan", label: "Disetahunkan" },
];

export const MASA_OPTIONS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
].map((m) => ({ value: m.toLowerCase(), label: m }));

export const JENIS_PPH_TAHUNAN = [
  { value: "p3k-a1a2", label: "PPh 21 Tahunan P3K-(A1/A2)" },
  { value: "p3k-a1", label: "PPh 21 Tahunan P3K-A1" },
  { value: "p3k-a2", label: "PPh 21 Tahunan P3K-A2" },
];

const BRUTO_ITEMS = [
  "GAJI/PENSIUNAN ATAU THT/JHT",
  "TUNJANGAN PPh",
  "TUNJANGAN LAINNYA, UANG LEMBUR DAN SEBAGAINYA",
  "HONORARIUM DAN IMBALAN LAIN SEJENISNYA",
  "PREMI ASURANSI YANG DIBAYARKAN PEMBERI KERJA",
  "PENERIMAAN DALAM BENTUK NATURA DAN KENIKMATAN LAINNYA YANG DIKENAKAN PEMOTONGAN PPh PASAL 21",
  "TANTIEM, BONUS, GRATIFIKASI, JASA PRODUKSI DAN THR",
];

const PENGURANG_ITEMS = [
  "BIAYA JABATAN/BIAYA PENSIUN",
  "IURAN TERKAIT PENSIUN ATAU HARI TUA",
  "ZAKAT/SUMBANGAN KEAGAMAAN YANG BERSIFAT WAJIB YANG DIBAYARKAN MELALUI PEMBERI KERJA",
];

function ReadOnlyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="tax-field-row">
      <span className="tax-field-label">{label}</span>
      <div className="tax-field-control">
        <div className="tax-readonly">{value}</div>
      </div>
    </div>
  );
}

export function Pph21TaxuneaForm({ onResult, ptkpIndex }: { onResult: (rows: ResultRow[] | null) => void; ptkpIndex: number }) {
  const [bruto, setBruto] = useState<string[]>(() => BRUTO_ITEMS.map(() => ""));
  const [pengurang, setPengurang] = useState<string[]>(() => PENGURANG_ITEMS.map(() => ""));
  const [netoSebelumnya, setNetoSebelumnya] = useState("");
  const [pphDipotongSeb, setPphDipotongSeb] = useState("");
  const [dtpDipotongSeb, setDtpDipotongSeb] = useState("");
  const [pphDipotongLain, setPphDipotongLain] = useState("");
  const [dtpDipotongLain, setDtpDipotongLain] = useState("");

  const computed = useMemo(() => {
    return calculatePph21Tahunan({
      penghasilanBrutoItems: bruto.map((v) => (v.trim() === "" ? 0 : parseAmount(v) ?? 0)),
      biayaJabatan: pengurang[0].trim() === "" ? 0 : parseAmount(pengurang[0]) ?? 0,
      iuranPensiun: pengurang[1].trim() === "" ? 0 : parseAmount(pengurang[1]) ?? 0,
      zakat: pengurang[2].trim() === "" ? 0 : parseAmount(pengurang[2]) ?? 0,
      netoMasaSebelumnya: netoSebelumnya.trim() === "" ? 0 : parseAmount(netoSebelumnya) ?? 0,
      ptkp: PTKP_OPTIONS[ptkpIndex].amount,
      pphDipotongSeb: pphDipotongSeb.trim() === "" ? 0 : parseAmount(pphDipotongSeb) ?? 0,
      dtpDipotongSeb: dtpDipotongSeb.trim() === "" ? 0 : parseAmount(dtpDipotongSeb) ?? 0,
      pphDipotongLain: pphDipotongLain.trim() === "" ? 0 : parseAmount(pphDipotongLain) ?? 0,
      dtpDipotongLain: dtpDipotongLain.trim() === "" ? 0 : parseAmount(dtpDipotongLain) ?? 0,
    });
  }, [bruto, pengurang, netoSebelumnya, ptkpIndex, pphDipotongSeb, dtpDipotongSeb, pphDipotongLain, dtpDipotongLain]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onResult([
      { label: "DPP", value: formatRupiah(computed.pkp) },
      { label: "Tarif", value: computed.pkp > 0 ? formatPercent((computed.pphAtasPkp / computed.pkp) * 100) : "0%" },
      { label: "PPh 21", value: formatRupiah(computed.pphAtasPkp), emphasis: true },
    ]);
  }

  function handleReset() {
    setBruto(BRUTO_ITEMS.map(() => ""));
    setPengurang(PENGURANG_ITEMS.map(() => ""));
    setNetoSebelumnya("");
    setPphDipotongSeb("");
    setDtpDipotongSeb("");
    setPphDipotongLain("");
    setDtpDipotongLain("");
    onResult(null);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="tax-worksheet">
        <div className="tax-form">
      <h3 className="tax-form-section-title">PENGHASILAN BRUTO</h3>
      {BRUTO_ITEMS.map((label, i) => (
        <TaxInput
          key={label}
          id={`bruto-t-${i}`}
          label={`${i + 1}. ${label}`}
          value={bruto[i]}
          onChange={(v) => setBruto((prev) => prev.map((x, idx) => (idx === i ? v : x)))}
        />
      ))}
      <ReadOnlyRow label="8. JUMLAH PENGHASILAN BRUTO (1 S.D. 7)" value={formatRupiah(computed.bruto)} />

      <h3 className="tax-form-section-title">PENGURANGAN</h3>
      {PENGURANG_ITEMS.map((label, i) => (
        <TaxInput
          key={label}
          id={`pengurang-t-${i}`}
          label={`${i + 9}. ${label}`}
          value={pengurang[i]}
          onChange={(v) => setPengurang((prev) => prev.map((x, idx) => (idx === i ? v : x)))}
        />
      ))}
      <ReadOnlyRow label="12. JUMLAH PENGURANGAN (9 S.D. 11)" value={formatRupiah(computed.pengurang)} />

      <h3 className="tax-form-section-title">PENGHITUNGAN PPh PASAL 21</h3>
      <ReadOnlyRow label="13. JUMLAH PENGHASILAN NETO (8 - 12)" value={formatRupiah(computed.neto)} />
      <TaxInput id="neto-sebelumnya" label="14. PENGHASILAN NETO MASA PAJAK SEBELUMNYA" value={netoSebelumnya} onChange={setNetoSebelumnya} />
      <ReadOnlyRow label="15. JUMLAH PENGHASILAN NETO (SETAHUN/DISETAHUNKAN)" value={formatRupiah(computed.netoDisetahunkan)} />
      <ReadOnlyRow label="15A. PROPORSI PENGHASILAN UNTUK PPH 21 NORMAL" value={formatRupiah(computed.netoDisetahunkan)} />
      <ReadOnlyRow label="15B. PROPORSI PENGHASILAN UNTUK PPH 21 DTP" value={formatRupiah(0)} />
      <ReadOnlyRow label="16. PENGHASILAN TIDAK KENA PAJAK (PTKP)" value={formatRupiah(computed.ptkp)} />
      <ReadOnlyRow label="17. PENGHASILAN KENA PAJAK SETAHUN/DISETAHUNKAN (15 - 16)" value={formatRupiah(computed.pkp)} />
      <ReadOnlyRow label="18. PPh PASAL 21 ATAS PENGHASILAN KENA PAJAK" value={formatRupiah(computed.pphAtasPkp)} />
      <TaxInput id="pph-seb" label="19. PPh PASAL 21 YANG TELAH DIPOTONG MASA PAJAK SEBELUMNYA" value={pphDipotongSeb} onChange={setPphDipotongSeb} />
      <TaxInput id="dtp-seb" label="20. PPh PASAL 21 DITANGGUNG PEMERINTAH (DTP) YANG TELAH DIPOTONG MASA PAJAK SEBELUMNYA" value={dtpDipotongSeb} onChange={setDtpDipotongSeb} />
      <ReadOnlyRow label="21. PPh PASAL 21 TERUTANG (18 - 19 - 20)" value={formatRupiah(computed.pphTerutang)} />

      <h3 className="tax-form-section-title">PPh YANG TELAH DIPOTONG/DILUNASI</h3>
      <ReadOnlyRow label="22. PPh PASAL 21 DAN PPh PASAL 26 YANG TELAH DIPOTONG DAN DILUNASI PADA SELAIN MASA PAJAK TERAKHIR" value={formatRupiah((pphDipotongLain.trim() === "" ? 0 : parseAmount(pphDipotongLain) ?? 0) + (dtpDipotongLain.trim() === "" ? 0 : parseAmount(dtpDipotongLain) ?? 0))} />
      <TaxInput id="pph-22a" label="22A. PPh PASAL 21 DIPOTONG" value={pphDipotongLain} onChange={setPphDipotongLain} />
      <TaxInput id="dtp-22b" label="22B. PPh PASAL 21 DITANGGUNG PEMERINTAH (DTP)" value={dtpDipotongLain} onChange={setDtpDipotongLain} />

      <h3 className="tax-form-section-title">HASIL AKHIR</h3>
      <ReadOnlyRow label="23A. PPh PASAL 21 DIPOTONG — KURANG BAYAR/(LEBIH BAYAR)" value={formatRupiah(computed.kurangBayar)} />
      <ReadOnlyRow label="23B. PPh PASAL 21 DITANGGUNG PEMERINTAH (DTP) — KURANG BAYAR/(LEBIH BAYAR)" value={formatRupiah(0)} />

        </div>
      </div>
      <div className="tax-actions-center">
        <button type="submit" className="btn btn-primary">Hitung</button>
        <button type="button" className="btn btn-outline-navy" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}
