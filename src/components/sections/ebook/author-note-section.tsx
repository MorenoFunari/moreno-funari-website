import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

import styles from "./author-note-section.module.css";

export function AuthorNoteSection() {
  return (
    <Container
      as="section"
      aria-labelledby="author-note-title"
      className={styles.section}
    >
      <SectionHeading
        eyebrow="Perché l’ho scritto"
        id="author-note-title"
        title="Per offrire uno spazio semplice da cui iniziare."
      />
      <div className={styles.content}>
        <div className={styles.copy}>
          <p>
            Molte persone sanno già di avere capacità e risorse, ma nei momenti
            di pressione fanno fatica a riconoscerle o a usarle.
          </p>
          <p>
            Ho voluto creare una guida che non parlasse dall’alto e non
            aggiungesse altra pressione. Un contenuto da leggere con calma,
            capace di riportare l’attenzione su ciò che puoi osservare e fare
            nel presente.
          </p>
          <p>
            L’eBook nasce dallo stesso approccio che porto nel coaching: ascolto,
            domande, responsabilità e piccoli passi concreti.
          </p>
        </div>
        <ButtonLink className={styles.cta} href="/chi-sono" variant="secondary">
          Conosci meglio Moreno
        </ButtonLink>
      </div>
    </Container>
  );
}
