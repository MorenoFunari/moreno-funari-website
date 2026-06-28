import { siteConfig } from "@/config/site";

export const seoConfig = {
  siteName: siteConfig.name,
  shortSiteName: siteConfig.shortName,
  locale: "it_IT",
  language: "it-IT",
  defaultSocialImagePath: "/opengraph-image",
  defaultSocialImageAlt: "Moreno Funari | Mental Coach",
  personIdPath: "/#moreno-funari",
  websiteIdPath: "/#website",
} as const;

export function toAbsoluteUrl(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error(`Only internal absolute paths are supported: ${path}`);
  }

  const url = new URL(path, siteConfig.siteUrl);

  if (url.origin !== siteConfig.siteUrl || url.protocol !== "https:") {
    throw new Error(`Invalid canonical URL path: ${path}`);
  }

  return url.toString();
}
