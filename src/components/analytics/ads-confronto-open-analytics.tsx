"use client";

import { useEffect } from "react";
import { trackAdsConfrontoOpen } from "@/lib/analytics/google-tag";

export function AdsConfrontoOpenAnalytics() {
  useEffect(() => {
    trackAdsConfrontoOpen();
  }, []);
  return null;
}
