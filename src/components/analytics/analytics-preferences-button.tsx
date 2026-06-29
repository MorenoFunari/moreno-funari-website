"use client";

import { analyticsConfig } from "@/config/analytics";
import { analyticsPreferencesEventName } from "@/lib/analytics/consent";

import styles from "@/components/layout/site-footer.module.css";

type AnalyticsPreferencesButtonProps = {
  className?: string;
};

export function AnalyticsPreferencesButton({
  className,
}: AnalyticsPreferencesButtonProps) {
  if (!analyticsConfig.isConfigured) {
    return null;
  }

  function openPreferences() {
    window.dispatchEvent(
      new CustomEvent(analyticsPreferencesEventName, {
        detail: { trigger: document.activeElement },
      }),
    );
  }

  return (
    <button
      className={className ?? styles.legalButton}
      onClick={openPreferences}
      type="button"
    >
      Preferenze cookie
    </button>
  );
}
