import { services } from "@/data/mock/services";
export async function getServiceBySlug(slug: string) { return services.find((service) => service.slug === slug); }
