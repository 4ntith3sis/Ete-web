import type { ReactNode } from "react";

type CTASectionProps = {
  id?: string;
  badge: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
};

/**
 * Shared navy CTA banner (`cta-banner-box`).
 * Content and actions are provided via props/children so every
 * CTA keeps its exact copy and buttons.
 */
export function CTASection({ id, badge, title, description, children }: CTASectionProps) {
  return (
    <section className="cta-banner-section" {...(id ? { id } : {})}>
      <div className="container">
        <div className="cta-banner-box">
          <span className="badge-tag">{badge}</span>
          <h2>{title}</h2>
          <p>{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
