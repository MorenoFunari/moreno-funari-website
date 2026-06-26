import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

import styles from "./coaching-closing-cta.module.css";

export function CoachingClosingCta() {
  return (
    <Container
      as="section"
      aria-labelledby="coaching-closing-title"
      className={styles.section}
    >
      <div className={styles.panel}>
        <span className={styles.detail} aria-hidden="true" />
        <h2 className={styles.title} id="coaching-closing-title">
          Puoi iniziare raccontandomi cosa stai vivendo.
        </h2>
        <p className={styles.text}>
          Non serve trovare le parole perfette. Bastano poche righe per iniziare
          a capire se questo spazio può esserti utile.
        </p>
        <div className={styles.actions}>
          <ButtonLink href="/contatti" size="large" variant="ghost">
            Scrivimi
          </ButtonLink>
          <ButtonLink href="/chi-sono" size="large" variant="text">
            Conosci meglio Moreno
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
