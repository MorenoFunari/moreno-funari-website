import { TrackedConfrontoLink } from "@/components/analytics/tracked-confronto-link";
import { TrackedWhatsAppButton } from "@/components/analytics/tracked-whatsapp-button";
import { Container } from "@/components/ui/container";
import { pilotWhatsAppUrl } from "@/config/pilot";

import styles from "./pilot-cta-banner.module.css";

type PilotCtaBannerProps = {
  className?: string;
  page: string;
  source: string;
  variant?: "extended" | "compact";
};

const pilotPoints = [
  "Primo incontro conoscitivo gratuito",
  "30 minuti",
  "Online",
  "Senza obbligo di proseguire",
] as const;

export function PilotCtaBanner({
  className,
  page,
  source,
  variant = "extended",
}: PilotCtaBannerProps) {
  const titleId = `pilot-banner-${source}`;
  const isCompact = variant === "compact";

  return (
    <Container
      as="section"
      aria-labelledby={titleId}
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
    >
      <div
        className={[
          styles.banner,
          isCompact ? styles.compact : styles.extended,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            CONFRONTO
          </p>
          <h2 id={titleId}>
            {isCompact
              ? "Hai una situazione concreta che continui a rimandare?"
              : "Partiamo dalla situazione che stai vivendo"}
          </h2>
          {isCompact ? (
            <p>
              CONFRONTO è un primo incontro conoscitivo gratuito di 30 minuti, online, senza obbligo di proseguire.
            </p>
          ) : (
            <>
              <p className={styles.subtitle}>
                Per chi si sente bloccato, sotto pressione o confuso rispetto a
                una situazione concreta.
              </p>
              <p>
                Comprendiamo la situazione e valutiamo insieme un eventuale percorso di coaching personalizzato.
              </p>
              <ul className={styles.points}>
                {pilotPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className={styles.actions}>
          <TrackedConfrontoLink
            location={source}
            page={page}
            size={isCompact ? "medium" : "large"}
          >
            Scopri CONFRONTO
          </TrackedConfrontoLink>
          <TrackedWhatsAppButton
            href={pilotWhatsAppUrl}
            location={source}
            page={page}
            size={isCompact ? "medium" : "large"}
          >
            {isCompact ? "Scrivimi CONFRONTO" : "Scrivimi su WhatsApp"}
          </TrackedWhatsAppButton>
        </div>
      </div>
    </Container>
  );
}
