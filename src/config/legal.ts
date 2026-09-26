import { siteConfig } from "@/config/site";

export const legalConfig = {
  controllerName: "Moreno Funari",
  contactEmail: siteConfig.email,
  websiteName: siteConfig.name,
  websiteUrl: siteConfig.siteUrl,
  lastUpdatedIso: "2026-09-26",
  lastUpdatedLabel: "26 settembre 2026",
} as const;
