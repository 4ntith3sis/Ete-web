import type { Metadata } from "next";
import { PageShell } from "@/components/frontend/layout/PageShell";
import { AboutHero } from "@/components/frontend/about/AboutHero";
import { RatingStats } from "@/components/frontend/shared/RatingStats";
import { TrustSection } from "@/components/frontend/shared/TrustSection";
import { ServiceGrid } from "@/components/frontend/service/ServiceGrid";
import {
  ClientsMarquee,
  HowItWorks,
  IndonesiaBanner,
  MediaTrust,
  Testimonials,
} from "@/components/frontend/homepage";
import { getServices } from "@/lib/services/getServices";
import { layananTrustCards } from "@/data/mock/layanan";

export const metadata: Metadata = {
  title: "Layanan Perpajakan & Akuntansi | EasyTax",
  description: "Layanan perpajakan dan akuntansi EasyTax.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <PageShell>
      <AboutHero
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Layanan" }]}
        badge="Layanan EasyTax — Konsultan Pajak & Akuntansi"
        title={
          <>
            Solusi Lengkap Perpajakan &amp; <span>Finansial untuk Bisnis Anda</span>
          </>
        }
        description="Mulai dari pelaporan SPT tahunan, pembukuan bulanan, hingga pendampingan audit dan pengurusan PKP. Dikelola langsung oleh konsultan pajak berizin resmi (BKP) dan berpengalaman menangani berbagai industri di Indonesia."
        secondaryCtaLabel="Eksplorasi Layanan"
        secondaryCtaHref="#katalog-layanan"
        trustItems={["13.000+ Klien Terlayani", "Konsultan Berizin Resmi"]}
        imageSrc="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80"
        imageAlt="Layanan Konsultan Pajak EasyTax"
      />

      <RatingStats className="layanan-rating-stats" />

      <TrustSection
        id="keunggulan"
        badge="KEUNGGULAN EASYTAX"
        heading="Keunggulan Layanan EasyTax"
        description="EasyTax hadir untuk membantu kebutuhan perpajakan Anda dengan layanan yang profesional, proses yang praktis, dan pendampingan yang terpercaya."
        cards={layananTrustCards}
      />

      <ServiceGrid services={services} />

      <HowItWorks />

      <IndonesiaBanner />

      <ClientsMarquee />

      <MediaTrust />

      <Testimonials />
    </PageShell>
  );
}
