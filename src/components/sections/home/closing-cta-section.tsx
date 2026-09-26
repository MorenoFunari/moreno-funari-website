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
          Da quale piccolo passo vuoi iniziare?
        </h2>
        <p className={styles.text}>
          Puoi leggere, riflettere o scegliere di parlarne. Non devi fare tutto
          insieme.
        </p>
        <div className={styles.actions}>
          <ButtonLink href="/inizia-da-qui" variant="ghost">
            Inizia da qui
          </ButtonLink>
          <ButtonLink href="/confronto" variant="text">
            Scopri CONFRONTO
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
