import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

import { EbookDownloadLink } from "./ebook-download-link";
import styles from "./ebook-closing-cta.module.css";

export function EbookClosingCta() {
  return (
    <Container
      as="section"
      aria-labelledby="ebook-closing-title"
      className={styles.section}
    >
      <div className={styles.panel}>
        <span className={styles.detail} aria-hidden="true" />
        <h2 className={styles.title} id="ebook-closing-title">
          Non devi risolvere tutto oggi.
        </h2>
        <p className={styles.text}>
          Puoi iniziare leggendo una pagina, rispondendo a una domanda o
          scegliendo un solo passo possibile.
        </p>
        <div className={styles.actions}>
          <EbookDownloadLink variant="ghost" />
          <ButtonLink
            external
            href={siteConfig.appUrl}
            size="large"
            variant="text"
          >
            Prova la riflessione guidata
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
