import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

import styles from "./boundaries-section.module.css";

export function BoundariesSection() {
  return (
    <Container
      as="section"
      aria-labelledby="boundaries-title"
      className={styles.section}
    >
      <div className={styles.panel}>
        <div className={styles.intro}>
          <Eyebrow>Con chiarezza</Eyebrow>
          <h2 className={styles.title} id="boundaries-title">
            Il coaching ha confini precisi.
          </h2>
        </div>
        <div className={styles.copy}>
          <p>
            Il coaching non è psicoterapia, non formula diagnosi e non
            sostituisce cure mediche, psicologiche o psichiatriche.
          </p>
          <p>
            Quando una situazione riguarda sofferenza psicologica, salute
            mentale, trauma o condizioni che richiedono un supporto clinico, è
            importante rivolgersi al professionista più adatto.
          </p>
          <p>
            Riconoscere questi confini non limita il valore del coaching.
            Significa lavorare con responsabilità e rispetto per la persona.
          </p>
        </div>
      </div>
    </Container>
  );
}
