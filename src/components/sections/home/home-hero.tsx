import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

import styles from "./home-hero.module.css";

export function HomeHero() {
  return (
    <Container
      as="section"
      aria-labelledby="hero-title"
      className={styles.hero}
    >
      <div className={styles.content}>
        <Eyebrow className={styles.eyebrow}>
          Mental coach a Frascati e online
        </Eyebrow>
        <h1 className={styles.title} id="hero-title">
          Non devi risolvere tutto oggi.
        </h1>
        <p className={styles.text}>
          Mental coaching per chi si blocca tra lavoro, sport e scelte. Online e ai Castelli Romani.
        </p>
        <div className={styles.actions} aria-label="Azioni principali">
          <ButtonLink href="/inizia-da-qui" size="large">
            Inizia da qui
          </ButtonLink>
          <ButtonLink href="/confronto" size="large" variant="secondary">
            Scopri CONFRONTO
          </ButtonLink>
        </div>
      </div>
      <div className={styles.media}>
        <Image
          alt="Moreno Funari all'aperto in un momento informale."
          className={styles.image}
          fill
          fetchPriority="high"
          loading="eager"
          sizes="(min-width: 1120px) 26rem, (min-width: 1024px) 38vw, (min-width: 576px) 34rem, calc(100vw - 2rem)"
          src="/images/moreno/moreno-hero-outdoor.webp"
        />
      </div>
    </Container>
  );
}
