import type { PricingPackage } from "@/types/service";

const CONSULTATION_HREF = "https://mauorder.online/easytaxwebsite";

/**
 * Pricing package card (`service-package`).
 * Optional fields (description/unit/features) render only when present,
 * so the same component stays compatible with the future Payload
 * `pricing: PricingPackage[]` contract.
 */
export function PricingCard({ name, description, price, unit, features }: PricingPackage) {
  const featureList = features ?? [];
  return (
    <article className="service-package">
      <h3>{name}</h3>
      {description ? <p>{description}</p> : null}
      <strong>
        {price}
        {unit ? <span className="price-unit">{` ${unit}`}</span> : null}
      </strong>
      {featureList.length > 0 ? (
        <>
          <h4>Keunggulan</h4>
          <ul>
            {featureList.map((feature) => (
              <li key={feature}>
                <i className="fa-solid fa-circle-check" /> {feature}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <a href={CONSULTATION_HREF} target="_blank" rel="noreferrer" className="btn btn-primary">
        Konsultasi
      </a>
    </article>
  );
}
