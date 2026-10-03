"use client";

import { CalculatorField } from "./CalculatorField";
import { formatThousands } from "@/lib/tax-calculator/format";

type TaxInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string | null;
  inputMode?: "numeric" | "decimal" | "text";
  help?: string;
};

export function TaxInput({ id, label, value, onChange, placeholder, error, inputMode = "numeric", help }: TaxInputProps) {
  return (
    <CalculatorField id={id} label={label} help={help} error={error}>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        value={value}
        placeholder={placeholder ?? "0"}
        onChange={(e) => onChange(inputMode === "numeric" ? formatThousands(e.target.value) : e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : help ? `${id}-help` : undefined}
      />
    </CalculatorField>
  );
}
