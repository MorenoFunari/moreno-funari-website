import { BlogPostCard } from "@/components/blog/blog-post-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { BlogPostSummary } from "@/types/blog";

import styles from "./posts-grid-section.module.css";

type PostsGridSectionProps = {
  posts: BlogPostSummary[];
};

export function PostsGridSection({ posts }: PostsGridSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <Container
      as="section"
      aria-labelledby="posts-grid-title"
      className={styles.section}
    >
      <SectionHeading
        eyebrow="Altri approfondimenti"
        id="posts-grid-title"
        title="Articoli da leggere con calma."
      />
      <div className={styles.grid}>
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </Container>
  );
}
