import Link from "next/link";

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
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Moreno Funari | Mental Coach</p>
          <h1 className={styles.heroTitle} id="hero-title">
            Non devi risolvere tutto oggi.
          </h1>
          <p className={styles.heroText}>
            Se ti senti bloccato, sotto pressione o troppo duro con te stesso,
            puoi iniziare facendo chiarezza e trovando un passo possibile.
          </p>
          <div className={styles.heroActions} aria-label="Azioni principali">
            <a className={styles.primaryCta} href="#inizia-da-qui">
              Inizia da qui
            </a>
            <Link className={styles.secondaryCta} href="/chi-sono">
              Conosci Moreno
            </Link>
          </div>
        </div>
      </section>

      <section
        className={styles.startSection}
        id="inizia-da-qui"
        aria-labelledby="start-title"
      >
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle} id="start-title">
            Da dove puoi iniziare?
          </h2>
          <p className={styles.sectionText}>
            Non esiste una strada uguale per tutti. Puoi scegliere il modo che
            senti più vicino al momento che stai vivendo.
          </p>
        </div>

        <div className={styles.cardGrid}>
          {startCards.map((card) => (
            <article className={styles.card} key={card.title}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.description}</p>
              {card.isExternal ? (
                <a
                  className={styles.cardLink}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {card.linkLabel}
                </a>
              ) : (
                <Link className={styles.cardLink} href={card.href}>
                  {card.linkLabel}
                </Link>
              )}
            </article>
          ))}
        </div>

        <p className={styles.note}>
          Questa è la prima fondazione del sito. Contenuti, fotografie e
          percorsi verranno sviluppati nelle prossime issue.
        </p>
      </section>
    </main>
  );
}
