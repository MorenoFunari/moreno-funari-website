import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

import styles from "./closing-cta-section.module.css";

export function ClosingCtaSection() {
  return (
    <Container
      as="section"
      aria-labelledby="closing-cta-title"
      className={styles.section}
    >
      <div className={styles.panel}>
        <span className={styles.detail} aria-hidden="true" />
        <h2 className={styles.title} id="closing-cta-title">
          Ne parliamo in 30 minuti?
        </h2>
        <p className={styles.text}>
          Un primo incontro gratuito, online o di persona ai Castelli Romani. Ti faccio qualche domanda e poi ti rispondo personalmente.
        </p>
        <div className={styles.actions}>
          <ButtonLink href="/confronto" variant="ghost">
            Richiedi il primo incontro
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
