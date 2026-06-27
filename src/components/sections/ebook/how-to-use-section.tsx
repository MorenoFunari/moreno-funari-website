import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ebookUseModes } from "@/config/ebook";

import styles from "./how-to-use-section.module.css";

export function HowToUseSection() {
  return (
    <section className={styles.band} aria-labelledby="how-to-use-title">
      <Container className={styles.inner} size="wide">
        <SectionHeading
          eyebrow="Con i tuoi tempi"
          id="how-to-use-title"
          title="Non devi leggerlo tutto in una volta."
          description="Puoi usarlo come una guida lineare oppure tornare soltanto alle parti che senti più vicine al momento che stai vivendo."
        />
        <div className={styles.grid}>
          {ebookUseModes.map((mode) => (
            <article className={styles.item} key={mode.title}>
              <h3 className={styles.itemTitle}>{mode.title}</h3>
              <p>{mode.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
