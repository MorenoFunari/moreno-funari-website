import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { coachingSituations } from "@/config/coaching";

import styles from "./useful-when-section.module.css";

export function UsefulWhenSection() {
  return (
    <Container
      as="section"
      aria-labelledby="useful-when-title"
      className={styles.section}
    >
      <div className={styles.intro}>
        <SectionHeading
          eyebrow="Situazioni reali"
          id="useful-when-title"
          title="Quando senti che continuare da solo non sta facendo chiarezza."
          description="Il coaching può essere uno spazio utile quando senti di avere risorse, ma fai fatica a usarle con lucidità nel momento che stai vivendo."
        />
        <p className={styles.closing}>
          Non serve riconoscersi in tutto. Può bastare sentire che una di queste
          situazioni sta occupando più spazio del necessario.
        </p>
      </div>
      <ol className={styles.list}>
        {coachingSituations.map((situation, index) => (
          <li className={styles.item} key={situation}>
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            <p>{situation}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
}
