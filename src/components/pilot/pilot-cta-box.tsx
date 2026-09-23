import { TrackedWhatsAppButton } from "@/components/analytics/tracked-whatsapp-button";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { pilotWhatsAppUrl } from "@/config/pilot";

import styles from "./pilot-cta-box.module.css";

type PilotCtaBoxProps = {
  className?: string;
  source?: "section" | "inline";
};

export function PilotCtaBox({ className, source = "section" }: PilotCtaBoxProps) {
  const content = (
    <div className={styles.panel}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Percorso pilota</p>
        <h2 id="pilot-cta-title">Sto aprendo un percorso pilota gratuito</h2>
        <p>
          Uno spazio per lavorare su una situazione concreta di blocco, pressione
          o confusione.
        </p>
        <p>
          Il primo passo è un confronto conoscitivo di 30 minuti, senza
          automatismi e senza promesse forzate.
        </p>
      </div>
      <div className={styles.actions}>
        <TrackedWhatsAppButton
          href={pilotWhatsAppUrl}
          location="pilot_cta_box"
          size="large"
        >
          Scrivimi su WhatsApp
        </TrackedWhatsAppButton>
        <ButtonLink href="/percorso-pilota" size="large" variant="secondary">
          Scopri il percorso pilota
        </ButtonLink>
        <p className={styles.microcopy}>
          Ti risponderò personalmente. Nessun link automatico, nessuna promessa
          forzata.
        </p>
      </div>
    </div>
  );

  if (source === "inline") {
    return (
      <aside className={[styles.inline, className].filter(Boolean).join(" ")}>
        {content}
      </aside>
    );
  }

  return (
    <Container
      as="section"
      aria-labelledby="pilot-cta-title"
      className={[styles.section, className].filter(Boolean).join(" ")}
    >
      {content}
    </Container>
  );
}
