import { Button } from "@/components/ui/Button";
import { CTASection } from "../shared/CTASection";

export function ServiceCTA() {
  return (
    <CTASection
      badge="Siap Membantu Anda"
      title="Mulai Konsultasi dengan EasyTax"
      description="Serahkan urusan perpajakan dan akuntansi bisnis Anda kepada tim konsultan kami."
    >
      <Button href="https://mauorder.online/easytaxwebsite" external className="btn-hero-cta">
        <i className="fa-brands fa-whatsapp" /> Chat WhatsApp Sekarang
      </Button>
    </CTASection>
  );
}
