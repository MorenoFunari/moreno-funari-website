"use client";

import Script from "next/script";

import { analyticsConfig } from "@/config/analytics";

type GoogleAnalyticsLoaderProps = {
  consentGranted: boolean;
};

export function GoogleAnalyticsLoader({
  consentGranted,
}: GoogleAnalyticsLoaderProps) {
  if (!analyticsConfig.isConfigured || !consentGranted) {
    return null;
  }

  return (
    <>
      <Script
        id="mf-ga4-script"
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="mf-ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);}
          window["ga-disable-${analyticsConfig.measurementId}"] = false;
          window.gtag("js", new Date());
          window.gtag("config", "${analyticsConfig.measurementId}", {
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  );
}
