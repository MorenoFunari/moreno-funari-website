import { TrackedWhatsAppButton } from "@/components/analytics/tracked-whatsapp-button";
import {
  ConfrontoLeadForm,
  type ConfrontoLeadSource,
} from "@/components/forms/confronto-lead-form";
import { Container } from "@/components/ui/container";
import { pilotWhatsAppUrl } from "@/config/pilot";

import styles from "./pilot-conversion-section.module.css";

type PilotConversionSectionProps = {
  className?: string;
  formIntro: string;
  formTitle: string;
  noteLabel?: string;
  page: string;
  source: ConfrontoLeadSource;
  text: string;
  title: string;
  eyebrow?: string;
  points?: readonly string[];
  subtitle?: string;
};

const defaultPoints = [
  "6 incontri online",
  "massimo 3 partecipanti",
  "gratuito in fase pilota",
  "si parte da una situazione concreta",
  "nessuna promessa miracolosa",
] as const;

export function PilotConversionSection({
  className,
  eyebrow = "Percorso pilota gratuito",
  formIntro,
  formTitle,
  noteLabel = "Situazione concreta / messaggio",
  page,
  points = defaultPoints,
  source,
  subtitle,
  text,
  title,
}: PilotConversionSectionProps) {
  const titleId = `pilot-conversion-${source}`;

  return (
    <Container
      as="section"
      aria-labelledby={titleId}
      className={[styles.section, className].filter(Boolean).join(" ")}
    >
      <div className={styles.panel}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={titleId}>{title}</h2>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          <p>{text}</p>
          {points.length > 0 ? (
            <ul className={styles.points}>
              {points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
          <div className={styles.actions}>
            <TrackedWhatsAppButton
              href={pilotWhatsAppUrl}
              location={`${source}_whatsapp_cta`}
              page={page}
              size="large"
            >
              Scrivimi su WhatsApp
            </TrackedWhatsAppButton>
          </div>
        </div>

        <div className={styles.formWrap}>
          <ConfrontoLeadForm
            ctaLabel="Invia richiesta"
            introText={formIntro}
            noteLabel={noteLabel}
            page={page}
            source={source}
            title={formTitle}
            variant="embedded"
          />
          <p className={styles.formNote}>
            Il form non iscrive alla newsletter: serve solo per essere
            ricontattati sulla richiesta inviata.
          </p>
        </div>
      </div>
    </Container>
  );
}
