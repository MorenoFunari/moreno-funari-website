import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  LeadMagnetBanner,
  type LeadMagnetBannerProps,
} from "@/components/lead-magnet/lead-magnet-banner";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { CoachingLandingPage as CoachingLandingPageContent } from "@/config/coaching-landing-pages";

import styles from "./coaching-landing-page.module.css";

type CoachingLandingPageProps = {
  leadMagnet?: Omit<LeadMagnetBannerProps, "variant">;
  page: CoachingLandingPageContent;
};

export function CoachingLandingPage({
  leadMagnet,
  page,
}: CoachingLandingPageProps) {
  return (
    <>
      <Container
        as="section"
        aria-labelledby="landing-hero-title"
        className={styles.hero}
      >
        <div className={styles.heroContent}>
          <Eyebrow className={styles.eyebrow}>{page.eyebrow}</Eyebrow>
          <h1 className={styles.heroTitle} id="landing-hero-title">
            {page.heroTitle}
          </h1>
          <div className={styles.heroCopy}>
            {page.heroText.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.actions} aria-label="Azioni principali">
            <ButtonLink
              external={page.primaryCta.external}
              href={page.primaryCta.href}
              size="large"
            >
              {page.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              external={page.secondaryCta.external}
              href={page.secondaryCta.href}
              size="large"
              variant="secondary"
            >
              {page.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <Container
        as="section"
        aria-labelledby="situations-title"
        className={styles.splitSection}
      >
        <SectionHeading
          eyebrow={page.situations.eyebrow}
          id="situations-title"
          title={page.situations.title}
          description={page.situations.description}
        />
        <ol className={styles.numberedList}>
          {page.situations.items.map((item, index) => (
            <li className={styles.numberedItem} key={item}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </Container>

      <section className={styles.band} aria-labelledby="shift-title">
        <Container className={styles.bandInner}>
          <SectionHeading
            eyebrow={page.shift.eyebrow}
            id="shift-title"
            title={page.shift.title}
          />
          <div className={styles.copy}>
            {page.shift.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className={styles.checkList}>
            {page.shift.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Container>
      </section>

      <Container
        as="section"
        aria-labelledby="coaching-help-title"
        className={styles.section}
      >
        <SectionHeading id="coaching-help-title" title={page.coaching.title} />
        <div className={styles.twoColumns}>
          <SurfaceCard as="article" className={styles.infoCard}>
            <h3 className={styles.cardTitle}>Nel percorso possiamo lavorare su</h3>
            <ul className={styles.cardList}>
              {page.coaching.canHelp.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </SurfaceCard>
          <SurfaceCard as="article" className={styles.infoCard} variant="muted">
            <h3 className={styles.cardTitle}>Con confini chiari</h3>
            <ul className={styles.cardList}>
              {page.coaching.cannotHelp.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </SurfaceCard>
        </div>
      </Container>

      <section className={styles.exerciseBand} aria-labelledby="exercise-title">
        <Container className={styles.exerciseInner}>
          <SectionHeading
            eyebrow="Esercizio pratico"
            id="exercise-title"
            title={page.exercise.title}
            description={page.exercise.description}
          />
          <ol className={styles.stepGrid}>
            {page.exercise.steps.map((step, index) => (
              <li className={styles.stepCard} key={step}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container
        as="section"
        aria-labelledby="related-articles-title"
        className={styles.section}
        id={page.relatedContent ? "aree-di-lavoro" : undefined}
      >
        <SectionHeading
          eyebrow={page.relatedContent?.eyebrow ?? "Articoli collegati"}
          id="related-articles-title"
          title={page.relatedContent?.title ?? "Approfondimenti da leggere con calma."}
        />
        <div className={styles.cardGrid}>
          {page.articles.map((article) => (
            <SurfaceCard as="article" className={styles.linkCard} key={article.href}>
              <h3 className={styles.cardTitle}>{article.title}</h3>
              <p className={styles.cardText}>{article.description}</p>
              <ButtonLink className={styles.cardAction} href={article.href} variant="text">
                {page.relatedContent?.cta ?? "Leggi l'articolo"}
              </ButtonLink>
            </SurfaceCard>
          ))}
        </div>
      </Container>

      <section className={styles.band} aria-labelledby="resources-title">
        <Container className={styles.bandInner}>
          <SectionHeading
            eyebrow="Risorse"
            id="resources-title"
            title="Puoi iniziare anche da una risorsa leggera."
          />
          <div className={styles.cardGrid}>
            {page.resources.map((resource) => (
              <SurfaceCard
                as="article"
                className={styles.linkCard}
                key={resource.href}
                variant="default"
              >
                <h3 className={styles.cardTitle}>{resource.title}</h3>
                <p className={styles.cardText}>{resource.description}</p>
                {resource.note ? <p className={styles.note}>{resource.note}</p> : null}
                <ButtonLink
                  className={styles.cardAction}
                  external={resource.external}
                  href={resource.href}
                  variant="text"
                >
                  {resource.cta}
                </ButtonLink>
              </SurfaceCard>
            ))}
          </div>
        </Container>
      </section>

      <Container
        as="section"
        aria-labelledby="landing-faq-title"
        className={styles.section}
      >
        <SectionHeading eyebrow="FAQ" id="landing-faq-title" title="Domande frequenti." />
        <div className={styles.faqList}>
          {page.faqs.map((faq) => (
            <details className={styles.faqItem} key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>

      {leadMagnet ? (
        <LeadMagnetBanner
          placement={leadMagnet.placement}
          sourcePath={leadMagnet.sourcePath}
          variant="coaching"
        />
      ) : null}

      <Container
        as="section"
        aria-labelledby="landing-closing-title"
        className={styles.closing}
      >
        <div className={styles.closingPanel}>
          <h2 className={styles.closingTitle} id="landing-closing-title">
            {page.closing.title}
          </h2>
          <p>{page.closing.text}</p>
          <ButtonLink href="/contatti" size="large" variant="ghost">
            {page.closing.primaryCta}
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
