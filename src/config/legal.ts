import { siteConfig } from "@/config/site";

export const legalConfig = {
  controllerName: "Moreno Funari",
  contactEmail: siteConfig.email,
  websiteName: siteConfig.name,
  websiteUrl: siteConfig.siteUrl,
  lastUpdatedIso: "2026-06-29",
  lastUpdatedLabel: "29 giugno 2026",
} as const;
