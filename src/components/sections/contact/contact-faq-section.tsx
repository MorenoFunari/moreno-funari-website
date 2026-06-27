import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactFaqs } from "@/config/contact";

import styles from "./contact-faq-section.module.css";

export function ContactFaqSection() {
  return (
    <Container
      as="section"
      aria-labelledby="contact-faq-title"
      className={styles.section}
    >
      <SectionHeading
        eyebrow="Domande frequenti"
        id="contact-faq-title"
        title="Dubbi che puoi avere prima di scrivermi."
      />
      <div className={styles.list}>
        {contactFaqs.map((faq) => (
          <details className={styles.item} key={faq.question}>
            <summary className={styles.summary}>{faq.question}</summary>
            <p className={styles.answer}>{faq.answer}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
