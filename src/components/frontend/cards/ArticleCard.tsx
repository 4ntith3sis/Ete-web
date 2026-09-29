import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";

export function ArticleCard({ article }: { article: Article }) { return <article className="blog-card"><div className="blog-thumb"><span className="blog-category-tag">{article.category}</span><Image src={article.thumbnail} alt={article.title} className="blog-card-img" width={600} height={360} /></div><div className="blog-body"><div className="blog-meta"><span><i className="fa-regular fa-calendar" /> {article.publishedDate}</span><span><i className="fa-regular fa-clock" /> {article.readingTime}</span></div><h3><Link href={`/tulisan-pajak/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><Link href={`/tulisan-pajak/${article.slug}`} className="blog-readmore">Baca Selengkapnya <i className="fa-solid fa-arrow-right" /></Link></div></article>; }
