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
              Magari c&apos;è una decisione che continui a rimandare. Oppure al lavoro
              senti che tutto dipende da te. O ti ritrovi a dubitare delle tue capacità.
            </p>
            <p className={styles.approach}>
              Non serve affrontare tutto insieme.
            </p>
            <p className={styles.contactHint}>
              Possiamo partire da quello che stai vivendo, parlarne e provare a fare
              un po&apos; di chiarezza.
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
            <li>Mi scrivi su WhatsApp e mi racconti brevemente cosa stai vivendo.</li>
            <li>Leggo personalmente il tuo messaggio.</li>
            <li>Se ha senso approfondire, valutiamo un primo confronto conoscitivo online di 30 minuti, senza impegno.</li>
            <li>Solo successivamente, se lo riteniamo utile entrambi, possiamo parlare di un eventuale percorso.</li>
          </ol>
        </section>
        <p className={styles.note}>
          I tuoi dati vengono usati per gestire la richiesta, nel rispetto della privacy.
        </p>
      </div>
    </main>
  );
}
