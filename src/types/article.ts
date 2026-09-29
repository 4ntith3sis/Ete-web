export type Article = {
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  thumbnail: string;
  category: string;
  author: string;
  publishedDate: string;
  readingTime: string;
  seo: { title: string; description: string };
};
