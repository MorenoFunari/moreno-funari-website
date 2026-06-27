import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { ebookContents } from "@/config/ebook";

import styles from "./inside-ebook-section.module.css";

export function InsideEbookSection() {
  return (
    <section
      className={styles.band}
      id="cosa-troverai"
      aria-labelledby="inside-ebook-title"
    >
      <Container className={styles.inner} size="wide">
        <SectionHeading
          eyebrow="Dentro la guida"
          id="inside-ebook-title"
          title="Riflessioni ed esercizi per trasformare la confusione in un primo passo."
          description="L’eBook non ti dice quale scelta fare. Ti accompagna a osservare ciò che stai vivendo con più calma e concretezza."
        />
        <div className={styles.grid}>
          {ebookContents.map((item, index) => (
            <SurfaceCard
              as="article"
              className={styles.card}
              key={item.title}
              variant="default"
            >
              <span className={styles.number}>{index + 1}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.description}</p>
            </SurfaceCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
