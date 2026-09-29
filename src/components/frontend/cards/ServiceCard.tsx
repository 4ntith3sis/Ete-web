import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/types/content";
export function ServiceCard({ service }: { service: Service }) { return <article className="service-pro-card"><div className="service-pro-thumb"><Image src={service.heroImage} alt={service.title} width={600} height={360} /></div><div className="service-pro-body"><h3>{service.title}</h3><p>{service.description}</p><Button href={`/layanan/${service.slug}`} className="btn-primary btn-sm"><i className="fa-solid fa-arrow-right" /> Lihat Detail Layanan</Button></div></article>; }
