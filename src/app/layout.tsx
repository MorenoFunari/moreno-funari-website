import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import { SiteShell } from "@/components/layout/site-shell";
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
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
