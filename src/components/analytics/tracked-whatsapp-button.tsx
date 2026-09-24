"use client";

import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import {
  trackClickWhatsApp,
  trackPilotCtaClick,
} from "@/lib/analytics/meta-pixel";

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
        trackPilotCtaClick(eventParameters);
      }}
      size={size}
      target="_blank"
    >
      {children}
    </ButtonLink>
  );
}
