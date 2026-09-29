import type { PricingPackage } from "@/types/service";

const CONSULTATION_HREF = "https://mauorder.online/easytaxwebsite";

/**
 * Pricing package card (`service-package`).
 */
export function PricingCard({ pkg }: { pkg: PricingPackage }) {
  return (
    <article className="service-package">
      <h3>{pkg.name}</h3>
      <p>{pkg.description}</p>
      <strong>{pkg.price}</strong>
      <ul>
        {pkg.features.map((feature) => (
          <li key={feature}>
            <i className="fa-solid fa-circle-check" /> {feature}
          </li>
        ))}
      </ul>
      <a href={CONSULTATION_HREF} target="_blank" rel="noreferrer" className="btn btn-primary">
        Konsultasi
      </a>
    </article>
  );
}
