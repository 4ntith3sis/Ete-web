import { articles } from "@/data/mock/articles";
export async function getArticleBySlug(slug: string) { return articles.find((article) => article.slug === slug); }
