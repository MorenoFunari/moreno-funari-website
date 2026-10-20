import type { Metadata } from "next";
import Image from "next/image";

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
        <section className={styles.hero} aria-labelledby="confronto-title">
          <div className={styles.portrait}>
            <Image
              src="/images/moreno/moreno-hero-outdoor.webp"
              alt="Moreno Funari"
              fill
              preload
              sizes="(min-width: 800px) 360px, 88px"
            />
          </div>
          <p className={styles.identity}>Moreno Funari <span>| Mental Coach</span></p>
          <div className={styles.introduction}>
            <h1 id="confronto-title">La giornata finisce, ma i pensieri restano lì?</h1>
            <p className={styles.subtitle}>
              Una decisione che rimandi. La pressione al lavoro. Il pensiero di
              non essere all’altezza.
            </p>
            <p className={styles.approach}>
              Sono Moreno. Ti ascolto e ti aiuto a mettere ordine, partendo da
              una situazione che stai vivendo.
            </p>
            <p className={styles.contactHint}>
              Se ha senso approfondire: 30 minuti online, gratuiti e senza impegno.
            </p>
            <div className={styles.action}>
              <TrackedWhatsAppButton
                href="https://wa.me/393793408630?text=CONFRONTO"
                location="ads_confronto"
                page="/ads/confronto"
                size="large"
              >
                Scrivi CONFRONTO su WhatsApp
              </TrackedWhatsAppButton>
            </div>
            <p className={styles.reassurance}>
              Scrivere non comporta iscrizioni automatiche, obblighi o acquisti.
            </p>
          </div>
        </section>

        <section className={styles.process} aria-labelledby="confronto-process">
          <h2 id="confronto-process">Cosa succede se mi scrivi</h2>
          <ol>
            <li>Scrivi CONFRONTO su WhatsApp e raccontami la situazione in poche righe.</li>
            <li>Leggo e valuto personalmente la tua richiesta.</li>
            <li>Se ha senso approfondire, ti propongo un confronto conoscitivo online gratuito di 30 minuti.</li>
            <li>Gli eventuali passi successivi li valutiamo insieme.</li>
          </ol>
        </section>
        <p className={styles.note}>
          Non entri automaticamente nel Pilot gratuito. I tuoi dati vengono usati
          per gestire la richiesta, nel rispetto della privacy.
        </p>
      </div>
    </main>
  );
}
