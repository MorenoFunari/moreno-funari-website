"use client";

import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { trackClickWhatsApp } from "@/lib/analytics/meta-pixel";

type TrackedWhatsAppButtonProps = {
  children: ReactNode;
  href: string;
  location: string;
  size?: "medium" | "large";
};

export function TrackedWhatsAppButton({
  children,
  href,
  location,
  size = "medium",
}: TrackedWhatsAppButtonProps) {
  return (
    <ButtonLink
      external
      href={href}
      onClick={() => {
        trackClickWhatsApp({
          location,
        });
      }}
      size={size}
      target="_blank"
    >
      {children}
    </ButtonLink>
  );
}
