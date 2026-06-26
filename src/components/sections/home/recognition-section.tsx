import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { recognitionItems } from "@/config/home";

import styles from "./recognition-section.module.css";

export function RecognitionSection() {
  return (
    <Container
      as="section"
      aria-labelledby="recognition-title"
      className={styles.section}
    >
      <div className={styles.content}>
        <div className={styles.intro}>
          <SectionHeading
            eyebrow="Può capitare"
            id="recognition-title"
            title="Forse non ti manca la capacità."
            description="A volte continuiamo a chiedere di più a noi stessi, quando avremmo bisogno prima di capire cosa ci sta bloccando."
          />

          <p className={styles.closing}>
            Non esiste una risposta uguale per tutti. Ma puoi iniziare a capire cosa
            sta succedendo.
          </p>
        </div>

        <ol className={styles.list}>
          {recognitionItems.map((item, index) => (
            <li className={styles.item} key={item}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
}
