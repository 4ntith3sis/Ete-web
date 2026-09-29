/**
 * Client logo item inside the clients marquee.
 */
export function ClientLogoCard({ file }: { file: string }) {
  return (
    <div className="client-marquee-item">
      <img
        src={`/images/clients/${file}`}
        alt={file.replace(".jpg", "")}
        className="client-logo-img"
        loading="lazy"
      />
    </div>
  );
}
