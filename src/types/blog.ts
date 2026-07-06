import type { BlogCategorySlug } from "@/config/blog-categories";

export type BlogPostFrontmatter = {
  title: string;
  description: string;
  excerpt?: string;
  publishedAt: string;
  updatedAt?: string;
  category: BlogCategorySlug;
  tags: readonly string[];
  draft: boolean;
  featured: boolean;
  coverImage?: string;
  coverAlt?: string;
};

export type BlogPostSummary = BlogPostFrontmatter & {
  slug: string;
  readingTimeMinutes: number;
};

export type BlogPost = BlogPostSummary & {
  content: string;
};

export type BlogPostOptions = {
  includeDrafts?: boolean;
  includeFuture?: boolean;
};
