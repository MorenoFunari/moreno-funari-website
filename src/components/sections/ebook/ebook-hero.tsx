import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

import { EbookDownloadLink } from "./ebook-download-link";
import styles from "./ebook-hero.module.css";

export function EbookHero() {
  return (
    <Container
      as="section"
      aria-labelledby="ebook-hero-title"
      className={styles.hero}
      size="wide"
    >
      <div className={styles.content}>
        <Eyebrow className={styles.eyebrow}>eBook gratuito</Eyebrow>
        <h1 className={styles.title} id="ebook-hero-title">
          Un passo possibile.
        </h1>
        <p className={styles.subtitle}>
          Una guida semplice per ritrovare fiducia quando ti senti bloccato.
        </p>
        <div className={styles.copy}>
          <p>
            Non sempre serve avere subito la soluzione completa. A volte il
            primo passo è fermarsi, mettere ordine nei pensieri e capire da dove
            puoi iniziare oggi.
          </p>
          <p>
            Ho scritto questo eBook per accompagnarti in una riflessione
            concreta, senza formule motivazionali e senza chiederti di cambiare
            tutto insieme.
          </p>
        </div>
        <div className={styles.actions} aria-label="Azioni principali">
          <EbookDownloadLink />
          <ButtonLink href="#cosa-troverai" size="large" variant="secondary">
            Scopri cosa contiene
          </ButtonLink>
        </div>
      </div>
      <div className={styles.media}>
        <Image
          alt="Copertina dell’eBook Un passo possibile."
          className={styles.cover}
          fill
          priority
          sizes="(max-width: 767px) 82vw, (max-width: 1199px) 34vw, 25rem"
          src="/images/ebook/un-passo-possibile-cover.webp"
        />
      </div>
    </Container>
  );
}
