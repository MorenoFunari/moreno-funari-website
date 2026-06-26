import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { coachingProcessSteps } from "@/config/coaching";

import styles from "./process-section.module.css";

export function ProcessSection() {
  return (
    <section className={styles.band} id="come-funziona" aria-labelledby="process-title">
      <Container className={styles.inner} size="wide">
        <SectionHeading
          eyebrow="Il percorso"
          id="process-title"
          title="Partiamo dalla situazione concreta che stai vivendo."
          description="Non devi arrivare con un obiettivo perfettamente definito. Possiamo iniziare da ciò che oggi ti crea pressione, confusione o blocco."
        />
        <div className={styles.grid}>
          {coachingProcessSteps.map((step, index) => (
            <SurfaceCard
              as="article"
              className={styles.card}
              key={step.title}
              variant="default"
            >
              <span className={styles.number}>{index + 1}</span>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardText}>{step.description}</p>
            </SurfaceCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
