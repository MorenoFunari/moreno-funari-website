"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { analyticsConfig } from "@/config/analytics";
import {
  analyticsPreferencesEventName,
  readAnalyticsConsent,
  saveAnalyticsConsent,
  type AnalyticsConsentStatus,
} from "@/lib/analytics/consent";

import { AnalyticsConsentBanner } from "./analytics-consent-banner";
import { GoogleAnalyticsLoader } from "./google-analytics-loader";
import { MetaPixelLoader } from "./meta-pixel-loader";

type ConsentViewState = "loading" | "undecided" | AnalyticsConsentStatus;

function updateConsentMode(status: AnalyticsConsentStatus) {
  window.gtag?.("consent", "update", {
    analytics_storage: status,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function getCookieNames() {
  return document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
}

function deleteCookie(name: string, domain?: string) {
  const domainAttribute = domain ? `; Domain=${domain}` : "";

  document.cookie = `${name}=; Max-Age=0; Path=/${domainAttribute}; SameSite=Lax`;
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/${domainAttribute}; SameSite=Lax`;
}

function deleteAccessibleGoogleAnalyticsCookies() {
  const cookieNames = getCookieNames();
  const hostname = window.location.hostname;
  const domains = [undefined, hostname, ".morenofunari.it"];

  cookieNames.forEach((name) => {
    domains.forEach((domain) => {
      deleteCookie(name, domain);
    });
  });
}

export function AnalyticsConsentManager() {
  const [status, setStatus] = useState<ConsentViewState>(
    analyticsConfig.isConfigured ? "loading" : "denied",
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const preferencesTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!analyticsConfig.isConfigured) {
      return;
    }

    const storedConsent = readAnalyticsConsent();

    if (!storedConsent) {
      queueMicrotask(() => {
        setStatus("undecided");
      });
      return;
    }

    window[analyticsConfig.gaDisableKey] = storedConsent.status === "denied";
    updateConsentMode(storedConsent.status);
    queueMicrotask(() => {
      setStatus(storedConsent.status);
    });
  }, []);

  useEffect(() => {
    if (!analyticsConfig.isConfigured) {
      return;
    }

    function handlePreferencesOpen(event: Event) {
      const trigger =
        event instanceof CustomEvent &&
        event.detail &&
        event.detail.trigger instanceof HTMLElement
          ? event.detail.trigger
          : document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;

      preferencesTriggerRef.current = trigger;
      setPreferencesOpen(true);
    }

    window.addEventListener(
      analyticsPreferencesEventName,
      handlePreferencesOpen,
    );

    return () => {
      window.removeEventListener(
        analyticsPreferencesEventName,
        handlePreferencesOpen,
      );
    };
  }, []);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
    queueMicrotask(() => {
      preferencesTriggerRef.current?.focus();
      preferencesTriggerRef.current = null;
    });
  }, []);

  const acceptAnalytics = useCallback(() => {
    if (!analyticsConfig.isConfigured) {
      return;
    }

    const shouldReload = status === "denied";

    window[analyticsConfig.gaDisableKey] = false;
    updateConsentMode("granted");
    saveAnalyticsConsent("granted");
    setStatus("granted");
    closePreferences();

    if (shouldReload) {
      window.location.reload();
    }
  }, [closePreferences, status]);

  const rejectAnalytics = useCallback(() => {
    if (!analyticsConfig.isConfigured) {
      return;
    }

    const shouldReload = status === "granted";

    window[analyticsConfig.gaDisableKey] = true;
    updateConsentMode("denied");
    deleteAccessibleGoogleAnalyticsCookies();
    saveAnalyticsConsent("denied");
    setStatus("denied");
    closePreferences();

    if (shouldReload) {
      window.location.reload();
    }
  }, [closePreferences, status]);

  if (!analyticsConfig.isConfigured) {
    return null;
  }

  const showInitialBanner = status === "undecided";
  const currentStatus =
    status === "granted" || status === "denied" ? status : null;

  return (
    <>
      <GoogleAnalyticsLoader consentGranted={status === "granted"} />
      <MetaPixelLoader consentGranted={status === "granted"} />
      {showInitialBanner || preferencesOpen ? (
        <AnalyticsConsentBanner
          currentStatus={currentStatus}
          mode={preferencesOpen ? "preferences" : "banner"}
          onAccept={acceptAnalytics}
          onClosePreferences={closePreferences}
          onReject={rejectAnalytics}
        />
      ) : null}
    </>
  );
}
