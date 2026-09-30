import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/mock/services";
import { getServiceBySlug } from "@/lib/services/getServiceBySlug";
import { PageShell } from "@/components/frontend/layout/PageShell";
import { ServiceHero } from "@/components/frontend/service/ServiceHero";
import { PricingPackages } from "@/components/frontend/service/PricingPackages";
import { ServiceFAQ } from "@/components/frontend/service/ServiceFAQ";
import { ServiceCTA } from "@/components/frontend/service/ServiceCTA";
import { RatingStats } from "@/components/frontend/shared/RatingStats";
import { ClientsMarquee, IndonesiaBanner, MediaTrust, Testimonials } from "@/components/frontend/homepage";
import { ServiceAdvantages } from "@/components/frontend/service/ServiceAdvantages";
import { ServiceWorkflow } from "@/components/frontend/service/ServiceWorkflow";

export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const service = await getServiceBySlug(slug); return service ? { title: service.seo.title, description: service.seo.description } : { title: "Layanan tidak ditemukan" }; }
export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const service = await getServiceBySlug(slug); if (!service) notFound(); const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }; return <PageShell><ServiceHero service={service} /><RatingStats className="slug-rating-stats" /><ServiceAdvantages /><PricingPackages service={service} /><ServiceWorkflow /><IndonesiaBanner /><ClientsMarquee /><MediaTrust /><Testimonials /><ServiceFAQ service={service} /><ServiceCTA /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /></PageShell>; }
