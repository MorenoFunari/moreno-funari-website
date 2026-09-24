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
  "6 incontri online",
  "massimo 3 partecipanti",
  "gratuito in fase pilota",
  "nessuna promessa miracolosa",
  "si parte da una situazione concreta",
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
            {isCompact ? "Percorso pilota" : "Percorso pilota gratuito"}
          </p>
          <h2 id={titleId}>
            {isCompact
              ? "Hai una situazione concreta che continui a rimandare?"
              : "Un Passo Possibile — Percorso Pilota gratuito"}
          </h2>
          {isCompact ? (
            <p>
              Sto aprendo un percorso pilota gratuito per lavorare su blocco,
              pressione e prossimo passo possibile.
            </p>
          ) : (
            <>
              <p className={styles.subtitle}>
                Per chi si sente bloccato, sotto pressione o confuso rispetto a
                una situazione concreta.
              </p>
              <p>
                Non serve avere già tutto chiaro. Partiamo da ciò che stai
                vivendo davvero e lavoriamo su un prossimo passo possibile.
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
            {isCompact ? "Scopri il percorso pilota" : "Lascia i tuoi dati"}
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
