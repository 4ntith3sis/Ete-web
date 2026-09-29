import { services } from "@/data/mock/services";
import { ServiceCarousel } from "./ServiceCarousel";
import { SectionHeading } from "../shared/SectionHeading";
export function Services() { return <section className="showcase-section" id="services"><div className="container"><SectionHeading badge="Layanan yang tersedia" title="Layanan Pajak & Keuangan EasyTax" description="Solusi komprehensif untuk segala kepatuhan perpajakan badan usaha dan perorangan." /><ServiceCarousel services={services} /></div></section>; }
