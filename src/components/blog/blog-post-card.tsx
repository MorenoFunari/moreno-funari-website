import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { editorialDateToIso, formatEditorialDate } from "@/lib/blog/blog-date";
import type { BlogPostSummary } from "@/types/blog";

import styles from "./blog-post-card.module.css";

type BlogPostCardProps = {
  post: BlogPostSummary;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  const href = `/blog/${post.slug}`;
  const tags = post.tags.slice(0, 3);

  return (
    <article className={styles.card}>
      {post.coverImage && post.coverAlt ? (
        <div className={styles.cover}>
          <Image
            alt={post.coverAlt}
            className={styles.coverImage}
            height={540}
            sizes="(min-width: 1080px) 30vw, (min-width: 760px) 45vw, 100vw"
            src={post.coverImage}
            width={960}
          />
        </div>
      ) : null}

      <div className={styles.body}>
        <div className={styles.meta}>
          <span>{post.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={editorialDateToIso(post.publishedAt)}>
            {formatEditorialDate(post.publishedAt)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTimeMinutes} min di lettura</span>
        </div>

        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.description}>{post.description}</p>

        {tags.length > 0 ? (
          <ul className={styles.tags} aria-label="Temi dell’articolo">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}

        <ButtonLink className={styles.link} href={href} variant="text">
          Leggi l’articolo
        </ButtonLink>
      </div>
    </article>
  );
}
