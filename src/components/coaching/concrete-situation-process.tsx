import { Container } from "@/components/ui/container";

import styles from "./concrete-situation-process.module.css";

const steps = [
  ["Mettiamo a fuoco la situazione", "Non tutta la tua vita. Una situazione concreta."],
  ["Separiamo fatti, pensieri e pressione", "Per capire cosa sta succedendo davvero e cosa, invece, stai portando addosso."],
  ["Guardiamo cosa dipende da te", "Non per controllare tutto, ma per ritrovare margine d’azione."],
  ["Scegliamo un primo passo possibile", "Piccolo, concreto, sostenibile."],
  ["Osserviamo cosa cambia", "Non per giudicarti, ma per imparare da quello che succede."],
] as const;

export function ConcreteSituationProcess() {
  return (
    <section className={styles.section} aria-labelledby="concrete-process-title">
      <Container>
        <div className={styles.intro}>
          <h2 id="concrete-process-title">Come lavoro su una situazione concreta</h2>
          <p>Non parto da frasi motivazionali o soluzioni preconfezionate. Parto da quello che sta succedendo davvero.</p>
          <p>Una situazione. Una scelta. Un blocco. Una pressione. Un errore. Un momento in cui senti che qualcosa non sta funzionando, ma non sai bene da dove iniziare.</p>
        </div>
        <ol className={styles.steps}>
          {steps.map(([title, text]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <p className={styles.closing}>Il lavoro non è diventare un’altra persona. È tornare a vederti con più chiarezza dentro una situazione reale.</p>
      </Container>
    </section>
  );
}
