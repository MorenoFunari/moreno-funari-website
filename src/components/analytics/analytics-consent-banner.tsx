"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";

import type { AnalyticsConsentStatus } from "@/lib/analytics/consent";

import styles from "./analytics-consent-banner.module.css";

type AnalyticsConsentBannerProps = {
  compact?: boolean;
  currentStatus: AnalyticsConsentStatus | null;
  mode: "banner" | "preferences";
  onAccept: () => void;
  onReject: () => void;
  onClosePreferences?: () => void;
};

function getAssistiveStatusLabel(status: AnalyticsConsentStatus | null) {
  if (status === "granted") {
    return "Analytics accettati";
  }

  return "Analytics non attivi";
}

export function AnalyticsConsentBanner({
  compact = false,
  currentStatus,
  mode,
  onAccept,
  onReject,
  onClosePreferences,
}: AnalyticsConsentBannerProps) {
  const generatedTitleId = useId();
  const generatedDescriptionId = useId();
  const titleId = `${generatedTitleId}-title`;
  const descriptionId = `${generatedDescriptionId}-description`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (mode !== "preferences") {
      return;
    }

    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    queueMicrotask(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [mode]);

  const isCompact = compact && mode === "banner";

  const content = (
    <div className={`${styles.panel} ${isCompact ? styles.compactPanel : ""}`}>
      <div className={styles.content}>
        {!isCompact ? <p className={styles.eyebrow}>Privacy</p> : null}
        <h2 className={styles.title} id={titleId}>
          {isCompact ? "Analytics opzionali" : "Posso usare cookie analytics?"}
        </h2>
        <p className={styles.text} id={descriptionId}>
          {isCompact ? (
            "Puoi continuare senza cookie analytics. Se accetti, ci aiuti a migliorare la pagina."
          ) : (
            <>
              Google Analytics mi aiuta a capire quali contenuti vengono letti e
              come migliorare il sito. Prima della scelta o in caso di rifiuto
              invia misurazioni senza cookie. I cookie analytics si attivano solo
              se accetti. Potrai cambiare scelta in qualsiasi momento dal footer.
            </>
          )}
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
                  Si attivano solo dopo consenso; senza consenso restano
                  misurazioni senza cookie.
                </span>
              </div>
              <span className={styles.badge}>
                {currentStatus === "granted" ? "Attivi" : "Non attivi"}
              </span>
            </div>
            <p className={styles.status} aria-live="polite">
              Stato attuale: {getAssistiveStatusLabel(currentStatus)}.
            </p>
          </div>
        ) : null}
        <Link className={styles.link} href="/cookie-policy">
          {isCompact ? "Cookie Policy" : "Leggi la Cookie Policy"}
        </Link>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.secondaryButton}
          onClick={onReject}
          type="button"
        >
          {isCompact ? "Continua senza cookie" : "Continua senza cookie analytics"}
        </button>
        <button
          className={styles.primaryButton}
          onClick={onAccept}
          type="button"
        >
          {isCompact ? "Accetta" : "Accetta analytics"}
        </button>
        {mode === "preferences" && onClosePreferences ? (
          <button
            className={styles.textButton}
            onClick={onClosePreferences}
            ref={closeButtonRef}
            type="button"
          >
            Chiudi
          </button>
        ) : null}
      </div>
    </div>
  );

  if (mode === "preferences") {
    return (
      <dialog
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        className={styles.dialog}
        onCancel={onClosePreferences}
        ref={dialogRef}
      >
        {content}
      </dialog>
    );
  }

  return (
    <section
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className={`${styles.region} ${isCompact ? styles.compactRegion : ""}`}
      role="region"
    >
      {content}
    </section>
  );
}
