import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/articles/getArticleBySlug";
import { articles } from "@/data/mock/articles";
import { PageShell } from "@/components/frontend/layout/PageShell";
import { ArticleHeader } from "@/components/frontend/article/ArticleHeader";
import { ArticleContent } from "@/components/frontend/article/ArticleContent";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const article = await getArticleBySlug(slug); return article ? { title: article.seo.title, description: article.seo.description } : { title: "Artikel tidak ditemukan" }; }
export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const article = await getArticleBySlug(slug); if (!article) notFound(); return <PageShell><main className="article-detail-page"><div className="container"><ArticleHeader article={article} /><div className="article-detail-image"><Image src={article.thumbnail} alt={article.title} fill sizes="100vw" priority style={{ objectFit: "cover" }} /></div><ArticleContent article={article} /></div></main></PageShell>; }
