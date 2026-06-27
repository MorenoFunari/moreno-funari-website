import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { blogPageCopy } from "@/config/blog";
import { siteConfig } from "@/config/site";

import styles from "./blog-empty-state.module.css";

export function BlogEmptyState() {
  return (
    <Container
      as="section"
      aria-labelledby="blog-empty-title"
      className={styles.section}
    >
      <div className={styles.panel}>
        <Eyebrow>{blogPageCopy.emptyState.eyebrow}</Eyebrow>
        <h2 className={styles.title} id="blog-empty-title">
          {blogPageCopy.emptyState.title}
        </h2>
        <div className={styles.copy}>
          {blogPageCopy.emptyState.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.actions}>
          <ButtonLink href="/ebook" size="large">
            Scarica l’eBook
          </ButtonLink>
          <ButtonLink
            external
            href={siteConfig.appUrl}
            size="large"
            variant="secondary"
          >
            Prova la riflessione guidata
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
