import type { Metadata } from "next";
import { PageShell } from "@/components/frontend/layout/PageShell";
import { ContactPage } from "@/components/frontend/contact/ContactPage";

export const metadata: Metadata = { title: "Hubungi Kami — EasyTax", description: "Hubungi tim konsultan pajak dan akuntansi EasyTax." };
export default function ContactRoute() { return <PageShell><ContactPage /></PageShell>; }
