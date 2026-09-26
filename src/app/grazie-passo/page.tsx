import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";

import styles from "../conversion-page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Guida in arrivo",
  description: "Conferma di richiesta della guida gratuita PASSO.",
  path: "/grazie-passo",
  noIndex: true,
});

export default function GraziePassoPage() {
  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero}>
        <Container className={styles.heroInner}>
          <p className={styles.eyebrow}>PASSO</p>
          <h1>La richiesta è arrivata.</h1>
          <p>
            Controlla la tua email: se tutto è andato correttamente, riceverai
            la guida tra poco.
          </p>
          <p>
            Prendila con calma. Non serve leggerla tutta subito: puoi partire
            anche da una sola domanda, quella che senti più vicina in questo
            momento.
          </p>
          <div className={styles.actions}>
            <ButtonLink href="/passo">Torna alla pagina PASSO</ButtonLink>
            <ButtonLink href="/inizia-da-qui" variant="secondary">
              Inizia da qui
            </ButtonLink>
          </div>
        </Container>
      </section>
    </main>
  );
}
