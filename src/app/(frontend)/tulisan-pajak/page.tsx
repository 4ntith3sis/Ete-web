import type { Metadata } from "next";
import { PageShell } from "@/components/frontend/layout/PageShell";
import { ArticleListing } from "@/components/frontend/article/ArticleListing";
export const metadata: Metadata = { title: "Artikel & Edukasi Perpajakan | EasyTax", description: "Pusat artikel dan edukasi perpajakan EasyTax." };
export default function ArticlesPage() { return <PageShell><ArticleListing /></PageShell>; }
