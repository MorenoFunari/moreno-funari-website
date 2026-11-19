import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

import styles from "./passo-guide-section.module.css";

export function PassoGuideSection() {
  return (
    <Container
      as="section"
      aria-labelledby="home-passo-title"
      className={styles.section}
    >
      <div className={styles.panel}>
        <div className={styles.copy}>
          <Eyebrow>GUIDA GRATUITA</Eyebrow>
          <h2 id="home-passo-title">Dici sì anche quando vorresti dire no?</h2>
          <p>
            A volte il sì esce prima che tu abbia deciso. PASSO è una guida gratuita
            e breve sui «sì» automatici e sui confini. Lasci la tua email e ti mando
            il link per scaricarla.
          </p>
          <ButtonLink href="/passo">Scarica PASSO</ButtonLink>
        </div>
        <Image
          alt="Copertina della guida PASSO"
          className={styles.cover}
          height={1010}
          sizes="(min-width: 768px) 14rem, 11rem"
          src="/images/ebook/dire-sempre-si-cover.webp"
          width={714}
        />
      </div>
    </Container>
  );
}
