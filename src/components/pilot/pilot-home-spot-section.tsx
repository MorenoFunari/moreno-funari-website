import { TrackedConfrontoLink } from "@/components/analytics/tracked-confronto-link";
import { TrackedWhatsAppButton } from "@/components/analytics/tracked-whatsapp-button";
import { Container } from "@/components/ui/container";
import { pilotWhatsAppUrl } from "@/config/pilot";

import styles from "./pilot-home-spot-section.module.css";

export function PilotHomeSpotSection() {
  return (
    <Container
      as="section"
      aria-labelledby="home-pilot-spot-title"
      className={styles.section}
    >
      <div className={styles.callout}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>CONFRONTO</p>
          <h2 id="home-pilot-spot-title">
            Hai una situazione concreta che senti bloccata?
          </h2>
          <p>
            CONFRONTO è un primo incontro conoscitivo gratuito di 30 minuti, online oppure in presenza, da concordare, senza obbligo di proseguire. Serve a comprendere la situazione e valutare un eventuale percorso di coaching personalizzato.
          </p>
        </div>

        <div className={styles.actions}>
          <TrackedConfrontoLink
            location="home_pilot_spot"
            page="/"
            size="medium"
          >
            Scopri CONFRONTO
          </TrackedConfrontoLink>
          <TrackedWhatsAppButton
            href={pilotWhatsAppUrl}
            location="home_pilot_spot_whatsapp"
            page="/"
            size="medium"
          >
            Scrivimi CONFRONTO
          </TrackedWhatsAppButton>
        </div>
      </div>
    </Container>
  );
}
