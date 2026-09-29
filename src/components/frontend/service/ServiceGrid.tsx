import type { Service } from "@/types/service";
import { ServiceCard } from "../cards/ServiceCard";

/**
 * Service listing grid section ("Daftar Layanan yang Tersedia").
 * Renders every service from the Services collection via ServiceCard.
 */
export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <section className="service-listing-section" id="katalog-layanan">
      <div className="container">
        <div className="service-listing-heading">
          <div>
            <span className="badge-tag">Daftar Layanan yang Tersedia</span>
            <h2>Pilihan Layanan yang Disesuaikan dengan Skala Bisnis Anda</h2>
          </div>
        </div>
        <div className="service-listing-grid">
          {services.map((service) => (
            <ServiceCard service={service} key={service.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
