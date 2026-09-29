const ratingStats = [
  { value: "13.000+", label: "Bisnis Terlayani" },
  { value: "30+", label: "Jenis Layanan Pajak" },
  { value: "4.9 ★", label: "Rating Google (700+)" },
  { value: "3 Kota", label: "Kantor Representatif" },
] as const;

export function RatingStats({ className = "" }: { className?: string }) {
  return <section className={`rating-stats-section ${className}`.trim()} aria-label="Statistik EasyTax"><div className="container"><div className="rating-stats-grid">{ratingStats.map(({ value, label }) => <article className="rating-stat-card" key={label}><strong>{value === "4.9 ★" ? <>4.9 <span className="rating-stat-star">★</span></> : value}</strong><span>{label}</span></article>)}</div></div></section>;
}
