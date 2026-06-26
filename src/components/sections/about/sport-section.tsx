import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

import styles from "./sport-section.module.css";

export function SportSection() {
  return (
    <section className={styles.band} aria-labelledby="sport-title">
      <Container className={styles.inner}>
        <SectionHeading
          eyebrow="Sport e presenza"
          id="sport-title"
          title="Lo sport mi ricorda che l’azione successiva conta più dell’errore appena fatto."
        />
        <div className={styles.copy}>
          <p>
            Nella pallavolo, come nella vita, l’errore può restare addosso e
            toglierti presenza. Ma la partita continua. Non si tratta di fingere
            che non sia successo: si tratta di riconoscerlo e tornare nell’azione
            successiva.
          </p>
          <p>
            Per me lo sport è un modo concreto per parlare di fiducia, pressione,
            rispetto e capacità di restare presenti quando le cose non vanno come
            vorremmo.
          </p>
        </div>
      </Container>
    </section>
  );
}
