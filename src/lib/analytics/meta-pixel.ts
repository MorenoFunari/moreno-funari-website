export type MetaPixelEventName =
  | "PageView"
  | "ViewPilotPage"
  | "ViewConfrontoPage"
  | "PilotCtaClick"
  | "ClickConfronto"
  | "ClickWhatsApp"
  | "LeadConfronto"
  | "LeadConfrontoSubmitted";

export type MetaPixelEventOptions = Record<
  string,
  string | number | boolean | null
>;

function getFbq() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.fbq ?? null;
}

export function pageview(options?: MetaPixelEventOptions) {
  event("PageView", options);
}

export function event(
  name: MetaPixelEventName,
  options?: MetaPixelEventOptions,
) {
  const fbq = getFbq();

  if (!fbq) {
    return;
  }

  if (options) {
    fbq("trackCustom", name, options);
    return;
  }

  if (name === "PageView") {
    fbq("track", "PageView");
    return;
  }

  fbq("trackCustom", name);
}

export function trackViewPilotPage() {
  event("ViewPilotPage", {
    page_path: "/percorso-pilota",
  });
}

export function trackViewConfrontoPage() {
  event("ViewConfrontoPage", {
    page_path: "/confronto",
  });
}

export function trackClickConfronto(options?: MetaPixelEventOptions) {
  event("ClickConfronto", options);
}

export function trackPilotCtaClick(options?: MetaPixelEventOptions) {
  event("PilotCtaClick", options);
}

export function trackClickWhatsApp(options?: MetaPixelEventOptions) {
  event("ClickWhatsApp", options);
}

export function trackLeadConfronto(options?: MetaPixelEventOptions) {
  event("LeadConfronto", options);
}

export function trackLeadConfrontoSubmitted(
  options?: MetaPixelEventOptions,
) {
  event("LeadConfrontoSubmitted", options);
}
