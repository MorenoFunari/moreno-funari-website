import { Container } from "@/components/ui/container";
import { FeaturedBlogPost } from "@/components/blog/featured-blog-post";
import type { BlogPostSummary } from "@/types/blog";

import styles from "./featured-post-section.module.css";

type FeaturedPostSectionProps = {
  label: "In evidenza" | "Ultimo articolo";
  post: BlogPostSummary;
};

export function FeaturedPostSection({ label, post }: FeaturedPostSectionProps) {
  return (
    <Container
      as="section"
      aria-labelledby="featured-article-title"
      className={styles.section}
      id="articoli"
      size="wide"
    >
      <FeaturedBlogPost
        label={label}
        post={post}
        titleId="featured-article-title"
      />
    </Container>
  );
}
