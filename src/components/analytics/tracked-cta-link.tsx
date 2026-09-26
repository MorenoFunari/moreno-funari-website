"use client";

import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { readAnalyticsConsent } from "@/lib/analytics/consent";

type Props = { children: ReactNode; eventName: "cta_click_inizia_da_qui" | "cta_click_confronto" | "cta_click_passo"; external?: boolean; href: string; location: string; size?: "medium" | "large"; variant?: "primary" | "secondary" | "ghost" | "text"; };

export function TrackedCtaLink({ children, eventName, external = false, href, location, size = "medium", variant = "primary" }: Props) {
  return <ButtonLink external={external} href={href} onClick={() => {
    if (typeof window !== "undefined" && readAnalyticsConsent()?.status === "granted") {
      window.gtag?.("event", eventName, { destination: href, location, page: window.location.pathname });
    }
  }} size={size} target={external ? "_blank" : undefined} variant={variant}>{children}</ButtonLink>;
}
