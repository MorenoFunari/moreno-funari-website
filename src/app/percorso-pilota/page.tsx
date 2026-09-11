import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";

import styles from "./page.module.css";

const applicationFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSchlLWKGvBbKi8eijGsN5usaQZaAPprz7VV-iQ44vJfksXAEw/viewform?embedded=true";

export const metadata: Metadata = createPageMetadata({
  title: "Candidatura al percorso pilota",
  description:
    "Candidati al percorso pilota gratuito di mental coaching con Moreno Funari.",
  path: "/percorso-pilota",
  noIndex: true,
});

export default function PilotApplicationPage() {
  return (
    <main className={styles.page} id="main-content">
      <Container>
        <section className={styles.intro}>
          <p className={styles.eyebrow}>Percorso pilota</p>
          <h1>Candidatura al percorso pilota</h1>
          <p>
            Tre incontri individuali online, distribuiti nell’arco di 3–4
            settimane, per lavorare su una situazione concreta in cui ti senti
            bloccato o sotto pressione.
          </p>
          <p className={styles.note}>
            La partecipazione è gratuita e saranno selezionate al massimo tre
            persone. La compilazione non garantisce automaticamente l’accesso:
            leggerò personalmente ogni candidatura.
          </p>
        </section>

        <section aria-label="Modulo di candidatura" className={styles.formSection}>
          <iframe
            className={styles.form}
            loading="lazy"
            src={applicationFormUrl}
            title="Candidatura al percorso pilota — Moreno Funari"
          >
            Caricamento del modulo di candidatura…
          </iframe>
        </section>
      </Container>
    </main>
  );
}
