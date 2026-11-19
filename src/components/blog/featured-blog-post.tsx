import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { getBlogCategoryLabel } from "@/config/blog-categories";
import { editorialDateToIso, formatEditorialDate } from "@/lib/blog/blog-date";
import type { BlogPostSummary } from "@/types/blog";

import styles from "./featured-blog-post.module.css";

type FeaturedBlogPostProps = {
  label: "In evidenza" | "Ultimo articolo";
  post: BlogPostSummary;
  titleId?: string;
};

export function FeaturedBlogPost({ label, post, titleId }: FeaturedBlogPostProps) {
  const categoryLabel = getBlogCategoryLabel(post.category);
  const tags = post.tags.slice(0, 3);
  const articleCover = post.coverImage && post.coverAlt
    ? { src: post.coverImage, alt: post.coverAlt }
    : null;
  const cover = articleCover ?? {
    src: "/images/moreno/moreno-about-outdoor.webp",
    alt: "Moreno Funari all’aperto",
  };
  const excerpt = post.excerpt ?? post.description;

  return (
    <article className={styles.article}>
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <div className={styles.meta}>
          <span>{categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={editorialDateToIso(post.publishedAt)}>
            {formatEditorialDate(post.publishedAt)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTimeMinutes} min di lettura</span>
        </div>
        <h2 className={styles.title} id={titleId}>
          {post.title}
        </h2>
        <p className={styles.description}>{excerpt}</p>

        {tags.length > 0 ? (
          <ul className={styles.tags} aria-label="Temi dell’articolo">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}

        <ButtonLink href={`/blog/${post.slug}`} size="large">
          Leggi l’articolo
        </ButtonLink>
      </div>

      <div className={styles.cover}>
        <Image
          alt={cover.alt}
          className={articleCover ? styles.coverImage : styles.portraitImage}
          fill
          priority
          sizes="(min-width: 960px) 42vw, 100vw"
          src={cover.src}
        />
      </div>
    </article>
  );
}
