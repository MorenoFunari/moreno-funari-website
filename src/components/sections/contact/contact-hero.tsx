import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { contactLinks } from "@/config/contact";

import styles from "./contact-hero.module.css";

export function ContactHero() {
  return (
    <Container
      as="section"
      aria-labelledby="contact-hero-title"
      className={styles.hero}
    >
      <div className={styles.content}>
        <Eyebrow className={styles.eyebrow}>Contatti</Eyebrow>
        <h1 className={styles.title} id="contact-hero-title">
          Puoi scrivermi anche se non sai ancora da dove iniziare.
        </h1>
        <div className={styles.copy}>
          <p>
            Non serve avere un obiettivo perfettamente definito o trovare subito
            le parole giuste. Puoi partire dalla situazione che oggi ti crea più
            pressione, confusione o blocco.
          </p>
          <p>
            Bastano poche righe. Il primo messaggio serve a capire cosa stai
            cercando e se il mio modo di lavorare può esserti utile.
          </p>
        </div>
        <div className={styles.actions} aria-label="Azioni principali">
          <ButtonLink href={contactLinks.emailHref} external size="large">
            Scrivimi via email
          </ButtonLink>
          <ButtonLink
            ariaLabel={`${contactLinks.instagramAriaLabel}, si apre in una nuova scheda`}
            href={contactLinks.instagramUrl}
            external
            size="large"
            target="_blank"
            variant="secondary"
          >
            Scrivimi su Instagram
          </ButtonLink>
        </div>
        <p className={styles.note}>
          Scrivermi non comporta l’obbligo di iniziare un percorso.
        </p>
      </div>
      <div className={styles.signal} aria-hidden="true" />
    </Container>
  );
}
