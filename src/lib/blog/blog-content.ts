import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import matter from "gray-matter";

import type { BlogPost, BlogPostOptions, BlogPostSummary } from "@/types/blog";

import { isFutureEditorialDate } from "./blog-date";
import { calculateReadingTimeMinutes } from "./blog-reading-time";
import {
  assertValidBlogSlug,
  validateBlogFrontmatter,
  validateBlogSlug,
} from "./blog-validation";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export async function getAllBlogPosts(
  options: BlogPostOptions = {},
): Promise<BlogPostSummary[]> {
  const posts = await readAllBlogPosts();

  return posts
    .filter((post) => isVisiblePost(post, options))
    .map(toBlogPostSummary)
    .sort(sortBlogPosts);
}

export async function getBlogPostBySlug(
  slug: string,
  options: BlogPostOptions = {},
): Promise<BlogPost | null> {
  if (!validateBlogSlug(slug)) {
    return null;
  }

  const posts = await readAllBlogPosts();
  const post = posts.find((candidate) => candidate.slug === slug);

  if (!post || !isVisiblePost(post, options)) {
    return null;
  }

  return post;
}

export async function getPublishedBlogPosts(): Promise<BlogPostSummary[]> {
  return getAllBlogPosts();
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  const posts = await getPublishedBlogPosts();

  return posts.map((post) => post.slug);
}

export function shouldIncludeLocalUnpublishedPosts(): boolean {
  return process.env.NODE_ENV === "development";
}

export function isUnpublishedBlogPost(post: BlogPostSummary): boolean {
  return post.draft || isFutureEditorialDate(post.publishedAt);
}

const readAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const entries = await readdir(BLOG_CONTENT_DIR, { withFileTypes: true });
  const fileNames = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter(isBlogMdxFile);

  const posts = await Promise.all(fileNames.map(readBlogPostFile));

  return posts.sort(sortBlogPosts);
});

async function readBlogPostFile(fileName: string): Promise<BlogPost> {
  const slug = fileName.slice(0, -".mdx".length);

  assertValidBlogSlug(slug, fileName);

  const filePath = path.join(BLOG_CONTENT_DIR, fileName);
  const source = await readFile(filePath, "utf8");
  const parsed = matter(source);
  const frontmatter = validateBlogFrontmatter(parsed.data, fileName);
  const content = parsed.content.trim();

  return {
    ...frontmatter,
    slug,
    content,
    readingTimeMinutes: calculateReadingTimeMinutes(content),
  };
}

function isBlogMdxFile(fileName: string): boolean {
  return !fileName.startsWith(".") && fileName.endsWith(".mdx");
}

function isVisiblePost(post: BlogPost, options: BlogPostOptions): boolean {
  const includeDrafts = options.includeDrafts === true;
  const includeFuture = options.includeFuture === true;

  if (!includeDrafts && post.draft) {
    return false;
  }

  if (!includeFuture && isFutureEditorialDate(post.publishedAt)) {
    return false;
  }

  return true;
}

function sortBlogPosts(a: BlogPostSummary, b: BlogPostSummary): number {
  const dateComparison = b.publishedAt.localeCompare(a.publishedAt);

  if (dateComparison !== 0) {
    return dateComparison;
  }

  return a.title.localeCompare(b.title, "it-IT");
}

function toBlogPostSummary(post: BlogPost): BlogPostSummary {
  return {
    title: post.title,
    description: post.description,
    ...(post.excerpt ? { excerpt: post.excerpt } : {}),
    publishedAt: post.publishedAt,
    ...(post.updatedAt ? { updatedAt: post.updatedAt } : {}),
    category: post.category,
    tags: post.tags,
    draft: post.draft,
    featured: post.featured,
    ...(post.coverImage && post.coverAlt
      ? { coverImage: post.coverImage, coverAlt: post.coverAlt }
      : {}),
    slug: post.slug,
    readingTimeMinutes: post.readingTimeMinutes,
  };
}
