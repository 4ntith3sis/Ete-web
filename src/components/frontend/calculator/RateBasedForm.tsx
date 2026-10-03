"use client";

import { useState } from "react";
import { calculateRateBased } from "@/lib/tax-calculator/calculate";
import { formatPercent, formatRupiah, parseAmount } from "@/lib/tax-calculator/format";
import { amountField } from "@/lib/tax-calculator/validation";
import type { TaxCodeOption } from "@/data/tax-calculators";
import type { ResultRow } from "@/lib/tax-calculator/result";
import { TaxInput } from "./TaxInput";
import { TaxSelect } from "./TaxSelect";

export function RateBasedForm({ codes, taxLabel, onResult }: { codes: TaxCodeOption[]; taxLabel: string; onResult: (rows: ResultRow[] | null) => void }) {
  const [codeIndex, setCodeIndex] = useState(0);
  const [bruto, setBruto] = useState("");
  const [errors, setErrors] = useState<{ bruto?: string | null }>({});

  const selected = codes[codeIndex] ?? codes[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = parseAmount(bruto);
    const error = amountField(value, "Penghasilan Bruto");
    setErrors({ bruto: error });
    if (error || value === null) {
      onResult(null);
      return;
    }
    const computed = calculateRateBased(value, selected.rate);
    onResult([
          { label: "DPP", value: formatRupiah(computed.dpp) },
          { label: "Tarif", value: formatPercent(computed.rate) },
          { label: taxLabel, value: formatRupiah(computed.tax), emphasis: true },
        ]);
  }

  function handleReset() {
    setBruto("");
    setErrors({});
    setCodeIndex(0);
    onResult(null);
  }

  return (
    <form className="tax-form" onSubmit={handleSubmit} noValidate>
      <TaxSelect
        id="kode-objek"
        label="Kode Objek Pajak"
        value={String(codeIndex)}
        onChange={(v) => {
          setCodeIndex(Number(v));
          onResult(null);
        }}
        options={codes.map((c, i) => ({ value: String(i), label: c.label }))}
      />
      <div className="tax-field-row">
        <span className="tax-field-label">Tarif</span>
        <div className="tax-field-control">
          <div className="tax-readonly">{formatPercent(selected.rate)}</div>
        </div>
      </div>
      <TaxInput id="bruto" label="Penghasilan Bruto (Rp)" value={bruto} onChange={setBruto} error={errors.bruto} help="Masukkan total penghasilan bruto dalam rupiah." />
      <div className="tax-form-actions">
        <button type="submit" className="btn btn-primary">Hitung</button>
        <button type="button" className="btn btn-outline-navy" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}
