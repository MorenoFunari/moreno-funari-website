import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { startPaths } from "@/config/home";

import styles from "./start-paths-section.module.css";

export function StartPathsSection() {
  return (
    <Container
      as="section"
      className={styles.section}
      id="inizia-da-qui"
      aria-labelledby="start-title"
    >
      <SectionHeading
        eyebrow="Un primo passo"
        id="start-title"
        title="Da dove puoi iniziare?"
        description="Non esiste una strada uguale per tutti. Puoi scegliere il modo che senti più vicino al momento che stai vivendo."
      />

      <div className={styles.grid}>
        {startPaths.map((path, index) => (
          <SurfaceCard
            as="article"
            className={styles.card}
            key={path.title}
            variant="default"
          >
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            <h3 className={styles.cardTitle}>{path.title}</h3>
            <p className={styles.cardText}>{path.description}</p>
            <ButtonLink
              className={styles.cardLink}
              external={path.external}
              href={path.href}
              variant="text"
            >
              {path.cta}
            </ButtonLink>
          </SurfaceCard>
        ))}
      </div>
    </Container>
  );
}
