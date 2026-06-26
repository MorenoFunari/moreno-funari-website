import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

import styles from "./about-preview-section.module.css";

export function AboutPreviewSection() {
  return (
    <Container
      as="section"
      aria-labelledby="about-preview-title"
      className={styles.section}
    >
      <div className={styles.media}>
        <Image
          alt="Moreno Funari all'aperto, in piedi in un contesto quotidiano."
          className={styles.image}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 38vw, 26rem"
          src="/images/moreno/moreno-about-outdoor.png"
        />
      </div>
      <div className={styles.content}>
        <Eyebrow>La persona dietro il progetto</Eyebrow>
        <h2 className={styles.title} id="about-preview-title">
          Sono Moreno. E non parlo da una posizione perfetta.
        </h2>
        <div className={styles.copy}>
          <p>
            Sono Mental Coach, sviluppatore senior, padre e sportivo amatoriale.
            Conosco la pressione delle responsabilità, gli errori che restano
            addosso e quei momenti in cui continuare a spingere non aiuta più.
          </p>
          <p>
            Nel coaching porto ascolto, domande e concretezza. Non per
            insegnarti dall’alto, ma per accompagnarti a capire cosa può essere
            davvero utile per te.
          </p>
        </div>
        <ButtonLink href="/chi-sono" variant="secondary">
          Conosci la mia storia
        </ButtonLink>
      </div>
    </Container>
  );
}
