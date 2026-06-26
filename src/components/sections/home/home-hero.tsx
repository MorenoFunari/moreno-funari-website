import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

import styles from "./home-hero.module.css";

export function HomeHero() {
  return (
    <Container
      as="section"
      aria-labelledby="hero-title"
      className={styles.hero}
    >
      <div className={styles.content}>
        <Eyebrow className={styles.eyebrow}>
          Moreno Funari | Mental Coach
        </Eyebrow>
        <h1 className={styles.title} id="hero-title">
          Non devi risolvere tutto oggi.
        </h1>
        <p className={styles.text}>
          Se ti senti bloccato, sotto pressione o troppo duro con te stesso,
          puoi iniziare facendo chiarezza e trovando un passo possibile.
        </p>
        <div className={styles.actions} aria-label="Azioni principali">
          <ButtonLink href="#inizia-da-qui" size="large">
            Inizia da qui
          </ButtonLink>
          <ButtonLink href="/chi-sono" size="large" variant="secondary">
            Conosci Moreno
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
