import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { firstContactSteps } from "@/config/contact";

import styles from "./first-contact-process-section.module.css";

export function FirstContactProcessSection() {
  return (
    <Container
      as="section"
      aria-labelledby="first-contact-process-title"
      className={styles.section}
      id="come-funziona"
    >
      <SectionHeading
        description="Il primo messaggio serve a capire meglio la situazione e a chiarire eventuali dubbi. Non è una prenotazione automatica."
        eyebrow="Il primo contatto"
        id="first-contact-process-title"
        title="Ci confrontiamo con calma, senza decidere tutto subito."
      />
      <div className={styles.grid}>
        {firstContactSteps.map((step, index) => (
          <SurfaceCard as="article" className={styles.card} key={step.title}>
            <span className={styles.number} aria-hidden="true">
              {(index + 1).toString().padStart(2, "0")}
            </span>
            <h3 className={styles.cardTitle}>{step.title}</h3>
            <p className={styles.cardText}>{step.text}</p>
          </SurfaceCard>
        ))}
      </div>
      <p className={styles.note}>
        Non viene fissata alcuna sessione senza aver prima chiarito modalità,
        durata e costi.
      </p>
    </Container>
  );
}
