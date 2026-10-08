import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import { AnalyticsConsentManager } from "@/components/analytics/analytics-consent-manager";
import { SiteShell } from "@/components/layout/site-shell";
import { GoogleAnalyticsLoader } from "@/components/analytics/google-analytics-loader";
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
  icons: {
    icon: "/images/brand/logo-mf-square-dark.png",
    apple: "/images/brand/logo-mf-square-dark.png",
  },
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
    <html lang="it" data-scroll-behavior="smooth">
      <head>
        <GoogleAnalyticsLoader />
      </head>
      <body className={rubik.className}>
        <SiteShell>{children}</SiteShell>
        <AnalyticsConsentManager />
      </body>
    </html>
  );
}
