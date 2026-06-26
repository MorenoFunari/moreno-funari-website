import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { coachingCanOffer, coachingDoesNotOffer } from "@/config/coaching";

import styles from "./coaching-definition-section.module.css";

export function CoachingDefinitionSection() {
  return (
    <section className={styles.band} aria-labelledby="definition-title">
      <Container className={styles.inner}>
        <SectionHeading
          eyebrow="Fare chiarezza"
          id="definition-title"
          title="Non è qualcuno che decide al posto tuo."
        />
        <div className={styles.copy}>
          <p>
            Il coaching è uno spazio di ascolto, domande e confronto. Serve a
            osservare con maggiore chiarezza una situazione, riconoscere ostacoli
            e risorse e trasformare le riflessioni in azioni sostenibili.
          </p>
          <p>
            La persona resta responsabile delle proprie decisioni. Il coach non
            impone una direzione, ma accompagna il processo con attenzione,
            metodo e concretezza.
          </p>
        </div>
        <div className={styles.blocks}>
          <SurfaceCard as="article" className={styles.block} variant="default">
            <h3 className={styles.blockTitle}>Nel coaching puoi trovare</h3>
            <ul className={styles.list}>
              {coachingCanOffer.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </SurfaceCard>
          <SurfaceCard as="article" className={styles.block} variant="default">
            <h3 className={styles.blockTitle}>Il coaching non offre</h3>
            <ul className={styles.list}>
              {coachingDoesNotOffer.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </SurfaceCard>
        </div>
      </Container>
    </section>
  );
}
