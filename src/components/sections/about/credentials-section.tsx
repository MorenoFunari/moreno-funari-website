import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";

import styles from "./credentials-section.module.css";

export function CredentialsSection() {
  return (
    <Container
      as="section"
      aria-labelledby="credentials-title"
      className={styles.section}
    >
      <SectionHeading
        eyebrow="Formazione e responsabilità"
        id="credentials-title"
        title="Competenza e limiti chiari."
      />
      <div className={styles.grid}>
        <SurfaceCard as="article" className={styles.card} variant="outlined">
          <h3 className={styles.cardTitle}>Formazione</h3>
          <p className={styles.cardText}>
            La mia formazione come Mental Coach comprende un percorso e una
            certificazione CSEN. Continuo a studiare, fare esperienza e
            confrontarmi con strumenti che possano essere davvero utili nella
            vita reale.
          </p>
        </SurfaceCard>
        <SurfaceCard as="article" className={styles.card} variant="outlined">
          <h3 className={styles.cardTitle}>Confini</h3>
          <p className={styles.cardText}>
            Il coaching non è psicoterapia, non formula diagnosi e non
            sostituisce cure mediche o psicologiche. Quando una situazione
            richiede un supporto diverso, è importante rivolgersi al
            professionista più adatto.
          </p>
        </SurfaceCard>
      </div>
    </Container>
  );
}
