export type ProgressiveBracket = { upTo: number; rate: number };

const INFINITY = Number.POSITIVE_INFINITY;

export const PPH_PROGRESSIVE_BRACKETS: ProgressiveBracket[] = [
  { upTo: 60_000_000, rate: 0.05 },
  { upTo: 250_000_000, rate: 0.15 },
  { upTo: 500_000_000, rate: 0.25 },
  { upTo: 5_000_000_000, rate: 0.3 },
  { upTo: INFINITY, rate: 0.35 },
];

export function progressiveTax(taxable: number, brackets: ProgressiveBracket[] = PPH_PROGRESSIVE_BRACKETS): number {
  let remaining = Math.max(0, taxable);
  let previous = 0;
  let tax = 0;
  for (const bracket of brackets) {
    if (remaining <= 0) break;
    const span = bracket.upTo - previous;
    const applied = Math.min(remaining, span);
    tax += applied * bracket.rate;
    remaining -= applied;
    previous = bracket.upTo;
  }
  return tax;
}

export type ProgressiveTaxLayer = { rate: number; taxableAmount: number; taxAmount: number };

export function progressiveTaxBreakdown(taxable: number, brackets: ProgressiveBracket[] = PPH_PROGRESSIVE_BRACKETS): ProgressiveTaxLayer[] {
  let remaining = Math.max(0, taxable);
  let previous = 0;
  const layers: ProgressiveTaxLayer[] = [];
  for (const bracket of brackets) {
    if (remaining <= 0) break;
    const span = bracket.upTo - previous;
    const applied = Math.min(remaining, span);
    layers.push({ rate: bracket.rate, taxableAmount: applied, taxAmount: applied * bracket.rate });
    remaining -= applied;
    previous = bracket.upTo;
  }
  return layers;
}
