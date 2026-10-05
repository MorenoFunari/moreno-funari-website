import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { TrackedCtaLink } from "@/components/analytics/tracked-cta-link";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";

import { PassoForm } from "./passo-form";
import styles from "./page.module.css";

const usefulWhenItems = [
  "dici sì prima ancora di capire se puoi davvero",
  "hai paura di sembrare egoista",
  "ti accorgi tardi di aver superato il tuo limite",
  "vorresti iniziare da un confine piccolo, non da una rivoluzione",
] as const;

const insideItems = [
  "una domanda per riconoscere i sì automatici",
  "un modo per fermarti prima di rispondere",
  "un esercizio per distinguere disponibilità e automatismo",
  "un primo confine possibile da provare",
  "uno spazio per scrivere cosa noti",
] as const;

const suitedForItems = [
  "chi tende a dire sì troppo in fretta",
  "chi vuole mettere confini senza diventare duro",
  "chi cerca un primo passo concreto",
] as const;

const notForItems = [
  "non è una formula magica",
  "non sostituisce un percorso terapeutico",
  "non promette di risolvere tutto in 5 passaggi",
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "Dire sempre sì ti sta costando più di quanto pensi",
  description:
    "Scarica la guida gratuita in 5 passi per iniziare a mettere confini senza sentirti egoista.",
  path: "/passo",
  absoluteTitle: true,
});

export default function PassoPage() {
  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero} aria-labelledby="passo-title">
        <Container className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Guida gratuita</p>
            <h1 id="passo-title">
              Dire sempre sì ti sta costando più di quanto pensi
            </h1>
            <p className={styles.lead}>
              5 passi per mettere confini senza sentirti egoista.
            </p>
            <p className={styles.heroNote}>
              Per quando dici sì quasi in automatico, poi ti senti stanco,
              pieno o poco rispettato.
            </p>
            <div className={styles.actions}>
              <TrackedCtaLink
                eventName="cta_click_passo"
                href="#form-passo"
                location="passo_hero"
                size="large"
              >
                Ricevi la guida gratuita
              </TrackedCtaLink>
              <a className={styles.secondaryAction} href="#cosa-trovi">
                Guarda cosa trovi dentro
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.previewSection}`}>
        <Container className={styles.previewLayout}>
          <figure className={styles.guidePreview}>
            <Image
              alt="Copertina della guida Dire sempre sì ti sta costando più di quanto pensi"
              className={styles.coverImage}
              height={1010}
              priority
              sizes="(max-width: 759px) 9rem, 16rem"
              src="/images/ebook/dire-sempre-si-cover.webp"
              width={714}
            />
            <figcaption>8 pagine da leggere con calma, al tuo ritmo.</figcaption>
          </figure>
          <div className={styles.previewCopy}>
            <p className={styles.eyebrow}>Cosa ricevi</p>
            <h2>Una guida breve da usare, non da studiare.</h2>
            <ul className={styles.previewBenefits}>
              <li>5 passaggi semplici e concreti</li>
              <li>domande ed esercizi da provare nella vita reale</li>
              <li>uno spazio per osservare cosa succede prima di dire sì</li>
            </ul>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="form-passo-title"
        className={`${styles.section} ${styles.formSection}`}
        id="form-passo"
      >
        <Container className={styles.formLayout}>
          <div className={styles.formCopy}>
            <p className={styles.eyebrow}>Invio via email</p>
            <h2 id="form-passo-title">Ricevi la guida via email</h2>
            <p>
              Ti invio la guida che hai richiesto. Nessuno spam, nessuna
              pressione.
            </p>
            <p className={styles.privacyCopy}>
              Puoi cancellarti quando vuoi. I tuoi dati vengono usati per
              inviarti la guida e le comunicazioni collegate, come indicato
              nella <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>
          </div>
          <div className={styles.formEmbed}>
            <PassoForm />
          </div>
        </Container>
      </section>

      <section className={styles.section}>
        <Container className={styles.twoColumns}>
          <div>
            <p className={styles.eyebrow}>Quando può esserti utile</p>
            <h2>Forse il sì arriva prima di te.</h2>
            <p className={styles.sectionIntro}>
              Questa guida può aiutarti a fermarti un momento se:
            </p>
          </div>
          <ul className={styles.list}>
            {usefulWhenItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.muted}`} id="cosa-trovi">
        <Container className={styles.twoColumns}>
          <div>
            <p className={styles.eyebrow}>Dentro la guida</p>
            <h2>Cinque passi semplici, senza forzarti.</h2>
            <p className={styles.sectionIntro}>
              Non devi cambiare tutto. Puoi partire osservando una risposta che
              di solito dai in automatico.
            </p>
          </div>
          <ul className={styles.list}>
            {insideItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className={styles.section}>
        <Container>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Per orientarti</p>
            <h2>Una guida pratica, con confini chiari.</h2>
          </div>
          <div className={styles.fitGrid}>
            <div className={styles.fitCard}>
              <h3>Può esserti utile se</h3>
              <ul>
                {suitedForItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.fitCard}>
              <h3>Cosa non è</h3>
              <ul>
                {notForItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.closing}>
        <Container className={styles.closingInner}>
          <h2>Puoi anche solo leggerla con calma e partire da una domanda.</h2>
          <TrackedCtaLink
            eventName="cta_click_passo"
            href="#form-passo"
            location="passo_closing"
            size="large"
          >
            Ricevi la guida
          </TrackedCtaLink>
        </Container>
      </section>
    </main>
  );
}
