"use client";

import { CalculatorField } from "./CalculatorField";

type TaxSelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string | null;
};

export function TaxSelect({ id, label, value, onChange, options, error }: TaxSelectProps) {
  return (
    <CalculatorField id={id} label={label} error={error}>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={error ? true : undefined}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </CalculatorField>
  );
}
