import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

import styles from "./about-hero.module.css";

export function AboutHero() {
  return (
    <Container
      as="section"
      aria-labelledby="about-hero-title"
      className={styles.hero}
      size="wide"
    >
      <div className={styles.content}>
        <Eyebrow className={styles.eyebrow}>Chi sono</Eyebrow>
        <h1 className={styles.title} id="about-hero-title">
          Sono Moreno. Prima di tutto, una persona.
        </h1>
        <div className={styles.copy}>
          <p>
            Sono Mental Coach, sviluppatore senior, padre e sportivo amatoriale.
            Nel lavoro, nello sport e nella vita mi confronto anch’io con
            responsabilità, errori, pressione e cambiamenti.
          </p>
          <p>
            Non parto da una posizione perfetta. Porto nel coaching ciò che ho
            imparato vivendo situazioni reali e provando, ogni volta, a capire
            quando continuare e quando invece fermarmi.
          </p>
        </div>
        <div className={styles.actions} aria-label="Azioni della pagina">
          <ButtonLink href="#come-lavoro" size="large">
            Scopri come lavoro
          </ButtonLink>
          <ButtonLink href="/blog" size="large" variant="secondary">
            Leggi il blog
          </ButtonLink>
        </div>
      </div>
      <div className={styles.media}>
        <Image
          alt="Moreno Funari in piedi all’aperto."
          className={styles.image}
          fill
          priority
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 42vw, 34rem"
          src="/images/moreno/moreno-about-outdoor.webp"
        />
      </div>
    </Container>
  );
}
