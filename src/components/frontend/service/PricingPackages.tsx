import type { Service } from "@/types/service";
import { PricingCard } from "../cards/PricingCard";
import { SectionHeading } from "../shared/SectionHeading";

export function PricingPackages({ service }: { service: Service }) {
  if (!service.pricing || service.pricing.length === 0) return null;
  return (
    <section className="service-pricing">
      <div className="container">
        <SectionHeading
          badge="HARGA TRANSPARAN"
          title="Paket Layanan"
          description="Pilih paket yang sesuai kebutuhan bisnis Anda."
        />
        <div className="service-packages">
          {service.pricing.map((item) => (
            <PricingCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
