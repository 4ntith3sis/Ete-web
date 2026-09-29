"use client";

import { useRef } from "react";
import type { Service } from "@/types/service";
import { ServiceCard } from "@/components/frontend/cards/ServiceCard";

export function ServiceCarousel({ services }: { services: Service[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => trackRef.current?.scrollBy({ left: direction * trackRef.current.clientWidth * 0.82, behavior: "smooth" });
  return <div className="service-carousel"><div className="service-carousel-controls"><button type="button" className="service-carousel-control" onClick={() => scroll(-1)} aria-label="Geser layanan ke kiri"><i className="fa-solid fa-arrow-left" /></button><button type="button" className="service-carousel-control" onClick={() => scroll(1)} aria-label="Geser layanan ke kanan"><i className="fa-solid fa-arrow-right" /></button></div><div className="services-cards-grid" ref={trackRef}>{services.map((service) => <ServiceCard service={service} key={service.slug} />)}</div></div>;
}
