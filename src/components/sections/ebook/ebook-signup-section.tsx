import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

import styles from "./ebook-signup-section.module.css";

const brevoFormUrl =
  "https://4ae90352.sibforms.com/v2/serve/MUIFADjjZ06May2PBGUDNpdWZC6TllyL7eyPSQgasbEmdW46VfsOeKanKwvnKcj7ES2KRPwJCRkFO4WBLMyHsQYLnY_OLpyX87loM3-9RfpRtpmm4aqjYZ1lXi6b73cow_jwIUi2UxPxfGiAfXqhiQJ3WEMFEE8qtILwmhib8jAKnx-2oycLnysk3iOHwosGrELamm5XmwwsshNIyQ==";

export function EbookSignupSection() {
  return (
    <section
      aria-labelledby="ebook-signup-title"
      className={styles.band}
      id="ricevi-la-guida"
    >
      <Container className={styles.inner}>
        <SectionHeading
          eyebrow="La guida è gratuita"
          id="ebook-signup-title"
          title="Inserisci la tua email e inizia da un passo possibile."
          description="Dopo l’invio potrai aprire subito il PDF. Userò il tuo indirizzo soltanto per gestire questa richiesta: non verrai iscritto automaticamente alla newsletter."
        />
        <div className={styles.formFrame}>
          <iframe
            className={styles.form}
            loading="lazy"
            scrolling="no"
            src={brevoFormUrl}
            title="Modulo per ricevere la guida Un passo possibile"
          />
        </div>
        <p className={styles.privacy}>
          Inviando il modulo dichiari di aver letto la nostra{" "}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </Container>
    </section>
  );
}
