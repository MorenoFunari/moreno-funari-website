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

const whatsappHref = `https://wa.me/393793408630?text=${encodeURIComponent(
  "Ciao Moreno, vorrei un CONFRONTO su una situazione che sto vivendo.",
)}`;

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
          <div className={styles.identity}>
            <Image
              src="/images/brand/logo-mf-icon.png"
              alt=""
              width={44}
              height={44}
              className={styles.brandMark}
            />
            <p>Moreno Funari <span>| Mental Coach</span></p>
          </div>
          <div className={styles.introduction}>
            <h1 id="confronto-title">Una scelta da fare, troppi pensieri per decidere?</h1>
            <p className={styles.subtitle}>
              Al lavoro senti che tutto dipende da te. Rimandi una decisione,
              poi ti chiedi se sei all’altezza.
            </p>
            <p className={styles.contactHint}>
              <strong>CONFRONTO inizia con un messaggio.</strong> Mi racconti
              una situazione concreta e capiamo se ha senso approfondirla insieme.
            </p>
            <div className={styles.action}>
              <TrackedWhatsAppButton
                href={whatsappHref}
                location="ads_confronto"
                page="/ads/confronto"
                size="large"
              >
                Scrivi a Moreno su WhatsApp
              </TrackedWhatsAppButton>
            </div>
            <p className={styles.messageHint}>
              Si apre WhatsApp con un messaggio già pronto. Puoi modificarlo prima di inviarlo.
            </p>
            <p className={styles.reassurance}>
              Scrivere non comporta iscrizioni automatiche, obblighi o acquisti.
            </p>
          </div>
        </section>

        <section className={styles.trust} aria-labelledby="confronto-person">
          <h2 id="confronto-person">Chi legge il tuo messaggio</h2>
          <p>
            Sono Moreno, Mental Coach e sviluppatore senior. Anche nel mio lavoro
            mi confronto con responsabilità, pressione e scelte difficili.
            Leggo personalmente il tuo messaggio e valuto se il coaching è il contesto adatto.
          </p>
          <a href="/chi-sono">Conosci Moreno e il suo approccio</a>
        </section>

        <section className={styles.process} aria-labelledby="confronto-process">
          <h2 id="confronto-process">Cosa succede se mi scrivi</h2>
          <ol>
            <li><strong>Inizia anche solo con un saluto.</strong> Il messaggio è già pronto. Se vuoi, aggiungi poche righe su quello che stai vivendo.</li>
            <li>Leggo personalmente il tuo messaggio.</li>
            <li>Se ha senso approfondire, valutiamo un primo confronto conoscitivo online di 30 minuti, senza impegno.</li>
            <li>Solo successivamente, se lo riteniamo utile entrambi, possiamo parlare di un eventuale percorso.</li>
          </ol>
        </section>
        <section className={styles.closing} aria-labelledby="confronto-closing">
          <h2 id="confronto-closing">Non devi avere già tutto chiaro per scrivere.</h2>
          <p>Puoi partire da una sola situazione, senza raccontare tutto.</p>
          <div className={styles.action}>
            <TrackedWhatsAppButton
              href={whatsappHref}
              location="ads_confronto"
              page="/ads/confronto"
              size="large"
            >
              Scrivi a Moreno su WhatsApp
            </TrackedWhatsAppButton>
          </div>
          <p className={styles.reassurance}>
            Sei tu a decidere se e come proseguire. Il coaching non è terapia.
          </p>
        </section>
        <p className={styles.note}>
          I tuoi dati vengono usati per gestire la richiesta, nel rispetto della{" "}
          <a href="/privacy-policy">Privacy Policy</a>. Evita dati sanitari o informazioni sensibili.
        </p>
      </div>
    </main>
  );
}
