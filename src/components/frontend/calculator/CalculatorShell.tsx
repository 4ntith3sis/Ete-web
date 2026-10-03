"use client";

import { useState } from "react";
import { TAX_CALCULATORS } from "@/data/tax-calculators";
import { defaultResultRows, resultTitle, type ResultRow } from "@/lib/tax-calculator/result";
import { Pph21Form } from "./Pph21Form";
import { Pph21TaxuneaForm } from "./Pph21TahunanForm";
import { PphBadanForm } from "./PphBadanForm";
import { PpnForm } from "./PpnForm";
import { RateBasedForm } from "./RateBasedForm";
import { TaxCalculatorNavigation } from "./TaxCalculatorNavigation";
import { CalculatorResult } from "./CalculatorResult";

export function CalculatorShell() {
  const [activeId, setActiveId] = useState(TAX_CALCULATORS[0].id);
  const [pph21Jenis, setPph21Jenis] = useState("bulanan");
  const [tPtkpIndex, setTPtkpIndex] = useState(0);
  const [rows, setRows] = useState<ResultRow[] | null>(null);
  const active = TAX_CALCULATORS.find((c) => c.id === activeId) ?? TAX_CALCULATORS[0];

  function handleSelect(id: string) {
    setActiveId(id);
    setRows(null);
  }

  return (
    <section className="tax-page" id="kalkulator">
      <div className="container">
        <div className="tax-workspace">
          <div className="tax-workspace-top">
            <div className="tax-workspace-brand">
              <span className="tax-workspace-icon">
                <i className="fa-solid fa-calculator" aria-hidden="true" />
              </span>
              <span className="tax-workspace-title">Kalkulator Pajak</span>
            </div>
            <TaxCalculatorNavigation activeId={activeId} onChange={handleSelect} />
          </div>
          <div className="tax-workspace-body">
            <div className="tax-workspace-form">
              <h1>{active.title}</h1>
              <p className="tax-workspace-desc">{active.description}</p>
              {active.kind === "pph21" ? (
                <Pph21Form onResult={setRows} jenis={pph21Jenis} onJenisChange={setPph21Jenis} tahunanPtkpIndex={tPtkpIndex} onTahunanPtkpIndexChange={setTPtkpIndex} />
              ) : null}
              {active.kind === "pphbadan" ? <PphBadanForm onResult={setRows} /> : null}
              {active.kind === "ppn" ? <PpnForm mode="ppn" onResult={setRows} /> : null}
              {active.kind === "ppnbm" ? <PpnForm mode="ppnbm" onResult={setRows} /> : null}
              {active.kind === "rate" && active.codes ? <RateBasedForm codes={active.codes} taxLabel={active.title} onResult={setRows} /> : null}
            </div>
            <aside className="tax-workspace-result" aria-label="Hasil perhitungan">
              <CalculatorResult
                title={resultTitle()}
                rows={rows ?? defaultResultRows(active.kind, active.title)}
              />
            </aside>
          </div>
          {active.kind === "pph21" && pph21Jenis === "tahunan" ? (
            <Pph21TaxuneaForm onResult={setRows} ptkpIndex={tPtkpIndex} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
