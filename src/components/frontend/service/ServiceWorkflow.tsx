const steps = [
  ["01", "fa-comments", "Konsultasi", "Diskusikan kebutuhan perpajakan Anda bersama tim EasyTax."],
  ["02", "fa-file-arrow-up", "Kirim Dokumen yang Dibutuhkan", "Siapkan dan kirim dokumen yang diperlukan untuk proses layanan."],
  ["03", "fa-circle-check", "Hasil", "Terima hasil layanan sesuai kebutuhan"],
];

export function ServiceWorkflow() { return <section className="service-workflow"><div className="container"><div className="section-header"><span className="badge-tag">ALUR KERJA</span><h2>Langkah sederhana Bersama Easy Tax</h2><p className="service-workflow-support">Mulai dari konsultasi, pengumpulan dokumen yang diperlukan, hingga penyelesaian layanan, setiap tahap dilakukan secara terstruktur agar Anda dapat mengikuti proses dengan lebih mudah dan nyaman.</p></div><div className="service-workflow-grid">{steps.map(([number, icon, title, description], index) => <div className="service-workflow-step" key={number}><article className="service-workflow-card"><strong>{number}</strong><i className={`fa-solid ${icon}`} /><h3>{title}</h3><p>{description}</p></article>{index < steps.length - 1 && <span className="service-workflow-connector" aria-hidden="true"><i className="fa-solid fa-arrow-right" /></span>}</div>)}</div></div></section>; }
