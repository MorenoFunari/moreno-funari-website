import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { transparencyItems } from "@/config/about";

import styles from "./transparency-section.module.css";

export function TransparencySection() {
  return (
    <Container
      as="section"
      aria-labelledby="transparency-title"
      className={styles.section}
    >
      <div className={styles.panel}>
        <div className={styles.intro}>
          <Eyebrow>Con trasparenza</Eyebrow>
          <h2 className={styles.title} id="transparency-title">
            Cosa non prometto.
          </h2>
          <p className={styles.text}>
            Non prometto di eliminare paura, dubbi o difficoltà. Non sarebbe
            realistico e non sarebbe rispettoso della persona.
          </p>
        </div>
        <ul className={styles.list}>
          {transparencyItems.map((item) => (
            <li className={styles.item} key={item}>
              {item}
            </li>
          ))}
        </ul>
        <p className={styles.closing}>
          Posso offrire ascolto, domande, strumenti e uno spazio concreto in cui
          lavorare su ciò che dipende da te.
        </p>
      </div>
    </Container>
  );
}
