import type { Service } from "@/types/service";
import { PricingCard } from "../cards/PricingCard";
import { SectionHeading } from "../shared/SectionHeading";

export function PricingPackages({ service }: { service: Service }) {
  return (
    <section className="service-pricing">
      <div className="container">
        <SectionHeading
          badge="HARGA TRANSPARAN"
          title="Paket Layanan"
          description="Pilih paket yang sesuai kebutuhan bisnis Anda."
        />
        <div className="service-packages">
          {service.pricingPackages.map((item) => (
            <PricingCard key={item.name} pkg={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
