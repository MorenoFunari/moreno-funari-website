import type { Metadata } from "next";

import { TrackedCtaLink } from "@/components/analytics/tracked-cta-link";
import { Container } from "@/components/ui/container";
import { SurfaceCard } from "@/components/ui/surface-card";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

import styles from "./page.module.css";

const startLevels = [
  { label: "Voglio solo capire meglio", href: "#capire" },
  { label: "Voglio fare qualcosa in autonomia", href: "#autonomia" },
  { label: "Voglio raccontare una situazione", href: "#raccontare" },
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "Inizia da qui",
  description:
    "Scegli un primo passo sostenibile: leggere, fare qualcosa in autonomia oppure raccontare una situazione concreta.",
  path: "/inizia-da-qui",
});

export default function IniziaDaQuiPage() {
  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero} aria-labelledby="start-title">
        <Container className={styles.heroInner}>
          <p className={styles.eyebrow}>Inizia da qui</p>
          <h1 id="start-title">
            Non devi capire tutto subito. Parti da ciò che riesci a fare adesso.
          </h1>
          <p className={styles.lead}>
            Qui trovi modi diversi per iniziare: leggere, fare un esercizio in
            autonomia, ricevere una guida o raccontare una situazione concreta.
          </p>
          <nav className={styles.levelNav} aria-label="Scegli come iniziare">
            {startLevels.map((level, index) => (
              <a href={level.href} key={level.href}>
                <span aria-hidden="true">{index + 1}</span>
                {level.label}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <section
        className={styles.levelSection}
        id="capire"
        aria-labelledby="capire-title"
      >
        <Container className={styles.levelLayout}>
          <div className={styles.levelHeading}>
            <p className={styles.levelNumber}>Livello 1</p>
            <h2 id="capire-title">Voglio solo capire meglio</h2>
          </div>
          <div className={styles.levelContent}>
            <p>
              Se adesso vuoi solo orientarti, puoi partire da un articolo. Non
              devi lasciare dati né raccontare qualcosa di personale.
            </p>
            <TrackedCtaLink
              eventName="cta_click_inizia_da_qui"
              href="/blog"
              location="start_hub_level_1_blog"
              size="large"
              variant="secondary"
            >
              Leggi gli articoli
            </TrackedCtaLink>
          </div>
        </Container>
      </section>

      <section
        className={`${styles.levelSection} ${styles.autonomySection}`}
        id="autonomia"
        aria-labelledby="autonomia-title"
      >
        <Container>
          <div className={styles.levelIntro}>
            <p className={styles.levelNumber}>Livello 2</p>
            <h2 id="autonomia-title">Voglio fare qualcosa in autonomia</h2>
            <p>
              Puoi scegliere lo strumento più vicino alla situazione che stai
              vivendo, senza dover parlare subito con qualcuno.
            </p>
          </div>

          <div className={styles.autonomyGrid}>
            <SurfaceCard
              as="article"
              className={`${styles.optionCard} ${styles.passoCard}`}
              aria-labelledby="passo-title"
            >
              <p className={styles.optionLabel}>Guida gratuita</p>
              <h3 id="passo-title">Dire sempre sì ti pesa?</h3>
              <p>
                Puoi ricevere la guida gratuita PASSO e iniziare da qualche
                domanda concreta sui sì automatici e sui confini.
              </p>
              <TrackedCtaLink
                eventName="cta_click_passo"
                href="/passo"
                location="start_hub_level_2_passo"
                size="large"
              >
                Ricevi la guida PASSO
              </TrackedCtaLink>
            </SurfaceCard>

            <SurfaceCard
              as="article"
              className={styles.optionCard}
              variant="outlined"
              aria-labelledby="ai-title"
            >
              <p className={styles.optionLabel}>Esercizio guidato</p>
              <h3 id="ai-title">
                Vuoi fare un primo esercizio in autonomia?
              </h3>
              <p>
                Puoi usare Un Passo Possibile AI per mettere ordine in una
                situazione e individuare un primo passo possibile.
              </p>
              <TrackedCtaLink
                eventName="cta_click_inizia_da_qui"
                external
                href={siteConfig.appUrl}
                location="start_hub_level_2_ai"
                size="large"
                variant="secondary"
              >
                Prova l’esercizio guidato
              </TrackedCtaLink>
            </SurfaceCard>
          </div>
        </Container>
      </section>

      <section
        className={styles.levelSection}
        id="raccontare"
        aria-labelledby="raccontare-title"
      >
        <Container className={styles.levelLayout}>
          <div className={styles.levelHeading}>
            <p className={styles.levelNumber}>Livello 3</p>
            <h2 id="raccontare-title">
              Voglio raccontare direttamente cosa sta succedendo
            </h2>
          </div>
          <div className={styles.levelContent}>
            <p>
              Se c’è una situazione di lavoro, sport o vita personale che ti
              pesa, puoi raccontarla a Moreno. Prima la richiesta viene letta e
              valutata con calma.
            </p>
            <TrackedCtaLink
              eventName="cta_click_confronto"
              href="/confronto"
              location="start_hub_level_3_confronto"
              size="large"
            >
              Vai a CONFRONTO
            </TrackedCtaLink>
            <p className={styles.reassurance}>
              Inviarla non significa iniziare automaticamente. È solo un primo
              passaggio per capire se ha senso proseguire.
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <Container className={styles.closingInner}>
          <h2 id="closing-title">Puoi anche iniziare solo leggendo.</h2>
          <p>
            Il primo passo non deve essere grande: deve essere possibile per te
            adesso.
          </p>
        </Container>
      </section>
    </main>
  );
}
