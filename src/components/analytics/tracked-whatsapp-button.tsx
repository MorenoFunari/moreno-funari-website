"use client";

import type { ReactNode } from "react";

import { analyticsConfig } from "@/config/analytics";
import { ButtonLink } from "@/components/ui/button-link";
import {
  trackClickWhatsApp,
  trackPilotWhatsappClick,
} from "@/lib/analytics/meta-pixel";
import { readAnalyticsConsent } from "@/lib/analytics/consent";

type TrackedWhatsAppButtonProps = {
  children: ReactNode;
  href: string;
  location: string;
  page?: string;
  size?: "medium" | "large";
};

export function TrackedWhatsAppButton({
  children,
  href,
  location,
  page,
  size = "medium",
}: TrackedWhatsAppButtonProps) {
  return (
    <ButtonLink
      external
      href={href}
      onClick={() => {
        const eventParameters = {
          source: location,
          page:
            page ??
            (typeof window !== "undefined" ? window.location.pathname : ""),
          funnel: "pilot",
        };

        trackClickWhatsApp(eventParameters);
        trackPilotWhatsappClick(eventParameters);

        if (
          typeof window !== "undefined" &&
          analyticsConfig.isConfigured &&
          (window.location.pathname.replace(/\/$/, "") === "/ads/confronto" ||
            readAnalyticsConsent()?.status === "granted")
        ) {
          window.gtag?.(
            "event",
            "whatsapp_click_confronto",
            eventParameters,
          );
        }
      }}
      size={size}
      target="_blank"
    >
      {children}
    </ButtonLink>
  );
}
