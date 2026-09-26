import type { Metadata } from "next";

import { ConcreteSituationProcess } from "@/components/coaching/concrete-situation-process";
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
  ["Leggo la richiesta", "Cerco di capire se riguarda una situazione concreta di blocco, pressione o scelta."],
  ["Ti rispondo con alcune informazioni", "Se il percorso può essere adatto, ti invio il materiale da leggere con calma: Accordo Pilot e Privacy Pack."],
  ["Firmi i documenti prima di prenotare", "Il link per fissare il primo confronto viene inviato solo dopo la lettura e la firma dei documenti."],
  ["Facciamo un primo confronto online di 30 minuti", "Serve a conoscerci, chiarire il contesto e capire se ha senso partire."],
  ["Il percorso parte solo se ha senso per entrambi", "Non c’è obbligo, non c’è vendita forzata e non c’è promessa di risultato."],
] as const;

const faqs = [
  ["Se lascio i dati, sto già entrando nel percorso?", "No. Lasciare i dati serve solo a farmi leggere la situazione che vuoi portare. Il percorso parte solo dopo una valutazione, la lettura e firma dei documenti e un primo confronto conoscitivo online."],
  ["Perché devo firmare dei documenti se il Pilot è gratuito?", "Perché anche un percorso gratuito deve avere confini chiari. I documenti servono a spiegare bene cosa prevede il Pilot, cosa non prevede, come vengono trattati i dati e quali sono le responsabilità di entrambi."],
  ["Il primo confronto da 30 minuti è una sessione di coaching?", "No. È un confronto conoscitivo. Serve a capire meglio la situazione, verificare se il percorso è adatto e decidere se ha senso partire."],
  ["Devo raccontare cose molto personali?", "No. Puoi restare sulla situazione concreta che vuoi guardare. Il percorso non è terapia e non richiede di entrare in aspetti clinici o personali che non vuoi condividere."],
  ["E se durante il percorso emerge qualcosa che non riguarda il coaching?", "In quel caso ci fermiamo e valutiamo il confine corretto. Se emerge un bisogno psicologico, medico o clinico, il riferimento giusto è un professionista qualificato in quell’ambito."],
  ["Alla fine devo lasciare una testimonianza?", "No. Qualsiasi feedback o testimonianza è separato, facoltativo e richiesto solo alla fine, mai durante il percorso."],
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
              Raccontami la situazione
            </a>
            <a className={styles.secondaryAnchor} href="#cosa-succede-dopo">
              Leggi cosa succede dopo
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
          <h2 id="cosa-succede-dopo">Cosa succede dopo che lasci i dati</h2>
          <p>Dopo che hai lasciato i tuoi dati, non parte automaticamente nessun percorso e non ricevi subito un calendario da prenotare.</p>
          <p>Prima leggo personalmente quello che hai scritto, per capire se la situazione che porti è adatta al percorso pilota.</p>
          <ol className={styles.stepList}>
            {startSteps.map(([title, text]) => (
              <li key={title}><strong>{title}</strong><span>{text}</span></li>
            ))}
          </ol>
          <p className={styles.processNote}>Questo passaggio serve a proteggere entrambi: te, perché sai cosa aspettarti; me, perché posso lavorare solo dove il coaching è davvero il contesto giusto.</p>
        </Container>
      </section>

      <ConcreteSituationProcess />

      <Container as="section" className={styles.section}>
        <div className={styles.copyBlock}><h2>Domande frequenti</h2></div>
        <div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </Container>

      <Container as="section" id="lascia-dati" className={styles.finalSection}>
        <ConfrontoLeadForm ctaLabel="Raccontami la situazione" introText="Lascia i dati solo se hai una situazione concreta che vuoi guardare meglio. Non serve scrivere tutto: basta spiegare in poche righe cosa sta succedendo e perché senti il bisogno di fare chiarezza." noteLabel="Quale situazione concreta vuoi guardare meglio?" page="/confronto" source="confronto_landing" />
      </Container>
    </main>
  );
}
