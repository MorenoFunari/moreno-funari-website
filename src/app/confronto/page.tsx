import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";

import { ConfrontoLeadForm } from "./confronto-lead-form";
import styles from "./page.module.css";

const situations = [
  "una situazione di lavoro che ti pesa",
  "un blocco prima di una scelta",
  "una pressione sportiva o personale",
  "un errore da cui fai fatica a ripartire",
  "un momento in cui non riesci a fare il primo passo",
] as const;

const nextSteps = [
  ["Mi racconti la situazione", "Compila il modulo o scrivi CONFRONTO: bastano poche righe su ciò che stai vivendo."],
  ["Leggo personalmente", "Leggo la richiesta e ti rispondo per capire se il coaching può essere il contesto adatto."],
  ["Concordiamo l’incontro", "Se ha senso, concordiamo un primo incontro conoscitivo gratuito di 30 minuti, online oppure in presenza."],
  ["Valutiamo il prossimo passo", "Comprendiamo meglio la situazione e valutiamo insieme un eventuale percorso di coaching personalizzato. Puoi scegliere di fermarti qui."],
] as const;

const boundaries = [
  "Non è terapia.",
  "Non c’è promessa di risultato.",
  "Inviare la richiesta non richiede alcun pagamento.",
  "Non hai alcun obbligo di proseguire.",
  "Puoi condividere solo ciò che ti senti.",
  "Evita dati sanitari o informazioni troppo sensibili.",
] as const;

const formatItems = [
  "Primo incontro conoscitivo gratuito",
  "30 minuti",
  "Online oppure in presenza, da concordare",
  "Senza obbligo di proseguire",
  "Comprendere la situazione e valutare un eventuale percorso personalizzato",
] as const;

const faqs = [
  ["CONFRONTO è gratuito?", "Sì. Il primo incontro conoscitivo è gratuito e dura 30 minuti."],
  ["Si svolge online o in presenza?", "Possiamo incontrarci online oppure in presenza. La modalità si concorda insieme."],
  ["Devo avere già tutto chiaro?", "No. Puoi partire da una situazione che stai vivendo, anche se fai fatica a definirla."],
  [
    "È terapia?",
    "No. È un percorso di coaching e non sostituisce un supporto psicologico, medico o clinico.",
  ],
  [
    "Devo iniziare per forza il percorso?",
    "No. La richiesta serve solo a capire se ha senso approfondire. Il percorso parte esclusivamente se entrambi decidiamo di proseguire.",
  ],
  [
    "Devo condividere dati sensibili?",
    "No. Puoi restare sulla situazione concreta ed evitare informazioni sanitarie, cliniche o personali non necessarie.",
  ],
  [
    "Quanto dura il percorso se decidiamo di partire?",
    "Durata, modalità, numero degli incontri e costi di un eventuale percorso personalizzato si concordano prima di iniziare.",
  ],
  [
    "Cosa succede se non è il percorso adatto?",
    "Te lo comunico con chiarezza. Se emerge un bisogno diverso dal coaching, il riferimento corretto resta un professionista qualificato in quell’ambito.",
  ],
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "CONFRONTO gratuito di 30 minuti",
  description:
    "Un primo incontro conoscitivo gratuito di 30 minuti con Moreno Funari, online oppure in presenza da concordare, senza obbligo di proseguire.",
  path: "/confronto",
});

