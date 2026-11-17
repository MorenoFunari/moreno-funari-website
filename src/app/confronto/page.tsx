import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";

import { ConfrontoLeadForm } from "./confronto-lead-form";
import styles from "./page.module.css";

const situations = [
  "Sei sotto pressione da settimane e non riesci a staccare.",
  "Rimandi una decisione e ogni giorno pesa un po' di più.",
  "Sai cosa dovresti fare, ma non riesci a partire.",
] as const;

const nextSteps = [
  "Compili il modulo qui sotto, oppure scrivi CONFRONTO su Instagram.",
  "Dopo il modulo ricevi un’email automatica con il link Calendly: scegli tu giorno e orario.",
  "Ci vediamo per 30 minuti: ti farò qualche domanda sulla tua situazione.",
  "Se ci sono le condizioni per lavorare insieme, ti propongo un percorso di coaching personalizzato. Se non ci sono, te lo dico.",
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "CONFRONTO, primo incontro conoscitivo gratuito | Moreno Funari Mental Coach",
  absoluteTitle: true,
  description:
    "30 minuti, online, per capire meglio la situazione che stai vivendo. Gratuito e senza obbligo di proseguire.",
  path: "/confronto",
});

export default function ConfrontoPage() {
  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero} aria-labelledby="confronto-title">
        <Container className={styles.heroInner}>
          <p className={styles.eyebrow}>CONFRONTO</p>
          <h1 id="confronto-title">CONFRONTO: un primo incontro per capire da dove partire</h1>
          <p className={styles.lead}>30 minuti, gratuito, online. Senza obbligo di proseguire.</p>
          <p className={styles.ctaCopy}>Dal modulo ricevi un’email automatica con il link per scegliere giorno e orario.</p>
          <div className={styles.actions}>
            <a className={styles.primaryAnchor} href="#lascia-dati">Richiedi il primo incontro</a>
            <a className={styles.secondaryAnchor} href="#cosa-succede-dopo">Come funziona</a>
          </div>
        </Container>
      </section>

      <Container as="section" aria-labelledby="cosa-raccontare-title" className={styles.compactSection}>
        <div className={styles.twoColumns}>
          <h2 id="cosa-raccontare-title">Quando può servirti</h2>
          <ul className={styles.cardList}>
            {situations.map((situation) => <li key={situation}>{situation}</li>)}
          </ul>
        </div>
      </Container>

      <section className={styles.band} id="cosa-succede-dopo" aria-labelledby="next-steps-title">
        <Container className={styles.copyBlock}>
          <h2 id="next-steps-title">Come funziona</h2>
          <ol className={styles.stepList}>
            {nextSteps.map((text) => <li key={text}><span>{text}</span></li>)}
          </ol>
          <p>L’eventuale percorso di coaching successivo è personalizzato e a pagamento.</p>
        </Container>
      </section>

      <Container as="section" aria-labelledby="confini-title" className={styles.compactSection}>
        <div className={styles.twoColumns}>
          <div className={styles.copyBlock}>
            <h2 id="confini-title">Cosa non è</h2>
            <p>Non è una sessione di coaching. Non è terapia e non è una diagnosi. Non ti prometto di risolvere tutto in un incontro.</p>
          </div>
          <div className={styles.copyBlock}>
            <h2>Quando non è la strada giusta</h2>
            <p>Se cerchi una diagnosi o una terapia, o stai attraversando una sofferenza importante, la persona giusta è uno psicologo, uno psicoterapeuta o un medico.</p>
          </div>
        </div>
      </Container>

      <Container as="section" id="lascia-dati" className={styles.formSection}>
        <ConfrontoLeadForm
          ctaLabel="Richiedi il primo incontro"
          introText="Non serve inserire informazioni sulla salute."
          noteLabel="Descrivi in poche righe la situazione che vuoi portare"
          noteHelpText="Non serve inserire informazioni sulla salute."
          notePlaceholder="Puoi scrivere poche righe sulla situazione che vuoi portare."
          noteRequired
          page="/confronto"
          phoneRequired={false}
          source="confronto_landing"
          title="Richiedi il primo incontro"
          variant="embedded"
        />
      </Container>
    </main>
  );
}
