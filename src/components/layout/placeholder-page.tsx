import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SurfaceCard } from "@/components/ui/surface-card";

import styles from "./placeholder-page.module.css";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PlaceholderPage({
  eyebrow,
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <main className={styles.page} id="main-content">
      <Container className={styles.inner}>
        <SurfaceCard
          as="article"
          aria-labelledby="placeholder-title"
          className={styles.card}
        >
          <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>
          <h1 className={styles.title} id="placeholder-title">
            {title}
          </h1>
          <p className={styles.description}>{description}</p>
          <ButtonLink className={styles.homeLink} href="/" variant="secondary">
            Torna alla homepage
          </ButtonLink>
        </SurfaceCard>
      </Container>
    </main>
  );
}
