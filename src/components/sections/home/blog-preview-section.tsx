import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { plannedBlogPosts } from "@/config/home";

import styles from "./blog-preview-section.module.css";

export function BlogPreviewSection() {
  return (
    <Container
      as="section"
      aria-labelledby="blog-preview-title"
      className={styles.section}
    >
      <SectionHeading
        eyebrow="Riflessioni per la vita reale"
        id="blog-preview-title"
        title="Dal blog"
        description="Approfondimenti su fiducia, pressione, errori, lavoro, sport e quei momenti in cui non sai bene da dove ripartire."
      />

      <div className={styles.grid}>
        {plannedBlogPosts.map((post) => (
          <SurfaceCard
            as="article"
            className={styles.card}
            key={post.title}
            variant="outlined"
          >
            <p className={styles.category}>{post.category}</p>
            <h3 className={styles.cardTitle}>{post.title}</h3>
            <p className={styles.cardText}>{post.description}</p>
          </SurfaceCard>
        ))}
      </div>

      <ButtonLink className={styles.cta} href="/blog" variant="secondary">
        Vai al blog
      </ButtonLink>
    </Container>
  );
}
