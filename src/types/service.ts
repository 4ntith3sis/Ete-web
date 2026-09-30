export type PricingPackage = { name: string; description?: string; price: string; unit?: string; features?: string[] };
export type Service = {
  title: string; slug: string; heroSubtitle: string; description: string; heroImage: string;
  pricing: PricingPackage[]; faq: Array<{ question: string; answer: string }>;
  seo: { title: string; description: string };
};
