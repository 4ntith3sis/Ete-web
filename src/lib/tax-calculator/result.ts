export type ResultRow = { label: string; value: string; emphasis?: boolean };

export type CalculatorKind = "rate" | "pph21" | "pphbadan" | "ppn" | "ppnbm";

const ZERO = "Rp0";

export function defaultResultRows(kind: CalculatorKind, taxLabel: string): ResultRow[] {
  switch (kind) {
    case "pph21":
      return [
        { label: "DPP", value: ZERO },
        { label: "Tarif", value: "0%" },
        { label: "PPh 21", value: ZERO, emphasis: true },
      ];
    case "pphbadan":
      return [
        { label: "DPP", value: ZERO },
        { label: "Tarif", value: "0%" },
        { label: "PPh Badan", value: ZERO, emphasis: true },
      ];
    case "ppn":
      return [
        { label: "DPP", value: ZERO },
        { label: "Tarif", value: "0%" },
        { label: "PPN", value: ZERO, emphasis: true },
      ];
    case "ppnbm":
      return [
        { label: "DPP", value: ZERO },
        { label: "Tarif", value: "0%" },
        { label: "PPnBM", value: ZERO, emphasis: true },
      ];
    default:
      return [
        { label: "DPP", value: ZERO },
        { label: "Tarif", value: "0%" },
        { label: taxLabel, value: ZERO, emphasis: true },
      ];
  }
}

export function resultTitle(): string {
  return "Hasil Perhitungan";
}
