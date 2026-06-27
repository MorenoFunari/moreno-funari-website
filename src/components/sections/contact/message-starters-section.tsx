import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { messageStarters } from "@/config/contact";

import styles from "./message-starters-section.module.css";

export function MessageStartersSection() {
  return (
    <Container
      as="section"
      aria-labelledby="message-starters-title"
      className={styles.section}
    >
      <SectionHeading
        className={styles.intro}
        description="Questi spunti non sono un questionario. Servono soltanto se possono aiutarti a rompere il ghiaccio."
        eyebrow="Non servono parole perfette"
        id="message-starters-title"
        title="Puoi iniziare anche da una sola frase."
      />
      <ol className={styles.list}>
        {messageStarters.map((starter, index) => (
          <li className={styles.item} key={starter}>
            <span className={styles.number} aria-hidden="true">
              {(index + 1).toString().padStart(2, "0")}
            </span>
            <p>{starter}</p>
          </li>
        ))}
      </ol>
      <p className={styles.closing}>
        Puoi rispondere a uno solo di questi punti oppure scrivere semplicemente
        ciò che senti importante.
      </p>
    </Container>
  );
}
