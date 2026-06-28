import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Script from "next/script";

import { AnalyticsConsentManager } from "@/components/analytics/analytics-consent-manager";
import { SiteShell } from "@/components/layout/site-shell";
import { analyticsConfig } from "@/config/analytics";
import { seoConfig, toAbsoluteUrl } from "@/config/seo";
import { siteConfig } from "@/config/site";

import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: seoConfig.siteName,
    template: `%s | ${seoConfig.shortSiteName}`,
  },
  description: siteConfig.description,
  applicationName: seoConfig.siteName,
  authors: [{ name: "Moreno Funari" }],
  creator: "Moreno Funari",
  publisher: "Moreno Funari",
  openGraph: {
    type: "website",
    siteName: seoConfig.siteName,
    locale: seoConfig.locale,
    title: seoConfig.siteName,
    description: siteConfig.description,
    url: toAbsoluteUrl("/"),
    images: [
      {
        url: toAbsoluteUrl(seoConfig.defaultSocialImagePath),
        width: 1200,
        height: 630,
        alt: seoConfig.defaultSocialImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.siteName,
    description: siteConfig.description,
    images: [toAbsoluteUrl(seoConfig.defaultSocialImagePath)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={rubik.className}>
        {analyticsConfig.isConfigured ? (
          <Script id="mf-consent-default" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);}
              window.gtag("consent", "default", {
                analytics_storage: "denied",
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied"
              });
            `}
          </Script>
        ) : null}
        <SiteShell>{children}</SiteShell>
        <AnalyticsConsentManager />
      </body>
    </html>
  );
}
