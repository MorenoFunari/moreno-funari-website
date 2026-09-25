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
          <p className={styles.eyebrow}>PERCORSO PILOTA GRATUITO</p>
          <h2 id="home-pilot-spot-title">
            Hai una situazione concreta che senti bloccata?
          </h2>
          <p>
            Sto aprendo massimo 3 posti per un percorso pilota gratuito. Si
            parte da una situazione reale: una scelta rimandata, una pressione
            che torna, un blocco che fai fatica a sciogliere.
          </p>
        </div>

        <div className={styles.actions}>
          <TrackedConfrontoLink
            location="home_pilot_spot"
            page="/"
            size="medium"
          >
            Scopri il percorso
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
