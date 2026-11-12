import type { Metadata } from "next";
import Image from "next/image";

import { ConfrontoLeadForm } from "@/components/forms/confronto-lead-form";
import { ButtonLink } from "@/components/ui/button-link";
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
              <strong>Possiamo partire da una situazione concreta.</strong> Me la
              racconti in poche righe e capiamo se ha senso approfondirla insieme.
            </p>
            <div className={styles.action}>
              <ButtonLink href="#richiesta-confronto" external size="large">
                Richiedi un CONFRONTO
              </ButtonLink>
            </div>
            <p className={styles.reassurance}>
              La richiesta non comporta obblighi o acquisti. Leggo personalmente ciò che mi scrivi.
            </p>
            <div className={styles.alternative}>
              <p>Preferisci un messaggio?</p>
              <TrackedWhatsAppButton
                href={whatsappHref}
                location="ads_confronto"
                page="/ads/confronto"
                variant="secondary"
              >
                Scrivi a Moreno su WhatsApp
              </TrackedWhatsAppButton>
            </div>
          </div>
        </section>

        <section className={styles.trust} aria-labelledby="confronto-person">
          <h2 id="confronto-person">Chi legge la tua richiesta</h2>
          <p>
            Sono Moreno, Mental Coach e sviluppatore senior. Anche nel mio lavoro
            mi confronto con responsabilità, pressione e scelte difficili.
            Leggo personalmente la tua richiesta e valuto se il coaching è il contesto adatto.
          </p>
          <a href="/chi-sono">Conosci Moreno e il suo approccio</a>
        </section>

        <section className={styles.process} aria-labelledby="confronto-process">
          <h2 id="confronto-process">Cosa succede dopo la richiesta</h2>
          <ol>
            <li><strong>Mi racconti una situazione concreta.</strong> Compili il modulo qui sotto oppure, se preferisci, mi scrivi su WhatsApp.</li>
            <li>Leggo personalmente la tua richiesta e ti ricontatto.</li>
            <li>Se ha senso approfondire, valutiamo un primo confronto conoscitivo online di 30 minuti, senza impegno.</li>
            <li>Solo successivamente, se lo riteniamo utile entrambi, possiamo parlare di un eventuale percorso.</li>
          </ol>
        </section>
        <section
          className={styles.request}
          id="richiesta-confronto"
          aria-label="Richiedi un CONFRONTO"
          tabIndex={-1}
        >
          <ConfrontoLeadForm
            source="ads_confronto_form"
            page="/ads/confronto"
            variant="embedded"
            title="Raccontami cosa stai vivendo"
            introText="Lascia un recapito e poche righe sulla situazione. Leggo personalmente ogni richiesta e ti ricontatto per capire se ha senso approfondire."
            ctaLabel="Invia la richiesta CONFRONTO"
            noteLabel="Quale situazione concreta vuoi guardare meglio?"
            noteRequired
            phoneRequired={false}
            reassuranceText="Inviare la richiesta non comporta obblighi o acquisti. Gli eventuali passi successivi li valutiamo insieme."
          />
          <div className={styles.alternative}>
            <p>Se preferisci, puoi scrivermi su WhatsApp.</p>
            <TrackedWhatsAppButton
              href={whatsappHref}
              location="ads_confronto"
              page="/ads/confronto"
              variant="secondary"
            >
              Scrivi a Moreno su WhatsApp
            </TrackedWhatsAppButton>
            <p className={styles.messageHint}>
              Il messaggio è già pronto: puoi modificarlo prima di inviarlo.
            </p>
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
