import type { ReactNode } from "react";

type SectionHeadingProps = {
  badge?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
};

/**
 * Shared section heading: badge + title + optional description.
 * Renders the exact `.section-header` markup used across the site.
 */
export function SectionHeading({ badge, title, description }: SectionHeadingProps) {
  return (
    <div className="section-header">
      {badge ? <span className="badge-tag">{badge}</span> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
