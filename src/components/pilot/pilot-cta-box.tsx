import { TrackedConfrontoLink } from "@/components/analytics/tracked-confronto-link";
import { TrackedWhatsAppButton } from "@/components/analytics/tracked-whatsapp-button";
import {
  ConfrontoLeadForm,
  type ConfrontoLeadSource,
} from "@/components/forms/confronto-lead-form";
import { Container } from "@/components/ui/container";
import { pilotWhatsAppUrl } from "@/config/pilot";
import { siteConfig } from "@/config/site";

import styles from "./pilot-cta-box.module.css";

type PilotCtaBoxProps = {
  className?: string;
  formMode?: "none" | "compact" | "full";
  formSource?: ConfrontoLeadSource;
  showContactDetails?: boolean;
  source?: "section" | "inline";
};

export function PilotCtaBox({
  className,
  formMode = "none",
  formSource = "home_pilot_block",
  showContactDetails = false,
  source = "section",
}: PilotCtaBoxProps) {
  const showForm = formMode !== "none";
  const formTitle =
    formSource === "contatti_form"
      ? "Lascia una richiesta"
      : "Vuoi capire se il percorso pilota può fare per te?";
  const formIntro =
    formSource === "contatti_form"
      ? "Puoi scrivermi per il percorso pilota, per una domanda sul coaching o per capire se posso aiutarti rispetto a una situazione concreta."
      : "Lascia i tuoi dati: ti ricontatto io per capire se il percorso può essere adatto alla situazione che stai vivendo.";
  const noteLabel =
    formSource === "contatti_form"
      ? "Messaggio / situazione concreta"
      : "Situazione concreta";
  const page =
    formSource === "contatti_form"
      ? "/contatti"
      : formSource === "coaching_page"
        ? "/coaching"
        : formSource === "percorso_pilota_page"
          ? "/percorso-pilota"
          : "/";

  const content = (
    <div
      className={[styles.panel, showForm ? styles.withForm : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Percorso pilota gratuito</p>
        <h2 id="pilot-cta-title">
          Un Passo Possibile — Percorso Pilota gratuito
        </h2>
        <p>
          Per chi si sente bloccato, sotto pressione o confuso rispetto a una
          situazione concreta.
        </p>
        <p>
          Non serve avere già tutto chiaro. Partiamo da ciò che stai vivendo
          davvero e lavoriamo su un prossimo passo possibile.
        </p>
        {showContactDetails ? (
          <ul className={styles.contactList}>
            <li>
              <strong>WhatsApp:</strong>{" "}
              <a href={pilotWhatsAppUrl} target="_blank" rel="noreferrer">
                scrivimi CONFRONTO
              </a>
            </li>
            <li>
              <strong>Email:</strong> <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
          </ul>
        ) : null}
      </div>
      {showForm ? (
        <ConfrontoLeadForm
          ctaLabel="Invia richiesta"
          introText={formIntro}
          noteLabel={noteLabel}
          page={page}
          source={formSource}
          title={formTitle}
          variant={formMode === "compact" ? "compact" : "full"}
        />
      ) : (
        <div className={styles.actions}>
          <TrackedConfrontoLink
            location={
              showContactDetails ? "contact_pilot_cta" : "pilot_cta_box_primary"
            }
            size="large"
          >
            Lascia i tuoi dati
          </TrackedConfrontoLink>
          <TrackedWhatsAppButton
            href={pilotWhatsAppUrl}
            location="pilot_cta_box"
            size="large"
          >
            Scrivimi su WhatsApp
          </TrackedWhatsAppButton>
          <p className={styles.microcopy}>
            Il form non iscrive alla newsletter: serve solo per essere
            ricontattati sulla richiesta inviata.
          </p>
        </div>
      )}
    </div>
  );

  if (source === "inline") {
    return (
      <aside className={[styles.inline, className].filter(Boolean).join(" ")}>
        {content}
      </aside>
    );
  }

  return (
    <Container
      as="section"
      aria-labelledby="pilot-cta-title"
      className={[styles.section, className].filter(Boolean).join(" ")}
    >
      {content}
    </Container>
  );
}
