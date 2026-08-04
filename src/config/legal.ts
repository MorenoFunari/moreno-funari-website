import { siteConfig } from "@/config/site";

export const legalConfig = {
  controllerName: "Moreno Funari",
  contactEmail: siteConfig.email,
  websiteName: siteConfig.name,
  websiteUrl: siteConfig.siteUrl,
  lastUpdatedIso: "2026-08-04",
  lastUpdatedLabel: "4 agosto 2026",
} as const;
