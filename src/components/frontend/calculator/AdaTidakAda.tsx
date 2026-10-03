"use client";

type AdaTidakAdaProps = {
  id: string;
  value: "ada" | "tidak";
  onChange: (value: "ada" | "tidak") => void;
};

export function AdaTidakAda({ id, value, onChange }: AdaTidakAdaProps) {
  return (
    <div className="tax-ada-tidak" role="group" aria-labelledby={id}>
      <button type="button" className={`tax-ada-tidak-btn${value === "ada" ? " active" : ""}`} onClick={() => onChange("ada")} aria-pressed={value === "ada"}>
        Ada
      </button>
      <button type="button" className={`tax-ada-tidak-btn${value === "tidak" ? " active" : ""}`} onClick={() => onChange("tidak")} aria-pressed={value === "tidak"}>
        Tidak Ada
      </button>
    </div>
  );
}
