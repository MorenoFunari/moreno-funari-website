import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { coachingFaqs } from "@/config/coaching";

import styles from "./coaching-faq-section.module.css";

export function CoachingFaqSection() {
  return (
    <Container
      as="section"
      aria-labelledby="coaching-faq-title"
      className={styles.section}
    >
      <SectionHeading
        eyebrow="Domande frequenti"
        id="coaching-faq-title"
        title="Dubbi che è normale avere prima di iniziare."
      />
      <div className={styles.list}>
        {coachingFaqs.map((faq) => (
          <details className={styles.item} key={faq.question}>
            <summary className={styles.summary}>{faq.question}</summary>
            <p className={styles.answer}>{faq.answer}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
