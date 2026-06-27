import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ebookFaqs } from "@/config/ebook";

import styles from "./ebook-faq-section.module.css";

export function EbookFaqSection() {
  return (
    <Container
      as="section"
      aria-labelledby="ebook-faq-title"
      className={styles.section}
    >
      <SectionHeading
        eyebrow="Domande frequenti"
        id="ebook-faq-title"
        title="Prima di scaricare l’eBook."
      />
      <div className={styles.list}>
        {ebookFaqs.map((faq) => (
          <details className={styles.item} key={faq.question}>
            <summary className={styles.summary}>{faq.question}</summary>
            <p className={styles.answer}>{faq.answer}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
