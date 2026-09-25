import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";

import { ConfrontoLeadForm } from "./confronto-lead-form";
import styles from "./page.module.css";

const suitedForItems = [
  "ti senti sotto pressione rispetto a una situazione concreta",
  "continui a rimandare un passo che sai importante",
  "sei molto duro con te stesso",
  "fai fatica a distinguere cosa dipende da te e cosa no",
  "vuoi fare chiarezza senza ricevere frasi motivazionali o soluzioni pronte",
] as const;

const workItems = [
  "la situazione concreta che vuoi portare",
  "cosa ti blocca oggi",
  "automatismi, pensieri ricorrenti e pressione",
  "risorse e alternative realistiche",
  "un piccolo passo possibile tra un incontro e l’altro",
] as const;

const formatItems = [
  "6 incontri individuali online",
  "circa 60 minuti a incontro",
  "durata indicativa: 6 settimane",
  "percorso gratuito",
  "massimo 3 partecipanti",
] as const;

const takeawayItems = [
  "da dove sei partito",
  "cosa ti stava bloccando",
  "quali risorse sono emerse",
  "quali alternative hai visto",
  "qual è il prossimo passo possibile",
] as const;

const startSteps = [
  "Lascia i tuoi dati nel modulo.",
  "Ti farò alcune domande semplici.",
  "Se il percorso può essere adatto, ti invierò le informazioni da leggere con calma.",
  "Dopo la conferma, fisseremo un primo confronto conoscitivo online di 30 minuti.",
  "Se ha senso per entrambi, inizieremo il percorso pilota.",
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "Percorso Pilota — Un Passo Possibile",
  description:
    "Un percorso gratuito individuale per fare chiarezza su una situazione concreta, capire cosa ti blocca e individuare un prossimo passo possibile.",
  path: "/confronto",
});

export default function ConfrontoPage() {
  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero} aria-labelledby="confronto-title">
        <Container className={styles.heroInner}>
          <p className={styles.eyebrow}>Percorso pilota — Un passo possibile</p>
          <h1 id="confronto-title">
            Ti senti bloccato su una situazione concreta?
          </h1>
          <p className={styles.lead}>
            Un percorso gratuito individuale per fare chiarezza, capire cosa ti
            blocca e individuare un prossimo passo possibile.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAnchor} href="#lascia-dati">
              Lascia i tuoi dati
            </a>
          </div>
          <p className={styles.ctaCopy}>
            Lascia i tuoi dati, così posso capire se il percorso può essere
            adatto. Dopo l’invio potrai scrivermi direttamente su WhatsApp con
            la parola CONFRONTO.
          </p>
          <p className={styles.microcopy}>
            Massimo 3 posti disponibili per il percorso pilota.
          </p>
        </Container>
      </section>

      <Container as="section" className={styles.section}>
        <div className={styles.copyBlock}>
          <h2>Forse non è tutta la tua vita a essere bloccata</h2>
          <p>A volte non sei bloccato su tutta la vita.</p>
          <p>Magari c’è una scelta che rimandi.</p>
          <p>Una conversazione che eviti.</p>
          <p>
            Una situazione di lavoro, sport o vita quotidiana che continui a
            portarti dietro.
          </p>
          <p>E più passa il tempo, più sembra grande.</p>
        </div>
      </Container>

      <section className={styles.band}>
        <Container className={styles.twoColumns}>
          <div>
            <h2>Per chi è</h2>
            <p className={styles.sectionIntro}>
              Questo percorso può essere adatto se:
            </p>
          </div>
          <ul className={styles.cardList}>
            {suitedForItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      <Container as="section" className={styles.section}>
        <div className={styles.twoColumns}>
          <div>
            <h2>Cosa faremo insieme</h2>
            <p className={styles.sectionIntro}>
              Durante il percorso lavoriamo su:
            </p>
          </div>
          <ul className={styles.cardList}>
            {workItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Container>

      <section className={styles.bandSoft}>
        <Container className={styles.twoColumns}>
          <div>
            <h2>Come funziona</h2>
            <p className={styles.sectionIntro}>
              Il percorso pilota prevede:
            </p>
          </div>
          <ul className={styles.cardList}>
            {formatItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      <Container as="section" className={styles.section}>
        <div className={styles.copyBlock}>
          <h2>Cosa ti porti via</h2>
          <p>Alla fine non avrai una formula magica.</p>
          <p>
            Avrai però una traccia più chiara di ciò che stai vivendo:
          </p>
          <ul className={styles.cardList}>
            {takeawayItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Container>

      <section className={styles.band}>
        <Container className={styles.copyBlock}>
          <h2>Come iniziare</h2>
          <ol className={styles.stepList}>
            {startSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Container>
      </section>

      <Container as="section" id="lascia-dati" className={styles.finalSection}>
        <ConfrontoLeadForm page="/confronto" source="confronto_landing" />
      </Container>
    </main>
  );
}
