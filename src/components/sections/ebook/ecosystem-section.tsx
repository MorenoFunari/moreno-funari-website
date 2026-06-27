import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { ebookEcosystemItems } from "@/config/ebook";
import { siteConfig } from "@/config/site";

import styles from "./ecosystem-section.module.css";

export function EcosystemSection() {
  return (
    <section className={styles.band} aria-labelledby="ecosystem-title">
      <Container className={styles.inner}>
        <SectionHeading
          eyebrow="Un ecosistema, possibilità diverse"
          id="ecosystem-title"
          title="Puoi leggere, riflettere o scegliere di confrontarti."
          description="L’eBook è una risorsa autonoma. Se senti il bisogno di un supporto diverso, puoi continuare attraverso una riflessione guidata o conoscere il coaching."
        />
        <div className={styles.grid}>
          {ebookEcosystemItems.map((item) => (
            <SurfaceCard
              as="article"
              className={styles.card}
              key={item.title}
              variant="default"
            >
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.description}</p>
              {item.note ? <p className={styles.note}>{item.note}</p> : null}
              <ButtonLink
                className={styles.cardLink}
                external={item.href === siteConfig.appUrl}
                href={item.href}
                variant="text"
              >
                {item.cta}
              </ButtonLink>
            </SurfaceCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
