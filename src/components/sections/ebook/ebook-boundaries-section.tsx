import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

import styles from "./ebook-boundaries-section.module.css";

export function EbookBoundariesSection() {
  return (
    <Container
      as="section"
      aria-labelledby="ebook-boundaries-title"
      className={styles.section}
    >
      <div className={styles.panel}>
        <div className={styles.intro}>
          <Eyebrow>Con chiarezza</Eyebrow>
          <h2 className={styles.title} id="ebook-boundaries-title">
            Una guida di riflessione, non una soluzione universale.
          </h2>
        </div>
        <div className={styles.copy}>
          <p>
            Questo eBook non promette di eliminare dubbi, paura o difficoltà.
            Offre domande, esempi ed esercizi per aiutarti a osservare una
            situazione con maggiore consapevolezza.
          </p>
          <p>
            Non è psicoterapia, non formula diagnosi e non sostituisce cure
            mediche o psicologiche.
          </p>
          <p>
            Quando una situazione riguarda sofferenza psicologica, salute mentale
            o condizioni che richiedono un supporto clinico, è importante
            rivolgersi al professionista più adatto.
          </p>
        </div>
      </div>
    </Container>
  );
}
