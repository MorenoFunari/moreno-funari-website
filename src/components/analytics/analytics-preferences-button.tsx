"use client";

import { analyticsConfig } from "@/config/analytics";
import { analyticsPreferencesEventName } from "@/lib/analytics/consent";

import styles from "@/components/layout/site-footer.module.css";

export function AnalyticsPreferencesButton() {
  if (!analyticsConfig.isConfigured) {
    return null;
  }

  function openPreferences() {
    window.dispatchEvent(new Event(analyticsPreferencesEventName));
  }

  return (
    <button
      className={styles.legalButton}
      onClick={openPreferences}
      type="button"
    >
      Preferenze cookie
    </button>
  );
}
