import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

import styles from "./contact-boundaries-section.module.css";

export function ContactBoundariesSection() {
  return (
    <Container
      as="section"
      aria-labelledby="contact-boundaries-title"
      className={styles.section}
    >
      <div className={styles.panel}>
        <Eyebrow>Con chiarezza</Eyebrow>
        <h2 className={styles.title} id="contact-boundaries-title">
          Il contatto non sostituisce un supporto professionale urgente.
        </h2>
        <div className={styles.copy}>
          <p>
            I canali presenti in questa pagina sono dedicati a informazioni sul
            coaching e a un primo confronto conoscitivo.
          </p>
          <p>
            Il coaching non è psicoterapia, non formula diagnosi e non
            sostituisce cure mediche, psicologiche o psichiatriche.
          </p>
          <p>
            Per situazioni urgenti o che richiedono assistenza clinica è
            importante rivolgersi ai servizi e ai professionisti competenti del
            proprio territorio.
          </p>
        </div>
      </div>
    </Container>
  );
}
