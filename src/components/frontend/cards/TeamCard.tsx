import Image from "next/image";
import type { AboutTeamMember } from "@/types/about";

/**
 * Team member card (`team-card`): photo, name, position, license, bio.
 */
export function TeamCard({ member }: { member: AboutTeamMember }) {
  const { photo, name, position, licenseLevel, bio } = member;
  return (
    <article className="team-card">
      <div className="team-img-wrapper">
        <Image src={photo} alt={name} fill sizes="20vw" className="team-img" />
      </div>
      <div className="team-info">
        <span>LICENSED TAX CONSULTANT</span>
        <h3>{name}</h3>
        <p>{position}</p>
        <strong className="team-license">Lisensi Konsultan Pajak: {licenseLevel}</strong>
        <p className="team-bio">{bio}</p>
      </div>
    </article>
  );
}
