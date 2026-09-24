"use client";

import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { trackClickConfronto } from "@/lib/analytics/meta-pixel";
import { readAnalyticsConsent } from "@/lib/analytics/consent";

type TrackedConfrontoLinkProps = {
  children: ReactNode;
  className?: string;
  location: string;
  size?: "medium" | "large";
  variant?: "primary" | "secondary" | "ghost" | "text";
};

export function TrackedConfrontoLink({
  children,
  className,
  location,
  size = "medium",
  variant = "primary",
}: TrackedConfrontoLinkProps) {
  return (
    <ButtonLink
      className={className}
      href="/confronto"
      onClick={() => {
        const eventParameters = {
          location,
          page: typeof window !== "undefined" ? window.location.pathname : "",
          funnel: "pilot",
        };

        trackClickConfronto(eventParameters);

        if (
          typeof window !== "undefined" &&
          readAnalyticsConsent()?.status === "granted"
        ) {
          window.gtag?.("event", "click_confronto_cta", eventParameters);
        }
      }}
      size={size}
      variant={variant}
    >
      {children}
    </ButtonLink>
  );
}
