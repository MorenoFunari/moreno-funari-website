import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { coachingExpectations } from "@/config/coaching";

import styles from "./expectations-section.module.css";

export function ExpectationsSection() {
  return (
    <Container
      as="section"
      aria-labelledby="expectations-title"
      className={styles.section}
      size="wide"
    >
      <SectionHeading
        eyebrow="Durante il percorso"
        id="expectations-title"
        title="Uno spazio concreto, costruito sulla persona."
        description="Ogni percorso è diverso, ma ci sono alcuni elementi che guidano il modo in cui lavoro."
      />
      <div className={styles.grid}>
        {coachingExpectations.map((item) => (
          <article className={styles.item} key={item.title}>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </Container>
  );
}
