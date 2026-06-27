import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ebookSituations } from "@/config/ebook";

import styles from "./useful-when-section.module.css";

export function UsefulWhenSection() {
  return (
    <Container
      as="section"
      aria-labelledby="ebook-useful-title"
      className={styles.section}
    >
      <div className={styles.intro}>
        <SectionHeading
          eyebrow="Momenti reali"
          id="ebook-useful-title"
          title="Quando senti che stai chiedendo troppo a te stesso."
          description="Questa guida può essere utile quando continui a pensare alla stessa situazione, ma non riesci a trovare un punto concreto da cui ripartire."
        />
      </div>
      <ol className={styles.list}>
        {ebookSituations.map((situation, index) => (
          <li className={styles.item} key={situation}>
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            <p>{situation}</p>
          </li>
        ))}
      </ol>
      <p className={styles.closing}>
        Non devi riconoscerti in ogni punto. Può bastare sentire che una di
        queste situazioni sta occupando troppo spazio.
      </p>
    </Container>
  );
}
