import { TrackedConfrontoLink } from "@/components/analytics/tracked-confronto-link";
import { Container } from "@/components/ui/container";

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
            Un primo incontro conoscitivo gratuito di 30 minuti, online.
          </h2>
          <p>
            Per capire meglio la situazione che stai vivendo e se ha senso lavorare insieme.
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
          <TrackedConfrontoLink
            location="home_pilot_spot_whatsapp"
            page="/"
            size="medium"
          >
            Scrivimi CONFRONTO
          </TrackedConfrontoLink>
        </div>
      </div>
    </Container>
  );
}
