import { PageShell } from "@/components/frontend/layout/PageShell";
import { Benefits, ClientsMarquee, ClosingCTA, Hero, HowItWorks, IndonesiaBanner, MediaTrust, Services, Testimonials } from "@/components/frontend/homepage";
import { RatingStats } from "@/components/frontend/shared/RatingStats";

export default function HomePage() { return <PageShell><Hero /><RatingStats className="homepage-rating-stats" /><Benefits /><Services /><HowItWorks /><IndonesiaBanner /><ClientsMarquee /><MediaTrust /><Testimonials /><ClosingCTA /></PageShell>; }
