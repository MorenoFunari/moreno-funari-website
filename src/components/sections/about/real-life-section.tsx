import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { realLifeLearnings } from "@/config/about";

import styles from "./real-life-section.module.css";

export function RealLifeSection() {
  return (
    <Container
      as="section"
      aria-labelledby="real-life-title"
      className={styles.section}
    >
      <div className={styles.narrative}>
        <SectionHeading
          eyebrow="La vita reale"
          id="real-life-title"
          title="Il lavoro mi ha insegnato che non tutto si risolve insistendo."
        />
        <div className={styles.copy}>
          <p>
            Da sviluppatore senior lavoro ogni giorno con problemi complessi,
            responsabilità, imprevisti e decisioni. Per molto tempo ho pensato
            che la risposta fosse sempre fare di più, controllare di più e
            resistere di più.
          </p>
          <p>
            Con il tempo ho imparato che a volte serve fermarsi, cambiare
            prospettiva, chiedere un confronto o riconoscere che non tutto
            dipende da noi.
          </p>
        </div>
      </div>
      <ol className={styles.list}>
        {realLifeLearnings.map((learning, index) => (
          <li className={styles.item} key={learning}>
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            <p>{learning}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
}
