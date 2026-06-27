import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { editorialDateToIso, formatEditorialDate } from "@/lib/blog/blog-date";
import type { BlogPostSummary } from "@/types/blog";

import styles from "./featured-blog-post.module.css";

type FeaturedBlogPostProps = {
  label: "In evidenza" | "Ultimo articolo";
  post: BlogPostSummary;
  titleId?: string;
};

export function FeaturedBlogPost({ label, post, titleId }: FeaturedBlogPostProps) {
  const tags = post.tags.slice(0, 3);
  const hasCover = Boolean(post.coverImage && post.coverAlt);

  return (
    <article className={hasCover ? styles.withCover : styles.article}>
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <div className={styles.meta}>
          <span>{post.category}</span>
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
        <p className={styles.description}>{post.description}</p>

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

      {post.coverImage && post.coverAlt ? (
        <div className={styles.cover}>
          <Image
            alt={post.coverAlt}
            className={styles.coverImage}
            height={720}
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            src={post.coverImage}
            width={1280}
          />
        </div>
      ) : null}
    </article>
  );
}
