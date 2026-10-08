type GtagConsentState = "granted" | "denied";

type GtagConsentSettings = {
  analytics_storage: GtagConsentState;
  ad_storage: GtagConsentState;
  ad_user_data: GtagConsentState;
  ad_personalization: GtagConsentState;
};

type GtagConfigSettings = {
  allow_google_signals?: boolean;
  allow_ad_personalization_signals?: boolean;
};

type GtagSetSettings = Record<string, string | number | boolean | null>;
type GtagEventSettings = Record<
  string,
  string | number | boolean | null | undefined | (() => void)
>;

type GtagCommand =
  | ["js", Date]
  | ["config", `G-${string}`, GtagConfigSettings?]
  | ["consent", "default" | "update", GtagConsentSettings]
  | ["set", GtagSetSettings]
  | ["event", string, GtagEventSettings?];

declare global {
  interface Window {
    mfGoogleTagInitialized?: boolean;
    mfAdsConfrontoOpenSent?: boolean;
    dataLayer?: GtagCommand[];
    gtag?: (...command: GtagCommand) => void;
    [gaDisableKey: `ga-disable-G-${string}`]: boolean | undefined;
  }
}

export {};
