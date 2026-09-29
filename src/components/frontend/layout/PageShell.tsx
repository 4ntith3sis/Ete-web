import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { StickyWhatsApp } from "./StickyWhatsApp";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <StickyWhatsApp />
    </>
  );
}
