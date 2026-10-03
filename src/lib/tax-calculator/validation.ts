export type ValidationResult = string | null;

export function required(value: number | null | undefined, label = "Nilai"): ValidationResult {
  if (value === null || value === undefined || Number.isNaN(value)) return `${label} wajib diisi.`;
  return null;
}

export function nonNegative(value: number | null | undefined, label = "Nilai"): ValidationResult {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  if (value < 0) return `${label} tidak boleh negatif.`;
  return null;
}

export function amountField(value: number | null, label = "Nilai"): ValidationResult {
  return required(value, label) ?? nonNegative(value, label);
}

export function rateField(value: number | null, label = "Tarif"): ValidationResult {
  if (value === null || Number.isNaN(value)) return `${label} wajib diisi.`;
  if (value < 0) return `${label} tidak boleh negatif.`;
  if (value > 100) return `${label} tidak boleh lebih dari 100%.`;
  return null;
}
