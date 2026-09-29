import type { Article } from "@/types/article";
export function ArticleContent({ article }: { article: Article }) { return <article className="article-content">{article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>; }
