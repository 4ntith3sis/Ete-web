"use client";

import { useState } from "react";
import { calculatePpn, calculatePpnbm } from "@/lib/tax-calculator/calculate";
import { formatPercent, formatRupiah, parseAmount, parseDecimal } from "@/lib/tax-calculator/format";
import { amountField, rateField } from "@/lib/tax-calculator/validation";
import type { ResultRow } from "@/lib/tax-calculator/result";
import { TaxInput } from "./TaxInput";
import { TaxSelect } from "./TaxSelect";

const PPN_RATE_OPTIONS = [
  { value: "12", label: "12%" },
  { value: "11", label: "11%" },
  { value: "0", label: "0%" },
];

export function PpnForm({ mode, onResult }: { mode: "ppn" | "ppnbm"; onResult: (rows: ResultRow[] | null) => void }) {
  const [dpp, setDpp] = useState("");
  const [rateSelect, setRateSelect] = useState("12");
  const [rateInput, setRateInput] = useState("");
  const [errors, setErrors] = useState<{ dpp?: string | null; rate?: string | null }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const dppValue = parseAmount(dpp);
    const rateValue = mode === "ppn" ? Number(rateSelect) : parseDecimal(rateInput);
    const errs: typeof errors = {
      dpp: amountField(dppValue, "DPP"),
      rate: rateField(rateValue, "Tarif"),
    };
    setErrors(errs);
    if (errs.dpp || errs.rate || dppValue === null || rateValue === null) {
      onResult(null);
      return;
    }
    if (mode === "ppn") {
      const computed = calculatePpn(dppValue, rateValue);
      onResult([
            { label: "DPP", value: formatRupiah(computed.dpp) },
            { label: "Tarif", value: formatPercent(computed.rate) },
            { label: "PPN", value: formatRupiah(computed.ppn), emphasis: true },
          ]);
    } else {
      const computed = calculatePpnbm(dppValue, rateValue);
      onResult([
            { label: "DPP", value: formatRupiah(computed.dpp) },
            { label: "Tarif", value: formatPercent(computed.rate) },
            { label: "PPnBM", value: formatRupiah(computed.ppnbm), emphasis: true },
          ]);
    }
  }

  function handleReset() {
    setDpp("");
    setRateSelect("12");
    setRateInput("");
    setErrors({});
    onResult(null);
  }

  return (
    <form className="tax-form" onSubmit={handleSubmit} noValidate>
      <TaxInput id="dpp" label="Dasar Pengenaan Pajak (DPP) (Rp)" value={dpp} onChange={setDpp} error={errors.dpp} />
      {mode === "ppn" ? (
        <TaxSelect id="tarif-ppn" label="Tarif" value={rateSelect} onChange={setRateSelect} options={PPN_RATE_OPTIONS} />
      ) : (
        <TaxInput id="tarif-ppnbm" label="Tarif (%)" value={rateInput} onChange={setRateInput} error={errors.rate} inputMode="decimal" help="Contoh: 20 untuk tarif 20%." />
      )}
      <div className="tax-form-actions">
        <button type="submit" className="btn btn-primary">Hitung</button>
        <button type="button" className="btn btn-outline-navy" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}
