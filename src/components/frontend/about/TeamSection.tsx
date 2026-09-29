import { team } from "@/data/mock/about";
import { TeamCard } from "../cards/TeamCard";
import { SectionHeading } from "../shared/SectionHeading";

/**
 * About page team section: heading + grid of TeamCard.
 */
export function TeamSection() {
  return (
    <section className="about-team-section">
      <div className="container">
        <SectionHeading
          badge="TAX & ACCOUNTING CONSULTANTS"
          title="Tim Di Balik Setiap Laporan Anda."
          description="Konsultan profesional bersertifikat yang berdedikasi menjaga kerapian akuntansi dan kepatuhan pajak perusahaan Anda."
        />
        <div className="about-team-grid">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
