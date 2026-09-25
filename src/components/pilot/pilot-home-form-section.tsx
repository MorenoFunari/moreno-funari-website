import { TrackedWhatsAppButton } from "@/components/analytics/tracked-whatsapp-button";
import { ConfrontoLeadForm } from "@/components/forms/confronto-lead-form";
import { Container } from "@/components/ui/container";
import { pilotWhatsAppUrl } from "@/config/pilot";

import styles from "./pilot-home-form-section.module.css";

const points = [
  "6 incontri online",
  "massimo 3 partecipanti",
  "gratuito in fase pilota",
  "nessuna promessa miracolosa",
] as const;

export function PilotHomeFormSection() {
  return (
    <Container
      as="section"
      aria-labelledby="home-pilot-form-title"
      className={styles.section}
    >
      <div className={styles.header}>
        <p className={styles.eyebrow}>PERCORSO PILOTA GRATUITO</p>
        <h2 id="home-pilot-form-title">Vuoi capire se può fare per te?</h2>
        <p>
          Lascia i tuoi dati e raccontami in poche parole da quale situazione
          concreta vorresti partire. Ti rispondo io personalmente.
        </p>
        <ul className={styles.points}>
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <div className={styles.formArea}>
        <ConfrontoLeadForm
          ctaLabel="Invia richiesta"
          introText="Lascia i tuoi dati e raccontami in poche parole da quale situazione concreta vorresti partire."
          noteLabel="Situazione concreta"
          page="/"
          source="home_pilot_form"
          title="Lascia una richiesta"
          variant="embedded"
        />
        <p className={styles.formNote}>
          Il form non iscrive alla newsletter: serve solo per essere
          ricontattati sulla richiesta inviata.
        </p>
        <div className={styles.secondaryAction}>
          <TrackedWhatsAppButton
            href={pilotWhatsAppUrl}
            location="home_pilot_form_whatsapp"
            page="/"
            size="medium"
          >
            Oppure scrivimi CONFRONTO su WhatsApp
          </TrackedWhatsAppButton>
        </div>
      </div>
    </Container>
  );
}
