import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { contactLinks } from "@/config/contact";

import styles from "./contact-closing-cta.module.css";

export function ContactClosingCta() {
  return (
    <Container
      as="section"
      aria-labelledby="contact-closing-title"
      className={styles.section}
    >
      <div className={styles.panel}>
        <span className={styles.detail} aria-hidden="true" />
        <h2 className={styles.title} id="contact-closing-title">
          Puoi iniziare con poche righe.
        </h2>
        <p className={styles.text}>
          Raccontami la situazione che stai vivendo o il dubbio che vorresti
          chiarire. Non serve preparare un messaggio perfetto.
        </p>
        <div className={styles.actions}>
          <ButtonLink
            href={contactLinks.emailHref}
            external
            size="large"
            variant="ghost"
          >
            Scrivimi via email
          </ButtonLink>
          <ButtonLink
            href={contactLinks.instagramUrl}
            external
            size="large"
            variant="text"
          >
            Scrivimi su Instagram
          </ButtonLink>
        </div>
        <p className={styles.note}>
          Il primo messaggio non comporta alcun impegno.
        </p>
      </div>
    </Container>
  );
}
