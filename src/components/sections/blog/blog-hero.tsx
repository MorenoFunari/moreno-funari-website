import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { blogPageCopy } from "@/config/blog";
import { siteConfig } from "@/config/site";

import styles from "./blog-hero.module.css";

type BlogHeroProps = {
  hasPosts: boolean;
};

export function BlogHero({ hasPosts }: BlogHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="blog-hero-title">
      <Container className={styles.inner}>
        <div className={styles.content}>
          <Eyebrow>{blogPageCopy.hero.eyebrow}</Eyebrow>
          <h1 className={styles.title} id="blog-hero-title">
            {blogPageCopy.hero.title}
          </h1>
          <div className={styles.copy}>
            {blogPageCopy.hero.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.actions}>
            {hasPosts ? (
              <>
                <ButtonLink href="#articoli" size="large">
                  Leggi gli articoli
                </ButtonLink>
                <ButtonLink href="/ebook" size="large" variant="secondary">
                  Scarica l’eBook
                </ButtonLink>
              </>
            ) : (
              <>
                <ButtonLink href="/ebook" size="large">
                  Scarica l’eBook
                </ButtonLink>
                <ButtonLink
                  external
                  href={siteConfig.appUrl}
                  size="large"
                  variant="secondary"
                >
                  Prova una riflessione guidata
                </ButtonLink>
              </>
            )}
          </div>
        </div>
        <div className={styles.marker} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </Container>
    </section>
  );
}
