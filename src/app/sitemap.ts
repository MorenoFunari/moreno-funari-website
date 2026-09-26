import type { MetadataRoute } from "next";

import { toAbsoluteUrl } from "@/config/seo";
import { getPublishedBlogPosts } from "@/lib/blog/blog-content";
import { editorialDateToIso } from "@/lib/blog/blog-date";

const staticRoutes = [
  "",
  "/chi-sono",
  "/coaching",
  "/coaching/stress-lavorativo",
  "/coaching/overthinking",
  "/coaching/autostima-e-fiducia",
  "/coaching/blocco-e-primo-passo",
  "/coaching/responsabilita-e-controllo",
  "/coaching/mental-coaching-sportivo",
  "/coaching/cosa-fa-un-mental-coach",
  "/coaching/mental-coach-frascati",
  "/ebook",
  "/inizia-da-qui",
  "/passo",
  "/guida-dire-sempre-si",
  "/confronto",
  "/contatti",
  "/blog",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedBlogPosts();
  const staticEntries = staticRoutes.map((route) => ({
    url: toAbsoluteUrl(route === "" ? "/" : route),
  }));
  const blogEntries = posts.map((post) => ({
    url: toAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: editorialDateToIso(post.updatedAt ?? post.publishedAt),
  }));

  return [...staticEntries, ...blogEntries];
}
