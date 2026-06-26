import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

import styles from "./coaching-hero.module.css";

export function CoachingHero() {
  return (
    <Container
      as="section"
      aria-labelledby="coaching-hero-title"
      className={styles.hero}
    >
      <div className={styles.content}>
        <Eyebrow className={styles.eyebrow}>Coaching</Eyebrow>
        <h1 className={styles.title} id="coaching-hero-title">
          Uno spazio per fare chiarezza, non per ricevere giudizi.
        </h1>
        <div className={styles.copy}>
          <p>
            A volte non manca la volontà. Manca uno spazio in cui fermarsi,
            mettere ordine nei pensieri e capire da quale passo ripartire.
          </p>
          <p>
            Nel coaching non ricevi una risposta pronta. Lavoriamo insieme sulla
            situazione che stai vivendo, sulle risorse che hai già e su ciò che
            può dipendere davvero da te.
          </p>
        </div>
        <div className={styles.actions} aria-label="Azioni principali">
          <ButtonLink href="/contatti" size="large">
            Raccontami da cosa vorresti partire
          </ButtonLink>
          <ButtonLink href="#come-funziona" size="large" variant="secondary">
            Scopri come funziona
          </ButtonLink>
        </div>
      </div>
      <div className={styles.signal} aria-hidden="true" />
    </Container>
  );
}
