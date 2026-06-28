import Link from "next/link";

import type { AnalyticsConsentStatus } from "@/lib/analytics/consent";

import styles from "./analytics-consent-banner.module.css";

type AnalyticsConsentBannerProps = {
  currentStatus: AnalyticsConsentStatus | null;
  mode: "banner" | "preferences";
  onAccept: () => void;
  onReject: () => void;
  onClosePreferences?: () => void;
};

function getStatusLabel(status: AnalyticsConsentStatus | null) {
  if (status === "granted") {
    return "Analytics accettati";
  }

  if (status === "denied") {
    return "Analytics rifiutati";
  }

  return "Nessuna scelta salvata";
}

export function AnalyticsConsentBanner({
  currentStatus,
  mode,
  onAccept,
  onReject,
  onClosePreferences,
}: AnalyticsConsentBannerProps) {
  const titleId =
    mode === "preferences"
      ? "analytics-preferences-title"
      : "analytics-consent-title";

  return (
    <section
      aria-labelledby={titleId}
      className={styles.region}
      role="region"
    >
      <div className={styles.panel}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Privacy</p>
          <h2 className={styles.title} id={titleId}>
            Posso usare cookie analytics?
          </h2>
          <p className={styles.text}>
            Google Analytics mi aiuta a capire quali contenuti vengono letti e
            come migliorare il sito. Si attiva solo se scegli di accettare.
            Potrai cambiare scelta in qualsiasi momento dal footer.
          </p>
          {mode === "preferences" ? (
            <div className={styles.preferences} aria-label="Stato cookie">
              <div className={styles.preferenceRow}>
                <div>
                  <strong>Cookie necessari</strong>
                  <span>
                    Ricordano la scelta e consentono il funzionamento del sito.
                  </span>
                </div>
                <span className={styles.badge}>Sempre attivi</span>
              </div>
              <div className={styles.preferenceRow}>
                <div>
                  <strong>Cookie analytics</strong>
                  <span>
                    Misurano l’utilizzo del sito soltanto dopo consenso.
                  </span>
                </div>
                <span className={styles.badge}>
                  {currentStatus === "granted" ? "Attivi" : "Non attivi"}
                </span>
              </div>
              <p className={styles.status}>
                Stato attuale: {getStatusLabel(currentStatus)}.
              </p>
            </div>
          ) : null}
          <Link className={styles.link} href="/cookie-policy">
            Leggi la Cookie Policy
          </Link>
        </div>

        <div className={styles.actions}>
          <button className={styles.secondaryButton} onClick={onReject} type="button">
            Continua senza analytics
          </button>
          <button className={styles.primaryButton} onClick={onAccept} type="button">
            Accetta analytics
          </button>
          {mode === "preferences" && onClosePreferences ? (
            <button
              className={styles.textButton}
              onClick={onClosePreferences}
              type="button"
            >
              Chiudi
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
