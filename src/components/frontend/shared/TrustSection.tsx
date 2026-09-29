import { TrustCard, type TrustCardData } from "../cards/TrustCard";
import { SectionHeading } from "./SectionHeading";

type TrustSectionProps = {
  id?: string;
  sectionClassName?: string;
  badge: string;
  heading: string;
  description: string;
  cards: TrustCardData[];
};

/**
 * Shared trust/advantages section (icon + title + description cards).
 * Same visual language as "Keunggulan Kami" on service detail pages.
 */
export function TrustSection({
  id,
  sectionClassName = "service-advantages",
  badge,
  heading,
  description,
  cards,
}: TrustSectionProps) {
  return (
    <section className={sectionClassName} {...(id ? { id } : {})}>
      <div className="container">
        <SectionHeading badge={badge} title={heading} description={description} />
        <div className="advantages-grid">
          {cards.map((card) => (
            <TrustCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
