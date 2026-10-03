"use client";

import { useEffect, useRef, useState } from "react";
import { TAX_CALCULATORS } from "@/data/tax-calculators";

const PRIMARY_TABS = ["pph21", "pph23", "pph42"] as const;
const MORE_TABS = ["pph22", "pph15", "pphbadan", "ppn", "ppnbm"] as const;

export function TaxCalculatorNavigation({
  activeId,
  onChange,
}: {
  activeId: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeIsMore = (MORE_TABS as readonly string[]).includes(activeId);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <nav className="tax-calc-nav" aria-label="Navigasi Kalkulator Pajak">
      <div className="tax-calc-nav-primary" role="tablist">
        {PRIMARY_TABS.map((id) => {
          const calc = TAX_CALCULATORS.find((c) => c.id === id)!;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={activeId === id}
              className={`tax-calc-tab${activeId === id ? " active" : ""}`}
              onClick={() => onChange(id)}
            >
              {calc.title}
            </button>
          );
        })}
        <div className="tax-calc-more" ref={ref}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            className={`tax-calc-tab${activeIsMore ? " active" : ""}`}
            onClick={() => setOpen((v) => !v)}
          >
            Lainnya <i className={`fa-solid fa-chevron-${open ? "up" : "down"}`} aria-hidden="true" />
          </button>
          {open ? (
            <div className="tax-calc-dropdown" role="menu">
              {MORE_TABS.map((id) => {
                const calc = TAX_CALCULATORS.find((c) => c.id === id)!;
                return (
                  <button
                    key={id}
                    type="button"
                    role="menuitem"
                    className={`tax-calc-dropdown-item${activeId === id ? " active" : ""}`}
                    onClick={() => {
                      onChange(id);
                      setOpen(false);
                    }}
                  >
                    {calc.title}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
