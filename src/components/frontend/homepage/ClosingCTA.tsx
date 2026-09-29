import { Button } from "@/components/ui/Button";
import { CTASection } from "../shared/CTASection";

export function ClosingCTA() {
  return (
    <CTASection
      id="contact"
      badge={
        <>
          <i className="fa-solid fa-bolt" /> Siap Membantu Anda
        </>
      }
      title="Anda Dapat Fokus Menjalankan Bisnis, Serahkan Urusan Perpajakan Ke EasyTax"
      description="Hubungi konsultan kami sekarang untuk mendapatkan konsultasi gratis dan solusi perpajakan terbaik bagi perusahaan Anda."
    >
      <div className="cta-action-group">
        <Button href="https://mauorder.online/easytaxwebsite" external className="btn-hero-cta">
          <i className="fa-brands fa-whatsapp" /> Chat WhatsApp Sekarang
        </Button>
        <Button href="mailto:info@easytax.id" className="btn-hero-secondary">
          <i className="fa-regular fa-envelope" /> Email: info@easytax.id
        </Button>
      </div>
    </CTASection>
  );
}
