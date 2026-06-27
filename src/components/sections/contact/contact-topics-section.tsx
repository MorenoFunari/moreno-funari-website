import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { contactTopics } from "@/config/contact";

import styles from "./contact-topics-section.module.css";

export function ContactTopicsSection() {
  return (
    <div className={styles.band}>
      <Container
        as="section"
        aria-labelledby="contact-topics-title"
        className={styles.section}
      >
        <SectionHeading
          description="Il punto di partenza non deve essere un problema enorme. Può essere anche una situazione che continua a tornare e sulla quale senti il bisogno di fare ordine."
          eyebrow="Situazioni reali"
          id="contact-topics-title"
          title="Puoi scrivermi per temi che attraversano lavoro, sport e vita quotidiana."
        />
        <div className={styles.grid}>
          {contactTopics.map((topic) => (
            <SurfaceCard as="article" className={styles.card} key={topic.title}>
              <h3 className={styles.cardTitle}>{topic.title}</h3>
              <p className={styles.cardText}>{topic.text}</p>
            </SurfaceCard>
          ))}
        </div>
      </Container>
    </div>
  );
}
