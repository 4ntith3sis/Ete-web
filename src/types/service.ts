export type PricingPackage = { name: string; price: string; description: string; features: string[]; featured?: boolean };
export type Service = {
  title: string; slug: string; heroSubtitle: string; description: string; heroImage: string;
  pricingPackages: PricingPackage[]; faq: Array<{ question: string; answer: string }>;
  seo: { title: string; description: string };
};
