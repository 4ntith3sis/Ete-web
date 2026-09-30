"use client";
import { useState } from "react";
import type { Service } from "@/types/service";
import { SectionHeading } from "../shared/SectionHeading";
import { FaqToggleIcon } from "../shared/FaqToggleIcon";
export function ServiceFAQ({ service }: { service: Service }) { const [active, setActive] = useState(0); return <section className="faq-section service-faq"><div className="container"><SectionHeading badge="FAQ" title="Pertanyaan Seputar Layanan" /><div className="faq-wrapper">{service.faq.map((item, index) => <div className={`faq-item${active === index ? " active" : ""}`} key={item.question}><button className="faq-header" onClick={() => setActive(active === index ? -1 : index)}><h3>{item.question}</h3><FaqToggleIcon open={active === index} /></button>{active === index && <div className="faq-body"><div className="faq-content-inner">{item.answer}</div></div>}</div>)}</div></div></section>; }
