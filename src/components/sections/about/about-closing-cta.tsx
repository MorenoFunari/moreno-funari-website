import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

import styles from "./about-closing-cta.module.css";

export function AboutClosingCta() {
  return (
    <Container
      as="section"
      aria-labelledby="about-closing-title"
      className={styles.section}
    >
      <div className={styles.panel}>
        <span className={styles.detail} aria-hidden="true" />
        <h2 className={styles.title} id="about-closing-title">
          Possiamo partire da ciò che stai vivendo oggi.
        </h2>
        <p className={styles.text}>
          Non serve avere già tutto chiaro. Puoi conoscere meglio il coaching
          oppure scrivermi e raccontarmi brevemente cosa ti ha portato qui.
        </p>
        <div className={styles.actions}>
          <ButtonLink href="/coaching" size="large" variant="ghost">
            Scopri il coaching
          </ButtonLink>
          <ButtonLink href="/confronto" size="large" variant="text">
            Vai a CONFRONTO
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
