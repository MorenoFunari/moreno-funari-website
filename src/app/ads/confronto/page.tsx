import type { Metadata } from "next";

import { AdsConfrontoOpenAnalytics } from "@/components/analytics/ads-confronto-open-analytics";
import { TrackedWhatsAppButton } from "@/components/analytics/tracked-whatsapp-button";
import { createPageMetadata } from "@/lib/seo/metadata";

import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "CONFRONTO | Moreno Funari Mental Coach",
  description:
    "Racconta una situazione concreta e capisci se ha senso fare un primo confronto con Moreno Funari.",
  path: "/ads/confronto",
  noIndex: true,
  absoluteTitle: true,
});

export default function AdsConfrontoPage() {
  return (
    <main className={styles.landing} id="main-content">
      <AdsConfrontoOpenAnalytics />
      <div className={styles.content}>
        <p className={styles.identity}>Moreno Funari | Mental Coach</p>
        <h1>Bloccato su una scelta concreta?</h1>
        <p className={styles.subtitle}>
          Fermati, guarda meglio la situazione e trova un primo passo possibile.
        </p>

        <div className={styles.action}>
          <TrackedWhatsAppButton
            href="https://wa.me/393793408630?text=CONFRONTO"
            location="ads_confronto"
            page="/ads/confronto"
            size="large"
          >
            Scrivi CONFRONTO
          </TrackedWhatsAppButton>
        </div>

        <ul className={styles.points}>
          <li>Metti ordine tra pensieri, pressione e dubbi.</li>
          <li>Distingui cosa dipende da te e cosa no.</li>
          <li>Individui un passo piccolo, concreto, sostenibile.</li>
        </ul>

        <div className={styles.reassurance}>
          <p>Scrivi CONFRONTO e racconta in poche righe cosa stai vivendo.</p>
          <p>
            Leggerò personalmente la tua richiesta. Se ha senso proseguire, ti
            spiegherò con calma i passaggi successivi.
          </p>
          <p className={styles.boundary}>Non entri automaticamente in nulla.</p>
        </div>

        <p className={styles.note}>
          Nessun impegno, nessuna promessa forzata. I tuoi dati vengono usati solo
          per gestire la richiesta, nel rispetto della privacy.
        </p>
      </div>
    </main>
  );
}
