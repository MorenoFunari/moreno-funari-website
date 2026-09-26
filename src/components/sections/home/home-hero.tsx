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
          Moreno Funari | Mental Coach
        </Eyebrow>
        <h1 className={styles.title} id="hero-title">
          Non devi risolvere tutto oggi.
        </h1>
        <p className={styles.text}>
          Se ti senti bloccato, sotto pressione o troppo duro con te stesso,
          puoi iniziare facendo chiarezza e trovando un passo possibile.
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
          priority
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 42vw, 34rem"
          src="/images/moreno/moreno-hero-outdoor.webp"
        />
      </div>
    </Container>
  );
}
