import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { firstContactSteps } from "@/config/coaching";

import styles from "./first-contact-section.module.css";

export function FirstContactSection() {
  return (
    <section className={styles.band} aria-labelledby="first-contact-title">
      <Container className={styles.inner}>
        <div className={styles.intro}>
          <SectionHeading
            eyebrow="Il primo contatto"
            id="first-contact-title"
            title="Non serve avere già tutto chiaro per scrivermi."
          />
          <div className={styles.copy}>
            <p>
              Puoi raccontarmi brevemente cosa ti ha portato qui e su quale
              situazione senti il bisogno di fare chiarezza.
            </p>
            <p>
              Il primo confronto serve anche a capire se il coaching e il mio
              modo di lavorare possono essere adatti al momento che stai vivendo.
              Non c’è alcun obbligo di iniziare un percorso.
            </p>
          </div>
        </div>
        <div className={styles.steps}>
          {firstContactSteps.map((step, index) => (
            <SurfaceCard
              as="article"
              className={styles.step}
              key={step.title}
              variant="muted"
            >
              <span className={styles.number}>{index + 1}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p>{step.description}</p>
            </SurfaceCard>
          ))}
        </div>
        <ButtonLink className={styles.cta} href="/contatti" variant="secondary">
          Inizia da un messaggio
        </ButtonLink>
      </Container>
    </section>
  );
}
