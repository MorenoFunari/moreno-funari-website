import type { Metadata } from "next";
import { PercorsiLeadForm } from "@/components/forms/percorsi-lead-form";
import { PercorsiPricingSection } from "@/components/sections/percorsi/percorsi-pricing-section";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { percorsiContent as copy, percorsiFaqs } from "@/config/percorsi-content";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createPercorsiJsonLd } from "@/lib/seo/percorsi";
import hero from "@/components/sections/coaching/coaching-hero.module.css";
import faq from "@/components/sections/coaching/coaching-faq-section.module.css";
import styles from "./page.module.css";

const socialTitle = "Percorso di mental coaching individuale";
const baseMetadata = createPageMetadata({
  title: `${socialTitle} | Moreno Funari`,
  absoluteTitle: true,
  description: "Un Passo Possibile: 6 incontri individuali online di Mental Coaching per fare chiarezza su una situazione concreta. Cosa comprende, prezzi e come iniziare.",
  path: "/percorsi",
  noIndex: process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development",
});
export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, title: socialTitle },
  twitter: { ...baseMetadata.twitter, title: socialTitle },
};

function Paragraphs({ items }: { items: readonly string[] }) {
  return <>{items.map((text) => <p key={text}>{text}</p>)}</>;
}

export default function PercorsiPage() {
  return (
    <main id="main-content" className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(createPercorsiJsonLd()).replace(/</g, "\\u003c") }} />
      <Container as="section" aria-labelledby="percorsi-title" className={hero.hero}>
        <div className={hero.content}>
          <h1 id="percorsi-title" className={hero.title}>{copy.hero.title}</h1>
          <div className={hero.copy}><Paragraphs items={copy.hero.paragraphs} /><p>{copy.hero.format}</p></div>
          <div className={hero.actions}>
            <ButtonLink href="#richiesta" size="large">Richiedi un colloquio conoscitivo</ButtonLink>
            <ButtonLink href="#come-lavoriamo" size="large" variant="secondary">Scopri come funziona il percorso</ButtonLink>
          </div>
        </div>
      </Container>

      <Container as="section" className={styles.section} aria-labelledby="situazioni-title">
        <SectionHeading id="situazioni-title" title={copy.situations.title} />
        <div className={styles.copy}>
          <ul className={styles.list}>{copy.situations.items.map((text) => <li key={text}>{text}</li>)}</ul>
          <Paragraphs items={copy.situations.paragraphs} />
        </div>
      </Container>

      <Container as="section" className={styles.section} aria-labelledby="percorso-title">
        <SectionHeading id="percorso-title" title={copy.definition.title} />
        <div className={styles.copy}>
          <Paragraphs items={copy.definition.paragraphs} />
          <h3>{copy.definition.expectationTitle}</h3>
          <Paragraphs items={copy.definition.expectations} />
        </div>
      </Container>

      <Container as="section" className={styles.section} aria-labelledby="include-title">
        <SectionHeading id="include-title" title={copy.includes.title} />
        <dl className={styles.includes}>{copy.includes.items.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.text}</dd></div>)}</dl>
      </Container>

      <Container as="section" id="come-lavoriamo" className={styles.section} aria-labelledby="metodo-title">
        <SectionHeading id="metodo-title" title={copy.method.title} />
        <div className={styles.copy}>
          <Paragraphs items={copy.method.paragraphs} />
          <ol className={styles.steps}>{copy.method.steps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
          <p>{copy.method.conclusion}</p>
        </div>
      </Container>

      <Container as="section" className={styles.section} aria-labelledby="confini-title">
        <SectionHeading id="confini-title" title={copy.boundaries.title} />
        <ul className={`${styles.copy} ${styles.list}`}>{copy.boundaries.items.map((text) => <li key={text}>{text}</li>)}</ul>
      </Container>

      <PercorsiPricingSection />

      <Container as="section" className={styles.section} aria-labelledby="moreno-title">
        <SectionHeading id="moreno-title" title={copy.author.title} />
        <div className={styles.copy}><Paragraphs items={copy.author.paragraphs} /></div>
        <div><ButtonLink href="/chi-sono" variant="text">Scopri chi sono</ButtonLink></div>
      </Container>

      <Container as="section" id="richiesta" className={styles.section} aria-labelledby="richiesta-title">
        <SectionHeading id="richiesta-title" title={copy.request.title} />
        <div className={styles.copy}>
          <ol className={styles.list}>{copy.request.steps.map((text) => <li key={text}>{text}</li>)}</ol>
          <p>{copy.request.note}</p>
        </div>
        <div className={styles.form}><PercorsiLeadForm notePlaceholder={copy.request.placeholder} /></div>
      </Container>

      <Container as="section" className={styles.section} aria-labelledby="percorsi-faq-title">
        <SectionHeading id="percorsi-faq-title" title="Domande frequenti" />
        <div className={faq.list}>{percorsiFaqs.map((item) => <details className={faq.item} key={item.question}><summary className={faq.summary}>{item.question}</summary><p className={faq.answer}>{item.answer}</p></details>)}</div>
      </Container>

      <Container as="section" className={styles.section} aria-labelledby="chiusura-title">
        <SectionHeading id="chiusura-title" title={copy.closing.title} />
        <div className={styles.copy}><p>{copy.closing.text}</p></div>
        <div><ButtonLink href="#richiesta" size="large">Richiedi un colloquio conoscitivo</ButtonLink></div>
        <p>{copy.closing.signature}</p>
      </Container>
    </main>
  );
}
