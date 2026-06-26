import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { siteConfig } from "@/config/site";

import styles from "./page.module.css";

const startCards = [
  {
    title: "Voglio capire",
    description:
      "Leggi riflessioni ed esempi concreti su blocco, fiducia, pressione, errori e vita quotidiana.",
    linkLabel: "Leggi il blog",
    href: "/blog",
    isExternal: false,
  },
  {
    title: "Voglio riflettere",
    description:
      "Fermati qualche minuto, rispondi a poche domande e prova a individuare un piccolo passo possibile.",
    linkLabel: "Prova la riflessione guidata",
    href: siteConfig.appUrl,
    isExternal: true,
  },
  {
    title: "Voglio confrontarmi",
    description:
      "Scopri uno spazio di coaching umano, concreto e costruito sulla situazione che stai vivendo.",
    linkLabel: "Scopri il coaching",
    href: "/coaching",
    isExternal: false,
  },
] as const;

export default function Home() {
  return (
    <main className={styles.page} id="main-content">
      <Container
        as="section"
        aria-labelledby="hero-title"
        className={styles.hero}
      >
        <div className={styles.heroContent}>
          <Eyebrow className={styles.heroEyebrow}>
            Moreno Funari | Mental Coach
          </Eyebrow>
          <h1 className={styles.heroTitle} id="hero-title">
            Non devi risolvere tutto oggi.
          </h1>
          <p className={styles.heroText}>
            Se ti senti bloccato, sotto pressione o troppo duro con te stesso,
            puoi iniziare facendo chiarezza e trovando un passo possibile.
          </p>
          <div className={styles.heroActions} aria-label="Azioni principali">
            <ButtonLink href="#inizia-da-qui" size="large">
              Inizia da qui
            </ButtonLink>
            <ButtonLink href="/chi-sono" size="large" variant="secondary">
              Conosci Moreno
            </ButtonLink>
          </div>
        </div>
      </Container>

      <Container
        as="section"
        className={styles.startSection}
        id="inizia-da-qui"
        aria-labelledby="start-title"
      >
        <SectionHeading
          id="start-title"
          title="Da dove puoi iniziare?"
          description="Non esiste una strada uguale per tutti. Puoi scegliere il modo che senti più vicino al momento che stai vivendo."
        />

        <div className={styles.cardGrid}>
          {startCards.map((card) => (
            <SurfaceCard
              as="article"
              className={styles.card}
              key={card.title}
              variant="default"
            >
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.description}</p>
              <ButtonLink
                className={styles.cardLink}
                external={card.isExternal}
                href={card.href}
                target={card.isExternal ? "_blank" : undefined}
                variant="text"
              >
                {card.linkLabel}
              </ButtonLink>
            </SurfaceCard>
          ))}
        </div>

        <p className={styles.note}>
          Questa è la prima fondazione del sito. Contenuti, fotografie e
          percorsi verranno sviluppati nelle prossime issue.
        </p>
      </Container>
    </main>
  );
}
