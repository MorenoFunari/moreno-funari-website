import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { coachingFocusAreas } from "@/config/coaching-landing-pages";

import styles from "./coaching-focus-areas-section.module.css";

export function CoachingFocusAreasSection() {
  return (
    <Container
      as="section"
      aria-labelledby="coaching-focus-areas-title"
      className={styles.section}
    >
      <SectionHeading
        eyebrow="Aree di lavoro"
        id="coaching-focus-areas-title"
        title="Aree su cui possiamo lavorare."
        description="Sono esempi di situazioni reali, non categorie cliniche. Servono a capire da dove può partire un confronto concreto."
      />
      <div className={styles.grid}>
        {coachingFocusAreas.map((area) => (
          <SurfaceCard as="article" className={styles.card} key={area.href}>
            <h3 className={styles.cardTitle}>{area.title}</h3>
            <p className={styles.cardText}>{area.description}</p>
            <ButtonLink className={styles.cardLink} href={area.href} variant="text">
              Approfondisci {area.title.toLowerCase()}
            </ButtonLink>
          </SurfaceCard>
        ))}
      </div>
    </Container>
  );
}
