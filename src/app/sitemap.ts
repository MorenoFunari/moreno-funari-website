import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getPublishedBlogPosts } from "@/lib/blog/blog-content";
import { editorialDateToIso } from "@/lib/blog/blog-date";

const staticRoutes = [
  "",
  "/chi-sono",
  "/coaching",
  "/ebook",
  "/contatti",
  "/blog",
  "/privacy-policy",
  "/cookie-policy",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedBlogPosts();
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
  }));
  const blogEntries = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: editorialDateToIso(post.updatedAt ?? post.publishedAt),
  }));

  return [...staticEntries, ...blogEntries];
}
