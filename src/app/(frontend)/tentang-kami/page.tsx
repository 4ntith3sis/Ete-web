import type { Metadata } from "next";
import { PageShell } from "@/components/frontend/layout/PageShell";
import { AboutPage } from "@/components/frontend/about/AboutPage";

export const metadata: Metadata = { title: "Tentang Kami — EasyTax", description: "Profil EasyTax sebagai konsultan pajak dan akuntansi terpercaya di Indonesia." };
export default function AboutRoute() { return <PageShell><AboutPage /></PageShell>; }
