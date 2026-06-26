import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

import styles from "./coaching-choice-section.module.css";

export function CoachingChoiceSection() {
  return (
    <Container
      as="section"
      aria-labelledby="coaching-choice-title"
      className={styles.section}
    >
      <SectionHeading
        eyebrow="La scelta"
        id="coaching-choice-title"
        title="Ho scelto il coaching perché cercavo concretezza, non frasi motivazionali."
      />
      <div className={styles.copy}>
        <p>
          Mi interessa accompagnare chi si sente bloccato, sotto pressione o
          troppo duro con sé stesso. Non per offrire risposte già pronte, ma per
          creare uno spazio in cui una persona possa ascoltarsi e vedere con
          maggiore chiarezza ciò che sta vivendo.
        </p>
        <p>
          Il coaching mi ha dato un modo per unire ascolto, domande,
          responsabilità e azione. È qui che la mia esperienza nel lavoro, nello
          sport e nella vita quotidiana incontra la formazione da Mental Coach.
        </p>
      </div>
    </Container>
  );
}
