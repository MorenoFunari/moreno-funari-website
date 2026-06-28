import { getBlogCategoryLabel } from "@/config/blog-categories";
import { seoConfig, toAbsoluteUrl } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { editorialDateToIso } from "@/lib/blog/blog-date";
import type { BlogPost } from "@/types/blog";

export type JsonLdPrimitive = string | number | boolean | null;
export type JsonLdValue =
  | JsonLdPrimitive
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };
export type JsonLdObject = { [key: string]: JsonLdValue };

const personId = toAbsoluteUrl(seoConfig.personIdPath);
const websiteId = toAbsoluteUrl(seoConfig.websiteIdPath);

export function createPersonJsonLd(): JsonLdObject {
  return {
    "@type": "Person",
    "@id": personId,
    name: "Moreno Funari",
    url: toAbsoluteUrl("/chi-sono"),
    jobTitle: "Mental Coach",
    image: toAbsoluteUrl("/images/moreno/moreno-about-outdoor.webp"),
    sameAs: [siteConfig.instagramUrl],
  };
}

export function createHomeJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: toAbsoluteUrl("/"),
        name: seoConfig.siteName,
        alternateName: seoConfig.shortSiteName,
        inLanguage: seoConfig.language,
        author: {
          "@id": personId,
        },
      },
      createPersonJsonLd(),
    ],
  };
}

export function createProfilePageJsonLd(description: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${toAbsoluteUrl("/chi-sono")}#profile-page`,
    url: toAbsoluteUrl("/chi-sono"),
    name: "Chi sono",
    description,
    inLanguage: seoConfig.language,
    mainEntity: createPersonJsonLd(),
  };
}

export function createBlogPostingJsonLd(post: BlogPost): JsonLdObject {
  const articleUrl = toAbsoluteUrl(`/blog/${post.slug}`);
  const imageUrl = post.coverImage
    ? toAbsoluteUrl(post.coverImage)
    : toAbsoluteUrl(seoConfig.defaultSocialImagePath);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#blog-posting`,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    headline: post.title,
    description: post.description,
    datePublished: editorialDateToIso(post.publishedAt),
    ...(post.updatedAt
      ? { dateModified: editorialDateToIso(post.updatedAt) }
      : {}),
    inLanguage: seoConfig.language,
    articleSection: getBlogCategoryLabel(post.category),
    keywords: [...post.tags],
    author: {
      "@type": "Person",
      "@id": personId,
      name: "Moreno Funari",
    },
    publisher: {
      "@type": "Person",
      "@id": personId,
      name: "Moreno Funari",
    },
    image: imageUrl,
  };
}
