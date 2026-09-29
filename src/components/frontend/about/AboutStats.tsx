import { aboutStats } from "@/data/mock/about";

export function AboutStats() {
  return <section className="about-stats-section"><div className="container"><div className="about-stats-grid">{aboutStats.map(([number, label]) => <div className="about-stat" key={label}><strong>{number}</strong><span>{label}</span></div>)}</div></div></section>;
}
