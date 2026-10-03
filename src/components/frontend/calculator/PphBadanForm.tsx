"use client";

import { useState } from "react";
import { calculatePphBadan } from "@/lib/tax-calculator/calculate";
import { formatPercent, formatRupiah, parseAmount } from "@/lib/tax-calculator/format";
import { amountField } from "@/lib/tax-calculator/validation";
import type { ResultRow } from "@/lib/tax-calculator/result";
import { TaxInput } from "./TaxInput";
import { TaxSelect } from "./TaxSelect";

const JENIS_TARIF = [
  { value: "pasal17b", label: "Pasal 17 ayat (1) huruf b" },
  { value: "pasal17b2", label: "Pasal 17 ayat (2) huruf b" },
  { value: "pasal31e", label: "Pasal 31E ayat (1)" },
];

export function PphBadanForm({ onResult }: { onResult: (rows: ResultRow[] | null) => void }) {
  const [jenisTarif, setJenisTarif] = useState<"pasal17b" | "pasal17b2" | "pasal31e">("pasal17b");
  const [omzet, setOmzet] = useState("");
  const [pkp, setPkp] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const omzetValue = parseAmount(omzet);
    const pkpValue = parseAmount(pkp);
    const firstError = amountField(omzetValue, "Peredaran Bruto") ?? amountField(pkpValue, "Penghasilan Kena Pajak");
    if (firstError) {
      setError(firstError);
      onResult(null);
      return;
    }
    setError(null);
    const computed = calculatePphBadan({ jenisTarif, omzet: omzetValue ?? 0, pkp: pkpValue ?? 0 });
    onResult([
      { label: "DPP", value: formatRupiah(computed.pkp) },
      { label: "Tarif", value: computed.ratePercent === null ? (computed.pkp > 0 ? formatPercent((computed.pphBadan / computed.pkp) * 100) : "0%") : formatPercent(computed.ratePercent) },
      { label: "PPh Badan", value: formatRupiah(computed.pphBadan), emphasis: true },
    ]);
  }

  function handleReset() {
    setJenisTarif("pasal17b");
    setOmzet("");
    setPkp("");
    setError(null);
    onResult(null);
  }

  return (
    <form className="tax-form" onSubmit={handleSubmit} noValidate>
      <TaxSelect id="jenis-tarif" label="Jenis Tarif" value={jenisTarif} onChange={(v) => setJenisTarif(v as typeof jenisTarif)} options={JENIS_TARIF} />
      <TaxInput id="omzet" label="Peredaran Bruto (Rp)" value={omzet} onChange={setOmzet} />
      <TaxInput id="pkp" label="Penghasilan Kena Pajak (Rp)" value={pkp} onChange={setPkp} />
      {error ? <p className="tax-field-error" role="alert">{error}</p> : null}
      <div className="tax-form-actions">
        <button type="submit" className="btn btn-primary">Hitung</button>
        <button type="button" className="btn btn-outline-navy" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}
