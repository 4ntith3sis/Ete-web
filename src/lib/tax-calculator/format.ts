export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(value)}%`;
}

export function parseAmount(input: string): number | null {
  const normalized = input.replace(/[^0-9]/g, "");
  if (normalized === "") return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function parseDecimal(input: string): number | null {
  const normalized = input.replace(/,/g, ".").replace(/[^0-9.]/g, "");
  if (normalized === "" || normalized === ".") return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function formatThousands(input: string): string {
  const digits = input.replace(/[^0-9]/g, "");
  if (digits === "") return "";
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(Number(digits));
}
