import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { createPageMetadata } from "@/lib/seo/metadata";

import styles from "./page.module.css";

const BREVO_FORM_URL =
  "https://4ae90352.sibforms.com/v2/serve/MUIFAF3R0KInBJVk_kmECZkaXzq2_daQViUFZkWFOCEtwGcMkyR0o_4B94Aub0MSG4ZB_Gbj_azBiW2IZk_W0d6sDsAOY9aQCVvxc8sKrG4dKp3cMdtJ-DiFH5PSmDmEW3iO7KURNoxN512-jmOyhkLsMkIzBDHs7g6LCpFiZIceKiHRasW1A5u6abNZ1lD7NsiPHYLqrOdHoIqvRQ==";

const pageMetadata = createPageMetadata({
  title:
    "Guida gratuita per mettere confini senza sentirti egoista | Moreno Funari",
  description:
    "Ricevi la guida gratuita “Dire sempre sì ti sta costando più di quanto pensi”: 5 passi pratici per mettere confini senza sentirti egoista.",
  path: "/guida-dire-sempre-si",
  absoluteTitle: true,
});

export const metadata: Metadata = {
  ...pageMetadata,
  openGraph: {
    ...pageMetadata.openGraph,
    title: "Dire sempre sì ti sta costando più di quanto pensi",
    description:
      "Una guida gratuita con 5 passi pratici per mettere confini senza sentirti egoista.",
  },
};

const situations = [
  "Ti capita di accettare richieste prima ancora di capire se hai davvero spazio.",
  "Dici sì per non deludere.",
  "Ti ritrovi pieno di cose da fare e con poco tempo per te.",
  "Fai fatica a capire dove finisce la disponibilità e dove inizia il sacrificio.",
] as const;

const steps = [
  "Fermarti prima di rispondere",
  "Distinguere disponibilità e sacrificio",
  "Inserire una pausa",
  "Imparare piccoli confini",
  "Recuperare spazio per quello che conta",
] as const;

export default function GuidaDireSempreSiPage() {
  return (
    <main id="main-content">
      <Container
        as="section"
        aria-labelledby="guida-hero-title"
        className={styles.hero}
        size="wide"
      >
        <div className={styles.heroContent}>
          <Eyebrow className={styles.eyebrow}>Guida gratuita</Eyebrow>
          <h1 className={styles.title} id="guida-hero-title">
            Dire sempre sì ti sta costando più di quanto pensi
          </h1>
          <p className={styles.subtitle}>
            5 passi per mettere confini senza sentirti egoista.
          </p>
          <p className={styles.intro}>
            Una guida breve e pratica per iniziare a distinguere disponibilità,
            sacrificio automatico e piccoli confini possibili.
          </p>
          <div className={styles.actions} aria-label="Azioni principali">
            <ButtonLink href="#ricevi-la-guida" size="large">
              Ricevi la guida
            </ButtonLink>
            <ButtonLink href="#cosa-trovi" size="large" variant="secondary">
              Scopri cosa contiene
            </ButtonLink>
          </div>
        </div>
        <SurfaceCard className={styles.heroNote} variant="muted">
          <p>
            Forse alcune volte dici sì prima ancora di chiederti se hai spazio.
          </p>
          <p>
            La guida ti aiuta a fermarti un momento e a scegliere un piccolo
            confine possibile.
          </p>
        </SurfaceCard>
      </Container>

      <section className={styles.section} aria-labelledby="situazioni-title">
        <Container>
          <SectionHeading
            id="situazioni-title"
            title="Se ti capita di dire sì anche quando vorresti fermarti"
            description="Essere disponibili è una qualità. Quando la risposta diventa automatica, però, può diventare difficile accorgersi di quello che stai mettendo da parte."
          />
          <ul className={styles.situationGrid}>
            {situations.map((situation) => (
              <li key={situation}>
                <SurfaceCard className={styles.situationCard} variant="default">
                  <p>{situation}</p>
                </SurfaceCard>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        className={styles.section + " " + styles.mutedSection}
        id="cosa-trovi"
        aria-labelledby="contenuti-title"
      >
        <Container>
          <SectionHeading
            id="contenuti-title"
            eyebrow="Dentro la guida"
            title="Cinque passi da provare nella vita reale"
            description="È una guida breve, da usare e non da studiare. Puoi leggerla con calma e partire dal passaggio che senti più vicino."
          />
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step}>
                <span aria-hidden="true">{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="perche-title">
        <Container>
          <SurfaceCard className={styles.whyCard} variant="dark">
            <h2 id="perche-title">Perché questa guida</h2>
            <div className={styles.whyCopy}>
              <p>Non serve diventare duri.</p>
              <p>Non serve smettere di essere disponibili.</p>
              <p>A volte serve solo iniziare a rispondere con più presenza.</p>
            </div>
            <p className={styles.possibleStep}>
              Un passo possibile può essere concederti una pausa prima di dire
              sì.
            </p>
          </SurfaceCard>
        </Container>
      </section>

      <section
        className={styles.section + " " + styles.formSection}
        id="ricevi-la-guida"
        aria-labelledby="lead-form-title"
      >
        <Container>
          <div className={styles.formIntro}>
            <SectionHeading
              alignment="center"
              id="lead-form-title"
              eyebrow="Un piccolo spazio per te"
              title="Ricevi la guida gratuita"
              description="Inserisci la tua email nel modulo e conferma l’iscrizione dalla mail che riceverai. Solo dopo la conferma riceverai la guida."
            />
          </div>
          <div className={styles.formEmbed}>
            <div className={styles.formFallback}>
              <p>
                Il modulo si apre in una nuova scheda tramite Brevo. Inserisci
                nome ed email, poi conferma dalla mail che riceverai.
              </p>
              <ButtonLink external href={BREVO_FORM_URL} size="large">
                Apri il modulo per ricevere la guida
              </ButtonLink>
            </div>
          </div>
          <p className={styles.privacyNote}>
            Il modulo è gestito da Brevo. Dopo l’invio riceverai una mail di
            conferma e solo dopo la conferma riceverai la guida. I dati saranno
            trattati tramite Brevo per inviarti la guida e comunicazioni
            collegate al progetto Moreno Funari | Mental Coach. Puoi
            disiscriverti in qualsiasi momento. Leggi la{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
        </Container>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <Container className={styles.closingContent}>
          <h2 id="closing-title">
            Mettere un confine non significa smettere di esserci per gli altri.
          </h2>
          <p>Significa iniziare a esserci anche per te.</p>
          <ButtonLink href="#ricevi-la-guida" size="large">
            Ricevi la guida gratuita
          </ButtonLink>
        </Container>
      </section>
    </main>
  );
}
