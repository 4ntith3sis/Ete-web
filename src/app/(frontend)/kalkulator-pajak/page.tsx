import type { Metadata } from "next";
import { PageShell } from "@/components/frontend/layout/PageShell";
import { CalculatorShell } from "@/components/frontend/calculator/CalculatorShell";

export const metadata: Metadata = {
  title: "Kalkulator Pajak | EasyTax",
  description:
    "Hitung estimasi pajak Anda dengan kalkulator PPh 21, PPh 22, PPh 23, PPh 4(2), PPh 15, PPh Badan, PPN, dan PPnBM di EasyTax.",
};

export default function KalkulatorPajakPage() {
  return (
    <PageShell>
      <CalculatorShell />
    </PageShell>
  );
}
