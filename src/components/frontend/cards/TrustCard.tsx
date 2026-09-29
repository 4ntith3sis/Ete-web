export type TrustCardData = {
  icon: string;
  title: string;
  description: string;
};

/**
 * Trust/advantage card (`advantage-card-box`): icon, title, description.
 */
export function TrustCard({ icon, title, description }: TrustCardData) {
  return (
    <article className="advantage-card-box">
      <div className="service-advantage-icon">
        <i className={`fa-solid ${icon}`} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
