import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { contactLinks } from "@/config/contact";

import styles from "./contact-options-section.module.css";

export function ContactOptionsSection() {
  return (
    <div className={styles.band}>
      <Container
        as="section"
        aria-labelledby="contact-options-title"
        className={styles.section}
      >
        <SectionHeading
          description="Puoi scrivermi tramite email oppure con un messaggio diretto su Instagram. Non devi raccontare tutto al primo contatto."
          eyebrow="Il modo più semplice"
          id="contact-options-title"
          title="Scegli il canale con cui ti senti più comodo."
        />
        <div className={styles.grid}>
          <SurfaceCard as="article" className={styles.card}>
            <h3 className={styles.cardTitle}>Email</h3>
            <p className={styles.cardText}>
              È il canale più comodo se vuoi raccontare con calma la situazione
              o fare una domanda articolata.
            </p>
            <address className={styles.address}>
              <a href={`mailto:${contactLinks.email}`}>
                {contactLinks.email}
              </a>
            </address>
            <ButtonLink href={contactLinks.emailHref} external>
              Apri la tua email
            </ButtonLink>
          </SurfaceCard>
          <SurfaceCard as="article" className={styles.card}>
            <h3 className={styles.cardTitle}>Instagram</h3>
            <p className={styles.cardText}>
              Puoi usarlo per un primo messaggio breve o per chiedere
              un’informazione.
            </p>
            <address className={styles.address}>
              <a href={contactLinks.instagramUrl}>
                @{contactLinks.instagramUsername}
              </a>
            </address>
            <ButtonLink href={contactLinks.instagramUrl} external>
              Vai al profilo
            </ButtonLink>
          </SurfaceCard>
        </div>
      </Container>
    </div>
  );
}
