"use client";

import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import {
  trackClickConfronto,
  trackPilotCtaClick,
} from "@/lib/analytics/meta-pixel";
import { readAnalyticsConsent } from "@/lib/analytics/consent";

type TrackedConfrontoLinkProps = {
  children: ReactNode;
  className?: string;
  location: string;
  page?: string;
  size?: "medium" | "large";
  variant?: "primary" | "secondary" | "ghost" | "text";
};

export function TrackedConfrontoLink({
  children,
  className,
  location,
  page,
  size = "medium",
  variant = "primary",
}: TrackedConfrontoLinkProps) {
  return (
    <ButtonLink
      className={className}
      href="/confronto"
      onClick={() => {
        const eventParameters = {
          source: location,
          page:
            page ??
            (typeof window !== "undefined" ? window.location.pathname : ""),
          funnel: "pilot",
        };

        trackClickConfronto(eventParameters);
        trackPilotCtaClick(eventParameters);

        if (
          typeof window !== "undefined" &&
          readAnalyticsConsent()?.status === "granted"
        ) {
          window.gtag?.("event", "click_confronto_cta", eventParameters);
          window.gtag?.("event", "pilot_cta_click", eventParameters);
        }
      }}
      size={size}
      variant={variant}
    >
      {children}
    </ButtonLink>
  );
}
