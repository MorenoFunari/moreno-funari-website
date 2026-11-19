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
            Vuoi capire se può fare per te?
          </h2>
          <p>
            CONFRONTO è un primo incontro conoscitivo gratuito di 30 minuti,
            online oppure in presenza, da concordare. Partiamo da una situazione
            reale per capire se un percorso di coaching personalizzato può fare
            per te, senza obbligo di proseguire.
          </p>
        </div>

        <div className={styles.actions}>
          <TrackedConfrontoLink
            location="home_pilot_spot"
            page="/"
            size="medium"
          >
            Richiedi il primo incontro
          </TrackedConfrontoLink>
          <TrackedWhatsAppButton
            href={pilotWhatsAppUrl}
            location="home_pilot_spot_whatsapp"
            page="/"
            size="medium"
            variant="text"
          >
            Preferisci un messaggio? Scrivimi CONFRONTO
          </TrackedWhatsAppButton>
        </div>
      </div>
    </Container>
  );
}
