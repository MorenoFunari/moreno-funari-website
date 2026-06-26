import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { workingPrinciples } from "@/config/about";

import styles from "./working-principles-section.module.css";

export function WorkingPrinciplesSection() {
  return (
    <section className={styles.band} id="come-lavoro" aria-labelledby="work-title">
      <Container className={styles.inner} size="wide">
        <div className={styles.header}>
          <SectionHeading
            eyebrow="Come lavoro"
            id="work-title"
            title="Ascolto, domande e piccoli passi."
            description="Non esiste una risposta uguale per tutti. Il lavoro parte dalla situazione concreta che stai vivendo e da ciò che per te è davvero importante."
          />
        </div>
        <div className={styles.grid}>
          {workingPrinciples.map((principle, index) => (
            <SurfaceCard
              as="article"
              className={styles.card}
              key={principle.title}
              variant="default"
            >
              <span className={styles.number}>{index + 1}</span>
              <h3 className={styles.cardTitle}>{principle.title}</h3>
              <p className={styles.cardText}>{principle.description}</p>
            </SurfaceCard>
          ))}
        </div>
        <ButtonLink className={styles.cta} href="/coaching" variant="secondary">
          Scopri il coaching
        </ButtonLink>
      </Container>
    </section>
  );
}
