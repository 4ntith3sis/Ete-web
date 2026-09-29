import Image from "next/image";
import { Fragment } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

export type AboutHeroCrumb = { label: string; href?: string };

type AboutHeroProps = {
  crumbs: AboutHeroCrumb[];
  badge: string;
  title: ReactNode;
  description: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  trustItems: string[];
  imageSrc: string;
  imageAlt: string;
};

/**
 * Hero reusable dengan layout identik untuk halaman Tentang Kami & Layanan.
 * Class, typography, spacing, dan decorative elements dipertahankan sama;
 * hanya content (teks/CTA/image) yang dipassing per halaman.
 */
export function AboutHero({
  crumbs,
  badge,
  title,
  description,
  secondaryCtaLabel,
  secondaryCtaHref,
  trustItems,
  imageSrc,
  imageAlt,
}: AboutHeroProps) {
  return (
    <section className="about-hero-section about-page-hero">
      <div className="container">
        <div className="about-hero-grid">
          <div>
            <nav className="about-breadcrumb">
              {crumbs.map((crumb, index) => (
                <Fragment key={crumb.label}>
                  {index > 0 && <span>&gt;</span>}
                  {crumb.href ? (
                    <a href={crumb.href}>
                      {index === 0 && <i className="fa-solid fa-house" />} {crumb.label}
                    </a>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </Fragment>
              ))}
            </nav>
            <div className="hero-tag-pill-figma">
              <span /> {badge}
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="hero-btn-row">
              <Button href="https://mauorder.online/easytaxwebsite" external className="btn-primary">
                Konsultasi Gratis <i className="fa-solid fa-arrow-right" />
              </Button>
              <Button href={secondaryCtaHref} className="btn-outline-white">
                {secondaryCtaLabel}
              </Button>
            </div>
            <div className="hero-trust-items">
              {trustItems.map((item) => (
                <div className="hero-trust-item" key={item}>
                  <i className="fa-solid fa-circle-check" /> <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-hero-visual">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="45vw"
              priority
              style={{ objectFit: "cover" }}
            />
            <div className="about-floating-stat">
              <i className="fa-solid fa-user-check" />
              <strong>
                13.000+<small>Bisnis Terlayani</small>
              </strong>
            </div>
            <div className="about-floating-stat bottom">
              <i className="fa-solid fa-star" />
              <strong>
                4.9 / 5.0<small>Rating Google (700+)</small>
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
