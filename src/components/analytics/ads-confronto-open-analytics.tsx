"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackAdsConfrontoOpen } from "@/lib/analytics/google-tag";

export function AdsConfrontoOpenAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    trackAdsConfrontoOpen(pathname);
  }, [pathname]);
  return null;
}
