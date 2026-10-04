"use client";

import { useEffect, useRef } from "react";

import {
  analyticsConsentChangedEventName,
  readAnalyticsConsent,
} from "@/lib/analytics/consent";

export function PassoThankYouAnalytics() {
  const tracked = useRef(false);

  useEffect(() => {
    function trackLead() {
      if (
        tracked.current ||
        readAnalyticsConsent()?.status !== "granted" ||
        typeof window.gtag !== "function"
      ) {
        return;
      }

      tracked.current = true;
      const eventParameters = {
        funnel: "passo",
        lead_source: "brevo_passo_form",
        page: "/grazie-passo",
      };

      window.gtag("event", "passo_thank_you_view", eventParameters);
      window.gtag("event", "passo_lead_created", eventParameters);
      window.gtag("event", "generate_lead", eventParameters);
    }

    trackLead();
    window.addEventListener(analyticsConsentChangedEventName, trackLead);

    return () => {
      window.removeEventListener(analyticsConsentChangedEventName, trackLead);
    };
  }, []);

  return null;
}
