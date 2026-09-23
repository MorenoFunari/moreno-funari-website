import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/blog/mdx-components";
import { LeadMagnetBanner } from "@/components/lead-magnet/lead-magnet-banner";
import { PilotCtaBox } from "@/components/pilot/pilot-cta-box";
import { JsonLd } from "@/components/seo/json-ld";
import { getBlogCategoryLabel } from "@/config/blog-categories";
import { seoConfig, toAbsoluteUrl } from "@/config/seo";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  isUnpublishedBlogPost,
  shouldIncludeLocalUnpublishedPosts,
} from "@/lib/blog/blog-content";
import {
  editorialDateToIso,
  formatEditorialDate,
} from "@/lib/blog/blog-date";
import { createBlogPostingJsonLd } from "@/lib/seo/structured-data";

import styles from "./article.module.css";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const leadMagnetPlacements = {
  "perche-rimandi-anche-quando-sai-cosa-dovresti-fare": "blog-rimandi",
  "responsabilita-non-significa-controllo-cosa-succede-quando-provi-a-gestire-tutto":
    "blog-responsabilita-controllo",
  "ti-parleresti-cosi-se-fossi-una-persona-a-cui-vuoi-bene":
    "blog-self-talk",
} as const;

const pilotCtaPosts = new Set([
  "quando-ti-senti-bloccato-non-devi-cambiare-tutto",
]);

export const dynamicParams = false;

export async function generateStaticParams() {
  const includeUnpublished = shouldIncludeLocalUnpublishedPosts();
  const posts = await getAllBlogPosts({
    includeDrafts: includeUnpublished,
    includeFuture: includeUnpublished,
  });

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const includeUnpublished = shouldIncludeLocalUnpublishedPosts();
  const post = await getBlogPostBySlug(slug, {
    includeDrafts: includeUnpublished,
    includeFuture: includeUnpublished,
  });

  if (!post) {
    notFound();
  }

  const url = toAbsoluteUrl(`/blog/${post.slug}`);
  const isLocalUnpublished = includeUnpublished && isUnpublishedBlogPost(post);
  const defaultSocialImageUrl = toAbsoluteUrl(seoConfig.defaultSocialImagePath);
  const socialImages = post.coverImage && post.coverAlt
    ? [
        {
          url: toAbsoluteUrl(post.coverImage),
          alt: post.coverAlt,
        },
      ]
    : [
        {
          url: defaultSocialImageUrl,
          alt: seoConfig.defaultSocialImageAlt,
        },
      ];

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      siteName: seoConfig.siteName,
      locale: seoConfig.locale,
      publishedTime: editorialDateToIso(post.publishedAt),
      ...(post.updatedAt
        ? { modifiedTime: editorialDateToIso(post.updatedAt) }
        : {}),
      tags: [...post.tags],
      images: socialImages,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images:
        post.coverImage && post.coverAlt
          ? [toAbsoluteUrl(post.coverImage)]
          : [defaultSocialImageUrl],
    },
    robots: isLocalUnpublished
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const includeUnpublished = shouldIncludeLocalUnpublishedPosts();
  const post = await getBlogPostBySlug(slug, {
    includeDrafts: includeUnpublished,
    includeFuture: includeUnpublished,
  });

  if (!post) {
    notFound();
  }

  const showDraftBadge = includeUnpublished && isUnpublishedBlogPost(post);
  const categoryLabel = getBlogCategoryLabel(post.category);
  const publishedLabel = formatEditorialDate(post.publishedAt);
  const updatedLabel =
    post.updatedAt && post.updatedAt !== post.publishedAt
      ? formatEditorialDate(post.updatedAt)
      : null;
  const leadMagnetPlacement =
    post.slug in leadMagnetPlacements
      ? leadMagnetPlacements[
          post.slug as keyof typeof leadMagnetPlacements
        ]
      : null;

  return (
    <main className={styles.page} id="main-content">
      <JsonLd data={createBlogPostingJsonLd(post)} />
      <article className={styles.article}>
        <Link className={styles.backLink} href="/blog">
          Torna al blog
        </Link>

        <header className={styles.header}>
          {showDraftBadge ? (
            <p className={styles.draftBadge}>Bozza locale — non pubblicata</p>
          ) : null}
          <div className={styles.metaLine}>
            <span className={styles.category}>{categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={editorialDateToIso(post.publishedAt)}>
              {publishedLabel}
            </time>
            {updatedLabel ? (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Aggiornato il{" "}
                  <time dateTime={editorialDateToIso(post.updatedAt ?? "")}>
                    {updatedLabel}
                  </time>
                </span>
              </>
            ) : null}
            <span aria-hidden="true">·</span>
            <span>{post.readingTimeMinutes} min di lettura</span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.description}>{post.description}</p>
        </header>

        {post.coverImage && post.coverAlt ? (
          <figure className={styles.cover}>
            <Image
              alt={post.coverAlt}
              className={styles.coverImage}
              height={720}
              priority
              src={post.coverImage}
              width={1280}
            />
          </figure>
        ) : null}

        <div className={styles.content}>
          <MDXRemote components={mdxComponents} source={post.content} />
        </div>

        {leadMagnetPlacement ? (
          <LeadMagnetBanner
            placement={leadMagnetPlacement}
            sourcePath={`/blog/${post.slug}`}
            variant="blog"
          />
        ) : null}

        {pilotCtaPosts.has(post.slug) ? <PilotCtaBox source="inline" /> : null}

        <footer className={styles.footer}>
          <p>
            Per portare questa riflessione in una situazione concreta, puoi
            scrivermi con calma dalla pagina{" "}
            <Link className={styles.footerLink} href="/contatti">
              Contatti
            </Link>
            .
          </p>
          <Link className={styles.footerLink} href="/coaching">
            Leggi come funziona il coaching
          </Link>
        </footer>
      </article>
    </main>
  );
}
