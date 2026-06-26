import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { approachSteps } from "@/config/home";

import styles from "./approach-section.module.css";

export function ApproachSection() {
  return (
    <section className={styles.band} aria-labelledby="approach-title">
      <Container className={styles.inner}>
        <div className={styles.intro}>
          <SectionHeading
            eyebrow="Il mio approccio"
            id="approach-title"
            title="Non si tratta di dirti cosa fare."
            description="Il coaching non offre una formula pronta. Crea uno spazio in cui puoi fermarti, ascoltarti e scegliere con maggiore consapevolezza."
          />

          <ButtonLink href="/coaching" variant="secondary">
            Scopri come lavoro
          </ButtonLink>
        </div>

        <ol className={styles.steps}>
          {approachSteps.map((step, index) => (
            <li className={styles.step} key={step}>
              <span className={styles.number}>{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