export default function ConfrontoPage() {
  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero} aria-labelledby="confronto-title">
        <Container className={styles.heroInner}>
          <p className={styles.eyebrow}>CONFRONTO — Primo incontro conoscitivo gratuito</p>
          <h1 id="confronto-title">
            C’è una situazione concreta in cui ti senti bloccato o sotto
            pressione?
          </h1>
          <p className={styles.lead}>
            CONFRONTO è un primo incontro conoscitivo gratuito di 30 minuti, online oppure in presenza, da concordare, senza obbligo di proseguire. Serve a comprendere la situazione e valutare un eventuale percorso di coaching personalizzato.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAnchor} href="#lascia-dati">
              Raccontami la situazione
            </a>
            <a className={styles.secondaryAnchor} href="#cosa-succede-dopo">
              Cosa succede dopo
            </a>
          </div>
          <p className={styles.ctaCopy}>
            Non entri automaticamente in un percorso. Prima leggo la tua
            richiesta e capisco se ha senso fare un primo confronto.
          </p>
        </Container>
      </section>

      <Container
        as="section"
        aria-labelledby="cosa-raccontare-title"
        className={styles.compactSection}
      >
        <div className={styles.twoColumns}>
          <div>
            <h2 id="cosa-raccontare-title">Cosa puoi raccontare</h2>
            <p className={styles.sectionIntro}>
              Non serve avere già tutto chiaro. Puoi partire da un episodio o
              da un punto preciso.
            </p>
          </div>
          <ul className={styles.cardList}>
            {situations.map((situation) => (
              <li key={situation}>{situation}</li>
            ))}
          </ul>
        </div>
      </Container>

      <section
        className={styles.band}
        id="cosa-succede-dopo"
        aria-labelledby="next-steps-title"
      >
        <Container className={styles.copyBlock}>
          <h2 id="next-steps-title">Cosa succede dopo</h2>
          <p className={styles.sectionIntro}>
            Prima leggo personalmente la tua richiesta. Poi concordiamo insieme l’eventuale incontro.
          </p>
          <ol className={styles.stepList}>
            {nextSteps.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container
        as="section"
        aria-labelledby="confini-title"
        className={styles.compactSection}
      >
        <div className={styles.boundaryPanel}>
          <div>
            <h2 id="confini-title">Confini chiari, prima di scrivere</h2>
            <p>
              La richiesta serve a capire se il coaching è il contesto giusto,
              non a convincerti a iniziare.
            </p>
          </div>
          <ul className={styles.boundaryList}>
            {boundaries.map((boundary) => (
              <li key={boundary}>{boundary}</li>
            ))}
          </ul>
        </div>
      </Container>

      <Container as="section" id="lascia-dati" className={styles.formSection}>
        <ConfrontoLeadForm
          ctaLabel="Invia la richiesta"
          introText="Non serve scrivere tutto. Bastano poche righe per capire se ha senso fare un primo passaggio."
          noteLabel="Quale situazione concreta vuoi guardare meglio?"
          notePlaceholder="Puoi scrivere poche righe. Per esempio: cosa sta succedendo, dove ti senti bloccato, che cosa vorresti chiarire."
          noteRequired
          page="/confronto"
          phoneRequired={false}
          source="confronto_landing"
          title="Raccontami la situazione"
        />
      </Container>

      <section className={styles.bandSoft} aria-labelledby="format-title">
        <Container className={styles.twoColumns}>
          <div>
            <h2 id="format-title">Come si svolge CONFRONTO</h2>
            <p className={styles.sectionIntro}>
              Un primo incontro per conoscerci e capire se il coaching può essere adatto alla tua situazione.
            </p>
          </div>
          <ul className={styles.cardList}>
            {formatItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      <Container
        as="section"
        aria-labelledby="faq-title"
        className={styles.section}
      >
        <div className={styles.copyBlock}>
          <h2 id="faq-title">Domande frequenti</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </Container>

      <section className={styles.closing} aria-labelledby="closing-title">
        <Container className={styles.closingInner}>
          <h2 id="closing-title">
            Puoi iniziare anche solo raccontando la situazione.
          </h2>
          <p>
            Poi capiamo se ha senso fare un primo passo insieme, senza
            automatismi e senza pressione.
          </p>
          <a className={styles.primaryAnchor} href="#lascia-dati">
            Raccontami la situazione
          </a>
        </Container>
      </section>
    </main>
  );
}
