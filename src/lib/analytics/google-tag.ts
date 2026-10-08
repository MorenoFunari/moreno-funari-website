import { analyticsConfig } from "@/config/analytics";

export const adsConfrontoOpenEvent = "ads_conversion_apertura_confronto_ads_1";
export const adsConfrontoPageTitle = "CONFRONTO | Moreno Funari Mental Coach";

// Runs in the initial HTML before the external tag and before React hydration.
export function googleTagBootstrap() {
  return `
    if (!window.mfGoogleTagInitialized) {
      window.mfGoogleTagInitialized = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
      window.gtag("js", new Date());
      window.gtag("config", ${JSON.stringify(analyticsConfig.measurementId)}, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
      if (window.location.pathname.replace(/\\/$/, "") === "/ads/confronto") {
        window.mfAdsConfrontoOpenSent = true;
        window.gtag("event", ${JSON.stringify(adsConfrontoOpenEvent)}, {
          page_location: window.location.href,
          page_title: ${JSON.stringify(adsConfrontoPageTitle)}
        });
      }
    }
  `;
}

// Fallback for client-side navigation; shares the document-level guard.
export function trackAdsConfrontoOpen() {
  if (
    !analyticsConfig.isConfigured ||
    window.location.pathname.replace(/\/$/, "") !== "/ads/confronto" ||
    window.mfAdsConfrontoOpenSent ||
    !window.gtag
  ) {
    return;
  }
  window.mfAdsConfrontoOpenSent = true;
  window.gtag("event", adsConfrontoOpenEvent, {
    page_location: window.location.href,
    page_title: adsConfrontoPageTitle,
  });
}
