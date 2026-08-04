"use client";

import Link from "next/link";

import { readAnalyticsConsent } from "@/lib/analytics/consent";

type LeadMagnetTrackedLinkProps = {
  className?: string;
  destination: string;
  placement: string;
  sourcePath: string;
};

const bannerId = "dire-sempre-si";
const ctaText = "Ricevi la guida";

export function LeadMagnetTrackedLink({
  className,
  destination,
  placement,
  sourcePath,
}: LeadMagnetTrackedLinkProps) {
  function trackClick() {
    if (
      typeof window === "undefined" ||
      readAnalyticsConsent()?.status !== "granted"
    ) {
      return;
    }

    const eventParameters = {
      banner_id: bannerId,
      placement,
      source_path: sourcePath,
      destination,
      cta_text: ctaText,
    };

    if (typeof window.gtag === "function") {
      window.gtag(
        "event",
        "lead_magnet_banner_click",
        eventParameters,
      );
      return;
    }

    window.dataLayer?.push([
      "event",
      "lead_magnet_banner_click",
      eventParameters,
    ]);
  }

  return (
    <Link className={className} href={destination} onClick={trackClick}>
      {ctaText}
    </Link>
  );
}
